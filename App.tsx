import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { Eye, EyeOff, MapPin, Navigation } from 'lucide-react';
import Navbar from './components/Navbar';
import BusCard from './components/BusCard';
import CommunicationBoard from './components/CommunicationBoard';
import Assistant from './components/Assistant';
import { MOCK_BUSES, MOCK_STOPS } from './constants';
import { BusLine } from './types';
import { speak } from './services/ttsService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buses');
  const [highContrast, setHighContrast] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusLine | null>(null);
  
  // Simulated location state
  const [currentLocation, setCurrentLocation] = useState('Localizando...');

  useEffect(() => {
    // Simulate getting location
    setTimeout(() => {
        setCurrentLocation("Prox. à Praça Central");
        if (!('speechSynthesis' in window)) return;
    }, 1500);
  }, []);

  const toggleContrast = () => {
    const newVal = !highContrast;
    setHighContrast(newVal);
    speak(newVal ? 'Alto contraste ativado' : 'Alto contraste desativado');
  };

  const handleBusSelect = (bus: BusLine) => {
    setSelectedBus(bus);
    setActiveTab('route');
    speak(`Selecionado ônibus ${bus.number} para ${bus.destination}`);
  };

  // Dynamic Styles
  const mainBg = highContrast ? 'bg-black text-yellow-400' : 'bg-gray-50 text-gray-900';
  const headerBg = highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-700 text-white shadow-lg';
  const subHeader = highContrast ? 'text-yellow-400' : 'text-gray-600';

  const renderContent = () => {
    switch (activeTab) {
      case 'buses':
        return (
          <div className="p-4 pb-24">
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${highContrast ? 'bg-gray-900 border-2 border-yellow-400' : 'bg-blue-50 border border-blue-100'}`}>
              <MapPin className={highContrast ? 'text-yellow-400' : 'text-blue-600'} size={28} />
              <div>
                <p className="text-sm opacity-80">Sua localização</p>
                <p className="text-xl font-bold">{currentLocation}</p>
              </div>
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${highContrast ? 'text-white' : 'text-gray-800'}`}>
              Ônibus Próximos
            </h2>
            
            {MOCK_BUSES.map(bus => (
              <BusCard 
                key={bus.id} 
                bus={bus} 
                onClick={handleBusSelect} 
                highContrast={highContrast} 
              />
            ))}
          </div>
        );

      case 'route':
        if (!selectedBus) {
          return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-60">
              <Navigation size={64} className="mb-4" />
              <p className="text-xl">Selecione um ônibus na aba "Ônibus" para ver a rota.</p>
              <button 
                onClick={() => setActiveTab('buses')}
                className={`mt-6 px-6 py-3 rounded-full font-bold ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-600 text-white'}`}
              >
                Ver Ônibus
              </button>
            </div>
          );
        }
        return (
          <div className="p-4 pb-24">
             <div className={`p-4 rounded-xl mb-6 sticky top-0 z-10 shadow-md ${highContrast ? 'bg-gray-800 border-b-4 border-yellow-400' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold">{selectedBus.number}</h2>
                <p className="text-lg opacity-90">Indo para {selectedBus.destination}</p>
             </div>

             <div className="relative pl-4 border-l-4 border-dashed border-gray-300 ml-4 space-y-8">
                {selectedBus.route.map((stop, index) => {
                    const isNext = index === 0;
                    return (
                        <div key={stop.id} className="relative">
                            <div className={`absolute -left-[26px] w-6 h-6 rounded-full border-4 ${
                                isNext 
                                    ? (highContrast ? 'bg-yellow-400 border-white' : 'bg-blue-600 border-white shadow-lg scale-125') 
                                    : (highContrast ? 'bg-gray-700 border-gray-900' : 'bg-gray-300 border-white')
                            }`}></div>
                            
                            <div className={`p-4 rounded-lg ${isNext ? (highContrast ? 'bg-yellow-900' : 'bg-white shadow-md') : ''}`}>
                                <h3 className={`font-bold ${isNext ? 'text-xl' : 'text-lg opacity-70'}`}>{stop.name}</h3>
                                {isNext && <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${highContrast ? 'bg-yellow-400 text-black' : 'bg-blue-100 text-blue-800'}`}>Próxima Parada</span>}
                            </div>
                        </div>
                    )
                })}
             </div>
          </div>
        );

      case 'talk':
        return <CommunicationBoard highContrast={highContrast} />;

      case 'assistant':
        return <Assistant highContrast={highContrast} />;

      default:
        return null;
    }
  };

  return (
    <HashRouter>
      <div className={`min-h-screen flex flex-col ${mainBg}`}>
        {/* Header */}
        <header className={`px-4 py-4 flex justify-between items-center sticky top-0 z-40 ${headerBg}`}>
          <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
            SeguiBus
          </h1>
          <button 
            onClick={toggleContrast}
            className={`p-2 rounded-full ${highContrast ? 'bg-black text-yellow-400 border border-yellow-400' : 'bg-white/20 text-white hover:bg-white/30'}`}
            aria-label="Alternar Alto Contraste"
          >
            {highContrast ? <EyeOff size={24} /> : <Eye size={24} />}
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden">
            {renderContent()}
        </main>

        {/* Navigation */}
        <Navbar currentTab={activeTab} setTab={setActiveTab} highContrast={highContrast} />
      </div>
    </HashRouter>
  );
};

export default App;