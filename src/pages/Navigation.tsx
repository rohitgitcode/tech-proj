import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Volume2, AlertTriangle, ArrowUp, CornerUpLeft, CornerUpRight, MapPin } from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import SOSButton from '@/components/SOSButton';
import SafetyScoreBadge from '@/components/SafetyScoreBadge';
import { mockNavigationSteps } from '@/mock/data';

const directionIcons = {
  straight: ArrowUp,
  left: CornerUpLeft,
  right: CornerUpRight,
  destination: MapPin,
};

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.state?.route;
  const [currentStep, setCurrentStep] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  const step = mockNavigationSteps[currentStep];
  const DirectionIcon = directionIcons[step.direction];

  // Simulate navigation progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < mockNavigationSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentStep]);

  // Show warning for steps with warnings
  useEffect(() => {
    if (step.warning) {
      setShowWarning(true);
      const timer = setTimeout(() => setShowWarning(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, step.warning]);

  const handleEndNavigation = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Map */}
      <div className="absolute inset-0">
        <MapPlaceholder
          showRiskZones
          showRoutes
          selectedRoute={route?.type || 'safest'}
        />
      </div>

      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pt-12 flex items-center justify-between">
        <button
          onClick={handleEndNavigation}
          className="w-12 h-12 rounded-full bg-card/95 backdrop-blur-lg flex items-center justify-center shadow-card touch-feedback"
        >
          <X size={24} />
        </button>

        <div className="bg-card/95 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2 shadow-card">
          <SafetyScoreBadge score={route?.safetyScore || 92} size="sm" />
        </div>

        <button className="w-12 h-12 rounded-full bg-card/95 backdrop-blur-lg flex items-center justify-center shadow-card touch-feedback">
          <Volume2 size={20} />
        </button>
      </div>

      {/* Safety Warning */}
      {showWarning && step.warning && (
        <div className="absolute top-28 left-4 right-4 z-30 fade-in">
          <div className="bg-warning/90 backdrop-blur-lg rounded-2xl p-4 flex items-center gap-3">
            <AlertTriangle size={24} className="text-warning-foreground flex-shrink-0" />
            <span className="font-medium text-warning-foreground">{step.warning}</span>
          </div>
        </div>
      )}

      {/* Navigation Card */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-card rounded-t-3xl shadow-bottom-sheet">
          {/* Drag handle */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 bg-muted-foreground/30 rounded-full" />
          </div>

          {/* Current instruction */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <DirectionIcon size={32} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-foreground">{step.distance}</p>
                <p className="text-muted-foreground">{step.instruction}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-muted rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentStep + 1) / mockNavigationSteps.length) * 100}%` }}
              />
            </div>

            {/* ETA and distance */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <span>{route?.duration || '28 min'} remaining</span>
              <span>{route?.distance || '2.3 km'} left</span>
            </div>

            {/* SOS Button */}
            <div className="flex justify-center">
              <SOSButton size="large" />
            </div>
          </div>

          {/* Safe area padding */}
          <div className="h-8 bg-card" />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
