import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SafetyScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const SafetyScoreBadge = ({ score, size = 'md', showLabel = false }: SafetyScoreBadgeProps) => {
  const getScoreLevel = () => {
    if (score >= 80) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const level = getScoreLevel();

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-semibold',
        sizeClasses[size],
        level === 'high' && 'safety-badge-high',
        level === 'medium' && 'safety-badge-medium',
        level === 'low' && 'safety-badge-low'
      )}
    >
      <Shield size={iconSizes[size]} />
      <span>{score}</span>
      {showLabel && <span className="font-normal ml-1">Safety</span>}
    </div>
  );
};

export default SafetyScoreBadge;
