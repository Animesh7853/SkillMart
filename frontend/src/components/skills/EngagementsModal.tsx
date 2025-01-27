import React from "react";
import { motion } from "framer-motion";
import {
  X,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  User,
} from "lucide-react";

interface EngagementsModalProps {
  skill: any;
  onClose: () => void;
}

const EngagementsModal: React.FC<EngagementsModalProps> = ({
  skill,
  onClose,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-30"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed inset-x-4 top-20 bottom-20 md:inset-x-auto md:left-1/2 md:right-auto 
                 md:w-full md:max-w-2xl md:-translate-x-1/2 bg-white dark:bg-dark-card 
                 rounded-xl shadow-2xl z-40 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Engagements</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((engagement) => (
                <div
                  key={engagement}
                  className="card p-4 border border-gray-200 dark:border-dark-border"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=32&h=32&q=80"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">John Doe</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span>2 days ago</span>
                          <span>•</span>
                          <span className="px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                            Pending
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg text-green-500"
                      >
                        <CheckCircle className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg text-red-500"
                      >
                        <XCircle className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    I'm interested in your web development services. Can we
                    discuss the project details?
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>5 days</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>4.8 rating</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-outline text-sm flex items-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Message</span>
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default EngagementsModal;
