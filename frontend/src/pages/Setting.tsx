import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Shield, CreditCard } from "lucide-react";

const settingsSections = [
  {
    id: "profile",
    label: "Profile Settings",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: "payment",
    label: "Payment Methods",
    icon: <CreditCard className="w-5 h-5" />,
  },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isDark, setIsDark] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              <nav className="space-y-2">
                {settingsSections.map((section) => (
                  <motion.button
                    key={section.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors
                              ${
                                activeSection === section.id
                                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                                  : "hover:bg-gray-100 dark:hover:bg-dark-bg"
                              }`}
                  >
                    {section.icon}
                    <span>{section.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeSection === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card p-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Profile Picture
                      </label>
                      <div className="flex items-center space-x-4">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn-outline"
                        >
                          Change Photo
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="input"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="input"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="input"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          className="input"
                          placeholder="New York, USA"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bio
                      </label>
                      <textarea
                        className="input min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-outline"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary"
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card p-6"
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Notification Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Email Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive email updates about your activity
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            email: !prev.email,
                          }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications.email
                            ? "bg-primary-500"
                            : "bg-gray-300 dark:bg-dark-border"
                        }`}
                      >
                        <motion.div
                          animate={{
                            x: notifications.email ? 24 : 0,
                          }}
                          className="w-6 h-6 rounded-full bg-white shadow"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Push Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            push: !prev.push,
                          }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications.push
                            ? "bg-primary-500"
                            : "bg-gray-300 dark:bg-dark-border"
                        }`}
                      >
                        <motion.div
                          animate={{
                            x: notifications.push ? 24 : 0,
                          }}
                          className="w-6 h-6 rounded-full bg-white shadow"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Marketing Emails</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive marketing and promotional emails
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setNotifications((prev) => ({
                            ...prev,
                            marketing: !prev.marketing,
                          }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications.marketing
                            ? "bg-primary-500"
                            : "bg-gray-300 dark:bg-dark-border"
                        }`}
                      >
                        <motion.div
                          animate={{
                            x: notifications.marketing ? 24 : 0,
                          }}
                          className="w-6 h-6 rounded-full bg-white shadow"
                        />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="input"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-primary"
                      >
                        Update Password
                      </motion.button>
                    </div>
                  </div>

                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-4">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-outline"
                    >
                      Enable 2FA
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {activeSection === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="card p-6"
                >
                  <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-dark-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gray-200 dark:bg-dark-bg rounded" />
                        <div>
                          <p className="font-semibold">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Expires 12/24
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                    >
                      Add New Payment Method
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
