import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
  playBeep: (frequency?: number, duration?: number) => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete, playBeep }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const bootSteps = [
    '&gt; SYSTEM ONLINE',
    '&gt; KONGU MAINFRAME BOOTING...',
    '&gt; AUTHENTICATION GRANTED',
    '&gt; INITIALIZING SYMPOSIUM PROTOCOL [CRESCITA_25]',
    '&gt; SCANNING NETWORK INTERFACES...',
    '&gt; LOADING MODULES: ████████████████████ 100%',
    '&gt; CONFERENCE SYSTEMS READY',
    '&gt; ESTABLISHING SECURE CONNECTION...',
    '&gt; CONNECTION ESTABLISHED',
    '&gt; CRESCITA\'25 TERMINAL READY'
  ];

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const step = bootSteps[currentStep];
      let charIndex = 0;
      setCurrentText('');
      
      const typeInterval = setInterval(() => {
        if (charIndex <= step.length) {
          const displayText = step.substring(0, charIndex);
          setCurrentText(displayText);
          
          // Play beep occasionally during typing
          if (charIndex < step.length && Math.random() < 0.3) {
            playBeep(800 + Math.random() * 200, 30);
          }
          
          charIndex++;
        } else {
          // Step completed
          clearInterval(typeInterval);
          setCompletedSteps(prev => [...prev, step]);
          setCurrentText('');
          
          // Move to next step after a brief pause
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, 200);
        }
      }, 60);

      return () => clearInterval(typeInterval);
    } else {
      // All steps completed - show final screen then complete
      setTimeout(() => {
        playBeep(1200, 200);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }, 500);
    }
  }, [currentStep, bootSteps, onComplete, playBeep]);

  return (
    <div className="crt-screen w-full h-screen flex items-center justify-center phosphor-glow">
      <div className="terminal-text text-2xl md:text-3xl lg:text-4xl max-w-4xl px-8">
        <div className="space-y-4">
          {/* Show completed steps */}
          {completedSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
              dangerouslySetInnerHTML={{ __html: step }}
            />
          ))}
          
          {/* Show current typing step */}
          {currentStep < bootSteps.length && (
            <div className="flex items-center">
              <span dangerouslySetInnerHTML={{ __html: currentText }} />
              <span className="terminal-cursor ml-1">_</span>
            </div>
          )}
          
          {/* Show completion screen */}
          {currentStep >= bootSteps.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8"
            >
              <div className="text-6xl mb-4">⚡</div>
              <div className="amber-text text-xl">SYSTEM READY</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;