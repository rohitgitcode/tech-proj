import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, ChevronRight, Shield, AlertTriangle, Sparkles, Navigation2, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import SOSButton from '@/components/SOSButton';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import PageTransition from '@/components/PageTransition';
import heroCity from '@/assets/hero-city.png';
import safeWalking from '@/assets/safe-walking.png';

const recentDestinations = [
  { id: '1', name: 'Home', address: '123 Oak Street', time: '25 min', icon: '🏠' },
  { id: '2', name: 'Work', address: '456 Business Ave', time: '35 min', icon: '💼' },
  { id: '3', name: "Sarah's Place", address: '789 Friend Lane', time: '15 min', icon: '👩' },
];

const safetyTips = [
  { icon: Shield, text: 'Share your location with trusted contacts before walking at night', type: 'tip' },
  { icon: AlertTriangle, text: '3 unsafe areas reported near your usual route today', type: 'warning' },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="orb w-64 h-64 bg-primary/20 -top-20 -left-20" style={{ animationDelay: '0s' }} />
        <div className="orb w-48 h-48 bg-accent/15 top-40 -right-10" style={{ animationDelay: '2s' }} />
        <div className="orb w-32 h-32 bg-purple/10 bottom-40 left-10" style={{ animationDelay: '4s' }} />

        {/* Hero Image Background */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-72 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroCity}
            alt="City at night"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </motion.div>

        {/* Header with Logo and Theme Toggle */}
        <motion.div
          className="relative z-10 px-4 pt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <Logo size="sm" />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SOSButton size="default" />
            </div>
          </div>
          
          <motion.p
            className="text-muted-foreground text-sm flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles size={14} className="text-warning" />
            Good evening
          </motion.p>
          <motion.h1
            className="text-3xl font-bold text-gradient mt-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Stay safe tonight
          </motion.h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="px-4 mt-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => navigate('/map')}
            className="w-full gradient-border rounded-2xl p-4 flex items-center gap-3 touch-feedback"
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Search size={18} className="text-primary" />
            </div>
            <span className="text-muted-foreground text-left flex-1">Where are you going?</span>
            <ChevronRight size={20} className="text-primary" />
          </motion.button>
        </motion.div>

        {/* Safe Walking Feature Card */}
        <motion.div
          className="px-4 py-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="glass-card p-4 flex items-center gap-4 overflow-hidden relative">
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-2">
                <Star size={14} className="text-warning" fill="currentColor" />
                <span className="text-xs text-warning font-medium">Featured</span>
              </div>
              <h3 className="font-bold text-foreground text-lg">Safe Night Walking</h3>
              <p className="text-sm text-muted-foreground mt-1">AI-powered routes that prioritize your safety</p>
              <motion.button
                className="mt-3 text-sm text-primary font-medium flex items-center gap-1"
                whileHover={{ x: 5 }}
              >
                Learn more <ChevronRight size={14} />
              </motion.button>
            </div>
            <div className="w-24 h-24 relative flex-shrink-0">
              <img
                src={safeWalking}
                alt="Safe walking illustration"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            {/* Decorative gradient */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </motion.div>

        {/* Current Location Card */}
        <motion.div
          className="px-4 py-2 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="glass-card p-4 interactive-card">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center icon-glow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin size={22} className="text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Current Location</h3>
                <p className="text-sm text-muted-foreground">Downtown District, Block A</p>
              </div>
              <motion.div
                className="w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary/25 to-primary/15 text-primary rounded-full border border-primary/30">
                <Shield size={14} />
                <span className="font-medium">Safe Area</span>
              </div>
              <span className="text-muted-foreground">Safety Score: <span className="text-primary font-semibold">85</span></span>
            </div>
          </div>
        </motion.div>

        {/* Safety Tips */}
        <motion.div
          className="px-4 py-2 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="space-y-3">
            {safetyTips.map((tip, index) => {
              const Icon = tip.icon;
              const isWarning = tip.type === 'warning';
              return (
                <motion.div
                  key={index}
                  className={`glass-card p-4 flex items-start gap-3 ${isWarning ? 'border-warning/30' : 'border-primary/20'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isWarning 
                      ? 'bg-gradient-to-br from-warning/30 to-warning/10' 
                      : 'bg-gradient-to-br from-primary/30 to-primary/10'
                  }`}>
                    <Icon size={18} className={isWarning ? 'text-warning' : 'text-primary'} />
                  </div>
                  <p className="text-sm text-muted-foreground flex-1 leading-relaxed">{tip.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Destinations */}
        <motion.div
          className="px-4 py-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h2 className="section-title text-foreground mb-4 flex items-center gap-2">
            <Navigation2 size={18} className="text-primary" />
            Recent Destinations
          </h2>
          <div className="space-y-3">
            {recentDestinations.map((dest, index) => (
              <motion.button
                key={dest.id}
                onClick={() => navigate('/map')}
                className="w-full glass-card p-4 flex items-center gap-4 touch-feedback interactive-card text-left"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-muted/50 flex items-center justify-center text-xl">
                  {dest.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{dest.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{dest.address}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 rounded-full">
                  <Clock size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{dest.time}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="px-4 py-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <h2 className="section-title text-foreground mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-warning" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => navigate('/contacts')}
              className="glass-card p-5 text-left touch-feedback interactive-card group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Users size={22} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">Emergency Contacts</h3>
              <p className="text-xs text-muted-foreground mt-1">4 contacts set</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                <span>Manage</span>
                <ChevronRight size={14} />
              </div>
            </motion.button>
            <motion.button
              onClick={() => navigate('/report')}
              className="glass-card p-5 text-left touch-feedback interactive-card group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-warning/30 to-warning/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <AlertTriangle size={22} className="text-warning" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">Report Area</h3>
              <p className="text-xs text-muted-foreground mt-1">Help others stay safe</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-warning">
                <span>Report</span>
                <ChevronRight size={14} />
              </div>
            </motion.button>
          </div>
        </motion.div>

        <BottomNav />
      </div>
    </PageTransition>
  );
};

export default Home;
