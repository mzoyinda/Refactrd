import { DiagnosticRecord } from '../app/types/diagonistic';

export interface AnalyticsData {
  totalSubmissions: number;
  completionRate: number;
  averageScore: number;
  scoreDistribution: {
    aiReady: number;      // 80-100
    relevanceZone: number; // 60-79
    atRisk: number;        // 40-59
    urgent: number;        // 0-39
  };
  zoneAverages: {
    zone1: number;
    zone2: number;
    zone3: number;
    zone4: number;
  };
  industryBreakdown: Array<{
    industry: string;
    count: number;
    avgScore: number;
  }>;
  teamSizeBreakdown: Array<{
    size: string;
    count: number;
    avgScore: number;
  }>;
  weakestZones: Array<{
    zone: string;
    count: number;
  }>;
  recentSubmissions: Array<{
    name: string;
    company: string;
    score: number;
    timestamp: string;
  }>;
  submissionsOverTime: Array<{
    date: string;
    count: number;
  }>;
  scoresByIndustry: Array<{
    industry: string;
    zone1: number;
    zone2: number;
    zone3: number;
    zone4: number;
  }>;
}

export function calculateAnalytics(records: DiagnosticRecord[]): AnalyticsData {
  // Filter out incomplete submissions (no normalized score)
  const completeRecords = records.filter(r => r.normalised_score !== null);
  const totalRecords = records.length;

  // Total submissions and completion rate
  const totalSubmissions = completeRecords.length;
  const completionRate = totalRecords > 0 
    ? Math.round((totalSubmissions / totalRecords) * 100) 
    : 0;

  // Average score
  const averageScore = totalSubmissions > 0
    ? Math.round(
        completeRecords.reduce((sum, r) => sum + (r.normalised_score || 0), 0) / totalSubmissions
      )
    : 0;

  // Score distribution by band
  const scoreDistribution = {
    aiReady: completeRecords.filter(r => (r.normalised_score || 0) >= 80).length,
    relevanceZone: completeRecords.filter(r => {
      const score = r.normalised_score || 0;
      return score >= 60 && score < 80;
    }).length,
    atRisk: completeRecords.filter(r => {
      const score = r.normalised_score || 0;
      return score >= 40 && score < 60;
    }).length,
    urgent: completeRecords.filter(r => (r.normalised_score || 0) < 40).length,
  };

  // Zone averages (percentages)
  const zoneAverages = {
    zone1: totalSubmissions > 0
      ? Math.round(
          completeRecords.reduce((sum, r) => sum + (r.zone_1_percentage || 0), 0) / totalSubmissions
        )
      : 0,
    zone2: totalSubmissions > 0
      ? Math.round(
          completeRecords.reduce((sum, r) => sum + (r.zone_2_percentage || 0), 0) / totalSubmissions
        )
      : 0,
    zone3: totalSubmissions > 0
      ? Math.round(
          completeRecords.reduce((sum, r) => sum + (r.zone_3_percentage || 0), 0) / totalSubmissions
        )
      : 0,
    zone4: totalSubmissions > 0
      ? Math.round(
          completeRecords.reduce((sum, r) => sum + (r.zone_4_percentage || 0), 0) / totalSubmissions
        )
      : 0,
  };

  // Industry breakdown
  const industryMap = new Map<string, { count: number; totalScore: number }>();
  completeRecords.forEach(r => {
    const industry = r.industry || 'Unknown';
    const existing = industryMap.get(industry) || { count: 0, totalScore: 0 };
    industryMap.set(industry, {
      count: existing.count + 1,
      totalScore: existing.totalScore + (r.normalised_score || 0),
    });
  });
  
  const industryBreakdown = Array.from(industryMap.entries())
    .map(([industry, data]) => ({
      industry,
      count: data.count,
      avgScore: Math.round(data.totalScore / data.count),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 industries

  // Team size breakdown
  const teamSizeMap = new Map<string, { count: number; totalScore: number }>();
  completeRecords.forEach(r => {
    const size = r.team_size || 'Unknown';
    const existing = teamSizeMap.get(size) || { count: 0, totalScore: 0 };
    teamSizeMap.set(size, {
      count: existing.count + 1,
      totalScore: existing.totalScore + (r.normalised_score || 0),
    });
  });
  
  const teamSizeBreakdown = Array.from(teamSizeMap.entries())
    .map(([size, data]) => ({
      size,
      count: data.count,
      avgScore: Math.round(data.totalScore / data.count),
    }))
    .sort((a, b) => {
      // Sort by team size order
      const order = ['Just me', '2 to 5', '6 to 15', '16 to 30', '30 plus'];
      return order.indexOf(a.size) - order.indexOf(b.size);
    });

  // Weakest zones
  const weakestZoneMap = new Map<string, number>();
  completeRecords.forEach(r => {
    const zone = r.weakest_zone || 'Unknown';
    weakestZoneMap.set(zone, (weakestZoneMap.get(zone) || 0) + 1);
  });
  
  const weakestZones = Array.from(weakestZoneMap.entries())
    .map(([zone, count]) => ({ zone, count }))
    .sort((a, b) => b.count - a.count);

  // Recent submissions (last 10)
  const recentSubmissions = completeRecords
    .slice(0, 10)
    .map(r => ({
      name: r.name || 'Anonymous',
      company: r.company_name || 'Unknown',
      score: r.normalised_score || 0,
      timestamp: r.created_at || '',
    }));

  // Submissions over time (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const submissionsByDate = new Map<string, number>();
  completeRecords
    .filter(r => new Date(r.created_at || '') >= thirtyDaysAgo)
    .forEach(r => {
      const date = new Date(r.created_at || '').toISOString().split('T')[0];
      submissionsByDate.set(date, (submissionsByDate.get(date) || 0) + 1);
    });
  
  const submissionsOverTime = Array.from(submissionsByDate.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Scores by industry (for radar/comparison charts)
  const scoresByIndustry = Array.from(industryMap.entries())
    .slice(0, 5) // Top 5 industries
    .map(([industry]) => {
      const industryRecords = completeRecords.filter(r => r.industry === industry);
      const count = industryRecords.length;
      
      return {
        industry,
        zone1: count > 0
          ? Math.round(
              industryRecords.reduce((sum, r) => sum + (r.zone_1_percentage || 0), 0) / count
            )
          : 0,
        zone2: count > 0
          ? Math.round(
              industryRecords.reduce((sum, r) => sum + (r.zone_2_percentage || 0), 0) / count
            )
          : 0,
        zone3: count > 0
          ? Math.round(
              industryRecords.reduce((sum, r) => sum + (r.zone_3_percentage || 0), 0) / count
            )
          : 0,
        zone4: count > 0
          ? Math.round(
              industryRecords.reduce((sum, r) => sum + (r.zone_4_percentage || 0), 0) / count
            )
          : 0,
      };
    });

  return {
    totalSubmissions,
    completionRate,
    averageScore,
    scoreDistribution,
    zoneAverages,
    industryBreakdown,
    teamSizeBreakdown,
    weakestZones,
    recentSubmissions,
    submissionsOverTime,
    scoresByIndustry,
  };
}