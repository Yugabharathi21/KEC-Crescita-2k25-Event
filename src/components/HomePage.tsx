import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Users, Trophy, Calendar, MapPin, Phone, QrCode, Zap } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import EasterEggs from './EasterEggs';

interface HomePageProps {
  playBeep: (frequency?: number, duration?: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ playBeep }) => {
  const [showQR, setShowQR] = useState(false);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '100%']);
  const headerY = useTransform(scrollY, [0, 500], ['0%', '50%']);

  const techEvents = [
    'THINK TANK TALK',
    'VISIONARY VENTURER', 
    'CODEX (CODING)',
    'SURVIVOR SHOWDOWN',
    'FRAME BY FRAME',
    'QUANTUM QUEST'
  ];

  const nonTechEvents = [
    'ADVENTURE AWAITS',
    'LENS LEGACY'
  ];

  const handleTerminalClick = () => {
    playBeep(1200, 100);
  };

  return (
    <div className="crt-screen min-h-screen phosphor-glow relative overflow-x-hidden">
      <EasterEggs playBeep={playBeep} />
      
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-black"></div>
      </motion.div>

      {/* Header Section */}
      <motion.header
        style={{ y: headerY }}
        className="relative z-10 text-center py-16 px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="vault-border p-8 max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ textShadow: ['0 0 10px #00ff41', '0 0 20px #00ff41', '0 0 10px #00ff41'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="terminal-text text-xl md:text-2xl mb-4"
          >
            KONGU ENGINEERING COLLEGE (AUTONOMOUS)
          </motion.div>
          <div className="amber-text text-lg md:text-xl mb-4">
            DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
          </div>
          <div className="terminal-text text-2xl md:text-3xl mb-4">
            NATIONAL LEVEL SYMPOSIUM
          </div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-4xl md:text-6xl font-bold terminal-text mb-4"
          >
            CRESCITA'25
          </motion.div>
          <div className="amber-text text-xl md:text-2xl">
            07.03.2025
          </div>
        </motion.div>

        {/* Terminal Icon */}
        <motion.button
          onClick={handleTerminalClick}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed top-4 right-4 z-50 terminal-text text-3xl hover:amber-text transition-colors"
          title="Terminal Access"
        >
          <Terminal />
        </motion.button>
      </motion.header>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          
          {/* Tech Events Panel */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="vault-border p-6"
          >
            <div className="flex items-center mb-4">
              <Zap className="text-amber-text mr-2" />
              <h2 className="terminal-text text-2xl">TECH EVENTS</h2>
            </div>
            <div className="space-y-3">
              {techEvents.map((event, index) => (
                <motion.div
                  key={event}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ x: 10, color: '#ffb000' }}
                  className="terminal-text text-lg cursor-pointer hover:amber-text transition-colors"
                  onClick={() => playBeep(600 + index * 50, 100)}
                >
                  → {event}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Non-Tech Events Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="vault-border p-6"
          >
            <div className="flex items-center mb-4">
              <Users className="amber-text mr-2" />
              <h2 className="terminal-text text-2xl">NON-TECH EVENTS</h2>
            </div>
            <div className="space-y-3">
              {nonTechEvents.map((event, index) => (
                <motion.div
                  key={event}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                  whileHover={{ x: 10, color: '#ffb000' }}
                  className="terminal-text text-lg cursor-pointer hover:amber-text transition-colors"
                  onClick={() => playBeep(600 + index * 50, 100)}
                >
                  → {event}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-green-500/30">
              <div className="flex items-center mb-2">
                <Trophy className="amber-text mr-2" />
                <h3 className="amber-text text-lg">WORKSHOP</h3>
              </div>
              <div className="terminal-text">→ DELVE IN DATALYZE</div>
            </div>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="vault-border p-6"
          >
            <div className="flex items-center mb-4">
              <Calendar className="amber-text mr-2" />
              <h2 className="terminal-text text-2xl">EVENT INFO</h2>
            </div>
            <div className="space-y-4 terminal-text">
              <div>
                <span className="amber-text">ENTRY FEES:</span> RS 250
              </div>
              <div>
                <span className="amber-text">CASH PRIZE:</span> UPTO 21K
              </div>
              <div>
                <span className="amber-text">LAST DATE TO REGISTER:</span> FEB 28
              </div>
              <div className="flex items-start">
                <MapPin className="amber-text mr-2 mt-1 flex-shrink-0" />
                <span><span className="amber-text">VENUE:</span> MAHARAJA AUDITORIUM</span>
              </div>
              <div className="text-sm opacity-80">
                ACCOMMODATION | LUNCH | TRANSPORT AVAILABLE
              </div>
            </div>
          </motion.div>

          {/* Contact Panel */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="vault-border p-6 lg:col-span-2"
          >
            <div className="flex items-center mb-4">
              <Phone className="amber-text mr-2" />
              <h2 className="terminal-text text-2xl">CONTACT PANEL</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 terminal-text">
              <div>SHIVAANI J – 9047539797</div>
              <div>VIKAS M – 9638729596</div>
              <div>DIVYA K – 6374939491</div>
              <div>PRASANNDH RAAJU – 8946050246</div>
            </div>
          </motion.div>

          {/* QR Code Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="vault-border p-6 text-center"
          >
            <motion.button
              onClick={() => {
                setShowQR(!showQR);
                playBeep(800, 100);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <div className="flex items-center justify-center mb-4">
                <QrCode className="amber-text mr-2" />
                <h2 className="terminal-text text-2xl">SCAN ME!</h2>
              </div>
              
              {showQR ? (
                <QRCodeGenerator url="https://cse-crescita-25.netlify.app/" />
              ) : (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl terminal-text"
                >
                  📱
                </motion.div>
              )}
            </motion.button>
            
            <div className="terminal-text text-sm mt-4">
              https://cse-crescita-25.netlify.app/
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="text-center mt-16 pt-8 border-t border-green-500/30"
        >
          <motion.div
            animate={{ 
              textShadow: ['0 0 10px #00ff41', '0 0 20px #00ff41', '0 0 15px #00ff41'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="terminal-text text-2xl md:text-3xl font-bold"
          >
            CSEA – WE CAN | WE WILL
          </motion.div>
          <div className="amber-text text-sm mt-2 opacity-70">
            TERMINAL INTERFACE v2.5 | VAULT-TEC CERTIFIED
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default HomePage;