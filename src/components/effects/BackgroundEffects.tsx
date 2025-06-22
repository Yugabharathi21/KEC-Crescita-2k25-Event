import { FC, memo } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: FC = memo(() => (
  <>    {/* Cyberpunk Grid */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 255, 65, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-scroll 20s linear infinite'
      }}></div>
    </div>    {/* Floating Orbs */}
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#00ff41]/10 blur-3xl"
          initial={{ 
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>{/* Matrix Rain Effect */}
    <div className="fixed inset-0 pointer-events-none opacity-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_100%)]"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.15) 0px, rgba(0, 255, 65, 0.15) 1px, transparent 1px, transparent 2px)',
        backgroundSize: '100% 2px',
        animation: 'matrix-rain 20s linear infinite'
      }}></div>
    </div>
    
    {/* Scanlines Effect */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 3px)',
        backgroundSize: '100% 3px',
        animation: 'scanline 10s linear infinite'
      }}></div>
    </div>    {/* Glowing Corner Accents */}
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-gradient-to-br from-[#00ff41]/10 via-transparent to-transparent transform -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-[#00ff41]/10 via-transparent to-transparent transform translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-[#00ff41]/10 via-transparent to-transparent transform -translate-x-1/2 translate-y-1/2 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-gradient-to-tl from-[#00ff41]/10 via-transparent to-transparent transform translate-x-1/2 translate-y-1/2 blur-2xl"></div>
    </div>
  </>
));

BackgroundEffects.displayName = 'BackgroundEffects';

export default BackgroundEffects;
