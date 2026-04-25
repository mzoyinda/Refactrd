'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  prefix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  suffix = '',
  prefix = '',
  trend,
  trendValue,
  icon,
  delay = 0,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const numericValue = typeof value === 'number' ? value : parseInt(value) || 0;

  useEffect(() => {
    // Trigger animation after delay
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    // Animate number counting
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue, isVisible]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'neutral':
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 
        transition-all duration-500 hover:shadow-md hover:scale-[1.02]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <h3 className="text-3xl font-bold text-gray-900 font-clash">
          {prefix}
          {typeof value === 'number' ? displayValue : value}
          {suffix}
        </h3>
      </div>

      {trend && trendValue && (
        <div className="flex items-center gap-1 text-sm">
          {getTrendIcon()}
          <span
            className={`font-medium ${
              trend === 'up'
                ? 'text-green-600'
                : trend === 'down'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {trendValue}
          </span>
          <span className="text-gray-500">vs last week</span>
        </div>
      )}
    </div>
  );
}