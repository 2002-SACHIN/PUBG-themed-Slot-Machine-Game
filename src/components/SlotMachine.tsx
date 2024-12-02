import React, { useState, useCallback } from 'react';
import { ITEMS } from '../data/items';
import { SlotReel } from './SlotReel';
import { SpinButton } from './SpinButton';
import { RewardItem } from '../types/game.types';
import { ParticleEffect } from './ParticleEffect';
import { WinStatusDisplay } from './WinStatusDisplay';
import { CountdownTimer } from './CountdownTimer';

export const SlotMachine: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [reels, setReels] = useState<RewardItem[]>([
    { ...ITEMS[0], isSpinning: false },
    { ...ITEMS[1], isSpinning: false },
    { ...ITEMS[2], isSpinning: false },
  ]);

  const spinDuration = 2500; // Updated to 2.5 seconds

  const spin = useCallback(() => {
    if (spinning) return;
    
    setSpinning(true);
    setShowWin(false);

    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
    
    setReels(current =>
      current.map(reel => ({ ...reel, isSpinning: true }))
    );

    reels.forEach((_, index) => {
      setTimeout(() => {
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }

        setReels(current => {
          const newReels = [...current];
          newReels[index] = {
            ...ITEMS[Math.floor(Math.random() * ITEMS.length)],
            isSpinning: false,
          };
          return newReels;
        });

        if (index === reels.length - 1) {
          setSpinning(false);
          setShowWin(true);
          if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100, 50, 200]);
          }
        }
      }, spinDuration + (index * 500));
    });
  }, [spinning]);

  return (
    <div className="flex flex-col items-center gap-8">
      <ParticleEffect isActive={showWin} />
      <div className="bg-gradient-to-b from-indigo-900 via-violet-900 to-indigo-900 p-12 rounded-3xl 
                    shadow-[0_0_50px_rgba(79,70,229,0.3)] machine-glow
                    border-4 border-indigo-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-75"></div>
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 opacity-75"></div>
        
        {/* Side decorations */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-32 
                      bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-500 opacity-75"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-32 
                      bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-500 opacity-75"></div>
        
        {/* Win status display */}
        <WinStatusDisplay items={reels} show={showWin} />
        
        {/* Slot window */}
        <div className="bg-gradient-to-br from-gray-900 to-indigo-900 p-8 rounded-2xl mb-8 
                      shadow-inner border border-indigo-500/30 relative overflow-hidden">
          <div className="flex gap-6 justify-center">
            {reels.map((reel, index) => (
              <SlotReel key={index} item={reel} isSpinning={spinning} />
            ))}
          </div>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer isSpinning={spinning} duration={spinDuration} />

        {/* Control panel */}
        <div className="text-center mt-6">
          <SpinButton onSpin={spin} disabled={spinning} />
        </div>
      </div>
    </div>
  );
};