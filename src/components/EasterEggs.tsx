import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EasterEggsProps {
  playBeep: (frequency?: number, duration?: number) => void;
}

const EasterEggs: React.FC<EasterEggsProps> = ({ playBeep }) => {
  const [showSurvivorMode, setShowSurvivorMode] = useState(false);
  const [showHackGame, setShowHackGame] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [morseCode, setMorseCode] = useState(false);

  const survivorSequence = ['u', 'n', 'l', 'o', 'c', 'k', '_', 's', 'u', 'r', 'v', 'i', 'v', 'o', 'r', '_', 'm', 'o', 'd', 'e'];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-survivorSequence.length);
        
        // Check for survivor mode sequence
        if (newSequence.join('').includes(survivorSequence.join(''))) {
          setShowSurvivorMode(true);
          playBeep(1000, 200);
          setTimeout(() => setShowSurvivorMode(false), 3000);
          return [];
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playBeep, survivorSequence]);

  const playMorseCode = () => {
    setMorseCode(true);
    // "SEE YOU IN VAULT KEC" in morse code
    const morse = [
      // S
      100, 50, 100, 50, 100, 200,
      // E
      100, 200,
      // E
      100, 200,
      // (space)
      400,
      // Y
      300, 50, 100, 50, 300, 50, 300, 200,
      // O
      300, 50, 300, 50, 300, 200,
      // U
      100, 50, 300, 50, 100, 200,
      // (space)
      400,
      // I
      100, 50, 100, 200,
      // N
      300, 50, 100, 200,
      // (space)
      400,
      // V
      100, 50, 100, 50, 100, 50, 300, 200,
      // A
      100, 50, 300, 200,
      // U
      100, 50, 300, 50, 100, 200,
      // L
      100, 50, 300, 50, 100, 50, 100, 200,
      // T
      300, 200,
      // (space)
      400,
      // K
      300, 50, 100, 50, 300, 200,
      // E
      100, 200,
      // C
      300, 50, 100, 50, 300, 50, 100, 400
    ];

    let delay = 0;
    morse.forEach((duration, index) => {
      setTimeout(() => {
        if (duration < 400) {
          playBeep(800, duration);
        }
      }, delay);
      delay += duration + 50;
    });

    setTimeout(() => setMorseCode(false), delay + 1000);
  };

  const hackingPhrases = [
    'ACCESS GRANTED',
    'FIREWALL BYPASSED', 
    'DECRYPTING FILES...',
    'VAULT DOOR OPENING',
    'WELCOME TO CRESCITA'
  ];

  const startHackGame = () => {
    setShowHackGame(true);
    playBeep(600, 100);
    
    setTimeout(() => {
      setShowHackGame(false);
      playBeep(1200, 200);
    }, 4000);
  };

  return (
    <>
      {/* Hidden pixel for photo trigger */}
      <div 
        className="fixed top-20 left-20 w-1 h-1 bg-green-500 opacity-50 cursor-pointer z-50"
        onClick={() => {
          playBeep(900, 100);
          alert('🏫 ARCHIVE ACCESS: Past CRESCITA events unlocked in vault database!');
        }}
        title="Hidden Archive Access"
      />

      {/* Try hacking me button */}
      <motion.button
        onClick={startHackGame}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 left-4 vault-border px-4 py-2 terminal-text text-sm hover:amber-text transition-colors z-50"
      >
        TRY HACKING ME
      </motion.button>

      {/* Morse code trigger in header */}
      <div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 cursor-pointer z-50"
        onClick={playMorseCode}
        title="Hidden Message"
      />

      {/* Survivor Mode Modal */}
      <AnimatePresence>
        {showSurvivorMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <div className="vault-border p-8 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4"
              >
                🔥
              </motion.div>
              <div className="terminal-text text-3xl mb-4">SURVIVOR MODE</div>
              <div className="amber-text text-xl mb-4">UNLOCKED!</div>
              <div className="terminal-text">
                Welcome to the wasteland, vault dweller.
                <br />
                CRESCITA'25 awaits your arrival.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hacking Game */}
      <AnimatePresence>
        {showHackGame && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 right-4 vault-border p-4 w-64 z-50"
          >
            <div className="terminal-text text-sm mb-2">HACKING TERMINAL</div>
            <div className="space-y-1">
              {hackingPhrases.map((phrase, index) => (
                <motion.div
                  key={phrase}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.8 }}
                  className="terminal-text text-xs"
                >
                  {'>'} {phrase}
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="amber-text text-xs mt-2"
            >
              HACK COMPLETE_
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Morse Code Indicator */}
      <AnimatePresence>
        {morseCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="vault-border p-4 text-center">
              <div className="terminal-text text-lg mb-2">MORSE CODE TRANSMISSION</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-4xl"
              >
                📡
              </motion.div>
              <div className="amber-text text-sm mt-2">DECODING MESSAGE...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggs;