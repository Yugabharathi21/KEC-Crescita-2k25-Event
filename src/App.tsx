/**
 * PERFORMANCE OPTIMIZATIONS:
 * 1. Replaced JS animations with CSS animations where possible
 * 2. Implemented lazy loading for non-critical components
 * 3. Added Suspense boundaries for better loading UX
 * 4. Reduced animation complexity (fewer particles, simpler transforms)
 * 5. Used will-change for hardware acceleration on critical animations
 * 6. Replaced SVG filters with pre-computed CSS
 * 7. Optimized hover effects to be less resource intensive
 * 8. Added deterministic delays instead of random ones
 */
import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Directly import the BootSequence for initial load
import BootSequence from './components/BootSequence';
import Header from './components/Header';
// Lazy load components that are not needed immediately
const EventSection = lazy(() => import('./components/EventSection'));
const Timeline = lazy(() => import('./components/Timeline'));
const ContactCard = lazy(() => import('./components/ContactCard'));
const Footer = lazy(() => import('./components/Footer'));
const GlassmorphismPanel = lazy(() => import('./components/GlassmorphismPanel'));
// Only import the icons we're actually using
import { Terminal, Zap, Calendar, Award, Users, Code, Info } from 'lucide-react';

// Import JSON data
import eventsData from './data/events.json';
import contactsData from './data/contacts.json';

// Import images
import keclogo from './assets/img/KEC.png';
import csealogo from './assets/img/csea.png';
import crescitaLogo from './assets/img/Cersita.png';
import bannerImg from './assets/img/Banner.jpg';

function App() {
  const [showBoot, setShowBoot] = useState(true);
  // Using state for section transitions (keeping for future functionality)
  const [, setCurrentSection] = useState(0);
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative terminal-bg">
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
        {/* Base Grid Pattern handled by CSS now */}

        {/* CRT Scanlines - Converted to CSS Animation for Better Performance */}
        <div 
          className="absolute inset-0 opacity-15 scanline-animation"
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
        
        {/* CRT Flicker Effect - Using CSS Animation Instead */}
        <div
          className="absolute inset-0 bg-green-500/5 crt-flicker-animation"
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
        
        {/* Animated Circuit Lines - Converted to CSS Animations (Horizontal only) */}
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent circuit-h-animation"
        />
        <div
          className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent circuit-h-reverse-animation"
        />

        {/* Digital Noise Overlay - Simplified with CSS */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-screen noise-bg"></div>
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
            <section className="min-h-screen flex items-center justify-center relative pt-20 pb-16 overflow-hidden terminal-section">
              <div className="section-glow"></div>
              {/* Hero Background Effects */}
              <div className="absolute inset-0">
                {/* Floating Particles - Reduced quantity for better performance */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-green-400/30 rounded-full will-change-transform"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.2, // deterministic delay instead of random
                      ease: "easeInOut"
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

              {/* Enhanced Floating Elements - CSS Animations for Better Performance */}
              <div
                className="absolute top-20 left-10 w-4 h-4 bg-green-400/60 rounded-full floating-element-1"
              />
              <div
                className="absolute bottom-40 right-20 w-6 h-6 border-2 border-green-400/60 rounded-full rotating-element"
              />
              
              {/* Additional Tech Elements - CSS Animation */}
              <div
                className="absolute top-1/3 right-10 w-8 h-8 border border-green-400/40 tech-element"
              />
            </section>

            {/* About Section with Terminal Style */}
            <section id="about" className="py-16 terminal-section relative">
              <div className="section-glow"></div>
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-pattern-large opacity-5"></div>
                
                {/* Terminal scan line */}
                <motion.div 
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ["0px 0px", "0px 100px"]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 5px,
                      rgba(0, 255, 65, 0.15) 5px,
                      rgba(0, 255, 65, 0.15) 10px
                    )`
                  }}
                />
              </div>
              
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="container mx-auto px-4 mb-12 text-center"
              >
                <div className="relative inline-block">
                  <h2 className="text-4xl font-bold mb-2 font-mono text-terminal-green inline-flex items-center">
                    <Info className="mr-2 h-8 w-8 text-terminal-green" />
                    // SYSTEM_INFO
                  </h2>
                  
                  {/* Glitch effect */}
                  <motion.div
                    className="absolute inset-0 text-terminal-green/30 font-mono text-4xl font-bold flex items-center"
                    animate={{ 
                      x: [0, -2, 2, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <Info className="mr-2 h-8 w-8 text-terminal-green/30" />
                    // SYSTEM_INFO
                  </motion.div>
                </div>
                
                <div className="relative h-1 w-32 mx-auto">
                  <div className="h-full w-full bg-gradient-to-r from-terminal-green to-terminal-green/60 rounded-full"></div>
                  
                  {/* Animated pulse */}
                  <motion.div 
                    className="absolute inset-0 bg-terminal-green/50 rounded-full"
                    animate={{
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </motion.div>

              {/* Cards Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="container mx-auto px-4 relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  
                  {/* KEC Card - Optimized hover effect */}
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 0 15px #00ff41" }}
                    className="terminal-card bg-black/60 border border-terminal-green/30 rounded p-6"
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-terminal-green/20 animate-pulse shadow-terminal"></div>
                      <img
                        src={keclogo}
                        alt="KEC Logo"
                        className="w-full h-full object-contain relative z-10"
                      />
                      <div className="absolute inset-0 bg-terminal-green/5 rounded-full"></div>
                    </div>
                    
                    <div className="border-t border-b border-terminal-green/40 py-2 mb-4">
                      <h3 className="text-xl font-mono font-bold text-terminal-green text-center">
                        Kongu Engineering College
                      </h3>
                    </div>
                    
                    <div className="text-sm terminal-text text-terminal-green/90 h-64 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-justify leading-relaxed">
                        Kongu Engineering College was established in the year 1984, approved by AICTE, New Delhi, accredited by NAAC for 5 years with the grade of "A++" and an autonomous institution affiliated to Anna University, Chennai.
                        <br/><br/>
                        The institution has completed 40 years of dedicated and excellent service in the field of technical education. It offers 14 UG, 6 PG and 16 Research programmes in Engineering, Applied Science and Management imparting high quality value education in India.
                        <br/><br/>
                        It is one of the best self financing engineering colleges imparting high quality technical education in Tamil Nadu, India, and is well-known for its technical excellence, modern facilities, record of performance with excellent results and enterprising students, 2nd Position among Self Financing Engineering Colleges in Tamilnadu, 9th position in top Engineering colleges of super excellence and 64th position among 126 top Engineering Colleges in India including (IITs and NITs) in Competition Success Review (CSR). Kongu Engineering College has been awarded Swachha campus ranking for the year 2019 by AICTE.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Crescita Card - Optimized hover effect */}
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 0 15px #00ff41" }}
                    className="terminal-card bg-black/60 border border-terminal-green/30 rounded p-6"
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-terminal-green/20 animate-pulse shadow-terminal"></div>
                      <img
                        src={crescitaLogo}
                        alt="Crescita Logo"
                        className="w-full h-full object-contain relative z-10"
                      />
                      <div className="absolute inset-0 bg-terminal-green/5 rounded-full"></div>
                    </div>
                    
                    <div className="border-t border-b border-terminal-green/40 py-2 mb-4">
                      <h3 className="text-xl font-mono font-bold text-terminal-green text-center">
                        CRESCITA'25
                      </h3>
                    </div>
                    
                    <div className="text-sm terminal-text text-terminal-green/90 h-64 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-justify leading-relaxed">
                        Crescita is a national-level symposium conducted every year by the Computer Science and Engineering department of Kongu Engineering College. 
                        <br/><br/>
                        Crescita, a great platform to showcase your innovative ideas and enhance your technical skills, features both technical and non-technical events, workshops, and talks by industry experts.
                        <br/><br/>
                        The name "Crescita" comes from the Italian word for "growth," symbolizing our commitment to fostering technical growth and innovation. Every year, Crescita brings together thousands of students from various colleges across India, creating an ecosystem of learning, competition, and collaboration.
                        <br/><br/>
                        This year's Crescita features a special Fallout-inspired terminal theme, bringing a unique cyberpunk aesthetic to the technical symposium experience.
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* CSE Department Card - Optimized hover effect */}
                  <motion.div
                    whileHover={{ y: -3, boxShadow: "0 0 15px #00ff41" }}
                    className="terminal-card bg-black/60 border border-terminal-green/30 rounded p-6"
                    transition={{ type: "tween", duration: 0.2 }}
                  >
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-terminal-green/20 animate-pulse shadow-terminal"></div>
                      <img
                        src={csealogo}
                        alt="CSEA Logo"
                        className="w-full h-full object-contain relative z-10"
                      />
                      <div className="absolute inset-0 bg-terminal-green/5 rounded-full"></div>
                    </div>
                    
                    <div className="border-t border-b border-terminal-green/40 py-2 mb-4">
                      <h3 className="text-xl font-mono font-bold text-terminal-green text-center">
                        Department of CSE
                      </h3>
                    </div>
                    
                    <div className="text-sm terminal-text text-terminal-green/90 h-64 overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-justify leading-relaxed">
                        Department of CSE was started in the year 1988 with B.E. programme. With the increasing demand in Computer Science and Engineering, M.E programme was started in the year 1999. The department is recognized to offer research programme leading to Ph.D.
                        <br/><br/>
                        The department aims at developing intellectually alert, scientifically progressive, globally competent and dynamic young IT professionals. Right from its inception it is continuously striving to impart quality education and promoting competitive spirit among students for academic excellence. 
                        <br/><br/>
                        The department has well equipped laboratories, good infrastructure, highly qualified and experienced faculty. The department has signed MOUs with various organizations to provide real time training to the students. The department was sanctioned FDP under various schemes and was successfully executed.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                {/* Event Banner */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="max-w-5xl mx-auto p-2 rounded border-2 border-terminal-green/40 bg-black/70 shadow-terminal overflow-hidden"
                >
                  <div className="relative crt-screen overflow-hidden">
                    <img src={bannerImg} alt="Crescita 2025" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-terminal-green/10 mix-blend-overlay"></div>
                    
                    {/* Terminal overlay elements */}
                    <div className="absolute top-4 left-4 flex items-center">
                      <div className="h-2 w-2 rounded-full bg-terminal-green animate-pulse mr-2"></div>
                      <div className="text-xs text-terminal-green font-mono">SYSTEM.READY</div>
                    </div>
                    
                    <div className="absolute top-4 right-4 text-terminal-green/80 text-xs font-mono">
                      [TERMINAL:2077]
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="text-terminal-green text-xl font-mono font-bold flex items-center">
                        &gt; CRESCITA.EXE --VERSION 2025
                        <motion.span 
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                          className="ml-2 inline-block w-3 h-5 bg-terminal-green"
                        />
                      </div>
                      <div className="text-terminal-green/80 text-sm font-mono">
                        &gt; NATIONAL LEVEL TECHNICAL SYMPOSIUM
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Event Sections with Enhanced Backgrounds */}
            <div id="events" className="relative terminal-section">
              <div className="section-glow"></div>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-terminal-green">Loading technical events...</div>}>
                <EventSection
                  title="// TECHNICAL_EVENTS"
                  events={eventsData.technicalEvents}
                  className="terminal-section relative"
                />
              </Suspense>

              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-terminal-green">Loading workshops...</div>}>
                <EventSection
                  title="// WORKSHOPS"
                  events={eventsData.workshops}
                  className="terminal-section relative"
                />
              </Suspense>

              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-terminal-green">Loading non-technical events...</div>}>
                <EventSection
                  title="// NON_TECHNICAL_EVENTS"
                  events={eventsData.nonTechnicalEvents}
                  className="terminal-section relative"
                />
              </Suspense>
            </div>

            {/* Timeline Section */}
            <div id="schedule" className="terminal-section relative">
              <div className="section-glow"></div>
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-terminal-green">Loading schedule...</div>}>
                <Timeline events={eventsData.generalEvents} />
              </Suspense>
            </div>

            {/* Contact Section */}
            <section id="contact" className="py-16 terminal-section relative">
              <div className="section-glow"></div>
              <div className="container mx-auto px-4">
                <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-center mb-12 font-mono text-green-400 relative"
                >
                  // CONTACT_MATRIX
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
                  
                  {/* Title Glow Effect - CSS Animation */}
                  <div
                    className="absolute inset-0 text-green-400/30 blur-lg title-glow-animation"
                  >
                    // CONTACT_MATRIX
                  </div>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center text-terminal-green">Loading contacts...</div>}>
                    {contactsData.contacts.map((contact, index) => (
                      <ContactCard key={index} contact={contact} index={index} />
                    ))}
                  </Suspense>
                </div>
              </div>
            </section>

            <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center text-terminal-green">Loading footer...</div>}>
              <Footer developers={contactsData.developers} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Global CRT Effects - CSS Only for Better Performance */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Screen Flicker - CSS Animation */}
        <div className="w-full h-full bg-green-500/5 screen-flicker"></div>
      </div>
    </div>
  );
}

export default App;