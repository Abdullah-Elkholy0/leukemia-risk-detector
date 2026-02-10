import React from 'react';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  label: string;
  unit: string;
  color: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, min, max, label, unit, color }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = (normalizedValue - min) / (max - min);
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-200"
          />
          {/* Progress Circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-slate-800">{value.toFixed(1)}</span>
          <span className="text-xs text-slate-500">{unit}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-slate-600">{label}</span>
    </div>
  );
};

export default Gauge;