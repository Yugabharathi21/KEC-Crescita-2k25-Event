import React from 'react';
import { motion } from 'framer-motion';
import { Code, Heart, Terminal } from 'lucide-react';
import GlassmorphismPanel from './GlassmorphismPanel';

interface FooterProps {
  developers: {
    designed_by: string[];
    developed_by: string[];
    copyright: string;
  };
}

const Footer: React.FC<FooterProps> = ({ developers }) => {
  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <GlassmorphismPanel className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo Section */}
            <div className="text-center md:text-left">
              <motion.div
                className="flex items-center justify-center md:justify-start space-x-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Terminal className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-xl font-bold font-mono text-green-400">CRESCITA'25</h3>
                  <p className="text-xs text-green-300/70 font-mono">Tech Symposium</p>
                </div>
              </motion.div>
            </div>

            {/* Developer Credits */}
            <div className="text-center">
              <div className="space-y-3">
                <div>
                  <p className="text-green-400/80 text-sm font-mono mb-1">DESIGNED BY</p>
                  <div className="flex justify-center items-center space-x-2">
                    <Code className="w-4 h-4 text-green-400" />
                    <p className="text-green-300 font-mono text-sm">
                      {developers.designed_by.join(' & ')}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-green-400/80 text-sm font-mono mb-1">DEVELOPED BY</p>
                  <div className="flex justify-center items-center space-x-2">
                    <Terminal className="w-4 h-4 text-green-400" />
                    <p className="text-green-300 font-mono text-sm">
                      {developers.developed_by.join(' & ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                <span className="text-green-300 font-mono">Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5 text-red-400 fill-current" />
                </motion.div>
              </div>
              <p className="text-green-400/80 font-mono text-sm">
                {developers.copyright}
              </p>
              <p className="text-green-300/60 font-mono text-xs mt-1">
                Department of CSE, KEC
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
        </GlassmorphismPanel>
      </div>

      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border border-green-500 rounded-full" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border border-green-500 rounded-lg rotate-45" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 border border-green-500 rounded-full" />
      </div>
    </footer>
  );
};

export default Footer;