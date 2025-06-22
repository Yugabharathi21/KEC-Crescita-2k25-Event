import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Calendar, Users, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: 'Events', icon: Calendar, href: '#events' },
    { name: 'Schedule', icon: Terminal, href: '#schedule' },
    { name: 'Contact', icon: Phone, href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/30 border-b border-green-500/30"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Terminal className="w-8 h-8 text-green-400" />
              <motion.div
                className="absolute inset-0 bg-green-400/20 rounded-full blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-mono text-green-400">CRESCITA'25</h1>
              <p className="text-xs text-green-300/70 font-mono">Kongu Engineering College</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-green-300 hover:text-green-400 
                           transition-colors duration-300 font-mono text-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </div>

          {/* System Time */}
          <div className="text-green-400 font-mono text-sm">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>{time.toLocaleTimeString()}</span>
            </div>
            <div className="text-xs text-green-300/70 text-right">
              SYSTEM ONLINE
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;