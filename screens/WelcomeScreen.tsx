import React from 'react';
import { Bluetooth, Activity } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-blue-50 to-white">
      <style>{`
        @keyframes pulse-custom {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 1; }
        }
        .sensor-pulse {
          animation: pulse-custom 2s infinite ease-in-out;
        }
      `}</style>

      <div className="w-full flex flex-col items-center pt-10">
        <div className="bg-blue-100 p-6 rounded-full mb-6 sensor-pulse shadow-blue-200 shadow-xl">
          <Activity className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Leukemia Risk Detector</h1>
        <p className="text-slate-500 text-center">Advanced spectral analysis for early detection.</p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 transition-all duration-500">
          <Bluetooth className="w-5 h-5 animate-pulse" />
          <span className="font-medium text-sm">Sensor Connected</span>
        </div>
        <p className="text-xs text-slate-400">Device ID: LRD-2025-X9</p>
      </div>

      <div className="w-full pb-8">
        <button
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center"
        >
          Start Live Scan
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;