import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
  playBeep: (frequency?: number, duration?: number) => void;
}

// ✅ Boot steps defined outside to keep them stable
const BOOT_STEPS = [
  '> SYSTEM ONLINE',
  '> KONGU MAINFRAME BOOTING...',
  '> AUTHENTICATION GRANTED',
  '> INITIALIZING SYMPOSIUM PROTOCOL [CRESCITA_25]',
  '> SCANNING NETWORK INTERFACES...',
  '> LOADING MODULES: ████████████████████ 100%',
  '> CONFERENCE SYSTEMS READY',
  '> ESTABLISHING SECURE CONNECTION...',
  '> CONNECTION ESTABLISHED',
  "> CRESCITA'25 TERMINAL READY"
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, playBeep }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    const timeouts: number[] = [];
    let typeInterval: number | null = null;

    const cleanup = () => {
      mounted = false;
      if (typeInterval) clearInterval(typeInterval);
      timeouts.forEach(t => clearTimeout(t));
    };

    if (currentStep < BOOT_STEPS.length) {
      const step = BOOT_STEPS[currentStep];
      let charIndex = 0;

      setCurrentText('');

      typeInterval = window.setInterval(() => {
        if (!mounted) return;

        if (charIndex <= step.length) {
          const displayText = step.substring(0, charIndex);
          setCurrentText(displayText);

          // Beep occasionally
          if (charIndex < step.length && Math.random() < 0.3) {
            playBeep(800 + Math.random() * 200, 30);
          }

          charIndex++;
        } else {
          clearInterval(typeInterval!);
          setCompletedSteps(prev => [...prev, step]);
          setCurrentText('');

          const nextStepTimeout = window.setTimeout(() => {
            if (!mounted) return;
            setCurrentStep(prev => prev + 1);
            playBeep(1000, 50);
          }, 500);

          timeouts.push(nextStepTimeout);
        }
      }, 50);
    } else {
      const finalBeepTimeout = window.setTimeout(() => {
        if (!mounted) return;
        playBeep(1200, 200);

        const completeTimeout = window.setTimeout(() => {
          if (!mounted) return;
          onComplete();
        }, 1000);

        timeouts.push(completeTimeout);
      }, 500);

      timeouts.push(finalBeepTimeout);
    }

    return cleanup;
  }, [currentStep, playBeep, onComplete]); // ✅ no bootSteps here

  return (
    <div className="crt-screen w-full h-screen flex items-center justify-center phosphor-glow bg-black">
      <div className="terminal-text text-lg md:text-xl lg:text-2xl max-w-4xl p-8">
        <div className="space-y-2">
          {completedSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              {step}
            </motion.div>
          ))}
          {currentStep < BOOT_STEPS.length && (
            <div className="flex items-center">
              <span>{currentText}</span>
              <span className="terminal-cursor ml-1 inline-block"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
