import React from "react";
import { motion } from "framer-motion";
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";

const Analytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Analytics Overview</h3>
        <select className="input max-w-xs text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-gray-50 dark:bg-dark-bg rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Credits Activity</h4>
            <BarChartIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-44 flex items-end justify-between px-2">
            {[40, 25, 35, 30, 45, 35, 55].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.1 }}
                className="w-8 bg-primary-500 dark:bg-primary-400 rounded-t-lg"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Most Active Skills</h4>
              <PieChartIcon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              {[
                { skill: "Web Development", percentage: 40 },
                { skill: "UI Design", percentage: 35 },
                { skill: "Content Writing", percentage: 25 },
              ].map((item, index) => (
                <div key={item.skill}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{item.skill}</span>
                    <span>{item.percentage}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="h-2 bg-primary-500 dark:bg-primary-400 rounded-full mt-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-bg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold">Growth Rate</h4>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-green-500">+24%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              vs. previous month
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
