import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, X, Phone, MapPin, Volume2, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmergencyStatusCard from '@/components/EmergencyStatusCard';
import PageTransition from '@/components/PageTransition';
import { mockContacts } from '@/mock/data';

const SOS = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState(['', '', '', '']);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [alarmActive, setAlarmActive] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);
  const [statusItems, setStatusItems] = useState<Array<{ id: string; label: string; icon: 'phone' | 'location' | 'alert'; status: 'pending' | 'active' | 'complete' }>>([
    { id: 'calling', label: 'Calling emergency contacts...', icon: 'phone', status: 'active' },
    { id: 'location', label: 'Sharing live location...', icon: 'location', status: 'pending' },
    { id: 'alert', label: 'Alerting nearby help...', icon: 'alert', status: 'pending' },
  ]);

  // Pulse animation counter
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        document.getElementById(`cancel-pin-${index + 1}`)?.focus();
      }

      if (index === 3 && value) {
        const enteredPin = [...newPin.slice(0, 3), value].join('');
        if (enteredPin === '1234') {
          navigate('/home');
        } else {
          setPin(['', '', '', '']);
          document.getElementById('cancel-pin-0')?.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      document.getElementById(`cancel-pin-${index - 1}`)?.focus();
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'linear-gradient(135deg, hsl(355 75% 45%) 0%, hsl(355 75% 35%) 50%, hsl(330 70% 40%) 100%)',
              'linear-gradient(135deg, hsl(355 75% 50%) 0%, hsl(340 70% 40%) 50%, hsl(355 75% 40%) 100%)',
              'linear-gradient(135deg, hsl(355 75% 45%) 0%, hsl(355 75% 35%) 50%, hsl(330 70% 40%) 100%)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pulsing rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-white/20"
              initial={{ width: 100, height: 100, opacity: 0 }}
              animate={{
                width: [100, 400],
                height: [100, 400],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.75,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Floating alert icons */}
        <motion.div
          className="absolute top-20 left-8"
          animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Phone size={24} className="text-white/20" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-12"
          animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          <MapPin size={28} className="text-white/20" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-12"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        >
          <Radio size={20} className="text-white/20" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
          {/* Alarm indicator */}
          <AnimatePresence>
            {alarmActive && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <Volume2 size={20} className="text-white" />
                </motion.div>
                <span className="text-white font-medium text-sm">ALARM ACTIVE</span>
                <motion.button
                  onClick={() => setAlarmActive(false)}
                  className="ml-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs"
                  whileTap={{ scale: 0.95 }}
                >
                  Mute
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg, hsla(0, 100%, 100%, 0.25) 0%, hsla(0, 100%, 100%, 0.1) 100%)',
                boxShadow: '0 0 60px hsla(355, 75%, 55%, 0.6)',
              }}
            >
              {/* Inner pulsing circle */}
              <motion.div
                className="absolute inset-2 rounded-full bg-white/10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <ShieldAlert size={52} className="text-white relative z-10" />
              </motion.div>
            </motion.div>
            
            <motion.h1
              className="text-3xl font-bold text-white mb-2"
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Emergency Mode Active
            </motion.h1>
            <p className="text-white/80">Help is on the way. Stay calm.</p>
            
            {/* Timer */}
            <motion.div
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white font-mono text-lg">
                {Math.floor(pulseCount / 60).toString().padStart(2, '0')}:
                {(pulseCount % 60).toString().padStart(2, '0')}
              </span>
            </motion.div>
          </motion.div>

          {/* Status Updates */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <EmergencyStatusCard items={statusItems} />

            {/* Contacts being notified */}
            <motion.div
              className="mt-4 glass-card p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                Contacts notified
              </h3>
              <div className="space-y-2">
                {mockContacts.slice(0, 3).map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    />
                    <span className="text-sm text-muted-foreground">{contact.name}</span>
                    <span className="text-xs text-primary ml-auto">Connected</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Cancel Button */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {showCancelDialog ? (
                <motion.div
                  key="cancel-dialog"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card p-6 text-center"
                >
                  <h3 className="font-semibold text-foreground mb-2">Enter PIN to cancel</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter your 4-digit PIN to cancel the alert
                  </p>
                  <div className="flex gap-3 justify-center mb-4">
                    {pin.map((digit, index) => (
                      <motion.input
                        key={index}
                        id={`cancel-pin-${index}`}
                        type="tel"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePinChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-14 h-16 glass-card border-2 border-white/20 rounded-xl text-center text-2xl font-bold text-foreground focus:border-primary focus:outline-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
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
                </motion.div>
              ) : (
                <motion.button
                  key="cancel-button"
                  onClick={() => setShowCancelDialog(true)}
                  className="w-full glass-card text-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 touch-feedback border border-white/20"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <X size={20} />
                  Cancel Emergency
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Reassurance */}
          <motion.p
            className="text-center text-sm text-white/60 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Your location is being shared in real-time
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
};

export default SOS;
