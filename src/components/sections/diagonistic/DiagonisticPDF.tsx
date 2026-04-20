import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { CalculationResult, ContextData, SCORE_BAND_DESCRIPTIONS } from '@/app/types/diagonistic';

// Register fonts (using default fonts for now)
// You can add custom fonts later if needed

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  
  // Header
  header: {
    marginBottom: 30,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2A44',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 10,
    color: '#64748B',
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#a2d2ff',
    marginBottom: 20,
  },
  
  // Cover Page
  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2A44',
    marginBottom: 10,
    textAlign: 'center',
  },
  coverSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 30,
    textAlign: 'center',
  },
  companyInfo: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  companyInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  companyInfoLabel: {
    fontSize: 11,
    color: '#64748B',
    width: 100,
    fontWeight: 'bold',
  },
  companyInfoValue: {
    fontSize: 11,
    color: '#1F2A44',
    flex: 1,
  },
  
  // Score Display
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 30,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1F2A44',
    marginBottom: 5,
  },
  scoreMax: {
    fontSize: 36,
    color: '#64748B',
  },
  scoreBadge: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#a2d2ff',
  },
  scoreBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2A44',
  },
  scoreDescription: {
    marginTop: 15,
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 1.5,
  },
  
  // Key Insights
  insightsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  insightBox: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  insightBoxWarning: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FCD34D',
  },
  insightBoxDanger: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FCA5A5',
  },
  insightLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  insightLabelWarning: {
    color: '#92400E',
  },
  insightLabelDanger: {
    color: '#991B1B',
  },
  insightValue: {
    fontSize: 11,
    lineHeight: 1.4,
  },
  insightValueWarning: {
    color: '#92400E',
  },
  insightValueDanger: {
    color: '#991B1B',
  },
  
  // Zone Breakdown
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2A44',
    marginBottom: 20,
    marginTop: 10,
  },
  zoneItem: {
    marginBottom: 20,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  zoneName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2A44',
  },
  zonePercentage: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  zonePercentageGreen: {
    color: '#16A34A',
  },
  zonePercentageAmber: {
    color: '#D97706',
  },
  zonePercentageRed: {
    color: '#DC2626',
  },
  zoneBarContainer: {
    height: 12,
    backgroundColor: '#E6EAF0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 5,
  },
  zoneBar: {
    height: '100%',
  },
  zoneBarGreen: {
    backgroundColor: '#16A34A',
  },
  zoneBarAmber: {
    backgroundColor: '#D97706',
  },
  zoneBarRed: {
    backgroundColor: '#DC2626',
  },
  zoneScore: {
    fontSize: 9,
    color: '#64748B',
  },
  
  // AI Recommendation
  recommendationContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  recommendationText: {
    fontSize: 11,
    color: '#1F2A44',
    lineHeight: 1.6,
  },
  
  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#64748B',
  },
  
  // Page break helper
  pageBreak: {
    marginTop: 20,
  },
});

interface DiagnosticPDFProps {
  results: CalculationResult;
  contextData: ContextData;
  aiRecommendation: string;
  companyName: string;
  industry: string;
  name: string;
}

const DiagnosticPDF: React.FC<DiagnosticPDFProps> = ({
  results,
  contextData,
  aiRecommendation,
  companyName,
  industry,
  name,
}) => {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 75) return styles.zonePercentageGreen;
    if (percentage >= 50) return styles.zonePercentageAmber;
    return styles.zonePercentageRed;
  };

  const getBarColor = (percentage: number) => {
    if (percentage >= 75) return styles.zoneBarGreen;
    if (percentage >= 50) return styles.zoneBarAmber;
    return styles.zoneBarRed;
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      {/* Page 1: Cover + Overall Score */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Refactrd</Text>
          <Text style={styles.tagline}>AI Engineering Studio</Text>
          <View style={styles.divider} />
        </View>

        {/* Title */}
        <Text style={styles.coverTitle}>AI Readiness Assessment</Text>
        <Text style={styles.coverSubtitle}>
          Generated at Startups Blueprint '26 • {today}
        </Text>

        {/* Company Info */}
        <View style={styles.companyInfo}>
          <View style={styles.companyInfoRow}>
            <Text style={styles.companyInfoLabel}>Name:</Text>
            <Text style={styles.companyInfoValue}>{name}</Text>
          </View>
          <View style={styles.companyInfoRow}>
            <Text style={styles.companyInfoLabel}>Company:</Text>
            <Text style={styles.companyInfoValue}>{companyName}</Text>
          </View>
          <View style={styles.companyInfoRow}>
            <Text style={styles.companyInfoLabel}>Industry:</Text>
            <Text style={styles.companyInfoValue}>{industry}</Text>
          </View>
          <View style={styles.companyInfoRow}>
            <Text style={styles.companyInfoLabel}>Team Size:</Text>
            <Text style={styles.companyInfoValue}>{contextData.teamSize}</Text>
          </View>
        </View>

        {/* Overall Score */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Your AI Readiness Score</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.scoreValue}>{results.normalisedScore}</Text>
            <Text style={styles.scoreMax}>/100</Text>
          </View>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreBadgeText}>{results.scoreBand}</Text>
          </View>
          <Text style={styles.scoreDescription}>
            {SCORE_BAND_DESCRIPTIONS[results.scoreBand]}
          </Text>
        </View>

        {/* Key Insights */}
        <View style={styles.insightsContainer}>
          <View style={[styles.insightBox, styles.insightBoxWarning]}>
            <Text style={[styles.insightLabel, styles.insightLabelWarning]}>
              Weakest Zone
            </Text>
            <Text style={[styles.insightValue, styles.insightValueWarning]}>
              {results.weakestZone}
            </Text>
          </View>
          <View style={[styles.insightBox, styles.insightBoxDanger]}>
            <Text style={[styles.insightLabel, styles.insightLabelDanger]}>
              Highest Priority
            </Text>
            <Text style={[styles.insightValue, styles.insightValueDanger]}>
              {results.weakestSubZone}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>refactrd.com</Text>
          <Text style={styles.footerText}>Page 1 of 3</Text>
        </View>
      </Page>

      {/* Page 2: Zone Breakdown */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Refactrd</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.sectionTitle}>Zone Breakdown</Text>

        {/* Zone 1: Customer Experience */}
        <View style={styles.zoneItem}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>Customer Experience</Text>
            <Text
              style={[styles.zonePercentage, getPercentageColor(results.zonePercentages.zone1)]}
            >
              {results.zonePercentages.zone1}%
            </Text>
          </View>
          <View style={styles.zoneBarContainer}>
            <View
              style={[
                styles.zoneBar,
                getBarColor(results.zonePercentages.zone1),
                { width: `${results.zonePercentages.zone1}%` },
              ]}
            />
          </View>
          <Text style={styles.zoneScore}>
            {results.zoneScores.zone1} / 16 points
          </Text>
        </View>

        {/* Zone 2: Internal Operations */}
        <View style={styles.zoneItem}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>Internal Operations</Text>
            <Text
              style={[styles.zonePercentage, getPercentageColor(results.zonePercentages.zone2)]}
            >
              {results.zonePercentages.zone2}%
            </Text>
          </View>
          <View style={styles.zoneBarContainer}>
            <View
              style={[
                styles.zoneBar,
                getBarColor(results.zonePercentages.zone2),
                { width: `${results.zonePercentages.zone2}%` },
              ]}
            />
          </View>
          <Text style={styles.zoneScore}>
            {results.zoneScores.zone2} / 12 points
          </Text>
        </View>

        {/* Zone 3: Outreach & Growth */}
        <View style={styles.zoneItem}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>Outreach & Growth</Text>
            <Text
              style={[styles.zonePercentage, getPercentageColor(results.zonePercentages.zone3)]}
            >
              {results.zonePercentages.zone3}%
            </Text>
          </View>
          <View style={styles.zoneBarContainer}>
            <View
              style={[
                styles.zoneBar,
                getBarColor(results.zonePercentages.zone3),
                { width: `${results.zonePercentages.zone3}%` },
              ]}
            />
          </View>
          <Text style={styles.zoneScore}>
            {results.zoneScores.zone3} / 16 points
          </Text>
        </View>

        {/* Zone 4: People & Talent */}
        <View style={styles.zoneItem}>
          <View style={styles.zoneHeader}>
            <Text style={styles.zoneName}>People & Talent</Text>
            <Text
              style={[styles.zonePercentage, getPercentageColor(results.zonePercentages.zone4)]}
            >
              {results.zonePercentages.zone4}%
            </Text>
          </View>
          <View style={styles.zoneBarContainer}>
            <View
              style={[
                styles.zoneBar,
                getBarColor(results.zonePercentages.zone4),
                { width: `${results.zonePercentages.zone4}%` },
              ]}
            />
          </View>
          <Text style={styles.zoneScore}>
            {results.zoneScores.zone4} / 20 points
          </Text>
        </View>

        {/* Sub-zone Details */}
        <View style={styles.pageBreak}>
          <Text style={[styles.sectionTitle, { fontSize: 14, marginTop: 30 }]}>
            Understanding Your Score
          </Text>
          <Text style={{ fontSize: 10, color: '#64748B', lineHeight: 1.5 }}>
            Each zone represents a critical area of operational maturity. Percentages below 60%
            indicate significant gaps where competitors actively adopting AI may outpace you.
            Focus on your weakest zone first for maximum impact.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>refactrd.com</Text>
          <Text style={styles.footerText}>Page 2 of 3</Text>
        </View>
      </Page>

      {/* Page 3: AI Recommendation */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Refactrd</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.sectionTitle}>Your Personalized Recommendation</Text>

        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationText}>{aiRecommendation}</Text>
        </View>

        {/* Next Steps */}
        <View style={{ marginTop: 30, padding: 20, backgroundColor: '#1F2A44', borderRadius: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff', marginBottom: 10 }}>
            Ready to close these gaps?
          </Text>
          <Text style={{ fontSize: 11, color: '#ffffff', opacity: 0.9, marginBottom: 15 }}>
            Book a free AI Opportunity Mapping call to discuss your results and next steps.
          </Text>
          <Text style={{ fontSize: 10, color: '#a2d2ff', fontWeight: 'bold' }}>
            → cal.com/refactrd/technical-discovery-call
          </Text>
        </View>

        {/* Contact Info */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1F2A44', marginBottom: 10 }}>
            Get in Touch
          </Text>
          <Text style={{ fontSize: 10, color: '#64748B', marginBottom: 5 }}>
            Email: info@refactrd.com
          </Text>
          <Text style={{ fontSize: 10, color: '#64748B', marginBottom: 5 }}>
            Website: refactrd.com
          </Text>
          <Text style={{ fontSize: 10, color: '#64748B' }}>
            Location: Lagos, Nigeria
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Refactrd • AI Engineering Studio</Text>
          <Text style={styles.footerText}>Page 3 of 3</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DiagnosticPDF;