import React from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { BusLine, BusStatus } from '../types';
import { speak } from '../services/ttsService';

interface BusCardProps {
  bus: BusLine;
  onClick: (bus: BusLine) => void;
  highContrast: boolean;
}

const BusCard: React.FC<BusCardProps> = ({ bus, onClick, highContrast }) => {
  const handleFocus = () => {
    speak(`Ônibus linha ${bus.number}, destino ${bus.destination}, chega em ${bus.nextArrival} minutos. Status: ${bus.status}. Lotação: ${bus.crowdLevel}`);
  };

  const statusColor = 
    bus.status === BusStatus.ARRIVING ? (highContrast ? 'text-black font-bold' : 'text-green-600') :
    bus.status === BusStatus.DELAYED ? (highContrast ? 'text-black font-bold' : 'text-red-500') :
    (highContrast ? 'text-black' : 'text-blue-600');

  const cardBg = highContrast ? 'bg-yellow-400 border-4 border-black' : 'bg-white border border-gray-200';
  const textColor = highContrast ? 'text-black' : 'text-gray-800';

  return (
    <button
      onClick={() => onClick(bus)}
      onFocus={handleFocus}
      className={`w-full text-left mb-4 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 ${cardBg}`}
      aria-label={`Linha ${bus.number} para ${bus.destination}, chega em ${bus.nextArrival} minutos`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className={`text-2xl font-bold ${textColor}`}>{bus.number}</h3>
          <p className={`text-lg font-medium leading-tight ${textColor}`}>{bus.destination}</p>
        </div>
        <div className={`flex flex-col items-end ${statusColor}`}>
          <span className="text-xl font-bold">{bus.nextArrival} min</span>
          <span className="text-sm font-semibold uppercase">{bus.status}</span>
        </div>
      </div>

      <div className={`flex items-center justify-between mt-3 ${highContrast ? 'text-black font-semibold' : 'text-gray-500'}`}>
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span className="text-sm">{bus.crowdLevel}</span>
        </div>
        <ArrowRight size={24} />
      </div>
    </button>
  );
};

export default BusCard;