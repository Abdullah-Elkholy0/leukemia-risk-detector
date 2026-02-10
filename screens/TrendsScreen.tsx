import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScanResult } from '../types';

interface TrendsScreenProps {
  history: ScanResult[];
}

const TrendsScreen: React.FC<TrendsScreenProps> = ({ history }) => {
  // Prepare data for chart - simplify date for axis
  const data = history.map(item => ({
    name: item.date.split(',')[0], // Just the date part
    WBC: item.wbc,
    RBC: item.rbc * 1000, // Scale for visibility
    Oxygen: item.oxygen * 100 // Scale for visibility
  })).slice(-10); // Last 10 records for clarity

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Health Trends</h2>
      <p className="text-slate-500 text-sm mb-6">30-day metrics visualization</p>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
                dataKey="name"
                tick={{fontSize: 10, fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
                dy={10}
            />
            <YAxis
                tick={{fontSize: 10, fill: '#94a3b8'}}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
                type="monotone"
                dataKey="WBC"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{r: 4, fill: '#3b82f6', strokeWidth: 0}}
                activeDot={{ r: 6 }}
            />
             <Line
                type="monotone"
                dataKey="RBC"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{r: 4, fill: '#f59e0b', strokeWidth: 0}}
            />
             <Line
                type="monotone"
                dataKey="Oxygen"
                stroke="#10b981"
                strokeWidth={3}
                dot={{r: 4, fill: '#10b981', strokeWidth: 0}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <h4 className="text-sm font-semibold text-slate-700 mb-2">Insights</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
            WBC levels have remained within the normal range for the past 4 sessions.
            RBC count shows a slight upward trend, indicating improved oxygen transport capacity.
        </p>
      </div>
    </div>
  );
};

export default TrendsScreen;