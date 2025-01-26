import React from "react";
import { motion } from "framer-motion";
import { Bell, MessageSquare, Star, AlertCircle } from "lucide-react";

const notifications = [
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "New Message",
    description: "Sarah sent you a message about the project",
    time: "5m ago",
    unread: true,
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "New Review",
    description: "Alex rated your service 5 stars",
    time: "2h ago",
    unread: true,
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: "Skill Request Update",
    description: "Your request was accepted by Mike",
    time: "1d ago",
    unread: false,
  },
];

const NotificationsPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-bold">Notifications</h3>
          <span className="px-2 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            3 new
          </span>
        </div>
        <button className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
          Mark all read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${
              notification.unread
                ? "bg-primary-50 dark:bg-primary-900/10"
                : "bg-gray-50 dark:bg-dark-bg"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  notification.unread
                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    : "bg-gray-200 dark:bg-dark-card text-gray-600 dark:text-gray-400"
                }`}
              >
                {notification.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{notification.title}</h4>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {notification.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {notification.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationsPanel;
