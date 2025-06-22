import { useState, useEffect } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  // Hide the initial loading screen after components are ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Set up section cycling when boot completes
  useEffect(() => {
    if (!showBoot) {
      const interval = setInterval(() => {
        // Using functional update to modify state, not directly using currentSection
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
      {/* Initial Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-terminal-green text-xl font-mono">
            INITIALIZING...
          </motion.div>
        </div>
      )}
    
      {/* Enhanced CRT Background and Grid Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Base Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 65, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 65, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        {/* Secondary Larger Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '160px 160px'
            }}
          />
        </div>

        {/* CRT Scanlines - Animated */}
        <motion.div 
          className="absolute inset-0 opacity-15"
          animate={{
            backgroundPosition: ["0px 0px", "0px -10px"]
          }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.15) 3px,
              rgba(0, 255, 65, 0.15) 5px
            )`
          }}
        />
        
        {/* CRT Flicker Effect */}
        <motion.div
          className="absolute inset-0 bg-green-500/5"
          animate={{ opacity: [0.02, 0.08, 0.02] }}
          transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Radial CRT Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-green-900/30 via-transparent to-black/80" />
        
        {/* Corner Vignette Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>
        
        {/* Animated Circuit Lines */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-500/50 to-transparent"
          animate={{ y: ['-100%', '100%'] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-500/50 to-transparent"
          animate={{ y: ['100%', '-100%'] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        />

        {/* Digital Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" fill="#00ff41" />
          </svg>
        </div>
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
              {/* Hero Background Effects */}
              <div className="absolute inset-0">
                {/* Floating Particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green-400/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
                
                {/* Circuit Board Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 1000 1000">
                    <defs>
                      <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#22c55e" strokeWidth="1"/>
                        <circle cx="10" cy="10" r="3" fill="#22c55e"/>
                        <circle cx="90" cy="90" r="3" fill="#22c55e"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#circuit)"/>
                  </svg>
                </div>
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
                    {heroStats.map((stat) => (
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
                          {/* Background Circuit */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full border border-green-500/30 rounded-lg" />
                            <div className="absolute top-2 left-2 w-4 h-4 border-2 border-green-500/50 rounded-full" />
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-2 border-green-500/50 rounded-full" />
                          </div>
                          
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
                      {/* Button Circuit Pattern */}
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
                      {/* Scanning Line Effect */}
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
              
              {/* Additional Tech Elements */}
              <motion.div
                className="absolute top-1/3 right-10 w-8 h-8 border border-green-400/40"
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 0.8, 1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
            </section>

            {/* Event Sections with Enhanced Backgrounds */}
            <div id="events" className="relative">
              <EventSection
                title="// TECHNICAL_EVENTS"
                events={eventsData.technicalEvents}
                className="bg-gradient-to-r from-gray-900/50 to-black/50 relative"
              />

              <EventSection
                title="// WORKSHOPS"
                events={eventsData.workshops}
                className="bg-gradient-to-l from-gray-900/50 to-black/50 relative"
              />

              <EventSection
                title="// NON_TECHNICAL_EVENTS"
                events={eventsData.nonTechnicalEvents}
                className="bg-gradient-to-r from-gray-900/50 to-black/50 relative"
              />
            </div>

            {/* Timeline Section */}
            <div id="schedule" className="bg-gradient-to-b from-black/50 to-gray-900/50 relative">
              <Timeline events={eventsData.generalEvents} />
            </div>

            {/* Contact Section */}
            <section id="contact" className="py-16 bg-gradient-to-t from-gray-900/50 to-black/50 relative">
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-center mb-12 font-mono text-green-400 relative"
                >
                  // CONTACT_MATRIX
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                  
                  {/* Title Glow Effect */}
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

      {/* Enhanced Global CRT Effects */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Screen Flicker */}
        <motion.div
          className="w-full h-full bg-green-500/5"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatType: "reverse" }}
        />
        
        {/* Random Glitch Lines */}
        <motion.div
          className="absolute w-full h-0.5 bg-green-400/30"
          style={{ top: '30%' }}
          animate={{ 
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
        />
        <motion.div
          className="absolute w-full h-0.5 bg-green-400/30"
          style={{ top: '70%' }}
          animate={{ 
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0]
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
        />
      </div>
    </div>
  );
}

export default App;