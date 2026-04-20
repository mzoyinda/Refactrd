'use client';

import { useEffect, useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import DiagnosticPDF from './DiagonisticPDF';
import { calculateScores } from '@/lib/diagnosticCalculations';
import { updateDiagnosticResults } from '@/lib/diagnosticDatabase';
import { Loader2, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { CalculationResult, ContextData, DiagnosticAnswers, SCORE_BAND_DESCRIPTIONS } from '@/app/types/diagonistic';

interface ResultsScreenProps {
  answers: DiagnosticAnswers;
  contextData: ContextData;
  recordId: string;
  companyName: string;
  industry: string;
  name: string;
}

export default function ResultsScreen({
  answers,
  contextData,
  recordId,
  companyName,
  industry,
  name,
}: ResultsScreenProps) {
  const [isCalculating, setIsCalculating] = useState(true);
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!results || !aiRecommendation) return;

    setIsDownloading(true);
    try {
      // Generate PDF
      const blob = await pdf(
        <DiagnosticPDF
          results={results}
          contextData={contextData}
          aiRecommendation={aiRecommendation}
          companyName={companyName}
          industry={industry}
          name={name}
        />
      ).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${companyName.replace(/\s+/g, '-')}-AI-Readiness-Assessment.pdf`;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    const processResults = async () => {
      setIsCalculating(true);

      // Calculate scores
      const calculatedResults = calculateScores(answers);
      setResults(calculatedResults);

      // Prepare submission data
      const submission = {
        team_size: contextData.teamSize,
        open_challenge: contextData.openChallenge,
        zone_1_score: calculatedResults.zoneScores.zone1,
        zone_2_score: calculatedResults.zoneScores.zone2,
        zone_3_score: calculatedResults.zoneScores.zone3,
        zone_4_score: calculatedResults.zoneScores.zone4,
        zone_1_percentage: calculatedResults.zonePercentages.zone1,
        zone_2_percentage: calculatedResults.zonePercentages.zone2,
        zone_3_percentage: calculatedResults.zonePercentages.zone3,
        zone_4_percentage: calculatedResults.zonePercentages.zone4,
        subzone_scores: calculatedResults.subZoneScores,
        raw_total: calculatedResults.rawTotal,
        normalised_score: calculatedResults.normalisedScore,
        score_band: calculatedResults.scoreBand,
        weakest_zone: calculatedResults.weakestZone,
        weakest_subzone: calculatedResults.weakestSubZone,
      };

      // Update Supabase record
      const { success, error } = await updateDiagnosticResults(recordId, submission);

      if (success) {
        setIsSaved(true);
        
        // Fetch AI recommendation
        setIsLoadingAI(true);
        try {
          const aiResponse = await fetch('/api/diagnostic/ai-recommendation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              results: calculatedResults,
              contextData,
              companyName,
              industry,
            }),
          });

          const aiData = await aiResponse.json();
          if (aiData.recommendation) {
            setAiRecommendation(aiData.recommendation);
            
            // Save AI recommendation to Supabase
            await updateDiagnosticResults(recordId, {
              ai_recommendation: aiData.recommendation,
            });
          }
        } catch (aiError) {
          console.error('Failed to fetch AI recommendation:', aiError);
        } finally {
          setIsLoadingAI(false);
        }
      } else {
        console.error('Failed to save results:', error);
      }

      setIsCalculating(false);
    };

    processResults();
  }, [answers, contextData, recordId]);

  if (isCalculating || !results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1F2A44] to-[#0e5d7d] flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#a2d2ff] animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-clash font-bold text-white mb-2">
            Calculating Your AI Readiness Score
          </h2>
          <p className="text-white/70 font-jakarta">
            Analyzing your responses across 4 operational zones...
          </p>
        </div>
      </div>
    );
  }

  const getScoreBandIcon = () => {
    switch (results.scoreBand) {
      case 'AI-Ready':
        return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      case 'Relevance Zone':
        return <TrendingUp className="w-8 h-8 text-blue-500" />;
      case 'At Risk':
        return <AlertCircle className="w-8 h-8 text-amber-500" />;
      case 'Urgent':
        return <TrendingDown className="w-8 h-8 text-red-500" />;
    }
  };

  const getScoreBandColor = () => {
    switch (results.scoreBand) {
      case 'AI-Ready':
        return 'from-green-500 to-emerald-600';
      case 'Relevance Zone':
        return 'from-blue-500 to-indigo-600';
      case 'At Risk':
        return 'from-amber-500 to-orange-600';
      case 'Urgent':
        return 'from-red-500 to-rose-600';
    }
  };

  const getZonePercentageColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  const getZoneBarColor = (percentage: number) => {
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Overall Score Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-[#CBD5E1] mb-6">
          {/* Score Band Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
              {getScoreBandIcon()}
            </div>
            <h1 className="text-3xl md:text-4xl font-clash font-bold text-[#1F2A44] mb-2">
              Your AI Readiness Score
            </h1>
            <div
              className={`inline-block px-6 py-2 bg-gradient-to-r ${getScoreBandColor()} text-white rounded-full font-clash font-bold text-lg mb-4`}
            >
              {results.scoreBand}
            </div>
          </div>

          {/* Large Score Display */}
          <div className="text-center mb-6">
            <div className="text-7xl md:text-8xl font-clash font-bold text-[#1F2A44] mb-2">
              {results.normalisedScore}
              <span className="text-4xl text-[#64748B]">/100</span>
            </div>
            <p className="text-lg text-[#64748B] font-jakarta">
              {SCORE_BAND_DESCRIPTIONS[results.scoreBand]}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-4 bg-[#E6EAF0] rounded-full overflow-hidden mb-6">
            <div
              className={`h-full bg-gradient-to-r ${getScoreBandColor()} transition-all duration-1000 ease-out`}
              style={{ width: `${results.normalisedScore}%` }}
            />
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FEF3C7] border border-[#FCD34D] rounded-lg">
              <p className="text-sm font-clash font-semibold text-[#92400E] mb-1">
                Weakest Zone
              </p>
              <p className="font-jakarta text-[#92400E]">{results.weakestZone}</p>
            </div>
            <div className="p-4 bg-[#FEE2E2] border border-[#FCA5A5] rounded-lg">
              <p className="text-sm font-clash font-semibold text-[#991B1B] mb-1">
                Highest Priority Area
              </p>
              <p className="font-jakarta text-[#991B1B]">{results.weakestSubZone}</p>
            </div>
          </div>
        </div>

        {/* Zone Breakdown */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-[#CBD5E1] mb-6">
          <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-6">
            Zone Breakdown
          </h2>

          <div className="space-y-6">
            {/* Zone 1: Customer Experience */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-clash font-semibold text-[#1F2A44]">
                  Customer Experience
                </h3>
                <span
                  className={`font-clash font-bold text-lg ${getZonePercentageColor(
                    results.zonePercentages.zone1
                  )}`}
                >
                  {results.zonePercentages.zone1}%
                </span>
              </div>
              <div className="w-full h-3 bg-[#E6EAF0] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getZoneBarColor(
                    results.zonePercentages.zone1
                  )} transition-all duration-1000`}
                  style={{ width: `${results.zonePercentages.zone1}%` }}
                />
              </div>
              <p className="text-sm text-[#64748B] font-jakarta mt-1">
                {results.zoneScores.zone1} / 16 points
              </p>
            </div>

            {/* Zone 2: Internal Operations */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-clash font-semibold text-[#1F2A44]">
                  Internal Operations
                </h3>
                <span
                  className={`font-clash font-bold text-lg ${getZonePercentageColor(
                    results.zonePercentages.zone2
                  )}`}
                >
                  {results.zonePercentages.zone2}%
                </span>
              </div>
              <div className="w-full h-3 bg-[#E6EAF0] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getZoneBarColor(
                    results.zonePercentages.zone2
                  )} transition-all duration-1000`}
                  style={{ width: `${results.zonePercentages.zone2}%` }}
                />
              </div>
              <p className="text-sm text-[#64748B] font-jakarta mt-1">
                {results.zoneScores.zone2} / 12 points
              </p>
            </div>

            {/* Zone 3: Outreach & Growth */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-clash font-semibold text-[#1F2A44]">
                  Outreach & Growth
                </h3>
                <span
                  className={`font-clash font-bold text-lg ${getZonePercentageColor(
                    results.zonePercentages.zone3
                  )}`}
                >
                  {results.zonePercentages.zone3}%
                </span>
              </div>
              <div className="w-full h-3 bg-[#E6EAF0] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getZoneBarColor(
                    results.zonePercentages.zone3
                  )} transition-all duration-1000`}
                  style={{ width: `${results.zonePercentages.zone3}%` }}
                />
              </div>
              <p className="text-sm text-[#64748B] font-jakarta mt-1">
                {results.zoneScores.zone3} / 16 points
              </p>
            </div>

            {/* Zone 4: People & Talent */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-clash font-semibold text-[#1F2A44]">
                  People & Talent
                </h3>
                <span
                  className={`font-clash font-bold text-lg ${getZonePercentageColor(
                    results.zonePercentages.zone4
                  )}`}
                >
                  {results.zonePercentages.zone4}%
                </span>
              </div>
              <div className="w-full h-3 bg-[#E6EAF0] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getZoneBarColor(
                    results.zonePercentages.zone4
                  )} transition-all duration-1000`}
                  style={{ width: `${results.zonePercentages.zone4}%` }}
                />
              </div>
              <p className="text-sm text-[#64748B] font-jakarta mt-1">
                {results.zoneScores.zone4} / 20 points
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-[#CBD5E1] mb-6">
          <h2 className="text-2xl font-clash font-bold text-[#1F2A44] mb-4">
            Your Personalized Recommendation
          </h2>

          {isLoadingAI ? (
            <div className="flex items-center gap-3 text-[#64748B]">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p className="font-jakarta">Generating your personalized insights...</p>
            </div>
          ) : aiRecommendation ? (
            <div className="prose prose-slate max-w-none">
              <p className="text-[#1F2A44] font-jakarta leading-relaxed whitespace-pre-line">
                {aiRecommendation}
              </p>
            </div>
          ) : (
            <p className="text-[#64748B] font-jakarta italic">
              Unable to generate recommendation at this time.
            </p>
          )}
        </div>

        {/* Download PDF Button */}
        {aiRecommendation && (
          <div className="bg-gradient-to-r from-[#a2d2ff] to-[#8cc2ff] rounded-2xl p-6 md:p-8 shadow-xl text-center mb-6">
            <h3 className="text-xl font-clash font-bold text-[#1F2A44] mb-3">
              Download Your Complete Assessment
            </h3>
            <p className="text-[#1F2A44]/80 font-jakarta mb-6">
              Get a professional PDF report with your scores, zone breakdown, and personalized recommendations.
            </p>
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className={`inline-flex items-center gap-2 px-8 py-4 bg-[#1F2A44] text-white rounded-lg font-clash font-bold transition-all duration-300 ${
                isDownloading
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#0e5d7d] hover:scale-105'
              }`}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Download PDF Report</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Next Steps CTA */}
        <div className="bg-gradient-to-r from-[#1F2A44] to-[#0e5d7d] rounded-2xl p-6 md:p-8 shadow-xl text-white text-center">
          <h2 className="text-2xl font-clash font-bold mb-3">
            Ready to close these gaps?
          </h2>
          <p className="text-white/80 font-jakarta mb-6">
            Book a free AI Opportunity Mapping call to discuss your results and next
            steps.
          </p>
          <a
            href="https://cal.com/refactrd/technical-discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-[#a2d2ff] text-[#1F2A44] rounded-lg font-clash font-bold hover:bg-[#8cc2ff] transition-all duration-300 hover:scale-105"
          >
            Book Your Free Call
          </a>
        </div>

        {/* Save Status */}
        {isSaved && (
          <p className="text-center text-sm text-green-600 font-jakarta mt-4">
            ✓ Results saved successfully
          </p>
        )}
      </div>
    </div>
  );
}