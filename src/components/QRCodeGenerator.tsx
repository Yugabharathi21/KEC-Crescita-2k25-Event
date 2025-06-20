import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { motion } from 'framer-motion';

interface QRCodeGeneratorProps {
  url: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        color: {
          dark: '#00ff41',
          light: '#000000'
        },
        errorCorrectionLevel: 'M'
      });
    }
  }, [url]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <motion.canvas
        ref={canvasRef}
        animate={{ 
          boxShadow: [
            '0 0 20px #00ff41', 
            '0 0 30px #00ff41', 
            '0 0 20px #00ff41'
          ] 
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="border-2 border-green-500 rounded-lg"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="terminal-text text-sm mt-2"
      >
        SCAN TO ACCESS
      </motion.div>
    </motion.div>
  );
};

export default QRCodeGenerator;