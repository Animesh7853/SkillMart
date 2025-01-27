import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Star,
  Clock,
  Calendar,
  MessageSquare,
  User,
  Shield,
  CheckCircle,
} from "lucide-react";

interface SkillDetailsModalProps {
  skill: any;
  onClose: () => void;
}

const SkillDetailsModal: React.FC<SkillDetailsModalProps> = ({
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
                 md:w-full md:max-w-2xl md:-translate-x-1/2 bg-white dark:bg-dark-card rounded-xl 
                 shadow-2xl z-40 overflow-hidden"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{skill.title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src={skill.provider.image}
                alt={skill.provider.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{skill.provider.name}</div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span>{skill.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{skill.reviews} reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">About This Service</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {skill.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <div className="font-semibold">Delivery Time</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      3-5 business days
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <div className="font-semibold">Availability</div>
                    <div className="text-gray-600 dark:text-gray-400">
                      Available Now
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">What's Included</h3>
              <ul className="space-y-2 mb-6">
                {[
                  "Initial consultation and requirements gathering",
                  "Regular progress updates",
                  "Two rounds of revisions",
                  "Final delivery in requested format",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-2">Recent Reviews</h3>
              <div className="space-y-4">
                {[1, 2].map((review) => (
                  <div
                    key={review}
                    className="border-b border-gray-200 dark:border-dark-border pb-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold">John Doe</span>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Excellent service! Delivered exactly what I needed and was
                      very professional throughout the process.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Service Price
                </div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {skill.credits} credits
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline"
                >
                  <MessageSquare className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Request Service
                </motion.button>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 mr-2" />
              <span>100% satisfaction guarantee • Secure transaction</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SkillDetailsModal;
