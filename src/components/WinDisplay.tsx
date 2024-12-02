import React from 'react';
import { RewardItem } from '../types/game.types';

interface WinDisplayProps {
  items: RewardItem[];
}

export const WinDisplay: React.FC<WinDisplayProps> = ({ items }) => {
  return null; // Removed the duplicate win message
};