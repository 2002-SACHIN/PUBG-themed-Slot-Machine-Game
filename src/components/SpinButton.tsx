import React from 'react';
import { Play } from 'lucide-react';

interface SpinButtonProps {
  onSpin: () => void;
  disabled: boolean;
}

export const SpinButton: React.FC<SpinButtonProps> = ({ onSpin, disabled }) => {
  return (
    <button
      onClick={onSpin}
      disabled={disabled}
      className={`
        relative overflow-hidden
        flex items-center justify-center gap-2
        px-10 py-5 rounded-full
        bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600
        text-white font-bold text-2xl
        transition-all duration-300 transform
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]'}
        border-2 border-indigo-400
        shadow-[0_0_20px_rgba(79,70,229,0.4)]
        flowing-border
      `}
    >
      <Play size={32} className="animate-pulse text-white" />
      <span className="neon-text">SPIN!</span>
    </button>
  );
};