import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Phone, ChevronRight, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) {
      setOtpSent(true);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // Auto-submit when complete
      if (index === 5 && value) {
        setTimeout(() => navigate('/home'), 500);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  if (otpSent) {
    return (
      <div className="min-h-screen bg-background flex flex-col px-6 py-12">
        {/* Back button */}
        <button
          onClick={() => setOtpSent(false)}
          className="w-12 h-12 rounded-full bg-card flex items-center justify-center mb-8 touch-feedback"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Verify your number
          </h1>
          <p className="text-muted-foreground mb-8">
            We sent a code to +1 {phoneNumber}
          </p>

          {/* OTP Input */}
          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-card border-2 border-border rounded-xl text-center text-xl font-bold text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center">
            <button className="text-primary text-sm touch-feedback">
              Resend code
            </button>
          </div>
        </div>

        {/* Reassurance message */}
        <div className="bg-card rounded-2xl p-4 flex items-start gap-3">
          <Shield size={24} className="text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Your number is encrypted and only used for emergency verification. We never share your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-12">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Shield size={28} className="text-primary" />
        </div>
        <span className="text-2xl font-bold text-foreground">SafeRoute</span>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome back
        </h1>
        <p className="text-muted-foreground mb-8">
          Enter your phone number to continue
        </p>

        {/* Phone Input */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Phone size={20} className="text-muted-foreground" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground block mb-1">
              Phone Number
            </label>
            <div className="flex items-center gap-2">
              <span className="text-foreground">+1</span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="(555) 000-0000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="flex-1 bg-transparent text-foreground text-lg font-medium outline-none placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSendOTP}
          disabled={phoneNumber.length < 10}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2 touch-feedback disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Reassurance */}
      <div className="bg-card rounded-2xl p-4 flex items-start gap-3">
        <Shield size={24} className="text-primary flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          Your safety is our priority. We use bank-level encryption to protect your information.
        </p>
      </div>
    </div>
  );
};

export default Login;
