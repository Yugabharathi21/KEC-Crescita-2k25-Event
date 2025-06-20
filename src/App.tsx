import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import GlitchPrank from './components/GlitchPrank';
import HomePage from './components/HomePage';

type AppPhase = 'boot' | 'glitch' | 'home';

function App() {
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContext) {
        try {
          const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
          setAudioContext(ctx);
        } catch (err) {
          console.error('Failed to initialize audio:', err);
          // Continue without audio rather than breaking the experience
        }
      }
    };

    const cleanup = () => {
      if (audioContext?.state === 'running') {
        audioContext.close().catch(console.error);
      }
    };

    document.addEventListener('click', initAudio);
    document.addEventListener('keydown', initAudio);

    return () => {
      cleanup();
      document.removeEventListener('click', initAudio);
      document.removeEventListener('keydown', initAudio);
    };
  }, [audioContext]);

  const handleBootComplete = useCallback(() => {
    console.log('Boot sequence completed, transitioning to glitch phase');
    setPhase('glitch');
  }, []);

  const handleGlitchComplete = useCallback(() => {
    console.log('Glitch sequence completed, transitioning to home phase');
    setPhase('home');
  }, []);

  const playBeep = useCallback((frequency: number = 800, duration: number = 100) => {
    if (!audioContext) return;

    try {
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

      // Clean up
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (err) {
      console.error('Audio playback error:', err);
      // Continue without audio rather than breaking the experience
    }
  }, [audioContext]);

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