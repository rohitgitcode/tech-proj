import { Clock, MapPin, Lightbulb, Users, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Route } from '@/mock/data';
import SafetyScoreBadge from './SafetyScoreBadge';

interface RouteCardProps {
  route: Route;
  isSelected?: boolean;
  onSelect?: () => void;
}

const routeLabels = {
  safest: { label: 'Safest Route', color: 'text-primary' },
  balanced: { label: 'Balanced', color: 'text-warning' },
  fastest: { label: 'Fastest', color: 'text-destructive' },
};

const RouteCard = ({ route, isSelected, onSelect }: RouteCardProps) => {
  const { label, color } = routeLabels[route.type];

  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full p-4 rounded-2xl bg-card transition-all duration-200 touch-feedback text-left',
        route.type === 'safest' && 'route-card-safest',
        route.type === 'balanced' && 'route-card-balanced',
        route.type === 'fastest' && 'route-card-fastest',
        isSelected && 'scale-[1.02]',
        !isSelected && 'opacity-80'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn('font-semibold text-sm', color)}>{label}</span>
          {route.type === 'safest' && (
            <span className="text-xxs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
              Recommended
            </span>
          )}
        </div>
        <SafetyScoreBadge score={route.safetyScore} />
      </div>

      {/* Distance & Duration */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5 text-foreground">
          <MapPin size={16} className="text-muted-foreground" />
          <span className="font-medium">{route.distance}</span>
        </div>
        <div className="flex items-center gap-1.5 text-foreground">
          <Clock size={16} className="text-muted-foreground" />
          <span className="font-medium">{route.duration}</span>
        </div>
      </div>

      {/* Safety Factors */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Lightbulb size={14} />
          <span>{route.lightingScore}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{route.crowdLevel}</span>
        </div>
        {route.incidentCount > 0 && (
          <div className="flex items-center gap-1 text-warning">
            <AlertTriangle size={14} />
            <span>{route.incidentCount} reports</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default RouteCard;
