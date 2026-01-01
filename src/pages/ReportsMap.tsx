import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, X, MapPin, Clock, CheckCircle, Moon, Lightbulb, TreePine, AlertTriangle } from 'lucide-react';
import MapPlaceholder from '@/components/MapPlaceholder';
import { mockReports } from '@/mock/data';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/BottomNav';
import type { Report } from '@/mock/data';

const filterOptions = ['All', 'Dark areas', 'Broken lights', 'Isolated', 'Harassment'];

const typeIcons = {
  'dark-alley': Moon,
  'broken-light': Lightbulb,
  'isolated': TreePine,
  'harassment': AlertTriangle,
};

const typeLabels = {
  'dark-alley': 'Dark Alley',
  'broken-light': 'Broken Streetlight',
  'isolated': 'Isolated Area',
  'harassment': 'Harassment Report',
};

const ReportsMap = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const Icon = selectedReport ? typeIcons[selectedReport.type] : null;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Map */}
      <div className="absolute inset-0">
        <MapPlaceholder showRiskZones className="h-full" />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 pt-12">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-card/95 backdrop-blur-lg flex items-center justify-center shadow-card touch-feedback"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-foreground bg-card/95 backdrop-blur-lg px-4 py-2 rounded-full shadow-card">
            Community Reports
          </h1>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all touch-feedback',
                activeFilter === filter
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/95 backdrop-blur-lg text-foreground shadow-card'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Report Pins (clickable areas) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {mockReports.map((report, index) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report)}
            className="pointer-events-auto absolute w-10 h-10 rounded-full flex items-center justify-center touch-feedback"
            style={{
              left: `${25 + (index * 18)}%`,
              top: `${35 + (index * 12)}%`,
              background: report.type === 'harassment' ? 'hsl(var(--destructive))' : 'hsl(var(--warning))',
            }}
          >
            <MapPin size={20} className="text-white" />
          </button>
        ))}
      </div>

      {/* Selected Report Card */}
      {selectedReport && Icon && (
        <div className="absolute bottom-28 left-4 right-4 z-30">
          <div className="bg-card rounded-2xl p-4 shadow-card slide-up">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  selectedReport.type === 'harassment' ? 'bg-destructive/20' : 'bg-warning/20'
                )}>
                  <Icon
                    size={24}
                    className={selectedReport.type === 'harassment' ? 'text-destructive' : 'text-warning'}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {typeLabels[selectedReport.type]}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedReport.location}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center touch-feedback"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{selectedReport.time}</span>
              </div>
              {selectedReport.verified && (
                <div className="flex items-center gap-1 text-primary">
                  <CheckCircle size={14} />
                  <span>Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default ReportsMap;
