import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Star,
  Clock,
  TrendingUp,
  ChevronDown,
  Filter,
} from "lucide-react";
import SkillCard from "../components/skills/SkillCard";
import EngagementsModal from "../components/skills/EngagementsModal";
import DeleteConfirmationModal from "../components/skills/DeleteConfirmationModal";

interface Stat {
  title: string;
  value: string;
  icon: JSX.Element;
  trend: string;
  trendUp: boolean;
}

interface Skill {
  id: number;
  name: string;
  status: string;
}

const stats: Stat[] = [
  {
    title: "Total Skills Offered",
    value: "12",
    icon: <TrendingUp className="w-5 h-5" />,
    trend: "+2 this month",
    trendUp: true,
  },
  {
    title: "Active Requests",
    value: "8",
    icon: <Clock className="w-5 h-5" />,
    trend: "+3 this week",
    trendUp: true,
  },
  {
    title: "Credits Earned",
    value: "450",
    icon: <Star className="w-5 h-5" />,
    trend: "+50 this month",
    trendUp: true,
  },
];

const MySkills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"offered" | "requested">(
    "offered"
  );
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showEngagements, setShowEngagements] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleDelete = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowDeleteConfirmation(true);
  };

  const handleViewEngagements = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowEngagements(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Skills</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your offered skills and requests
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
            >
              <PlusCircle className="w-5 h-5" />
              <span
                onClick={() => (window.location.href = "/post-request skill")}
              >
                Post New Skill
              </span>
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center text-sm ${
                    stat.trendUp ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("offered")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors
                      ${
                        activeTab === "offered"
                          ? "bg-primary-500 text-white"
                          : "bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400"
                      }`}
          >
            Offered Skills
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("requested")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors
                      ${
                        activeTab === "requested"
                          ? "bg-primary-500 text-white"
                          : "bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400"
                      }`}
          >
            Requested Skills
          </motion.button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none btn-outline pr-10"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none btn-outline pr-10"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Showing 12 of 24 skills</span>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <SkillCard
                key={index}
                type={activeTab}
                onDelete={handleDelete}
                onViewEngagements={handleViewEngagements}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showEngagements && (
          <EngagementsModal
            skill={selectedSkill}
            onClose={() => setShowEngagements(false)}
          />
        )}
        {showDeleteConfirmation && (
          <DeleteConfirmationModal
            skill={selectedSkill}
            onClose={() => setShowDeleteConfirmation(false)}
            onConfirm={() => {
              // Handle delete
              setShowDeleteConfirmation(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MySkills;
