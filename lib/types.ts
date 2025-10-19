export interface GreetingData {
  id?: string;
  recipientName: string;
  occasion: string;
  customMessage?: string;
  generatedGreeting: string;
  senderName?: string;
  createdAt: Date;
}

export interface OccasionTheme {
  name: string;
  color: string;
  gradient: string;
  emoji: string;
  animation: string;
}

export const OCCASIONS: OccasionTheme[] = [
  { 
    name: 'Sinh nhật', 
    color: '#FF6B9D', 
    gradient: 'from-pink-400 to-purple-500',
    emoji: '🎂',
    animation: 'birthday'
  },
  { 
    name: 'Ngày 20/10', 
    color: '#FF69B4', 
    gradient: 'from-pink-500 to-rose-500',
    emoji: '🌹',
    animation: 'flowers'
  },
  { 
    name: 'Tốt nghiệp', 
    color: '#4169E1', 
    gradient: 'from-blue-400 to-indigo-600',
    emoji: '🎓',
    animation: 'graduation'
  },
  { 
    name: 'Giáng sinh', 
    color: '#DC143C', 
    gradient: 'from-red-500 to-green-500',
    emoji: '🎄',
    animation: 'christmas'
  },
  { 
    name: 'Năm mới', 
    color: '#FFD700', 
    gradient: 'from-yellow-400 to-orange-500',
    emoji: '🎆',
    animation: 'newyear'
  },
  { 
    name: 'Cảm ơn thầy cô', 
    color: '#90EE90', 
    gradient: 'from-green-400 to-teal-500',
    emoji: '🍎',
    animation: 'teacher'
  },
  { 
    name: 'Valentine', 
    color: '#FF1493', 
    gradient: 'from-pink-600 to-red-600',
    emoji: '💝',
    animation: 'hearts'
  },
  { 
    name: 'Tết Nguyên Đán', 
    color: '#FF0000', 
    gradient: 'from-red-600 to-yellow-500',
    emoji: '🧧',
    animation: 'tet'
  },
];
