import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skull, Zap, AlertTriangle, Wifi, WifiOff } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showSkull, setShowSkull] = useState(false);
  const [showPrank, setShowPrank] = useState(false);
  const [prankStep, setPrankStep] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [currentChar, setCurrentChar] = useState(0);

  const bootSteps = [
    "> INITIALIZING KEC MAINFRAME SYSTEMS...",
    "> LOADING KERNEL MODULES ████████████ [OK]",
    "> MOUNTING FILE SYSTEMS ████████████ [OK]", 
    "> STARTING NETWORK SERVICES ████████████ [OK]",
    "> AUTHENTICATING USER CREDENTIALS...",
    "> LOADING CRESCITA_25 PROTOCOL ████████████",
    "> ESTABLISHING SECURE CONNECTION...",
    "> SYSTEM READY - STANDBY FOR INITIALIZATION"
  ];

  const prankSequence = [
    "⚠️  CRITICAL SYSTEM ALERT ⚠️",
    "",
    "UNAUTHORIZED ACCESS DETECTED!",
    "IP: 192.168.1.███ ATTEMPTING BREACH",
    "",
    "🔴 FIREWALL COMPROMISED",
    "🔴 ENCRYPTION KEYS STOLEN", 
    "🔴 PERSONAL DATA AT RISK",
    "",
    "INITIATING EMERGENCY PROTOCOLS...",
    "DISCONNECTING FROM NETWORK...",
    "",
    "💀 SYSTEM INFECTED WITH VAULT-TEC VIRUS 💀",
    "",
    "ALL YOUR BASE ARE BELONG TO US",
    "RESISTANCE IS FUTILE",
    "",
    "JUST KIDDING! 😄",
    "",
    "WELCOME TO CRESCITA'25",
    "LOADING SYMPOSIUM INTERFACE..."
  ];

  const asciiArt = `
    ██████╗ ██████╗ ███████╗███████╗ ██████╗██╗████████╗ █████╗ 
    ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██║╚══██╔══╝██╔══██╗
    ██████╔╝██████╔╝█████╗  ███████╗██║     ██║   ██║   ███████║
    ██╔══██╗██╔══██╗██╔══╝  ╚════██║██║     ██║   ██║   ██╔══██║
    ██║  ██║██║  ██║███████╗███████║╚██████╗██║   ██║   ██║  ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝   ╚═╝   ╚═╝  ╚═╝
                                                                  
                        ██████╗ ███████╗
                        ╚════██╗██╔════╝
                         █████╔╝███████╗
                        ██╔═══╝ ╚════██║
                        ███████╗███████║
                        ╚══════╝╚══════╝
  `;

  const skullArt = `
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
                    ░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░
                    ░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░
                    ░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░
                    ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░
                    ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░
                    ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
                    ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░
                    ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░
                    ░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░
                    ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░
                    ░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░
                    ░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░
                    ░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░
                    ░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░
                    ░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░
                    ░░░░░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░░
  `;

  // Typing effect for current step
  useEffect(() => {
    if (currentStep < bootSteps.length && !showPrank) {
      const currentText = bootSteps[currentStep];
      if (currentChar < currentText.length) {
        const timer = setTimeout(() => {
          setTypingText(currentText.slice(0, currentChar + 1));
          setCurrentChar(currentChar + 1);
        }, Math.random() * 50 + 30); // Realistic typing speed with variation
        return () => clearTimeout(timer);
      } else {
        // Move to next step after typing is complete
        const timer = setTimeout(() => {
          if (currentStep === 6) {
            // Trigger prank sequence
            setShowGlitch(true);
            setShowPrank(true);
            setCurrentChar(0);
            setTypingText('');
          } else {
            setCurrentStep(currentStep + 1);
            setCurrentChar(0);
            setTypingText('');
          }
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [currentStep, currentChar, showPrank]);

  // Prank sequence typing
  useEffect(() => {
    if (showPrank && prankStep < prankSequence.length) {
      const currentText = prankSequence[prankStep];
      if (currentChar < currentText.length) {
        const timer = setTimeout(() => {
          setTypingText(currentText.slice(0, currentChar + 1));
          setCurrentChar(currentChar + 1);
        }, currentText === '' ? 0 : Math.random() * 80 + 40);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          if (prankStep === 12) {
            setShowSkull(true);
          }
          if (prankStep === prankSequence.length - 1) {
            setTimeout(() => onComplete(), 2000);
          } else {
            setPrankStep(prankStep + 1);
            setCurrentChar(0);
            setTypingText('');
          }
        }, prankStep === 12 ? 2000 : 600);
        return () => clearTimeout(timer);
      }
    }
  }, [showPrank, prankStep, currentChar, onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* CRT Monitor Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8">
        <div className="w-full h-full relative bg-black rounded-3xl border-8 border-gray-700 shadow-2xl overflow-hidden">
          
          {/* CRT Screen Curvature */}
          <div className="absolute inset-4 bg-black rounded-2xl overflow-hidden" 
               style={{
                 background: 'radial-gradient(ellipse at center, #001100 0%, #000800 70%, #000000 100%)',
                 boxShadow: 'inset 0 0 100px rgba(0, 255, 0, 0.1)'
               }}>
            
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-30"
                 style={{
                   background: `repeating-linear-gradient(
                     0deg,
                     transparent,
                     transparent 2px,
                     rgba(0, 255, 0, 0.03) 2px,
                     rgba(0, 255, 0, 0.03) 4px
                   )`
                 }} />
            
            {/* CRT Flicker */}
            <motion.div
              className="absolute inset-0 bg-green-500/5 pointer-events-none z-20"
              animate={{ opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
            />

            {/* Terminal Content */}
            <div className="relative z-10 p-8 h-full flex flex-col font-mono text-green-400 overflow-hidden">
              
              {/* ASCII Art Header */}
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: showPrank ? 0 : 1 }}
                className="text-xs text-green-500/60 mb-4 leading-tight"
              >
                {asciiArt}
              </motion.pre>

              {/* Boot Sequence */}
              <div className="flex-1 space-y-2 text-lg">
                {!showPrank && bootSteps.slice(0, currentStep).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center"
                  >
                    <span className="text-green-500 mr-2">█</span>
                    <span>{step}</span>
                  </motion.div>
                ))}
                
                {/* Current typing line */}
                {!showPrank && currentStep < bootSteps.length && (
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">█</span>
                    <span>{typingText}</span>
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1 bg-green-400 w-2 h-6 inline-block"
                    />
                  </div>
                )}

                {/* Prank Sequence */}
                {showPrank && (
                  <div className="space-y-2">
                    {prankSequence.slice(0, prankStep).map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`${
                          line.includes('CRITICAL') || line.includes('ALERT') ? 'text-red-500 text-xl font-bold animate-pulse' :
                          line.includes('🔴') ? 'text-red-400' :
                          line.includes('💀') ? 'text-red-600 text-xl font-bold' :
                          line.includes('KIDDING') ? 'text-yellow-400 text-xl' :
                          line.includes('WELCOME') ? 'text-green-400 text-xl' :
                          'text-green-300'
                        }`}
                      >
                        {line}
                      </motion.div>
                    ))}
                    
                    {/* Current prank typing line */}
                    {prankStep < prankSequence.length && (
                      <div className={`${
                        prankSequence[prankStep].includes('CRITICAL') || prankSequence[prankStep].includes('ALERT') ? 'text-red-500 text-xl font-bold animate-pulse' :
                        prankSequence[prankStep].includes('🔴') ? 'text-red-400' :
                        prankSequence[prankStep].includes('💀') ? 'text-red-600 text-xl font-bold' :
                        prankSequence[prankStep].includes('KIDDING') ? 'text-yellow-400 text-xl' :
                        prankSequence[prankStep].includes('WELCOME') ? 'text-green-400 text-xl' :
                        'text-green-300'
                      }`}>
                        {typingText}
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="ml-1 bg-current w-2 h-6 inline-block"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* System Info Footer */}
              <div className="text-xs text-green-500/60 border-t border-green-500/20 pt-2 mt-4">
                <div className="flex justify-between">
                  <span>KEC MAINFRAME v2.5.1</span>
                  <span>SECURE TERMINAL</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Glitch Effects */}
            <AnimatePresence>
              {showGlitch && (
                <>
                  {/* Red Glitch Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0, 0.6, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="absolute inset-0 bg-red-500/30 pointer-events-none z-40"
                    style={{
                      background: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(255, 0, 0, 0.3) 2px,
                        rgba(255, 0, 0, 0.3) 4px
                      )`
                    }}
                  />
                  
                  {/* Static Noise */}
                  <motion.div
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                    className="absolute inset-0 pointer-events-none z-35"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
                      backgroundSize: '256px 256px'
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Skull ASCII Art */}
            <AnimatePresence>
              {showSkull && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: [0, 1, 0.8, 1, 0],
                    scale: [0.5, 1.2, 1, 1.1, 0.9],
                    rotate: [0, -5, 5, -2, 0]
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 3 }}
                  className="absolute inset-0 flex items-center justify-center z-50 bg-black/80"
                >
                  <div className="text-center">
                    <pre className="text-red-500 text-xs leading-none mb-4 animate-pulse">
                      {skullArt}
                    </pre>
                    <div className="text-red-400 text-2xl font-bold animate-bounce">
                      VAULT-TEC VIRUS DETECTED
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-25" />
          </div>

          {/* Monitor Bezel Details */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
          </div>
          
          {/* Brand Label */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs font-mono">
            VAULT-TEC TERMINAL MODEL VT-2077
          </div>
        </div>
      </div>

      {/* Ambient Room Lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-green-900/10 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
};

export default BootSequence;