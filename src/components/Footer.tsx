import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Heart, Terminal, Cpu, Zap, Trophy } from 'lucide-react';
import GlassmorphismPanel from './GlassmorphismPanel';

interface FooterProps {
  developers: {
    designed_by: string[];
    developed_by: string[];
    copyright: string;
  };
}

const Footer: React.FC<FooterProps> = ({ developers }) => {
  // State for meme animation
  const [memeActivated, setMemeActivated] = useState(false);
  const [nameRevealed, setNameRevealed] = useState(false);

  // Text scramble effect for developed by names
  const [displayText, setDisplayText] = useState('LOADING...');
  const finalNames = developers.developed_by.join(' & ');
  
  // Trigger name reveal on scroll
  useEffect(() => {
    const revealOnScroll = () => {
      const footer = document.getElementById('footer-credits');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setNameRevealed(true);
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);
  
  // Text scramble animation effect
  useEffect(() => {
    if (!nameRevealed) return;
    
    let iteration = 0;
    const maxIterations = 20;
    
    const interval = setInterval(() => {
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(finalNames);
        return;
      }
      
      // Generate a scrambled version that gradually reveals the real name
      const progress = iteration / maxIterations;
      let result = '';
      
      for (let i = 0; i < finalNames.length; i++) {
        if (Math.random() < progress || i < progress * finalNames.length) {
          result += finalNames[i];
        } else {
          result += ['_', '/', '\\', '|', '>', '<', '$', '#', '%', '&'][Math.floor(Math.random() * 10)];
        }
      }
      
      setDisplayText(result);
      iteration += 1;
    }, 50);
    
    return () => clearInterval(interval);
  }, [nameRevealed, finalNames]);
  
  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <GlassmorphismPanel className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo Section with Meme Easter Egg */}
            <div className="text-center md:text-left">
              <motion.div
                className="flex items-center justify-center md:justify-start space-x-3 mb-4 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setMemeActivated(prev => !prev)}
              >
                <AnimatePresence mode="wait">
                  {memeActivated ? (
                    <motion.div 
                      key="meme"
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 360 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Trophy className="w-8 h-8 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="normal"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Terminal className="w-8 h-8 text-green-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div>
                  <h3 className="text-xl font-bold font-mono text-green-400">
                    {memeActivated ? "1337_H4X0R.EXE" : "CRESCITA'25"}
                  </h3>
                  <motion.p 
                    className="text-xs text-green-300/70 font-mono"
                    animate={memeActivated ? { 
                      color: ["#00ff41", "#41ff00", "#ff4100"],
                    } : {}}
                    transition={{ duration: 1, repeat: memeActivated ? Infinity : 0 }}
                  >
                    {memeActivated ? "MLG PRO EDITION" : "Tech Symposium"}
                  </motion.p>
                </div>
              </motion.div>
              
              {/* Meme activation message */}
              <AnimatePresence>
                {memeActivated && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-xs text-green-400/70 font-mono mt-2 px-2 py-1 border border-dashed border-green-500/30"
                  >
                    DANK MODE ACTIVATED
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Developer Credits */}
            <div className="text-center" id="footer-credits">
              <div className="space-y-3">
                <div>
                  <motion.p 
                    className="text-green-400/80 text-sm font-mono mb-1"
                    animate={memeActivated ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: memeActivated ? Infinity : 0, duration: 0.5 }}
                  >
                    {memeActivated ? "DESIGN WIZARDS" : "DESIGNED BY"}
                  </motion.p>
                  <div className="flex justify-center items-center space-x-2">
                    <motion.div
                      animate={memeActivated ? { rotate: 360 } : {}}
                      transition={{ duration: 2, repeat: memeActivated ? Infinity : 0, ease: "linear" }}
                    >
                      <Code className="w-4 h-4 text-green-400" />
                    </motion.div>
                    <motion.p 
                      className="text-green-300 font-mono text-sm"
                      animate={memeActivated ? { 
                        textShadow: ["0 0 5px rgba(0,255,65,0)", "0 0 10px rgba(0,255,65,0.8)", "0 0 5px rgba(0,255,65,0)"]
                      } : {}}
                      transition={{ duration: 2, repeat: memeActivated ? Infinity : 0 }}
                    >
                      {developers.designed_by.join(' & ')}
                    </motion.p>
                  </div>
                </div>
                
                <div>
                  <motion.p 
                    className="text-green-400/80 text-sm font-mono mb-1"
                    animate={memeActivated ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ repeat: memeActivated ? Infinity : 0, duration: 0.5, delay: 0.25 }}
                  >
                    {memeActivated ? "CODE NINJAS" : "DEVELOPED BY"}
                  </motion.p>
                  <motion.div 
                    className="flex justify-center items-center space-x-2 bg-black/30 px-3 py-1 rounded-md"
                    whileHover={{ backgroundColor: "rgba(0,255,65,0.1)" }}
                  >
                    <AnimatePresence mode="wait">
                      {memeActivated ? (
                        <motion.div
                          key="meme-dev"
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Cpu className="w-4 h-4 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div key="normal-dev">
                          <Terminal className="w-4 h-4 text-green-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.p 
                      className="text-green-300 font-mono text-sm glitchy-text"
                      initial={{ opacity: 1 }}
                      animate={nameRevealed ? { opacity: 1 } : { opacity: [1, 0.7, 1] }}
                      transition={{ duration: 0.8, repeat: !nameRevealed ? Infinity : 0 }}
                    >
                      {nameRevealed ? displayText : "DECRYPTING..."}
                    </motion.p>
                    
                    {/* Reveal trigger button */}
                    {!nameRevealed && (
                      <motion.button
                        onClick={() => setNameRevealed(true)}
                        className="bg-green-500/20 p-1 rounded-sm hover:bg-green-500/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Zap className="w-3 h-3 text-green-400" />
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                <span className={`font-mono ${memeActivated ? 'text-green-400' : 'text-green-300'}`}>
                  {memeActivated ? "Crafted with" : "Made with"}
                </span>
                <AnimatePresence mode="wait">
                  {memeActivated ? (
                    <motion.div
                      key="fire-heart"
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.5, 1], 
                        rotate: [0, 5, -5, 0]
                      }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ 
                        scale: { duration: 0.5, repeat: Infinity }, 
                        rotate: { duration: 0.3, repeat: Infinity }
                      }}
                    >
                      <div className="relative">
                        <Heart className="w-6 h-6 text-red-500 fill-current" />
                        <motion.div 
                          className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full"
                          animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="normal-heart"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Heart className="w-5 h-5 text-red-400 fill-current" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.span 
                  className="text-green-300 font-mono"
                  animate={memeActivated ? { color: ["#00ff41", "#41ff00", "#ff4100"] } : {}}
                  transition={{ duration: 2, repeat: memeActivated ? Infinity : 0 }}
                >
                  {memeActivated ? "& 110% power" : ""}
                </motion.span>
              </div>
              <motion.p 
                className="text-green-400/80 font-mono text-sm"
                animate={memeActivated ? { 
                  textShadow: ["0 0 5px rgba(0,255,65,0)", "0 0 15px rgba(0,255,65,0.7)", "0 0 5px rgba(0,255,65,0)"]
                } : {}}
                transition={{ duration: 2, repeat: memeActivated ? Infinity : 0 }}
              >
                {memeActivated ? "© EPIC RIGHTS RESERVED " + new Date().getFullYear() : developers.copyright}
              </motion.p>
              <p className="text-green-300/60 font-mono text-xs mt-1">
                Department of CSE, KEC
                {memeActivated && <span className="ml-2">| ELITE SQUAD</span>}
              </p>
            </div>
          </div>

          {/* Animated Border */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-400"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 1 }}
          />
          
          {/* Meme Mode Extra Elements */}
          <AnimatePresence>
            {memeActivated && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-3 right-10 bg-green-500/20 px-2 py-1 text-xs font-mono text-green-400 border border-green-500/30 rounded-sm"
                >
                  PRO_TIP: Click logo to toggle normal mode
                </motion.div>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-xs font-mono text-green-500/80"
                >
                  Achievement Unlocked: Hidden Developer Mode
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </GlassmorphismPanel>
      </div>

      {/* Enhanced Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-64 h-64 border border-green-500 rounded-full"
          animate={memeActivated ? { rotate: 360 } : {}}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-32 h-32 border border-green-500 rounded-lg"
          animate={memeActivated ? { rotate: [45, 225, 45] } : { rotate: 45 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-48 h-48 border border-green-500 rounded-full"
          animate={memeActivated ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <AnimatePresence>
          {memeActivated && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-green-500/50 rounded-full"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(0,255,65,0.2)", 
                    "0 0 30px rgba(0,255,65,0.6)", 
                    "0 0 20px rgba(0,255,65,0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
};

export default Footer;