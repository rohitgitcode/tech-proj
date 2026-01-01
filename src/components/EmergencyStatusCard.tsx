import { Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Phone, MapPin, Bell } from 'lucide-react';

interface StatusItem {
  id: string;
  label: string;
  icon: 'phone' | 'location' | 'alert';
  status: 'pending' | 'active' | 'complete';
}

interface EmergencyStatusCardProps {
  items: StatusItem[];
}

const iconMap = {
  phone: Phone,
  location: MapPin,
  alert: Bell,
};

const EmergencyStatusCard = ({ items }: EmergencyStatusCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-4 space-y-3">
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        
        return (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
              item.status === 'active' && 'bg-destructive/20',
              item.status === 'complete' && 'bg-primary/20',
              item.status === 'pending' && 'bg-muted/50'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                item.status === 'active' && 'bg-destructive text-destructive-foreground emergency-flash',
                item.status === 'complete' && 'bg-primary text-primary-foreground',
                item.status === 'pending' && 'bg-muted text-muted-foreground'
              )}
            >
              <Icon size={20} />
            </div>

            {/* Label */}
            <span
              className={cn(
                'flex-1 font-medium text-sm',
                item.status === 'pending' && 'text-muted-foreground'
              )}
            >
              {item.label}
            </span>

            {/* Status indicator */}
            <div className="w-6 h-6 flex items-center justify-center">
              {item.status === 'active' && (
                <Loader2 size={18} className="animate-spin text-destructive" />
              )}
              {item.status === 'complete' && (
                <Check size={18} className="text-primary" />
              )}
              {item.status === 'pending' && (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmergencyStatusCard;
