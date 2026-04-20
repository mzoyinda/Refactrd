import { NextRequest, NextResponse } from 'next/server';
import { createRegistration } from '@/lib/diagnosticDatabase';
import { RegistrationData } from '../../../types/diagonistic';

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationData = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.companyName || !body.industry) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create registration record in Supabase
    const { id, error } = await createRegistration(body);

    if (error) {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: 'Failed to create registration' },
        { status: 500 }
      );
    }

    // Return the record ID
    return NextResponse.json({ id, success: true }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}