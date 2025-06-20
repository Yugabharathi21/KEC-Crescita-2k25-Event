import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import GlitchPrank from './components/GlitchPrank';
import HomePage from './components/HomePage';

type AppPhase = 'boot' | 'glitch' | 'home';

function App() {
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context on user interaction
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, [audioContext]);

  const handleBootComplete = () => {
    setPhase('glitch');
  };

  const handleGlitchComplete = () => {
    setPhase('home');
  };

  const playBeep = (frequency: number = 800, duration: number = 100) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {phase === 'boot' && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BootSequence onComplete={handleBootComplete} playBeep={playBeep} />
          </motion.div>
        )}

        {phase === 'glitch' && (
          <motion.div
            key="glitch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <GlitchPrank onComplete={handleGlitchComplete} playBeep={playBeep} />
          </motion.div>
        )}

        {phase === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <HomePage playBeep={playBeep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;