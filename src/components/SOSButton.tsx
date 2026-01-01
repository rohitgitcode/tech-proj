import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SOSButtonProps {
  size?: 'default' | 'large';
  className?: string;
}

const SOSButton = ({ size = 'default', className }: SOSButtonProps) => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    // Simulate haptic feedback would go here
    setTimeout(() => {
      navigate('/sos');
    }, 150);
  };

  const sizeClasses = {
    default: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  const iconSize = size === 'large' ? 40 : 28;

  return (
    <button
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handlePress}
      className={cn(
        'relative flex items-center justify-center rounded-full bg-destructive text-destructive-foreground',
        'shadow-glow-danger transition-all duration-150',
        'sos-pulse touch-feedback',
        sizeClasses[size],
        isPressed && 'scale-95',
        className
      )}
      aria-label="SOS Emergency Button"
    >
      {/* Outer ring animation */}
      <span className="absolute inset-0 rounded-full bg-destructive animate-pulse-ring opacity-50" />
      
      {/* Inner button */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <ShieldAlert size={iconSize} strokeWidth={2.5} />
        {size === 'large' && (
          <span className="text-xs font-bold mt-1">SOS</span>
        )}
      </div>
    </button>
  );
};

export default SOSButton;
