import React, { useEffect, useState } from 'react';
import { Heart, Info, Apple } from 'lucide-react';
import { getHealthGuidance } from '../services/geminiService';

const GuidanceScreen: React.FC = () => {
    const [tips, setTips] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHealthGuidance().then(text => {
            setTips(text);
            setLoading(false);
        });
    }, []);

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Guidance</h2>

      <div className="space-y-6">
        {/* Featured Tip */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-blue-100" />
            <span className="font-semibold text-blue-50 text-sm uppercase tracking-wide">Daily Tip</span>
          </div>
          <p className="text-lg font-medium leading-snug">
            "Consistent hydration supports optimal blood viscosity and circulation."
          </p>
        </div>

        {/* AI Generated Tips */}
        <div className="bg-white rounded-2xl p-0">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
             <Apple className="w-5 h-5 mr-2 text-emerald-500" />
             Healthy Habits
          </h3>

          {loading ? (
             <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
             </div>
          ) : (
            <div className="space-y-4 text-slate-600 text-sm">
                 {tips.split('\n').map((line, i) => (
                    line.trim() && (
                    <div key={i} className="flex items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="text-blue-500 font-bold mr-3 mt-0.5">•</span>
                        <span className="leading-relaxed">{line.replace(/^[-*]\s*/, '')}</span>
                    </div>
                    )
                ))}
            </div>
          )}
        </div>

        {/* Disclaimer Box */}
        <div className="mt-auto border-l-4 border-amber-400 bg-amber-50 p-4 rounded-r-xl">
          <div className="flex items-start">
             <Info className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
             <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase mb-1">Medical Disclaimer</h4>
                <p className="text-xs text-amber-700 leading-relaxed">
                    This application is for simulation and demonstration purposes only.
                    The "Live Scan" and "Analysis" are generated simulations.
                    Do not use for actual medical diagnosis. Consult a doctor for real health concerns.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidanceScreen;