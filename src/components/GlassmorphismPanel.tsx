import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismPanelProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
}

const GlassmorphismPanel: React.FC<GlassmorphismPanelProps> = ({ 
  children, 
  className = '', 
  hover3D = true 
}) => {
  return (
    <motion.div
      className={`
        relative backdrop-blur-xl bg-gradient-to-br from-green-500/15 to-green-600/5
        border border-green-500/40 rounded-xl shadow-2xl shadow-green-500/25
        before:absolute before:inset-0 before:rounded-xl before:p-[1px]
        before:bg-gradient-to-br before:from-green-400/60 before:to-green-600/30
        before:-z-10 before:blur-sm
        overflow-hidden
        ${className}
      `}
      whileHover={hover3D ? { 
        rotateY: 5,
        rotateX: 5,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.35)"
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Enhanced Inner Glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400/10 to-transparent pointer-events-none" />
      
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      {/* Animated Scanning Line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Enhanced Corner Accents with Glow */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/80 rounded-tl shadow-lg shadow-green-400/30" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/80 rounded-tr shadow-lg shadow-green-400/30" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/80 rounded-bl shadow-lg shadow-green-400/30" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/80 rounded-br shadow-lg shadow-green-400/30" />
      
      {/* Corner Dots */}
      <div className="absolute top-1 left-1 w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
      <div className="absolute top-1 right-1 w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
      <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
      <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
      
      {/* Holographic Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent rounded-xl"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
};

export default GlassmorphismPanel;