import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import type { AssessmentReport } from "./report";

// Helvetica is built in, so the PDF renders identically everywhere without
// shipping font files to the serverless runtime.
const NAVY = "#1F2A44";
const ACCENT = "#5B8FC7";
const BODY = "#475569";
const MUTED = "#94A3B8";
const BORDER = "#E2E8F0";
const SURFACE = "#F8FAFC";

const styles = StyleSheet.create({
  page: {
    paddingTop: 46,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  masthead: { marginBottom: 26 },
  brand: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.6,
    color: MUTED,
    marginBottom: 14,
  },
  eyebrow: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.4,
    color: ACCENT,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    lineHeight: 1.2,
    marginBottom: 8,
  },
  summary: { fontSize: 11, color: BODY, lineHeight: 1.55 },
  rule: { borderBottomWidth: 2, borderBottomColor: ACCENT, marginVertical: 20, width: 46 },

  metaRow: { flexDirection: "row", marginBottom: 20 },
  metaCol: { flex: 1, paddingRight: 14 },
  metaLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.1,
    color: MUTED,
    marginBottom: 4,
  },
  metaValue: { fontSize: 10.5, color: NAVY, lineHeight: 1.45 },

  caveat: {
    backgroundColor: SURFACE,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 20,
  },
  caveatText: { fontSize: 9.5, color: BODY, lineHeight: 1.55 },

  section: { marginBottom: 19 },
  sectionLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    color: MUTED,
    marginBottom: 7,
  },
  sectionBody: { fontSize: 10.5, color: BODY, lineHeight: 1.6 },

  changeRow: { flexDirection: "row", marginTop: 4 },
  changeCol: {
    flex: 1,
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
  },
  changeSpacer: { width: 12 },
  changeLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.1,
    color: ACCENT,
    marginBottom: 6,
  },
  changeText: { fontSize: 10, color: BODY, lineHeight: 1.55 },

  serviceCard: {
    backgroundColor: SURFACE,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: NAVY,
    marginBottom: 4,
  },
  serviceWhy: { fontSize: 10, color: BODY, lineHeight: 1.55 },

  firstStep: {
    backgroundColor: NAVY,
    padding: 18,
    marginTop: 6,
  },
  firstStepLabel: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.2,
    color: "#A2D2FF",
    marginBottom: 7,
  },
  firstStepText: { fontSize: 11, color: "#FFFFFF", lineHeight: 1.6 },

  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: { fontSize: 8, color: MUTED },
});

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.section} wrap={false}>
      <Text style={styles.sectionLabel}>{label.toUpperCase()}</Text>
      {children}
    </View>
  );
}

/**
 * `renderToBuffer` wants a `ReactElement<DocumentProps>`, but a wrapper
 * component's props are its own. The element genuinely renders a `<Document>`,
 * so the assertion is safe and stays confined to this one helper.
 */
export function assessmentPdfElement(
  report: AssessmentReport
): React.ReactElement<DocumentProps> {
  return React.createElement(AssessmentPdf, { report }) as React.ReactElement<DocumentProps>;
}

export default function AssessmentPdf({ report }: { report: AssessmentReport }) {
  const date = new Date(report.generatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title={`AI Opportunity Assessment — ${report.name}`}
      author="Refactrd"
      subject={`Outcome: ${report.outcomeLabel}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.masthead}>
          <Text style={styles.brand}>REFACTRD · AI OPPORTUNITY ASSESSMENT</Text>
          <Text style={styles.eyebrow}>YOUR AI OPPORTUNITY</Text>
          <Text style={styles.title}>{report.outcomeLabel}</Text>
          <Text style={styles.summary}>{report.outcomeSummary}</Text>
        </View>

        <View style={styles.rule} />

        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>THE WORKFLOW</Text>
            <Text style={styles.metaValue}>{report.workflow}</Text>
          </View>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>YOUR GOAL</Text>
            <Text style={styles.metaValue}>{report.goals.join(", ")}</Text>
          </View>
        </View>

        {report.caveat && (
          <View style={styles.caveat}>
            <Text style={styles.caveatText}>{report.caveat}</Text>
          </View>
        )}

        <Section label="What we heard">
          <Text style={styles.sectionBody}>{report.whatWeHeard}</Text>
        </Section>

        <Section label="Where the opportunity is">
          <Text style={styles.sectionBody}>{report.opportunity}</Text>
        </Section>

        <Section label="What this could look like">
          <Text style={styles.sectionBody}>{report.futureState}</Text>
        </Section>

        <Section label="What could change">
          <View style={styles.changeRow}>
            <View style={styles.changeCol}>
              <Text style={styles.changeLabel}>TODAY</Text>
              <Text style={styles.changeText}>{report.today}</Text>
            </View>
            <View style={styles.changeSpacer} />
            <View style={styles.changeCol}>
              <Text style={styles.changeLabel}>POTENTIAL FUTURE</Text>
              <Text style={styles.changeText}>{report.future}</Text>
            </View>
          </View>
        </Section>

        <Section label="Things you might need">
          <Text style={[styles.sectionBody, { marginBottom: 9 }]}>
            Based on what you told us, these are the pieces that would move this
            workflow. Not a quote, just the shape of the work.
          </Text>
          {report.services.map((service) => (
            <View key={service.key} style={styles.serviceCard} wrap={false}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceWhy}>{service.why(report.workflow)}</Text>
            </View>
          ))}
        </Section>

        <Section label="Your first step">
          <View style={styles.firstStep}>
            <Text style={styles.firstStepLabel}>START HERE</Text>
            <Text style={styles.firstStepText}>{report.firstStep}</Text>
          </View>
        </Section>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Prepared for {report.name} · {date}
          </Text>
          <Text style={styles.footerText}>refactrd.com</Text>
        </View>
      </Page>
    </Document>
  );
}
