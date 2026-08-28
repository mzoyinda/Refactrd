import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { gradeAssessment, resolveMulti, resolveSingle } from "@/lib/assessment/grading";
import { generateReportSections } from "@/lib/assessment/generate";
import { buildReport } from "@/lib/assessment/report";
import { serviceKeys } from "@/lib/assessment/services";
import { renderAssessmentEmail } from "@/lib/emails/assessmentEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_TEXT = 2000;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_TEXT) : "";
}

function list(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(text).filter(Boolean))].slice(0, 20);
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();

    const payload = {
      name: text(raw.name),
      email: text(raw.email).toLowerCase(),
      industry: text(raw.industry),
      companySize: text(raw.companySize),

      goal: list(raw.goal),
      goalOther: text(raw.goalOther),
      workflow: text(raw.workflow),
      workflowOther: text(raw.workflowOther),
      friction: list(raw.friction),
      frictionOther: text(raw.frictionOther),
      frequency: text(raw.frequency),
      frequencyOther: text(raw.frequencyOther),
      humanRole: list(raw.humanRole),
      humanRoleOther: text(raw.humanRoleOther),
      existingAiUse: text(raw.existingAiUse),
      existingAiUseOther: text(raw.existingAiUseOther),
      timeline: text(raw.timeline),
      timelineOther: text(raw.timelineOther),
    };

    // ── Validate ───────────────────────────────────────────────────────
    const missing: string[] = [];
    if (!payload.name) missing.push("name");
    if (!payload.email) missing.push("email");
    if (!payload.industry) missing.push("industry");
    if (!payload.companySize) missing.push("company size");
    if (payload.goal.length === 0) missing.push("business goal");
    if (!payload.workflow) missing.push("workflow");
    if (payload.friction.length === 0) missing.push("friction");
    if (!payload.frequency) missing.push("frequency");
    if (payload.humanRole.length === 0) missing.push("human role");
    if (!payload.existingAiUse) missing.push("current AI use");
    if (!payload.timeline) missing.push("timeline");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required answers: ${missing.join(", ")}.` },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // "Something else" on its own with no text would resolve to nothing, leaving
    // an empty section in the report. Mirrors the client-side rule.
    const OTHER = "Something else";
    const needsText: [string[], string, string][] = [
      [payload.goal, payload.goalOther, "business goal"],
      [payload.friction, payload.frictionOther, "friction"],
      [payload.humanRole, payload.humanRoleOther, "human role"],
    ];
    for (const [values, other, label] of needsText) {
      if (values.length === 1 && values[0] === OTHER && !other) {
        return NextResponse.json(
          { error: `Please describe your ${label}.` },
          { status: 400 }
        );
      }
    }
    const singlesNeedingText: [string, string, string][] = [
      [payload.workflow, payload.workflowOther, "workflow"],
      [payload.frequency, payload.frequencyOther, "frequency"],
      [payload.existingAiUse, payload.existingAiUseOther, "current AI use"],
      [payload.timeline, payload.timelineOther, "timeline"],
    ];
    for (const [value, other, label] of singlesNeedingText) {
      if (value === OTHER && !other) {
        return NextResponse.json(
          { error: `Please describe your ${label}.` },
          { status: 400 }
        );
      }
    }

    // ── Insert the full row before grading or generation ───────────────
    const { data: inserted, error: insertError } = await supabase
      .from("assessment_submissions")
      .insert({
        name: payload.name,
        email: payload.email,
        industry: payload.industry,
        company_size: payload.companySize,

        step1_goal: payload.goal,
        step1_other: payload.goalOther || null,
        step2_workflow: payload.workflow,
        step2_other: payload.workflowOther || null,
        step3_friction: payload.friction,
        step3_other: payload.frictionOther || null,
        step4_frequency: payload.frequency,
        step4_other: payload.frequencyOther || null,
        step5_human_role: payload.humanRole,
        step5_other: payload.humanRoleOther || null,
        step6_existing_ai_use: payload.existingAiUse,
        step6_other: payload.existingAiUseOther || null,
        step7_timeline: payload.timeline,
        step7_other: payload.timelineOther || null,

        // Filled in by the update below; the row exists first so an answer set
        // is never lost to a grading or generation failure.
        outcome: "PENDING",
        report_method: "pending",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Assessment insert failed:", {
        code: insertError.code,
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
      });
      return NextResponse.json(
        { error: "We couldn't save your answers. Please try again." },
        { status: 500 }
      );
    }

    // ── Grade ──────────────────────────────────────────────────────────
    const outcome = gradeAssessment(payload.friction);

    // Resolve "Something else" answers to the text the user actually wrote.
    const goals = resolveMulti(payload.goal, payload.goalOther);
    const workflow = resolveSingle(payload.workflow, payload.workflowOther);
    const friction = resolveMulti(payload.friction, payload.frictionOther);
    const frequency = resolveSingle(payload.frequency, payload.frequencyOther);
    const humanRole = resolveMulti(payload.humanRole, payload.humanRoleOther);
    const existingAiUse = resolveSingle(payload.existingAiUse, payload.existingAiUseOther);
    const timeline = resolveSingle(payload.timeline, payload.timelineOther);

    // ── Generate (never throws; falls back to templated copy) ──────────
    const sections = await generateReportSections({
      goals,
      workflow,
      friction,
      frequency,
      humanRole,
      existingAiUse,
      timeline,
      outcome,
    });

    // ── Persist the result ─────────────────────────────────────────────
    const { error: updateError } = await supabase
      .from("assessment_submissions")
      .update({
        outcome,
        report_what_we_heard: sections.whatWeHeard,
        report_opportunity: sections.opportunity,
        report_future_state: sections.futureState,
        report_method: sections.method,
        recommended_services: serviceKeys(outcome),
      })
      .eq("id", inserted.id);

    if (updateError) {
      // The answers are safe and the report is already in hand — log and serve it.
      console.error("Assessment result update failed:", updateError);
    }

    const report = buildReport({
      id: String(inserted.id),
      name: payload.name,
      email: payload.email,
      outcome,
      workflow,
      goals,
      frequency,
      whatWeHeard: sections.whatWeHeard,
      opportunity: sections.opportunity,
      futureState: sections.futureState,
    });

    // The copy goes out automatically — the results screen just says so,
    // rather than asking the user to press a button for it.
    const email = renderAssessmentEmail(report);
    const { error: sendError } = await resend.emails.send({
      from: "Refactrd <hello@refactrd.com>",
      to: payload.email,
      replyTo: "info@refactrd.com",
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    if (sendError) {
      console.error("Assessment: report email failed to send", sendError);
    } else {
      const { error: flagError } = await supabase
        .from("assessment_submissions")
        .update({ email_sent: true })
        .eq("id", inserted.id);
      if (flagError) console.error("Assessment: email_sent flag failed", flagError);
    }

    return NextResponse.json(
      { success: true, report, emailSent: !sendError },
      { status: 200 }
    );
  } catch (error) {
    console.error("Assessment error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
