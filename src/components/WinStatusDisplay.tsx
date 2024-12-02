import React from 'react';
import { Trophy } from 'lucide-react';

interface WinStatusDisplayProps {
  items: Array<{ rarity: string }>;
  show: boolean;
}

export const WinStatusDisplay: React.FC<WinStatusDisplayProps> = ({ items, show }) => {
  if (!show) return null;

  const hasLegendary = items.some(item => item.rarity === 'Legendary');
  const hasEpic = items.some(item => item.rarity === 'Epic');

  const getStatusText = () => {
    if (hasLegendary) return 'LEGENDARY WIN';
    if (hasEpic) return 'EPIC WIN';
    return 'WIN';
  };

  const getStatusClass = () => {
    if (hasLegendary) return 'from-amber-400 to-orange-500 neon-legendary';
    if (hasEpic) return 'from-fuchsia-400 to-purple-600 neon-epic';
    return 'from-cyan-400 to-blue-500 neon-rare';
  };

  return (
    <div className="absolute bottom-24 right-12 transform">
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        bg-gradient-to-r ${getStatusClass()}
        shadow-lg backdrop-blur-sm
        animate-bounce
      `}>
        <Trophy className="w-6 h-6 text-white" />
        <span className="font-bold text-white text-lg">
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};