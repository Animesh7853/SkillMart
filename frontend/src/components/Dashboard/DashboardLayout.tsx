import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  MessageSquare,
  History,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import Sidebar from "./Sidebar";
import UserOverview from "./UserOverview";
import SkillSummary from "./SkillSummary";
import Analytics from "./Analytics";
import RecentActivities from "./RecentActivities";
import NotificationsPanel from "./NotificationsPanel";
import ChatPreview from "./ChatPreview";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg relative"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
            </button>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-8 h-8 rounded-full overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-64 lg:w-72 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border z-40"
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`pt-16 lg:pt-0 ${
          isSidebarOpen ? "lg:ml-72" : ""
        } min-h-screen`}
      >
        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-8 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center flex-1 max-w-2xl">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills, users..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg relative"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>John Doe</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-dark-card rounded-lg shadow-lg border border-gray-200 dark:border-dark-border"
                  >
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-dark-bg">
                      Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-dark-bg">
                      Settings
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-dark-border" />
                    <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-dark-bg">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-8">
          <UserOverview />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <SkillSummary />
              <Analytics />
              <RecentActivities />
            </div>
            <div className="space-y-8">
              <NotificationsPanel />
              <ChatPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
