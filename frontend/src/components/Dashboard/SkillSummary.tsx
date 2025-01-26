import { motion } from "framer-motion";
import { Edit2, Trash2, Clock } from "lucide-react";

const offeredSkills = [
  {
    title: "Web Development",
    description: "Frontend development with React and TypeScript",
    credits: 50,
    rating: 4.8,
    active: true,
  },
  {
    title: "UI/UX Design",
    description: "User interface and experience design using Figma",
    credits: 45,
    rating: 4.9,
    active: true,
  },
];

const requestedSkills = [
  {
    title: "Mobile App Development",
    description: "Looking for React Native developer",
    credits: 60,
    status: "Pending",
  },
  {
    title: "Content Writing",
    description: "Need help with technical blog posts",
    credits: 30,
    status: "Active",
  },
];

const SkillSummary = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Offered Skills</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline text-sm"
          >
            Add New Skill
          </motion.button>
        </div>
        <div className="space-y-4">
          {offeredSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{skill.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-card">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-card text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-primary-600 dark:text-primary-400">
                  {skill.credits} credits/hr
                </span>
                <span className="flex items-center text-yellow-500">
                  ★ {skill.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Requested Skills</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline text-sm"
          >
            Request Skill
          </motion.button>
        </div>
        <div className="space-y-4">
          {requestedSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{skill.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-medium">{skill.status}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                {skill.credits} credits/hr
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillSummary;
