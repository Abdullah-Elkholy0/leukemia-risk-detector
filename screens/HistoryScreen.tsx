import React from 'react';
import { ScanResult, RiskLevel } from '../types';
import { ChevronRight, Calendar } from 'lucide-react';

interface HistoryScreenProps {
  history: ScanResult[];
  onSelectScan: (scan: ScanResult) => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onSelectScan }) => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-6 bg-white shadow-sm z-10">
        <h2 className="text-2xl font-bold text-slate-800">Scan History</h2>
        <p className="text-slate-500 text-sm mt-1">Previous sessions and reports</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <Calendar className="w-12 h-12 mb-2 opacity-20" />
            <p>No scan history available</p>
          </div>
        ) : (
          history.slice().reverse().map((scan) => (
            <div
              key={scan.id}
              onClick={() => onSelectScan(scan)}
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer active:bg-slate-50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-700">{scan.date}</span>
                <span className="text-xs text-slate-400 mt-0.5">ID: {scan.id.slice(0, 8)}</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  scan.riskLevel === RiskLevel.HIGH ? 'bg-red-50 text-red-600 border-red-100' :
                  scan.riskLevel === RiskLevel.MODERATE ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-emerald-50 text-emerald-600 border-emerald-100'
                }`}>
                  {scan.riskLevel}
                </span>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;