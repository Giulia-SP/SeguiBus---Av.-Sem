export enum BusStatus {
  ON_TIME = 'No Horário',
  DELAYED = 'Atrasado',
  ARRIVING = 'Chegando',
}

export interface Stop {
  id: string;
  name: string;
  distance: string; // e.g., "50m"
  lat: number;
  lng: number;
}

export interface BusLine {
  id: string;
  number: string;
  destination: string;
  nextArrival: number; // minutes
  status: BusStatus;
  crowdLevel: 'Vazio' | 'Moderado' | 'Cheio';
  currentStopId?: string;
  route: Stop[];
}

export interface MessageCard {
  id: string;
  label: string;
  textToSpeak: string;
  iconName: string; // Name for Lucide icon mapping
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}
