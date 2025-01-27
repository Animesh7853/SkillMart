import React from "react";
import { motion } from "framer-motion";
import {
  Edit2,
  Trash2,
  MessageSquare,
  Star,
  Clock,
  Eye,
  Users,
} from "lucide-react";

interface SkillCardProps {
  type: "offered" | "requested";
  onDelete: (skill: any) => void;
  onViewEngagements: (skill: any) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  type,
  onDelete,
  onViewEngagements,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">
              {type === "offered"
                ? "Web Development"
                : "Mobile App Development"}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                Active
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Posted 2 days ago
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg text-gray-600 dark:text-gray-400"
            >
              <Edit2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(null)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {type === "offered"
            ? "Professional web development services using React and Node.js"
            : "Looking for an experienced React Native developer"}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              3-5 days delivery
            </span>
          </div>
          <div className="text-primary-600 dark:text-primary-400 font-semibold">
            50 credits
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                8 engagements
              </span>
            </div>
            {type === "offered" && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">4.8</span>
              </div>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewEngagements(null)}
            className="btn-outline text-sm flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
