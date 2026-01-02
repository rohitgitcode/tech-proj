import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-8 rounded-full bg-gradient-to-r from-secondary to-muted p-1 touch-feedback overflow-hidden"
      whileTap={{ scale: 0.95 }}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark 
            ? 'linear-gradient(135deg, hsl(230 40% 20%) 0%, hsl(270 30% 25%) 100%)'
            : 'linear-gradient(135deg, hsl(45 100% 80%) 0%, hsl(35 100% 70%) 100%)',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Toggle knob */}
      <motion.div
        className="relative w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
        animate={{
          x: isDark ? 0 : 24,
          backgroundColor: isDark ? 'hsl(230 30% 30%)' : 'hsl(45 100% 95%)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon size={14} className="text-purple" />
          ) : (
            <Sun size={14} className="text-warning" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Stars (visible in dark mode) */}
      <motion.div
        className="absolute top-1 right-2"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-1 h-1 rounded-full bg-white/60" />
      </motion.div>
      <motion.div
        className="absolute bottom-1.5 right-4"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <div className="w-0.5 h-0.5 rounded-full bg-white/40" />
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
