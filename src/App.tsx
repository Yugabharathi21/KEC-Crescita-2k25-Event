import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequence from './components/BootSequence';
import Header from './components/Header';
import EventSection from './components/EventSection';
import Timeline from './components/Timeline';
import ContactCard from './components/ContactCard';
import Footer from './components/Footer';
import GlassmorphismPanel from './components/GlassmorphismPanel';
import { Terminal, Zap, Calendar, Award, Users, Code } from 'lucide-react';

// Import JSON data
import eventsData from './data/events.json';
import contactsData from './data/contacts.json';

function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  useEffect(() => {
    if (!showBoot) {
      const interval = setInterval(() => {
        setCurrentSection((prev) => (prev + 1) % 4);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showBoot]);

  const heroStats = [
    { icon: Calendar, label: 'Events', value: '12+' },
    { icon: Award, label: 'Prizes', value: '₹50K+' },
    { icon: Users, label: 'Participants', value: '500+' },
    { icon: Code, label: 'Workshops', value: '3' },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Seamless Unified Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-green-900/20" />
        
        {/* Primary Grid Pattern - Seamless */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 0'
            }}
          />
        </div>
        
        {/* Secondary Fine Grid */}
        <div className="absolute inset-0 opacity-8">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 197, 94, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 197, 94, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 0'
            }}
          />
        </div>
        
        {/* CRT Scanlines - Seamless */}
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(34, 197, 94, 0.1) 2px,
              rgba(34, 197, 94, 0.1) 4px
            )`
          }}
        />
        
        {/* Radial CRT Glow - Centered */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full"
            style={{
              background: `radial-gradient(
                ellipse at center,
                rgba(34, 197, 94, 0.15) 0%,
                rgba(34, 197, 94, 0.08) 25%,
                rgba(34, 197, 94, 0.04) 50%,
                transparent 70%,
                rgba(0, 0, 0, 0.3) 100%
              )`
            }}
          />
        </div>
        
        {/* Corner Vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-black/40" />
        
        {/* Animated Circuit Lines - Seamless Flow */}
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500/60 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-transparent via-green-500/60 to-transparent"
          animate={{ y: ['100%', '-100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-green-500/40 to-transparent"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-green-500/40 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating Data Streams */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px h-20 bg-gradient-to-b from-green-400/60 to-transparent"
            style={{
              left: `${10 + i * 12}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ['-100px', '100vh'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'linear'
            }}
          />
        ))}
        
        {/* Circuit Board Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="circuit-seamless" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <path d="M20,20 L180,20 L180,180 L20,180 Z" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3"/>
                <path d="M20,100 L180,100" stroke="#22c55e" strokeWidth="1" opacity="0.3"/>
                <path d="M100,20 L100,180" stroke="#22c55e" strokeWidth="1" opacity="0.3"/>
                <circle cx="20" cy="20" r="4" fill="#22c55e" opacity="0.4"/>
                <circle cx="180" cy="180" r="4" fill="#22c55e" opacity="0.4"/>
                <circle cx="100" cy="100" r="6" fill="#22c55e" opacity="0.3"/>
                <rect x="90" y="90" width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-seamless)"/>
          </svg>
        </div>
        
        {/* Ambient Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Boot Sequence */}
      <AnimatePresence>
        {showBoot && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!showBoot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <Header />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center relative pt-20 pb-16 overflow-hidden">
              {/* Hero Specific Effects */}
              <div className="absolute inset-0">
                {/* Additional Hero Particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={`hero-particle-${i}`}
                    className="absolute w-2 h-2 bg-green-400/50 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -50, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 2, 1],
                    }}
                    transition={{
                      duration: 5 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                    }}
                  />
                ))}
              </div>

              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center">
                  {/* Main Title with Enhanced Effects */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mb-8 relative"
                  >
                    <h1 className="text-6xl md:text-8xl font-bold font-mono text-green-400 mb-4 relative">
                      <span className="relative z-10 drop-shadow-2xl">CRESCITA'25</span>
                      
                      {/* Multiple Glow Layers */}
                      <motion.div
                        className="absolute inset-0 text-green-500/40 blur-sm"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        CRESCITA'25
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 text-green-400/20 blur-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        CRESCITA'25
                      </motion.div>
                      
                      {/* Holographic Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent 
                                      transform skew-y-1 animate-pulse" />
                    </h1>
                    
                    <motion.p 
                      className="text-xl md:text-2xl text-green-300/80 font-mono mb-2"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      National Level Technical Symposium
                    </motion.p>
                    <p className="text-lg text-green-400/70 font-mono mt-2">
                      Department of Computer Science & Engineering
                    </p>
                    <p className="text-base text-green-300/60 font-mono">
                      Kongu Engineering College
                    </p>
                  </motion.div>

                  {/* Enhanced Stats Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
                  >
                    {heroStats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        whileHover={{ 
                          scale: 1.05, 
                          rotateY: 5,
                          boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <GlassmorphismPanel className="p-6 text-center relative overflow-hidden">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            <stat.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                          </motion.div>
                          <div className="text-2xl font-bold text-green-300 font-mono mb-1">
                            {stat.value}
                          </div>
                          <div className="text-sm text-green-400/80 font-mono">
                            {stat.label}
                          </div>
                        </GlassmorphismPanel>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Enhanced CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <motion.button
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-black 
                                 font-mono font-bold rounded-lg shadow-lg shadow-green-500/30
                                 border border-green-400/50 relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 20px 40px rgba(34, 197, 94, 0.4)",
                        textShadow: "0 0 10px rgba(0, 0, 0, 0.8)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                      transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] 
                                      transition-transform duration-700" />
                      
                      <div className="flex items-center space-x-2 relative z-10">
                        <Terminal className="w-5 h-5" />
                        <span>INITIALIZE REGISTRATION</span>
                      </div>
                    </motion.button>

                    <motion.button
                      className="px-8 py-4 bg-transparent border-2 border-green-500/50 text-green-400 
                                 font-mono font-bold rounded-lg hover:bg-green-500/10
                                 backdrop-blur-sm relative overflow-hidden group"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "rgba(34, 197, 94, 0.8)",
                        boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 w-full h-0.5 bg-green-400"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      
                      <div className="flex items-center space-x-2 relative z-10">
                        <Zap className="w-5 h-5" />
                        <span>VIEW EVENTS</span>
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <motion.div
                className="absolute top-20 left-10 w-4 h-4 bg-green-400/60 rounded-full"
                animate={{ 
                  y: [0, -20, 0], 
                  opacity: [0.6, 1, 0.6],
                  boxShadow: ["0 0 10px rgba(34, 197, 94, 0.3)", "0 0 20px rgba(34, 197, 94, 0.6)", "0 0 10px rgba(34, 197, 94, 0.3)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-40 right-20 w-6 h-6 border-2 border-green-400/60 rounded-full"
                animate={{ 
                  rotate: 360, 
                  scale: [1, 1.2, 1],
                  borderColor: ["rgba(34, 197, 94, 0.6)", "rgba(34, 197, 94, 1)", "rgba(34, 197, 94, 0.6)"]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute top-1/3 right-10 w-8 h-8 border border-green-400/40"
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 0.8, 1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </section>

            {/* Event Sections */}
            <div id="events" className="relative">
              <EventSection
                title="// TECHNICAL_EVENTS"
                events={eventsData.technicalEvents}
                className="relative"
              />

              <EventSection
                title="// WORKSHOPS"
                events={eventsData.workshops}
                className="relative"
              />

              <EventSection
                title="// NON_TECHNICAL_EVENTS"
                events={eventsData.nonTechnicalEvents}
                className="relative"
              />
            </div>

            {/* Timeline Section */}
            <div id="schedule" className="relative">
              <Timeline events={eventsData.generalEvents} />
            </div>

            {/* Contact Section */}
            <section id="contact" className="py-16 relative">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-center mb-12 font-mono text-green-400 relative"
                >
                  // CONTACT_MATRIX
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                  
                  <motion.div
                    className="absolute inset-0 text-green-400/30 blur-lg"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    // CONTACT_MATRIX
                  </motion.div>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {contactsData.contacts.map((contact, index) => (
                    <ContactCard key={index} contact={contact} index={index} />
                  ))}
                </div>
              </div>
            </section>

            <Footer developers={contactsData.developers} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CRT Effects - Seamless */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Screen Flicker */}
        <motion.div
          className="w-full h-full bg-green-500/3"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.15, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Random Glitch Lines */}
        <motion.div
          className="absolute w-full h-0.5 bg-green-400/20"
          style={{ top: '25%' }}
          animate={{ 
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
        />
        <motion.div
          className="absolute w-full h-0.5 bg-green-400/20"
          style={{ top: '75%' }}
          animate={{ 
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 6 }}
        />
      </div>
    </div>
  );
}

export default App;