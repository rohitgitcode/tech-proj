import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: { icon: 24, container: 40, text: 'text-lg' },
  md: { icon: 30, container: 56, text: 'text-2xl' },
  lg: { icon: 40, container: 72, text: 'text-3xl' },
};

const Logo = ({ size = 'md', showText = true }: LogoProps) => {
  const { icon, container, text } = sizes[size];

  return (
    <motion.div 
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative rounded-2xl bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center overflow-hidden"
        style={{ width: container, height: container }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/50 to-transparent"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Shield icon */}
        <motion.div
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Shield size={icon} className="text-primary relative z-10" />
        </motion.div>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-primary/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      </motion.div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gradient ${text}`}>SafeRoute</span>
          <span className="text-xs text-muted-foreground -mt-1">Your safety companion</span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
