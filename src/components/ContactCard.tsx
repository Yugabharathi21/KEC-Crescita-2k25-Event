import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, User } from 'lucide-react';
import GlassmorphismPanel from './GlassmorphismPanel';

interface Contact {
  name: string;
  position: string;
  phone: string;
  email: string;
}

interface ContactCardProps {
  contact: Contact;
  index: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative h-64 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <GlassmorphismPanel className="p-6 h-full flex flex-col justify-center items-center text-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/30 to-green-600/20 
                         border-2 border-green-500/50 flex items-center justify-center mb-4"
              whileHover={{ scale: 1.1 }}
            >
              <User className="w-10 h-10 text-green-400" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-green-300 mb-2 font-mono">
              {contact.name}
            </h3>
            
            <p className="text-green-200/80 text-sm mb-4">
              {contact.position}
            </p>
            
            <div className="text-xs text-green-400/60 font-mono">
              Click to reveal contact
            </div>

            {/* Corner indicators */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400/60 rounded-full animate-pulse" />
          </GlassmorphismPanel>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <GlassmorphismPanel className="p-6 h-full flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-green-400/80 font-mono">PHONE</p>
                  <p className="text-green-300 font-mono font-bold">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-green-400/80 font-mono">EMAIL</p>
                  <p className="text-green-300 font-mono text-sm break-all">{contact.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-green-400/60 font-mono text-center">
              Click to flip back
            </div>
          </GlassmorphismPanel>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactCard;