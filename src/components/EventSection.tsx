import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import GlassmorphismPanel from './GlassmorphismPanel';
import * as Icons from 'lucide-react';

interface Event {
  title: string;
  type: string;
  description: string;
  time: string;
  icon: string;
  status?: string;
}

interface EventSectionProps {
  title: string;
  events: Event[];
  className?: string;
}

const EventSection: React.FC<EventSectionProps> = ({ title, events, className = '' }) => {
  const getIcon = (iconName: string): LucideIcon => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
    return IconComponent || Icons.Calendar;
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 font-mono text-green-400 
                     relative before:absolute before:inset-0 before:animate-pulse 
                     before:text-green-500/30 before:content-[attr(data-text)] before:-z-10"
          data-text={title}
        >
          {title}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => {
            const IconComponent = getIcon(event.icon);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassmorphismPanel className="p-6 h-full group cursor-pointer">
                  <div className="relative">
                    {/* Event Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 
                                   border border-green-500/30 group-hover:shadow-lg group-hover:shadow-green-500/30"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <IconComponent className="w-8 h-8 text-green-400" />
                      </motion.div>
                      
                      {event.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                          event.status === 'Open' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {event.status}
                        </span>
                      )}
                    </div>

                    {/* Event Details */}
                    <h3 className="text-xl font-bold text-green-300 mb-2 font-mono">
                      {event.title}
                    </h3>
                    
                    <p className="text-green-200/80 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Event Type and Time */}
                    <div className="flex justify-between items-center pt-4 border-t border-green-500/20">
                      <span className="text-green-400/80 text-sm font-mono">
                        {event.type}
                      </span>
                      <span className="text-green-300 font-bold font-mono bg-green-500/10 px-2 py-1 rounded">
                        {event.time}
                      </span>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-400/5 to-transparent 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </GlassmorphismPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventSection;