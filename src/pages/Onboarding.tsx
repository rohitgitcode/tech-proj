import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, Users, ChevronRight, Bell, Camera, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    icon: MapPin,
    title: 'Safe Routes',
    description: 'Navigate through well-lit, crowded streets. We analyze real-time safety data to guide you home safely.',
    color: 'text-primary',
    bgColor: 'bg-primary/20',
  },
  {
    icon: Shield,
    title: 'SOS Protection',
    description: 'One tap alerts your emergency contacts, shares your live location, and connects you with help instantly.',
    color: 'text-destructive',
    bgColor: 'bg-destructive/20',
  },
  {
    icon: Users,
    title: 'Community Safety',
    description: 'Report unsafe areas and help other women stay safe. Together, we create safer neighborhoods.',
    color: 'text-warning',
    bgColor: 'bg-warning/20',
  },
];

const permissions = [
  { icon: MapPin, label: 'Location', description: 'To show safe routes and share location in emergencies' },
  { icon: Bell, label: 'Notifications', description: 'To alert you about nearby safety concerns' },
  { icon: Camera, label: 'Camera', description: 'To capture evidence when reporting unsafe areas' },
  { icon: Mic, label: 'Microphone', description: 'For voice-activated SOS in emergencies' },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPermissions, setShowPermissions] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setShowPermissions(true);
    }
  };

  const handleComplete = () => {
    navigate('/login');
  };

  if (showPermissions) {
    return (
      <div className="min-h-screen bg-background flex flex-col px-6 py-12 safe-area-inset">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Enable Permissions
          </h1>
          <p className="text-muted-foreground mb-8">
            These permissions help keep you safe
          </p>

          <div className="space-y-4">
            {permissions.map((perm) => {
              const Icon = perm.icon;
              return (
                <div
                  key={perm.label}
                  className="bg-card rounded-2xl p-4 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{perm.label}</h3>
                    <p className="text-sm text-muted-foreground">{perm.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleComplete}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg touch-feedback mt-8"
        >
          Continue
        </button>
      </div>
    );
  }

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-6">
        <button
          onClick={() => navigate('/login')}
          className="text-muted-foreground text-sm touch-feedback"
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Icon */}
        <div className={cn('w-32 h-32 rounded-full flex items-center justify-center mb-8 animate-float', slide.bgColor)}>
          <Icon size={64} className={slide.color} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-foreground mb-4">{slide.title}</h1>

        {/* Description */}
        <p className="text-muted-foreground text-lg leading-relaxed max-w-xs">
          {slide.description}
        </p>
      </div>

      {/* Bottom navigation */}
      <div className="p-6">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentSlide ? 'w-8 bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 touch-feedback"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
