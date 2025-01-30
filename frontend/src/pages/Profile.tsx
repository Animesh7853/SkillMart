import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  Award,
  Briefcase,
  MessageSquare,
  Share2,
  BarChart,
  TrendingUp,
  Users,
} from "lucide-react";

const skills = [
  {
    title: "Web Development",
    rating: 4.8,
    reviews: 24,
    completedProjects: 15,
  },
  {
    title: "UI/UX Design",
    rating: 4.9,
    reviews: 18,
    completedProjects: 12,
  },
];

const reviews = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
    rating: 5,
    comment: "Excellent work! Very professional and delivered on time.",
    date: "2 days ago",
  },
  {
    id: 2,
    user: {
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    rating: 4,
    comment: "Great communication and quality work. Would hire again!",
    date: "1 week ago",
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} className="relative group">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Profile"
                className="w-32 h-32 rounded-xl object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                <span className="text-white text-sm">Change Photo</span>
              </div>
            </motion.div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>New York, USA</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Joined March 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Message
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-outline"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Passionate web developer and UI designer with 5+ years of
                experience. Specialized in creating beautiful and functional web
                applications.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                {[
                  { icon: <Star className="w-5 h-5" />, label: "4.9 Rating" },
                  { icon: <Award className="w-5 h-5" />, label: "Top Rated" },
                  {
                    icon: <Briefcase className="w-5 h-5" />,
                    label: "27 Projects",
                  },
                  { icon: <Clock className="w-5 h-5" />, label: "98% On Time" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-bg"
                  >
                    {stat.icon}
                    <span className="font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          {["overview", "skills", "reviews", "portfolio"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold capitalize transition-colors
                        ${
                          activeTab === tab
                            ? "bg-primary-500 text-white"
                            : "bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400"
                        }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Stats */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <BarChart className="w-6 h-6" />,
                    label: "Total Earnings",
                    value: "$12,500",
                    trend: "+15% this month",
                  },
                  {
                    icon: <Users className="w-6 h-6" />,
                    label: "Total Clients",
                    value: "48",
                    trend: "+3 this week",
                  },
                  {
                    icon: <TrendingUp className="w-6 h-6" />,
                    label: "Success Rate",
                    value: "98%",
                    trend: "+2% this month",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                        {stat.icon}
                      </div>
                      <span className="text-green-500 text-sm">
                        {stat.trend}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    "Completed a web development project",
                    "Received a 5-star review",
                    "Started a new project",
                    "Updated skill certifications",
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary-500" />
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          {activity}
                        </p>
                        <span className="text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{skill.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Reviews
                      </span>
                      <span>{skill.reviews}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Completed Projects
                      </span>
                      <span>{skill.completedProjects}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.user.avatar}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.user.name}</h4>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center mt-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5 }}
                  className="card overflow-hidden"
                >
                  <img
                    src={`https://picsum.photos/400/300?random=${item}`}
                    alt={`Portfolio ${item}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">Project Title {item}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A brief description of the project and the technologies
                      used.
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
