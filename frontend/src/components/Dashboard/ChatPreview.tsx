import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const chats = [
  {
    user: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      online: true,
    },
    lastMessage: "Hey, I am interested in your web development services",
    time: "2m ago",
    unread: 2,
  },
  {
    user: {
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      online: false,
    },
    lastMessage: "Thanks for completing the project!",
    time: "1h ago",
    unread: 0,
  },
];

const ChatPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-bold">Messages</h3>
          <span className="px-2 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            2
          </span>
        </div>
        <button className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {chats.map((chat, index) => (
          <motion.div
            key={chat.user.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg cursor-pointer"
          >
            <div className="relative">
              <img
                src={chat.user.avatar}
                alt={chat.user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {chat.user.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold truncate">{chat.user.name}</h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {chat.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unread > 0 && (
              <div className="px-2 py-1 rounded-full bg-primary-500 text-white text-xs">
                {chat.unread}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary mt-4 flex items-center justify-center space-x-2"
      >
        <MessageSquare className="w-5 h-5" />
        <span>New Message</span>
      </motion.button>
    </motion.div>
  );
};

export default ChatPreview;
