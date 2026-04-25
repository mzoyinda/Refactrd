'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ZonePerformanceChartProps {
  data: {
    zone1: number;
    zone2: number;
    zone3: number;
    zone4: number;
  };
}

export default function ZonePerformanceChart({ data }: ZonePerformanceChartProps) {
  const chartData = [
    { name: 'Tool Stack', value: data.zone1, fullName: 'Tool Stack and Integration' },
    { name: 'Operations', value: data.zone2, fullName: 'Internal Operations' },
    { name: 'Delivery', value: data.zone3, fullName: 'Delivery and Project Execution' },
    { name: 'People', value: data.zone4, fullName: 'People and Talent' },
  ];

  const getColor = (value: number) => {
    if (value >= 75) return '#16A34A'; // Green
    if (value >= 60) return '#D97706'; // Amber
    return '#DC2626'; // Red
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6 font-clash">
        Average Zone Performance
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2A44',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
            }}
            formatter={(value, name, props) => [
              `${value}%`,
              props.payload.fullName,
            ]}
          />
          <Bar 
            dataKey="value" 
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}