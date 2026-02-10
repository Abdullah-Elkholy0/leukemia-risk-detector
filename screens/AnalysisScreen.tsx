import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Activity, Share2 } from 'lucide-react';
import { ScanResult, RiskLevel } from '../types';
import { analyzeScanResults } from '../services/geminiService';

interface AnalysisScreenProps {
  currentScan: ScanResult | null;
  onAnalysisComplete: (result: ScanResult) => void;
}

const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ currentScan, onAnalysisComplete }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzedResult, setAnalyzedResult] = useState<ScanResult | null>(currentScan);

  useEffect(() => {
    if (currentScan && !currentScan.summary) {
      setAnalyzing(true);
      analyzeScanResults(currentScan).then(({ risk, summary }) => {
        const completedResult = { ...currentScan, riskLevel: risk, summary };
        setAnalyzedResult(completedResult);
        onAnalysisComplete(completedResult);
        setAnalyzing(false);
      });
    }
  }, [currentScan]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!analyzedResult || analyzing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white p-6">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
         <p className="text-slate-500 font-medium">Analyzing parameters...</p>
      </div>
    );
  }

  const isHighRisk = analyzedResult.riskLevel === RiskLevel.HIGH;
  const isModerate = analyzedResult.riskLevel === RiskLevel.MODERATE;

  let riskColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
  let RiskIcon = CheckCircle;

  if (isHighRisk) {
    riskColor = "text-red-600 bg-red-50 border-red-200";
    RiskIcon = AlertTriangle;
  } else if (isModerate) {
    riskColor = "text-amber-600 bg-amber-50 border-amber-200";
    RiskIcon = Activity;
  }

  return (
    <div className="h-full flex flex-col p-6 bg-slate-50 overflow-y-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Analysis Report</h2>

      {/* Risk Indicator Card */}
      <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${riskColor} mb-6 shadow-sm`}>
        <RiskIcon className="w-16 h-16 mb-2 opacity-90" />
        <h3 className="text-lg font-semibold uppercase tracking-wide opacity-80">Risk Level</h3>
        <span className="text-3xl font-extrabold mt-1">{analyzedResult.riskLevel}</span>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-1">Oxygen</span>
          <span className="font-bold text-slate-700">{analyzedResult.oxygen.toFixed(0)}%</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-1">WBC</span>
          <span className="font-bold text-slate-700">{(analyzedResult.wbc / 1000).toFixed(1)}k</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-xs text-slate-400 mb-1">RBC</span>
          <span className="font-bold text-slate-700">{analyzedResult.rbc.toFixed(2)}M</span>
        </div>
      </div>

      {/* AI Findings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
        <h4 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">Clinical Summary</h4>
        <div className="text-slate-600 text-sm leading-relaxed space-y-2">
            {/* Simple Markdown-like parsing for bullet points if Gemini returns them */}
            {analyzedResult.summary.split('\n').map((line, i) => (
                <p key={i} className="flex items-start">
                   {line.trim().startsWith('-') || line.trim().startsWith('*') ? (
                       <>
                        <span className="mr-2 text-blue-500 mt-1.5 h-1.5 w-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span>{line.replace(/^[-*]\s*/, '')}</span>
                       </>
                   ) : line}
                </p>
            ))}
        </div>
      </div>

      <button className="w-full mt-auto mb-4 border border-blue-200 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
        <Share2 className="w-4 h-4" />
        <span>Export Report</span>
      </button>
    </div>
  );
};

export default AnalysisScreen;