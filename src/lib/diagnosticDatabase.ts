import { DiagnosticRecord, DiagnosticSubmission, RegistrationData } from '@/app/types/diagonistic';
import { supabase } from './supabase';


/**
 * Create initial registration record
 * Returns the record ID to be used for updates
 */
export async function createRegistration(
  data: RegistrationData
): Promise<{ id: string; error: Error | null }> {
  try {
    const { data: record, error } = await supabase
      .from('ai_score_submissions')
      .insert({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        company_name: data.companyName,
        industry: data.industry,
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating registration:', error);
      return { id: '', error: new Error(error.message) };
    }

    if (!record) {
      return { id: '', error: new Error('No record returned') };
    }

    return { id: record.id, error: null };
  } catch (error) {
    console.error('Exception in createRegistration:', error);
    return { id: '', error: error as Error };
  }
}

/**
 * Update diagnostic record with complete results
 */
export async function updateDiagnosticResults(
  id: string,
  submission: Partial<DiagnosticSubmission>
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('ai_score_submissions')
      .update(submission)
      .eq('id', id);

    if (error) {
      console.error('Error updating diagnostic results:', error);
      return { success: false, error: new Error(error.message) };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Exception in updateDiagnosticResults:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Get diagnostic record by ID
 */
export async function getDiagnosticRecord(
  id: string
): Promise<{ record: DiagnosticRecord | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('ai_score_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching diagnostic record:', error);
      return { record: null, error: new Error(error.message) };
    }

    return { record: data as DiagnosticRecord, error: null };
  } catch (error) {
    console.error('Exception in getDiagnosticRecord:', error);
    return { record: null, error: error as Error };
  }
}

/**
 * Get all diagnostic records (admin view)
 */
export async function getAllDiagnosticRecords(): Promise<{
  records: DiagnosticRecord[];
  error: Error | null;
}> {
  try {
    const { data, error } = await supabase
      .from('ai_score_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all records:', error);
      return { records: [], error: new Error(error.message) };
    }

    return { records: data as DiagnosticRecord[], error: null };
  } catch (error) {
    console.error('Exception in getAllDiagnosticRecords:', error);
    return { records: [], error: error as Error };
  }
}