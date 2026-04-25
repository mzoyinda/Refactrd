'use client';

import ScoreDistributionChart from '@/components/sections/analytics/ScoreDistributionChart';
import StatCard from '@/components/sections/analytics/StatCard';
import SubmissionsTimelineChart from '@/components/sections/analytics/SubmissionsTimelineChart';
import ZonePerformanceChart from '@/components/sections/analytics/ZonePerformanceChart';
import { useRealtimeAnalytics } from '@/hooks/useRealtimeAnalytics';

import {
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { data, loading, error, lastUpdate, refetch } = useRealtimeAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#a2d2ff] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-jakarta">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-bold mb-2">Failed to load analytics</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-6 py-2 bg-[#1F2A44] text-white rounded-lg hover:bg-[#2D3A5C] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-clash">
                AI Diagnostic Analytics
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-jakarta">
                Real-time insights from Startups Blueprint '26
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Live indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-700">LIVE</span>
              </div>

              {/* Last update */}
              <div className="text-xs text-gray-500 font-jakarta">
                Last update: {lastUpdate.toLocaleTimeString()}
              </div>

              {/* Manual refresh */}
              <button
                onClick={refetch}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Submissions"
            value={data.totalSubmissions}
            icon={<Users className="w-5 h-5" />}
            delay={0}
          />
          <StatCard
            title="Completion Rate"
            value={data.completionRate}
            suffix="%"
            icon={<CheckCircle className="w-5 h-5" />}
            delay={100}
          />
          <StatCard
            title="Average Score"
            value={data.averageScore}
            suffix="/100"
            icon={<Target className="w-5 h-5" />}
            delay={200}
          />
          <StatCard
            title="AI-Ready Companies"
            value={data.scoreDistribution.aiReady}
            icon={<TrendingUp className="w-5 h-5" />}
            delay={300}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ZonePerformanceChart data={data.zoneAverages} />
          <ScoreDistributionChart data={data.scoreDistribution} />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 mb-8">
          <SubmissionsTimelineChart data={data.submissionsOverTime} />
        </div>

        {/* Data Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Industry Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-clash">
              Top Industries
            </h3>
            <div className="space-y-3">
              {data.industryBreakdown.slice(0, 5).map((item, index) => (
                <div
                  key={item.industry}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#a2d2ff] text-[#1F2A44] flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900 font-jakarta">
                      {item.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{item.count} submissions</span>
                    <span className="text-sm font-semibold text-[#1F2A44]">
                      {item.avgScore}/100
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Size Breakdown */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 font-clash">
              Team Size Distribution
            </h3>
            <div className="space-y-3">
              {data.teamSizeBreakdown.map((item, index) => (
                <div
                  key={item.size}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900 font-jakarta">
                    {item.size}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#a2d2ff] h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            data.totalSubmissions > 0
                              ? (item.count / data.totalSubmissions) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {item.count}
                    </span>
                    <span className="text-sm font-semibold text-[#1F2A44] w-12 text-right">
                      {item.avgScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weakest Zones */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-clash">
            Most Common Weak Zones
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.weakestZones.map((item, index) => (
              <div
                key={item.zone}
                className="p-4 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-semibold text-amber-700 uppercase">
                    Rank #{index + 1}
                  </span>
                </div>
                <p className="font-semibold text-gray-900 text-sm mb-1">{item.zone}</p>
                <p className="text-xs text-gray-600">
                  {item.count} {item.count === 1 ? 'company' : 'companies'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-clash">
            Recent Submissions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Company
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Score
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.recentSubmissions.map((submission, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                      {submission.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {submission.company}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          submission.score >= 80
                            ? 'bg-green-100 text-green-700'
                            : submission.score >= 60
                            ? 'bg-blue-100 text-blue-700'
                            : submission.score >= 40
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {submission.score}/100
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(submission.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}