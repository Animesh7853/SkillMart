import { motion } from "framer-motion";
import { Upload, TrendingUp, Users, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Skills Offered",
    value: "12",
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: "Skills Requested",
    value: "8",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    label: "Completed Trades",
    value: "24",
  },
];

const UserOverview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 card p-6"
      >
        <div className="flex items-start space-x-6">
          <div className="relative group">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Profile"
              className="w-24 h-24 rounded-xl object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
              <Upload className="w-6 h-6 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">John Doe</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Web Developer & UI Designer
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Edit Profile
              </motion.button>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Passionate about creating beautiful user interfaces and sharing
              knowledge with others. Specialized in React, TypeScript, and UI/UX
              design.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-dark-bg"
            >
              <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Credit Balance</div>
          <div className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            250
          </div>
          <div className="text-gray-600 dark:text-gray-400 mb-6">
            Available Credits
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full btn-primary"
          >
            Top Up Credits
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UserOverview;
