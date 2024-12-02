import React from 'react';
import { SlotMachine } from './components/SlotMachine';
import { Gamepad2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900 text-white px-4 py-8">
      <div className="container mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gamepad2 size={48} className="text-indigo-400" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 
                         text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(79,70,229,0.5)]">
              PUBG Slots
            </h1>
          </div>
          <p className="text-xl text-indigo-200 font-medium">
            Test your luck and win epic PUBG rewards!
          </p>
        </header>
        
        <main>
          <SlotMachine />
        </main>

        <footer className="text-center mt-12 text-indigo-300">
          <p className="text-lg">Spin to win weapons, consumables, and materials!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;