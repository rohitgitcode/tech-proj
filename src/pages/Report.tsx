import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Check, Moon, Lightbulb, TreePine, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const reportTypes = [
  { id: 'dark-alley', label: 'Dark Alley', icon: Moon, color: 'text-muted-foreground' },
  { id: 'broken-light', label: 'Broken Streetlight', icon: Lightbulb, color: 'text-warning' },
  { id: 'isolated', label: 'Isolated Area', icon: TreePine, color: 'text-muted-foreground' },
  { id: 'harassment', label: 'Harassment', icon: AlertTriangle, color: 'text-destructive' },
];

const Report = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedType) {
      setSubmitted(true);
      setTimeout(() => navigate('/home'), 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 animate-scale-in">
          <Check size={48} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          Report Submitted
        </h1>
        <p className="text-muted-foreground text-center">
          Thank you for helping keep our community safe.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-card px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center touch-feedback"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Report Unsafe Area</h1>
            <p className="text-sm text-muted-foreground">Help others stay safe</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Report Type Selection */}
        <h2 className="text-lg font-semibold text-foreground mb-4">What did you notice?</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={cn(
                  'p-4 rounded-2xl text-left transition-all duration-200 touch-feedback',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-foreground'
                )}
              >
                <Icon
                  size={24}
                  className={cn(
                    'mb-2',
                    isSelected ? 'text-primary-foreground' : type.color
                  )}
                />
                <span className="font-medium text-sm">{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Location */}
        <div className="bg-card rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <MapPin size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Current location</p>
              <p className="font-medium text-foreground">Downtown District, Block A</p>
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <button
          onClick={() => setHasPhoto(!hasPhoto)}
          className={cn(
            'w-full rounded-2xl p-4 flex items-center justify-center gap-3 mb-4 border-2 border-dashed transition-all',
            hasPhoto
              ? 'bg-primary/10 border-primary'
              : 'bg-card border-border'
          )}
        >
          <Camera size={24} className={hasPhoto ? 'text-primary' : 'text-muted-foreground'} />
          <span className={hasPhoto ? 'text-primary font-medium' : 'text-muted-foreground'}>
            {hasPhoto ? 'Photo added' : 'Add photo (optional)'}
          </span>
          {hasPhoto && <Check size={20} className="text-primary" />}
        </button>

        {/* Notes */}
        <div className="bg-card rounded-2xl p-4 mb-6">
          <label className="text-sm text-muted-foreground block mb-2">
            Additional notes (optional)
          </label>
          <textarea
            placeholder="Describe the situation..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg touch-feedback disabled:opacity-50"
        >
          Submit Report
        </button>

        {/* Info */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Reports are reviewed within 24 hours. False reports may result in account suspension.
        </p>
      </div>
    </div>
  );
};

export default Report;
