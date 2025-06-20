import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GlitchPrankProps {
  onComplete: () => void;
  playBeep: (frequency?: number, duration?: number) => void;
}

const GlitchPrank: React.FC<GlitchPrankProps> = ({ onComplete, playBeep }) => {
  const [phase, setPhase] = useState<'normal' | 'glitch' | 'resolve'>('normal');
  const [error, setError] = useState<boolean>(false);

  const transitionToNextPhase = useCallback((currentPhase: 'normal' | 'glitch' | 'resolve') => {
    try {
      switch (currentPhase) {
        case 'normal':
          setPhase('glitch');
          playBeep(400, 100);
          setTimeout(() => playBeep(300, 100), 150);
          setTimeout(() => playBeep(200, 200), 300);
          break;
        case 'glitch':
          setPhase('resolve');
          break;
        case 'resolve':
          playBeep(1000, 100);
          onComplete();
          break;
      }
    } catch (err) {
      console.error('Error in GlitchPrank transition:', err);
      setError(true);
    }
  }, [playBeep, onComplete]);

  useEffect(() => {
    const timers: number[] = [];
    
    if (!error) {
      switch (phase) {
        case 'normal':
          timers.push(setTimeout(() => transitionToNextPhase('normal'), 1000));
          break;
        case 'glitch':
          timers.push(setTimeout(() => transitionToNextPhase('glitch'), 1500));
          break;
        case 'resolve':
          timers.push(setTimeout(() => transitionToNextPhase('resolve'), 2000));
          break;
      }
    }

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [phase, error, transitionToNextPhase]);

  return (
    <div className="crt-screen w-full h-screen flex items-center justify-center phosphor-glow">
      <div className="terminal-text text-2xl md:text-3xl lg:text-4xl max-w-4xl px-8">
        {phase === 'normal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div>&gt; CRESCITA'25 TERMINAL READY</div>
            <div>&gt; LOADING INTERFACE...</div>
          </motion.div>
        )}

        {phase === 'glitch' && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: [1, 0.3, 1, 0.5, 1],
              x: [-2, 2, -1, 1, 0],
              filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', 'hue-rotate(360deg)']
            }}
            transition={{ duration: 1.5, repeat: 1 }}
            className="space-y-4"
          >
            <div className="red-alert text-6xl text-center mb-8">
              💀
            </div>
            <div className="red-alert glitch-text">
              ⚠️  SECURITY BREACH DETECTED  ⚠️
            </div>
            <div className="red-alert glitch-text">
              &gt; UNAUTHORIZED ACCESS ATTEMPT
            </div>
            <div className="red-alert glitch-text">
              &gt; VAULT-TEC PROTOCOLS COMPROMISED
            </div>
            <div className="red-alert glitch-text">
              &gt; INITIATING LOCKDOWN...
            </div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="red-alert text-center text-8xl"
            >
              ERROR
            </motion.div>
          </motion.div>
        )}

        {phase === 'resolve' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="amber-text">&gt; ANALYZING THREAT...</div>
            <div className="terminal-text">&gt; THREAT NEUTRALIZED</div>
            <div className="terminal-text">&gt; MALFUNCTION BYPASSED</div>
            <div className="terminal-text">&gt; CRESCITA'25 INTERFACE READY</div>
            <div className="amber-text">&gt; LAUNCHING HOME INTERFACE...</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-center text-4xl mt-8"
            >
              ⚙️
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GlitchPrank;