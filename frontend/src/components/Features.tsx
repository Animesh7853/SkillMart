import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Clock,
  Shield,
  Coins,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Diverse Skills",
    description: "Access a wide range of skills from professionals worldwide",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community",
    description: "Join a thriving community of skilled individuals",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Flexible Hours",
    description: "Exchange skills on your own schedule",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Platform",
    description: "Safe and secure skill exchange environment",
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Credit System",
    description: "Fair and transparent credit-based economy",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Direct Chat",
    description: "Seamless communication between users",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Why Choose SkillMart?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the benefits of our skill exchange platform and join
            thousands of users who are already growing their skillset.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
