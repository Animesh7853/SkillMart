import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react";
import LoginForm from "../components/login";
import SignupForm from "../components/signup";
import OtpVerification from "../components/verifyOtp";

const AuthPage = () => {
  const [activeView, setActiveView] = useState<"login" | "signup" | "otp">(
    "login"
  );
  const [email, setEmail] = useState("");

  const handleSignupComplete = (userEmail: string) => {
    setEmail(userEmail);
    setActiveView("otp");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-600/20 to-primary-700/20 animate-gradient" />
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600/30 rounded-full filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                SkillMart
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Exchange skills, grow together, and build meaningful connections.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { count: "10K+", label: "Active Users" },
                { count: "50K+", label: "Skills Exchanged" },
                { count: "95%", label: "Satisfaction Rate" },
                { count: "24/7", label: "Support" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 rounded-lg bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.count}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Auth Forms */}
          <div className="w-full max-w-md mx-auto">
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-dark-card/80 p-8">
              <AnimatePresence mode="wait">
                {activeView === "login" && (
                  <LoginForm
                    key="login"
                    onSwitchToSignup={() => setActiveView("signup")}
                  />
                )}
                {activeView === "signup" && (
                  <SignupForm
                    key="signup"
                    onSwitchToLogin={() => setActiveView("login")}
                    onSignupComplete={handleSignupComplete}
                  />
                )}
                {activeView === "otp" && (
                  <OtpVerification
                    key="otp"
                    email={email}
                    onBack={() => setActiveView("signup")}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
