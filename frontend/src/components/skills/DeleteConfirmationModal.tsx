import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationModalProps {
  skill: any;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  skill,
  onClose,
  onConfirm,
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 w-full max-w-md bg-white dark:bg-dark-card rounded-xl shadow-2xl z-40 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Delete Skill</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-bg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Are you sure?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              This action cannot be undone. All associated data will be
              permanently deleted.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="btn-primary bg-red-500 hover:bg-red-600 flex-1"
          >
            Delete
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="btn-outline flex-1"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </>
  );
};

export default DeleteConfirmationModal;
