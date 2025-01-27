import React from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Bookmark } from "lucide-react";

interface SkillCardProps {
  skill: any;
  onSelect: () => void;
  featured?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onSelect, featured }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      className={`card overflow-hidden ${
        featured ? "border-2 border-primary-500" : ""
      }`}
    >
      {featured && (
        <div className="bg-primary-500 text-white text-sm py-1 px-4 absolute top-4 right-4 rounded-full">
          Featured
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={skill.provider.image}
                alt={skill.provider.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {skill.provider.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-dark-card" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{skill.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                by {skill.provider.name}
              </p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-primary-500 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {skill.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold">{skill.rating}</span>
            <span className="text-gray-600 dark:text-gray-400">
              ({skill.reviews} reviews)
            </span>
          </div>
          <div className="text-primary-600 dark:text-primary-400 font-semibold">
            {skill.credits} credits
          </div>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelect}
            className="btn-primary flex-1 mr-2"
          >
            View Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline p-2"
          >
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillCard;
