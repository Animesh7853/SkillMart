import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  MessageSquare,
  History,
  Settings,
  PlusCircle,
  Store,
} from "lucide-react";
import { useHref } from "react-router-dom";

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: true },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "My Skills",
    useHref: "/skills",
  },
  {
    icon: <Store className="w-5 h-5" />,
    label: "Market Place",
    useHref: "/marketplace",
  },
  {
    icon: <History className="w-5 h-5" />,
    label: "Transactions",
    useHref: "/transcations",
  },
  { icon: <MessageSquare className="w-5 h-5" />, label: "Chat", path: "/chat" },
  {
    icon: <Settings className="w-5 h-5" />,
    label: "Settings",
    useHref: "/settings",
  },
];

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
        >
          SkillMart
        </motion.div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                      ${
                        item.active
                          ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                          : "hover:bg-gray-100 dark:hover:bg-dark-bg"
                      }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.a>
        ))}
      </nav>

      <div className="p-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span onClick={() => (window.location.href = "/post-request skill")}>
            Post New Skill
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
