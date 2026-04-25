import { NextRequest, NextResponse } from 'next/server';
import { getAllDiagnosticRecords } from '@/lib/diagnosticDatabase';
import { calculateAnalytics } from '@/lib/analyticsCalculations';

export async function GET(request: NextRequest) {
  try {
    // Fetch all diagnostic records
    const { records, error } = await getAllDiagnosticRecords();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch records' },
        { status: 500 }
      );
    }

    // Calculate analytics
    const analytics = calculateAnalytics(records);

    return NextResponse.json(analytics, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}