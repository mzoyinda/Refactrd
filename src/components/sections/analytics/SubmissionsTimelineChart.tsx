'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SubmissionsTimelineChartProps {
  data: Array<{
    date: string;
    count: number;
  }>;
}

export default function SubmissionsTimelineChart({ data }: SubmissionsTimelineChartProps) {
  // Format dates for display
  const formattedData = data.map(item => ({
    ...item,
    displayDate: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 font-clash">
        Submissions Over Time (Last 30 Days)
      </h3>

      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No submission data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="displayDate"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#E5E7EB' }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2A44',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px',
              }}
              formatter={(value) => [value, 'Submissions']}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#a2d2ff"
              strokeWidth={3}
              dot={{ fill: '#a2d2ff', r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}