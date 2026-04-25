'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AnalyticsData } from '@/lib/analyticsCalculations';

export function useRealtimeAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/diagnostic/analytics', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      const analytics = await response.json();
      setData(analytics);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchAnalytics();

    // Set up Supabase real-time subscription
    const channel = supabase
      .channel('diagnostic-analytics')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'ai_score_submissions',
        },
        (payload) => {
          console.log('Database change detected:', payload);
          // Refetch analytics when data changes
          fetchAnalytics();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch: fetchAnalytics,
  };
}