import React, { useEffect, useState, useRef } from 'react';
import Gauge from '../components/Gauge';
import { ScanMetric } from '../types';

interface LiveScanScreenProps {
  onStop: (finalMetrics: ScanMetric) => void;
}

const LiveScanScreen: React.FC<LiveScanScreenProps> = ({ onStop }) => {
  const [metrics, setMetrics] = useState<ScanMetric>({
    oxygen: 98,
    wbc: 6000,
    rbc: 5.0
  });

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setMetrics(prev => {
        // Simulate fluctuations that might dip into warning zones
        const newOxygen = Math.min(100, Math.max(92, prev.oxygen + (Math.random() - 0.5) * 3));
        const newWbc = Math.max(3000, prev.wbc + (Math.random() - 0.4) * 800); // Slight upward drift possibility
        const newRbc = Math.max(3.0, Math.min(6.5, prev.rbc + (Math.random() - 0.5) * 0.3));

        return {
          oxygen: newOxygen,
          wbc: newWbc,
          rbc: newRbc
        };
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Determine colors based on thresholds (Risk Logic)
  // Oxygen < 95 is warning
  // WBC > 11000 is warning
  // RBC < 4.0 is warning
  const getMetricColor = (val: number, type: 'oxygen' | 'wbc' | 'rbc') => {
    const isWarning = 
      (type === 'oxygen' && val < 95) || 
      (type === 'wbc' && val > 10000) || 
      (type === 'rbc' && val < 4.2);
    
    if (isWarning) return "#ef4444"; // red-500
    
    // Default colors
    if (type === 'oxygen') return "#10b981"; // emerald
    if (type === 'wbc') return "#3b82f6"; // blue
    return "#f59e0b"; // amber
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white relative overflow-hidden">
        {/* Scanning Effect Overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite] opacity-50 z-0 pointer-events-none"></div>

      <div className="flex justify-between items-center mb-8 z-10">
        <h2 className="text-xl font-bold text-slate-800">Live Scanning</h2>
        <div className="flex items-center space-x-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Recording</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 z-10">
        <Gauge
          value={metrics.oxygen}
          min={80}
          max={100}
          label="Oxygen Saturation"
          unit="%"
          color={getMetricColor(metrics.oxygen, 'oxygen')}
        />
        <div className="flex w-full justify-between px-4">
             <Gauge
                value={metrics.wbc}
                min={3000}
                max={15000}
                label="WBC Count"
                unit="/mcL"
                color={getMetricColor(metrics.wbc, 'wbc')}
            />
             <Gauge
                value={metrics.rbc}
                min={3}
                max={7}
                label="RBC Count"
                unit="M/mcL"
                color={getMetricColor(metrics.rbc, 'rbc')}
            />
        </div>
      </div>

      <div className="mt-8 z-10">
        <button
          onClick={() => onStop(metrics)}
          className="w-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold py-4 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
        >
          <span className="w-3 h-3 bg-red-600 rounded-sm"></span>
          <span>Stop Scan</span>
        </button>
      </div>

       <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
};

export default LiveScanScreen;