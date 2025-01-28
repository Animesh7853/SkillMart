import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onBack: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ email, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const otpArray = value.slice(0, 6).split("");
      const newOtp = [...otp];
      otpArray.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      setOtp(newOtp);
      if (inputRefs.current[5]) inputRefs.current[5].focus();
    } else {
      // Handle single digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (otp.join("") === "123456") {
      setShowSuccess(true);
      // Redirect after success
      setTimeout(() => {
        // Handle redirect
      }, 2000);
    } else {
      setError("Invalid OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    setTimer(30);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Enter the 6-digit code sent to {email}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between max-w-xs mx-auto mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold rounded-lg border-2 
                       border-gray-300 dark:border-dark-border focus:border-primary-500 
                       focus:ring-2 focus:ring-primary-500 dark:bg-dark-card"
              maxLength={index === 0 ? 6 : 1}
              pattern="\d*"
              inputMode="numeric"
              required
            />
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-red-500 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn-primary w-full relative"
          disabled={isLoading || otp.some((digit) => !digit)}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : showSuccess ? (
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Verified Successfully</span>
            </div>
          ) : (
            "Verify Email"
          )}
        </motion.button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Didn't receive the code?{" "}
            {timer > 0 ? (
              <span>Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                Resend Code
              </button>
            )}
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default OtpVerification;
