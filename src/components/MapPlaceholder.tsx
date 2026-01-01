import { MapPin } from 'lucide-react';
import { mockRiskZones } from '@/mock/data';
import { cn } from '@/lib/utils';

interface MapPlaceholderProps {
  showRiskZones?: boolean;
  showRoutes?: boolean;
  selectedRoute?: 'safest' | 'balanced' | 'fastest';
  className?: string;
}

const MapPlaceholder = ({ 
  showRiskZones = false, 
  showRoutes = false,
  selectedRoute,
  className 
}: MapPlaceholderProps) => {
  return (
    <div className={cn('relative w-full h-full bg-secondary overflow-hidden', className)}>
      {/* Mock map grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Mock streets */}
      <div className="absolute inset-0">
        {/* Horizontal roads */}
        <div className="absolute top-1/4 left-0 right-0 h-8 bg-muted/40" />
        <div className="absolute top-1/2 left-0 right-0 h-10 bg-muted/50" />
        <div className="absolute top-3/4 left-0 right-0 h-6 bg-muted/40" />
        
        {/* Vertical roads */}
        <div className="absolute left-1/4 top-0 bottom-0 w-8 bg-muted/40" />
        <div className="absolute left-1/2 top-0 bottom-0 w-10 bg-muted/50" />
        <div className="absolute left-3/4 top-0 bottom-0 w-6 bg-muted/40" />
      </div>

      {/* Route lines */}
      {showRoutes && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Safest route - teal */}
          <path
            d="M 50 350 Q 100 200 200 180 Q 300 160 350 50"
            fill="none"
            stroke={selectedRoute === 'safest' ? 'hsl(162 73% 45%)' : 'hsl(162 73% 45% / 0.4)'}
            strokeWidth={selectedRoute === 'safest' ? 6 : 4}
            strokeLinecap="round"
            strokeDasharray={selectedRoute === 'safest' ? 'none' : '8 8'}
          />
          
          {/* Balanced route - yellow */}
          <path
            d="M 50 350 Q 150 280 180 150 Q 200 80 350 50"
            fill="none"
            stroke={selectedRoute === 'balanced' ? 'hsl(47 90% 57%)' : 'hsl(47 90% 57% / 0.4)'}
            strokeWidth={selectedRoute === 'balanced' ? 6 : 4}
            strokeLinecap="round"
            strokeDasharray={selectedRoute === 'balanced' ? 'none' : '8 8'}
          />
          
          {/* Fastest route - red */}
          <path
            d="M 50 350 Q 100 200 180 120 Q 250 50 350 50"
            fill="none"
            stroke={selectedRoute === 'fastest' ? 'hsl(355 75% 55%)' : 'hsl(355 75% 55% / 0.4)'}
            strokeWidth={selectedRoute === 'fastest' ? 6 : 4}
            strokeLinecap="round"
            strokeDasharray={selectedRoute === 'fastest' ? 'none' : '8 8'}
          />
        </svg>
      )}

      {/* Risk zones */}
      {showRiskZones && mockRiskZones.map((zone, index) => (
        <div
          key={zone.id}
          className={cn(
            'absolute w-16 h-16 rounded-full flex items-center justify-center',
            zone.type === 'high' ? 'risk-high' : 'risk-medium'
          )}
          style={{
            left: `${20 + (index * 20)}%`,
            top: `${30 + (index * 15)}%`,
          }}
        >
          <MapPin 
            size={20} 
            className={zone.type === 'high' ? 'text-destructive' : 'text-warning'} 
          />
        </div>
      ))}

      {/* Current location marker */}
      <div className="absolute bottom-20 left-8">
        <div className="relative">
          <div className="w-5 h-5 bg-primary rounded-full border-3 border-foreground shadow-glow-teal" />
          <div className="absolute inset-0 w-5 h-5 bg-primary rounded-full animate-ping opacity-50" />
        </div>
      </div>

      {/* Destination marker */}
      {showRoutes && (
        <div className="absolute top-8 right-12">
          <div className="flex flex-col items-center">
            <MapPin size={32} className="text-primary fill-primary" />
            <span className="text-xs font-medium bg-card px-2 py-0.5 rounded mt-1">
              Destination
            </span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="map-gradient-overlay absolute inset-0 pointer-events-none" />
    </div>
  );
};

export default MapPlaceholder;
