import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AudioManager } from '../utils/audio';

export const SoundToggle: React.FC = () => {
  const [isMuted, setIsMuted] = React.useState(false);
  const audioManager = AudioManager.getInstance();

  const toggleSound = () => {
    audioManager.toggleMute();
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleSound}
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 
                 transition-colors duration-200 text-white"
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
    </button>
  );
};