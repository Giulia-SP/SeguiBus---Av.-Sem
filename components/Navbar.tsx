import React from 'react';
import { Bus, Map, MessageSquare, Mic } from 'lucide-react';
import { speak } from '../services/ttsService';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  highContrast: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentTab, setTab, highContrast }) => {
  
  const navItems = [
    { id: 'buses', label: 'Ônibus', icon: <Bus size={24} />, speak: 'Tela de Ônibus' },
    { id: 'route', label: 'Rota', icon: <Map size={24} />, speak: 'Tela de Rota' },
    { id: 'talk', label: 'Falar', icon: <MessageSquare size={24} />, speak: 'Tela de Comunicação' },
    { id: 'assistant', label: 'Ajuda IA', icon: <Mic size={24} />, speak: 'Assistente Inteligente' },
  ];

  const handleNav = (id: string, speakText: string) => {
    setTab(id);
    speak(speakText);
  }

  return (
    <nav className={`fixed bottom-0 left-0 right-0 border-t z-50 ${highContrast ? 'bg-black border-yellow-400' : 'bg-white border-gray-200'} pb-safe`}>
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
                <button
                    key={item.id}
                    onClick={() => handleNav(item.id, item.speak)}
                    className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200
                        ${isActive 
                            ? (highContrast ? 'text-yellow-400' : 'text-blue-700 font-bold') 
                            : (highContrast ? 'text-gray-500' : 'text-gray-400')}
                    `}
                    aria-label={item.label}
                    aria-pressed={isActive}
                >
                    <div className={`${isActive ? 'scale-110' : ''} transition-transform`}>
                        {item.icon}
                    </div>
                    <span className="text-xs mt-1 font-medium">{item.label}</span>
                </button>
            )
        })}
      </div>
    </nav>
  );
};

export default Navbar;