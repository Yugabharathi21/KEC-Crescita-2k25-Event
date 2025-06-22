import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import * as Icons from 'lucide-react';
import GlassmorphismPanel from './GlassmorphismPanel';

interface TimelineEvent {
  title: string;
  type: string;
  description: string;
  time: string;
  icon: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent || Clock;
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 font-mono text-green-400"
        >
          Event Schedule
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 to-green-600 rounded-full opacity-30" />

          {events.map((event, index) => {
            const IconComponent = getIcon(event.icon);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 
                               border-4 border-black shadow-lg shadow-green-500/30 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="w-6 h-6 text-black" />
                  </motion.div>
                </div>

                {/* Event Card */}
                <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
                  <GlassmorphismPanel className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-green-300 font-mono">
                        {event.title}
                      </h3>
                      <span className="text-green-400 font-mono font-bold text-sm bg-green-500/10 px-2 py-1 rounded">
                        {event.time}
                      </span>
                    </div>
                    
                    <p className="text-green-200/80 text-sm mb-3 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <span className="text-green-400/80 text-xs font-mono bg-green-500/5 px-2 py-1 rounded">
                      {event.type}
                    </span>
                  </GlassmorphismPanel>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;