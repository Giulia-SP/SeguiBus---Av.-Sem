import { BusLine, BusStatus, MessageCard, Stop } from './types';

// Mock Stops
export const MOCK_STOPS: Stop[] = [
  { id: 'S1', name: 'Praça Central', distance: '30m', lat: -23.5505, lng: -46.6333 },
  { id: 'S2', name: 'Av. Paulista, 1000', distance: '120m', lat: -23.5515, lng: -46.6343 },
  { id: 'S3', name: 'Terminal Oeste', distance: '500m', lat: -23.5525, lng: -46.6353 },
  { id: 'S4', name: 'Hospital das Clínicas', distance: '2.1km', lat: -23.5535, lng: -46.6363 },
];

// Mock Buses
export const MOCK_BUSES: BusLine[] = [
  {
    id: 'B1',
    number: '809V-10',
    destination: 'Vila Madalena',
    nextArrival: 3,
    status: BusStatus.ARRIVING,
    crowdLevel: 'Moderado',
    route: [MOCK_STOPS[0], MOCK_STOPS[1], MOCK_STOPS[3]],
  },
  {
    id: 'B2',
    number: '917H-10',
    destination: 'Term. Pirituba',
    nextArrival: 12,
    status: BusStatus.ON_TIME,
    crowdLevel: 'Vazio',
    route: [MOCK_STOPS[0], MOCK_STOPS[2]],
  },
  {
    id: 'B3',
    number: '702U-10',
    destination: 'Cid. Universitária',
    nextArrival: 25,
    status: BusStatus.DELAYED,
    crowdLevel: 'Cheio',
    route: [MOCK_STOPS[1], MOCK_STOPS[3]],
  },
];

// Communication Cards for Speech Impairment
export const COMMUNICATION_CARDS: MessageCard[] = [
  { id: 'c1', label: 'Parada', textToSpeak: 'Gostaria de descer no próximo ponto, por favor.', iconName: 'Hand', color: 'bg-red-500' },
  { id: 'c2', label: 'Ajuda', textToSpeak: 'Preciso de ajuda para embarcar.', iconName: 'HelpCircle', color: 'bg-yellow-500' },
  { id: 'c3', label: 'Destino', textToSpeak: 'Este ônibus passa na Praça Central?', iconName: 'MapPin', color: 'bg-blue-500' },
  { id: 'c4', label: 'Lugar', textToSpeak: 'Alguém poderia me ceder o lugar, por favor?', iconName: 'Accessibility', color: 'bg-green-500' },
  { id: 'c5', label: 'Obrigado', textToSpeak: 'Muito obrigado!', iconName: 'ThumbsUp', color: 'bg-indigo-500' },
  { id: 'c6', label: 'Não', textToSpeak: 'Não, obrigado.', iconName: 'ThumbsDown', color: 'bg-gray-500' },
];

export const SYSTEM_INSTRUCTION = `
Você é o assistente virtual do SeguiBus.
Seu objetivo é ajudar pessoas com deficiência a navegar no transporte público.
Responda de forma curta, clara e direta.
Você tem acesso aos seguintes dados simulados:
- Paradas próximas: Praça Central, Av. Paulista, Terminal Oeste.
- Ônibus 809V-10 vai para Vila Madalena (chega em 3 min).
- Ônibus 917H-10 vai para Term. Pirituba (chega em 12 min).
- Ônibus 702U-10 vai para Cid. Universitária (atrasado, 25 min).
Use essas informações para responder perguntas sobre trajetos e horários.
`;
