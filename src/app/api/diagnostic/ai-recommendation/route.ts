import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { CalculationResult, ContextData } from '@/app/types/diagonistic';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body: {
      results: CalculationResult;
      contextData: ContextData;
      companyName: string;
      industry: string;
    } = await request.json();

    const { results, contextData, companyName, industry } = body;

    // Build the prompt
    const prompt = buildPrompt(results, contextData, companyName, industry);

    // Call Anthropic API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text response
    const recommendation = message.content[0].type === 'text' 
      ? message.content[0].text 
      : 'Unable to generate recommendation';

    return NextResponse.json({ recommendation }, { status: 200 });
  } catch (error) {
    console.error('AI recommendation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate recommendation' },
      { status: 500 }
    );
  }
}

function buildPrompt(
  results: CalculationResult,
  contextData: ContextData,
  companyName: string,
  industry: string
): string {
  return `You are an AI operations consultant analyzing a company's AI readiness assessment results.

Company: ${companyName}
Industry: ${industry}
Team Size: ${contextData.teamSize}
${contextData.openChallenge ? `Current Challenge: ${contextData.openChallenge}` : ''}

ASSESSMENT RESULTS:
- Overall Score: ${results.normalisedScore}/100 (${results.scoreBand})
- Raw Total: ${results.rawTotal}/64 points

ZONE BREAKDOWN:
1. Customer Experience: ${results.zonePercentages.zone1}% (${results.zoneScores.zone1}/16 points)
2. Internal Operations: ${results.zonePercentages.zone2}% (${results.zoneScores.zone2}/12 points)
3. Outreach & Growth: ${results.zonePercentages.zone3}% (${results.zoneScores.zone3}/16 points)
4. People & Talent: ${results.zonePercentages.zone4}% (${results.zoneScores.zone4}/20 points)

WEAKEST AREAS:
- Weakest Zone: ${results.weakestZone}
- Highest Priority Sub-Zone: ${results.weakestSubZone}

TASK:
Write a concise, actionable recommendation (200-250 words) that:
1. Acknowledges their current state honestly (don't sugarcoat if they scored low)
2. Explains the specific operational risk of their weakest area
3. Recommends ONE concrete first step they can take in the next 14 days
4. Keeps a direct, no-fluff tone

Do not use bullet points. Write in flowing paragraphs. Be specific to their industry and challenge where relevant.`;
}