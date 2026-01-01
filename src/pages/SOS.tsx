import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, X } from 'lucide-react';
import EmergencyStatusCard from '@/components/EmergencyStatusCard';
import { mockContacts } from '@/mock/data';

const SOS = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState(['', '', '', '']);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [statusItems, setStatusItems] = useState<Array<{ id: string; label: string; icon: 'phone' | 'location' | 'alert'; status: 'pending' | 'active' | 'complete' }>>([
    { id: 'calling', label: 'Calling emergency contacts...', icon: 'phone', status: 'active' },
    { id: 'location', label: 'Sharing live location...', icon: 'location', status: 'pending' },
    { id: 'alert', label: 'Alerting nearby help...', icon: 'alert', status: 'pending' },
  ]);

  // Simulate status progression
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatusItems((prev) =>
        prev.map((item) =>
          item.id === 'calling' ? { ...item, status: 'complete' as const } :
          item.id === 'location' ? { ...item, status: 'active' as const } : item
        )
      );
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatusItems((prev) =>
        prev.map((item) =>
          item.id === 'location' ? { ...item, status: 'complete' as const } :
          item.id === 'alert' ? { ...item, status: 'active' as const } : item
        )
      );
    }, 4000);

    const timer3 = setTimeout(() => {
      setStatusItems((prev) =>
        prev.map((item) =>
          item.id === 'alert' ? { ...item, status: 'complete' as const } : item
        )
      );
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handlePinChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        const nextInput = document.getElementById(`cancel-pin-${index + 1}`);
        nextInput?.focus();
      }

      // Check if PIN is complete
      if (index === 3 && value) {
        // Mock correct PIN is 1234
        const enteredPin = [...newPin.slice(0, 3), value].join('');
        if (enteredPin === '1234') {
          navigate('/home');
        } else {
          setPin(['', '', '', '']);
          const firstInput = document.getElementById('cancel-pin-0');
          firstInput?.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`cancel-pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-destructive relative overflow-hidden">
      {/* Pulsing background */}
      <div className="absolute inset-0 emergency-flash opacity-30" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-destructive-foreground/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <ShieldAlert size={48} className="text-destructive-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-destructive-foreground mb-2">
            Emergency Mode Active
          </h1>
          <p className="text-destructive-foreground/80">
            Help is on the way. Stay calm.
          </p>
        </div>

        {/* Status Updates */}
        <div className="flex-1">
          <EmergencyStatusCard items={statusItems} />

          {/* Contacts being notified */}
          <div className="mt-4 bg-card rounded-2xl p-4">
            <h3 className="font-semibold text-foreground mb-3">Contacts notified</h3>
            <div className="space-y-2">
              {mockContacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary status-dot" />
                  <span className="text-sm text-muted-foreground">{contact.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="mt-6">
          {showCancelDialog ? (
            <div className="bg-card rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">Enter PIN to cancel</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your 4-digit PIN to cancel the alert
              </p>
              <div className="flex gap-3 justify-center mb-4">
                {pin.map((digit, index) => (
                  <input
                    key={index}
                    id={`cancel-pin-${index}`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 bg-secondary border-2 border-border rounded-xl text-center text-xl font-bold text-foreground focus:border-primary focus:outline-none"
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  setShowCancelDialog(false);
                  setPin(['', '', '', '']);
                }}
                className="text-muted-foreground text-sm touch-feedback"
              >
                Keep alert active
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowCancelDialog(true)}
              className="w-full bg-card text-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 touch-feedback"
            >
              <X size={20} />
              Cancel Emergency
            </button>
          )}
        </div>

        {/* Reassurance */}
        <p className="text-center text-sm text-destructive-foreground/60 mt-4">
          Your location is being shared in real-time
        </p>
      </div>
    </div>
  );
};

export default SOS;
