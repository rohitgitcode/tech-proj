import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  MapPin,
  Bell,
  Shield,
  ChevronRight,
  HelpCircle,
  Lock,
  LogOut,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/BottomNav';

interface ToggleItemProps {
  icon: React.ElementType;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const ToggleItem = ({ icon: Icon, label, description, enabled, onToggle }: ToggleItemProps) => (
  <div className="bg-card rounded-2xl p-4 flex items-center gap-4">
    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
      <Icon size={24} className="text-muted-foreground" />
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-foreground">{label}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={cn(
        'w-12 h-7 rounded-full transition-all duration-200 flex items-center px-0.5',
        enabled ? 'bg-primary' : 'bg-muted'
      )}
    >
      <div
        className={cn(
          'w-6 h-6 rounded-full bg-white shadow transition-transform duration-200',
          enabled ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  </div>
);

interface PermissionItemProps {
  label: string;
  granted: boolean;
}

const PermissionItem = ({ label, granted }: PermissionItemProps) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-foreground">{label}</span>
    <div className={cn(
      'w-6 h-6 rounded-full flex items-center justify-center',
      granted ? 'bg-primary/20' : 'bg-destructive/20'
    )}>
      {granted ? (
        <Check size={14} className="text-primary" />
      ) : (
        <X size={14} className="text-destructive" />
      )}
    </div>
  </div>
);

const Profile = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    autoCall: true,
    shareLiveLocation: true,
    nearbyAlerts: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card px-6 pt-12 pb-6">
        <h1 className="text-xl font-bold text-foreground mb-6">Profile</h1>

        {/* User Card */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={32} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Sarah Johnson</h2>
            <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center touch-feedback">
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Safety Settings */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Safety Settings</h2>
        <div className="space-y-3">
          <ToggleItem
            icon={Phone}
            label="Auto-call on SOS"
            description="Automatically call first contact"
            enabled={settings.autoCall}
            onToggle={() => toggleSetting('autoCall')}
          />
          <ToggleItem
            icon={MapPin}
            label="Share live location"
            description="Share location with contacts during SOS"
            enabled={settings.shareLiveLocation}
            onToggle={() => toggleSetting('shareLiveLocation')}
          />
          <ToggleItem
            icon={Bell}
            label="Nearby safety alerts"
            description="Get notified of incidents nearby"
            enabled={settings.nearbyAlerts}
            onToggle={() => toggleSetting('nearbyAlerts')}
          />
        </div>
      </div>

      {/* Permissions */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Permissions</h2>
        <div className="bg-card rounded-2xl p-4">
          <PermissionItem label="Location" granted={true} />
          <PermissionItem label="Notifications" granted={true} />
          <PermissionItem label="Camera" granted={true} />
          <PermissionItem label="Microphone" granted={false} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">More</h2>
        <div className="space-y-2">
          <button
            onClick={() => navigate('/contacts')}
            className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 touch-feedback"
          >
            <Shield size={20} className="text-muted-foreground" />
            <span className="flex-1 text-left text-foreground">Emergency Contacts</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          <button className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 touch-feedback">
            <Lock size={20} className="text-muted-foreground" />
            <span className="flex-1 text-left text-foreground">Privacy Settings</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          <button className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 touch-feedback">
            <HelpCircle size={20} className="text-muted-foreground" />
            <span className="flex-1 text-left text-foreground">Help & Support</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          <button className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 touch-feedback">
            <LogOut size={20} className="text-destructive" />
            <span className="flex-1 text-left text-destructive">Log Out</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
