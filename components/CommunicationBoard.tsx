import React from 'react';
import { Hand, HelpCircle, MapPin, ThumbsUp, ThumbsDown, Accessibility } from 'lucide-react';
import { COMMUNICATION_CARDS } from '../constants';
import { speak } from '../services/ttsService';

interface CommunicationBoardProps {
  highContrast: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Hand: <Hand size={32} />,
  HelpCircle: <HelpCircle size={32} />,
  MapPin: <MapPin size={32} />,
  Accessibility: <Accessibility size={32} />,
  ThumbsUp: <ThumbsUp size={32} />,
  ThumbsDown: <ThumbsDown size={32} />,
};

const CommunicationBoard: React.FC<CommunicationBoardProps> = ({ highContrast }) => {
  const handleSpeak = (text: string) => {
    speak(text);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 pb-24">
      {COMMUNICATION_CARDS.map((card) => (
        <button
          key={card.id}
          onClick={() => handleSpeak(card.textToSpeak)}
          className={`
            aspect-square flex flex-col items-center justify-center p-4 rounded-3xl shadow-md transition-transform active:scale-90
            ${highContrast 
              ? 'bg-black text-yellow-400 border-4 border-yellow-400' 
              : `${card.color} text-white`}
          `}
          aria-label={card.label}
        >
          <div className="mb-2">
            {iconMap[card.iconName]}
          </div>
          <span className="text-xl font-bold text-center">{card.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CommunicationBoard;