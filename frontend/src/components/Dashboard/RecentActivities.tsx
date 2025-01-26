import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const activities = [
  {
    type: "completed",
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: "Completed Web Development Task",
    description: "Earned 50 credits from Alex Johnson",
    time: "2 hours ago",
  },
  {
    type: "pending",
    icon: <Clock className="w-5 h-5 text-yellow-500" />,
    title: "New Skill Request",
    description: "Mobile App Development request from Sarah",
    time: "5 hours ago",
  },
  {
    type: "cancelled",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
    title: "Cancelled Request",
    description: "UI Design task cancelled by Mike",
    time: "1 day ago",
  },
  {
    type: "alert",
    icon: <AlertCircle className="w-5 h-5 text-primary-500" />,
    title: "Review Reminder",
    description: "Please review your recent exchange with Emma",
    time: "2 days ago",
  },
];

const RecentActivities = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recent Activities</h3>
        <button className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="p-2 rounded-lg bg-gray-50 dark:bg-dark-bg">
              {activity.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{activity.title}</h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {activity.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivities;
