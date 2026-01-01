import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, ChevronRight, Shield, AlertTriangle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import SOSButton from '@/components/SOSButton';

const recentDestinations = [
  { id: '1', name: 'Home', address: '123 Oak Street', time: '25 min' },
  { id: '2', name: 'Work', address: '456 Business Ave', time: '35 min' },
  { id: '3', name: "Sarah's Place", address: '789 Friend Lane', time: '15 min' },
];

const safetyTips = [
  { icon: Shield, text: 'Share your location with trusted contacts before walking at night' },
  { icon: AlertTriangle, text: '3 unsafe areas reported near your usual route today' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Good evening</p>
            <h1 className="text-2xl font-bold text-foreground">Stay safe tonight</h1>
          </div>
          <SOSButton size="default" />
        </div>

        {/* Search Bar */}
        <button
          onClick={() => navigate('/map')}
          className="w-full bg-secondary rounded-2xl p-4 flex items-center gap-3 touch-feedback"
        >
          <Search size={20} className="text-muted-foreground" />
          <span className="text-muted-foreground text-left flex-1">Where are you going?</span>
          <ChevronRight size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Current Location Card */}
      <div className="px-6 py-4">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Current Location</h3>
              <p className="text-sm text-muted-foreground">Downtown District, Block A</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full">
              <Shield size={14} />
              <span>Safe Area</span>
            </div>
            <span className="text-muted-foreground">Safety Score: 85</span>
          </div>
        </div>
      </div>

      {/* Safety Tips */}
      <div className="px-6 py-2">
        <div className="space-y-3">
          {safetyTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-3 flex items-start gap-3"
              >
                <Icon
                  size={18}
                  className={index === 0 ? 'text-primary' : 'text-warning'}
                />
                <p className="text-sm text-muted-foreground flex-1">{tip.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Destinations */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Destinations</h2>
        <div className="space-y-3">
          {recentDestinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => navigate('/map')}
              className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 touch-feedback text-left"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <MapPin size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground">{dest.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{dest.address}</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock size={16} />
                <span className="text-sm">{dest.time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/contacts')}
            className="bg-card rounded-2xl p-4 text-left touch-feedback"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Shield size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">Emergency Contacts</h3>
            <p className="text-xs text-muted-foreground mt-1">4 contacts set</p>
          </button>
          <button
            onClick={() => navigate('/report')}
            className="bg-card rounded-2xl p-4 text-left touch-feedback"
          >
            <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center mb-3">
              <AlertTriangle size={20} className="text-warning" />
            </div>
            <h3 className="font-semibold text-foreground text-sm">Report Area</h3>
            <p className="text-xs text-muted-foreground mt-1">Help others stay safe</p>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
