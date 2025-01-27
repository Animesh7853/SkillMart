import React from "react";
import { motion } from "framer-motion";
import { X, Star } from "lucide-react";

interface FilterPanelProps {
  onClose: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onClose }) => {
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
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-dark-card 
                 shadow-xl z-40 overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Credit Range */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Credit Range</h3>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                placeholder="Min"
                className="input flex-1"
                min="0"
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                placeholder="Max"
                className="input flex-1"
                min="0"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input type="radio" name="rating" className="form-radio" />
                  <div className="flex items-center">
                    {Array.from({ length: rating }).map((_, index) => (
                      <Star
                        key={index}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="ml-2">& up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Availability</h3>
            <div className="space-y-2">
              {[
                "Available Now",
                "Within 24 hours",
                "Within a week",
                "Custom timeline",
              ].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input type="checkbox" className="form-checkbox" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="btn-primary flex-1">Apply Filters</button>
            <button className="btn-outline flex-1">Reset</button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterPanel;
