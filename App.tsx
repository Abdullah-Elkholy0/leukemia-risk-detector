import React, { useState } from 'react';
import { ScreenName, ScanResult, RiskLevel, ScanMetric } from './types';
import WelcomeScreen from './screens/WelcomeScreen';
import LiveScanScreen from './screens/LiveScanScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import HistoryScreen from './screens/HistoryScreen';
import TrendsScreen from './screens/TrendsScreen';
import GuidanceScreen from './screens/GuidanceScreen';
import BottomNav from './components/BottomNav';
import { LayoutGrid, Smartphone } from 'lucide-react';

const MOCK_HISTORY: ScanResult[] = [
  { id: 'SCAN-001', date: 'Jan 10, 2025', oxygen: 98, wbc: 5500, rbc: 4.8, riskLevel: RiskLevel.LOW, summary: 'Normal parameters observed.' },
  { id: 'SCAN-002', date: 'Jan 15, 2025', oxygen: 97, wbc: 5800, rbc: 4.9, riskLevel: RiskLevel.LOW, summary: 'Stable blood count.' },
  { id: 'SCAN-003', date: 'Jan 22, 2025', oxygen: 99, wbc: 6100, rbc: 5.0, riskLevel: RiskLevel.LOW, summary: 'Optimal oxygen levels.' },
  { id: 'SCAN-004', date: 'Jan 30, 2025', oxygen: 96, wbc: 11500, rbc: 3.9, riskLevel: RiskLevel.HIGH, summary: 'Elevated WBC detected.' },
];

export default function App() {
  const [mode, setMode] = useState<'app' | 'grid'>('app');
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [history, setHistory] = useState<ScanResult[]>(MOCK_HISTORY);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);

  const handleStartScan = () => {
    setCurrentScreen('liveScan');
  };

  const handleStopScan = (metrics: ScanMetric) => {
    // Create a temporary scan result
    const newScan: ScanResult = {
      id: `SCAN-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...metrics,
      riskLevel: RiskLevel.LOW, // Placeholder until analysis
      summary: ''
    };
    setCurrentScan(newScan);
    setCurrentScreen('analysis');
  };

  const handleAnalysisComplete = (completedScan: ScanResult) => {
    setHistory(prev => [...prev, completedScan]);
    setCurrentScan(completedScan);
  };

  const handleSelectHistory = (scan: ScanResult) => {
      setCurrentScan(scan);
      setCurrentScreen('analysis');
  }

  const renderScreen = (screen: ScreenName) => {
    switch (screen) {
      case 'welcome': return <WelcomeScreen onStart={handleStartScan} />;
      case 'liveScan': return <LiveScanScreen onStop={handleStopScan} />;
      case 'analysis': return <AnalysisScreen currentScan={currentScan} onAnalysisComplete={handleAnalysisComplete} />;
      case 'history': return <HistoryScreen history={history} onSelectScan={handleSelectHistory} />;
      case 'trends': return <TrendsScreen history={history} />;
      case 'guidance': return <GuidanceScreen />;
      default: return <WelcomeScreen onStart={handleStartScan} />;
    }
  };

  // --- Grid Mode Renderer ---
  const GridView = () => (
    <div className="w-full max-w-6xl mx-auto p-8">
       <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-800">Leukemia Risk Detector</h1>
           <p className="text-slate-500">High-Fidelity Wireframe UI Set</p>
        </div>
         <button
            onClick={() => setMode('app')}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
            <Smartphone className="w-5 h-5" />
            <span>Switch to Interactive App</span>
        </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['welcome', 'liveScan', 'analysis', 'history', 'trends', 'guidance'].map((screen) => (
              <div key={screen} className="flex flex-col items-center">
                  <div className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wide">{screen} Screen</div>
                  <div className="w-[320px] h-[640px] bg-white rounded-[3rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden relative transform transition-transform hover:scale-[1.02]">
                    {/* Status Bar */}
                    <div className="absolute top-0 w-full h-8 bg-white z-50 flex justify-between px-6 items-center text-[10px] font-bold text-slate-800">
                        <span>9:41</span>
                        <div className="flex space-x-1">
                            <div className="w-3 h-3 bg-slate-800 rounded-full opacity-20"></div>
                            <div className="w-3 h-3 bg-slate-800 rounded-full opacity-20"></div>
                            <div className="w-4 h-2.5 bg-slate-800 rounded-[2px]"></div>
                        </div>
                    </div>
                     <div className="h-full flex flex-col pt-8 pb-0">
                         <div className="flex-1 overflow-hidden relative">
                             {/* Mock state for grid view */}
                             {screen === 'welcome' && <WelcomeScreen onStart={() => {}} />}
                             {screen === 'liveScan' && <LiveScanScreen onStop={() => {}} />}
                             {screen === 'analysis' && <AnalysisScreen currentScan={MOCK_HISTORY[3]} onAnalysisComplete={() => {}} />}
                             {screen === 'history' && <HistoryScreen history={MOCK_HISTORY} onSelectScan={() => {}} />}
                             {screen === 'trends' && <TrendsScreen history={MOCK_HISTORY} />}
                             {screen === 'guidance' && <GuidanceScreen />}
                         </div>
                         <BottomNav currentScreen={screen as ScreenName} onNavigate={() => {}} />
                     </div>
                  </div>
              </div>
          ))}
       </div>
    </div>
  );

  // --- App Mode Renderer ---
  const AppView = () => (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-[390px] h-[800px] bg-white rounded-[3rem] border-[12px] border-slate-900 shadow-2xl overflow-hidden flex flex-col">
          {/* Dynamic Notch/Status Bar */}
          <div className="absolute top-0 w-full h-8 bg-white z-50 flex justify-between px-8 items-center text-xs font-bold text-slate-900 select-none">
                <span>9:41</span>
                 {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl"></div>
                <div className="flex space-x-1">
                     <svg className="w-4 h-3 text-slate-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" /></svg>
                     <div className="w-5 h-3 border border-slate-900 rounded-[2px] relative"><div className="absolute inset-0.5 bg-slate-900"></div></div>
                </div>
          </div>

          <div className="flex-1 overflow-hidden pt-8 relative bg-slate-50">
             {renderScreen(currentScreen)}
          </div>
          <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      </div>

       <button
        onClick={() => setMode('grid')}
        className="fixed bottom-8 right-8 bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700 transition-colors z-50 group"
        title="View All Screens"
      >
        <LayoutGrid className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      {mode === 'app' ? <AppView /> : <GridView />}
    </div>
  );
}