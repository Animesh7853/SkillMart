import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Send,
  Paperclip,
  Image,
  Smile,
  Phone,
  Video,
  Info,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      online: true,
      lastSeen: "online",
    },
    lastMessage: "Hey, I am interested in your web development services",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      online: false,
      lastSeen: "2h ago",
    },
    lastMessage: "Thanks for completing the project!",
    time: "1h ago",
    unread: 0,
  },
];

const messages = [
  {
    id: 1,
    sender: "them",
    content:
      "Hey, I saw your web development services. I have a project in mind.",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "me",
    content:
      "Hi! Thanks for reaching out. Id love to hear more about your project.",
    time: "10:31 AM",
  },
  {
    id: 3,
    sender: "them",
    content:
      "Great! I need a responsive website for my business. Do you have experience with e-commerce sites?",
    time: "10:32 AM",
  },
  {
    id: 4,
    sender: "me",
    content:
      "Yes, Ive built several e-commerce sites using React and Node.js. I can show you some examples of my previous work.",
    time: "10:33 AM",
  },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Handle sending message
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-screen">
          {/* Chat List */}
          <div className="lg:col-span-1 border-r border-gray-200 dark:border-dark-border">
            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="input pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-2">
                {conversations.map((chat) => (
                  <motion.button
                    key={chat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChat(chat)}
                    className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors
                              ${
                                selectedChat.id === chat.id
                                  ? "bg-primary-50 dark:bg-primary-900/20"
                                  : "hover:bg-gray-100 dark:hover:bg-dark-card"
                              }`}
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
                        <h3 className="font-semibold truncate">
                          {chat.user.name}
                        </h3>
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
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-dark-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedChat.user.avatar}
                  alt={selectedChat.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{selectedChat.user.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedChat.user.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
                >
                  <Phone className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
                >
                  <Video className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
                >
                  <Info className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.sender === "me"
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 dark:bg-dark-card"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 dark:border-dark-border"
            >
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
                >
                  <Paperclip className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
                >
                  <Image className="w-5 h-5" />
                </motion.button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="input flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
                >
                  <Smile className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="btn-primary p-2"
                  disabled={!message.trim()}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
