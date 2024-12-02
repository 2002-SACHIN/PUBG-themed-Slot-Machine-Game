import React from 'react';
import { RewardItem } from '../types/game.types';
import '../styles/animations.css';

interface SlotReelProps {
  item: RewardItem;
  isSpinning: boolean;
}

const rarityGradients = {
  Common: 'from-emerald-300 to-emerald-500',
  Rare: 'from-cyan-300 to-blue-500',
  Epic: 'from-fuchsia-300 to-purple-600',
  Legendary: 'from-amber-300 to-orange-500'
};

const rarityGlow = {
  Common: 'shadow-[0_0_15px_rgba(16,185,129,0.5)]',
  Rare: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
  Epic: 'shadow-[0_0_15px_rgba(147,51,234,0.5)]',
  Legendary: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]'
};

export const SlotReel: React.FC<SlotReelProps> = ({ item, isSpinning }) => {
  return (
    <div className={`relative w-32 h-32 overflow-hidden rounded-xl border-4 border-indigo-500 
                     ${rarityGlow[item.rarity]} transition-all duration-300`}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-900"></div>
      
      <div
        className={`relative h-full w-full transition-transform duration-100 
          ${isSpinning ? 'slot-spin' : 'transform-none'}`}
      >
        <div
          className={`w-full h-full flex items-center justify-center p-4
            bg-gradient-to-br ${rarityGradients[item.rarity]}
            rounded-lg transform transition-all duration-300
            backdrop-blur-lg bg-opacity-90`}
        >
          <div className="text-center">
            <div className="text-2xl font-bold mb-1 text-white drop-shadow-lg">{item.name}</div>
            <div className={`text-sm font-semibold text-white/90`}>
              {item.rarity}
            </div>
            <div className="text-xs text-white/80 mt-1">{item.type}</div>
            <div className="mt-2 font-bold text-white">×{item.count}</div>
          </div>
        </div>
      </div>
    </div>
  );
};