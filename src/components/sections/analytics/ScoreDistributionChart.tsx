'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface ScoreDistributionChartProps {
  data: {
    aiReady: number;
    relevanceZone: number;
    atRisk: number;
    urgent: number;
  };
}

export default function ScoreDistributionChart({ data }: ScoreDistributionChartProps) {
  const chartData = [
    { name: 'AI-Ready (80-100)', value: data.aiReady, color: '#16A34A' },
    { name: 'Relevance Zone (60-79)', value: data.relevanceZone, color: '#3B82F6' },
    { name: 'At Risk (40-59)', value: data.atRisk, color: '#D97706' },
    { name: 'Urgent (0-39)', value: data.urgent, color: '#DC2626' },
  ];

  const total = data.aiReady + data.relevanceZone + data.atRisk + data.urgent;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 font-clash">
        Score Distribution
      </h3>

      {total === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No data available yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              animationDuration={800}
              label={(entry) => entry.value > 0 ? `${entry.value}` : ''}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value: string) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}