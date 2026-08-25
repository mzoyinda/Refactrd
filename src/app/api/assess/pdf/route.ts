import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { renderToBuffer } from "@react-pdf/renderer";
import { assessmentPdfElement } from "@/lib/assessment/AssessmentPdf";
import {
  ASSESSMENT_ROW_COLUMNS,
  reportFromRow,
  type AssessmentRow,
} from "@/lib/assessment/report";

// The renderer needs Node APIs, and the buffer must not be cached.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

function safeFilename(name: string): string {
  const slug = name.trim().replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${slug || "Refactrd"}-AI-Opportunity-Assessment.pdf`;
}

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json({ error: "Missing assessment id." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("assessment_submissions")
      .select(ASSESSMENT_ROW_COLUMNS)
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Assessment PDF: row lookup failed", error);
      return NextResponse.json({ error: "Assessment not found." }, { status: 404 });
    }

    const report = reportFromRow(data as unknown as AssessmentRow);
    const buffer = await renderToBuffer(assessmentPdfElement(report));

    // Best-effort analytics flag — never block the download on it.
    const { error: flagError } = await supabase
      .from("assessment_submissions")
      .update({ pdf_downloaded: true })
      .eq("id", id);
    if (flagError) console.error("Assessment PDF: flag update failed", flagError);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename(report.name)}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Assessment PDF error:", error);
    return NextResponse.json(
      { error: "Could not generate your PDF. Please try again." },
      { status: 500 }
    );
  }
}
