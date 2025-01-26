import { motion } from "framer-motion";
import { UserPlus, Search, HandshakeIcon, Star } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Account",
    description: "Sign up and complete your profile with your skills.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "Discover Skills",
    description: "Browse through available skills or post your requirements",
  },
  {
    icon: <HandshakeIcon className="w-8 h-8" />,
    title: "Make Exchange",
    description: "Connect with others and exchange skills using credits",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Give Feedback",
    description: "Rate your experience and help build trust in the community",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 via-transparent to-primary-500/10 animate-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              SkillMart
            </span>{" "}
            Works
          </h2>
          <p className="text-black-500  max-w-2xl mx-auto">
            Get started with SkillMart in four simple steps and begin your
            journey of skill exchange and growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 transform translate-y-4" />
              )}

              <div className="card p-6 text-center relative bg-white dark:bg-dark-card z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30 
                           flex items-center justify-center text-primary-600 dark:text-primary-400"
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primary-100 to-primary-300 bg-clip-text text-transparent mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
