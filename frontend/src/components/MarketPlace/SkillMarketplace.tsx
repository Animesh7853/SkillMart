import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, TrendingUp } from "lucide-react";
import SkillCard from "./SkillCard";
import FilterPanel from "./FilterPanel";
import SkillDetailsModal from "./SkillDetails";

const categories = [
  "All Skills",
  "Development",
  "Design",
  "Writing",
  "Marketing",
  "Business",
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Credits: Low to High", value: "credits_asc" },
  { label: "Credits: High to Low", value: "credits_desc" },
  { label: "Most Popular", value: "popular" },
];

const skills = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    description:
      "Professional web development services using React, Node.js, and modern technologies",
    credits: 100,
    rating: 4.8,
    reviews: 24,
    provider: {
      name: "Alex Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      online: true,
    },
    featured: true,
  },
  {
    id: 2,
    title: "UI/UX Design",
    category: "Design",
    description:
      "Create beautiful and intuitive user interfaces with modern design principles",
    credits: 80,
    rating: 4.9,
    reviews: 18,
    provider: {
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      online: true,
    },
    featured: true,
  },
  // Add more skills here...
  {
    id: 3,
    title: "Full Stack Web Development",
    category: "Development",
    description:
      "Professional web development services using React, Node.js, and modern technologies",
    credits: 100,
    rating: 4.8,
    reviews: 24,
    provider: {
      name: "Hello BOy",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      online: true,
    },
    featured: true,
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    category: "Development",
    description:
      "Professional web development services using React, Node.js, and modern technologies",
    credits: 100,
    rating: 4.8,
    reviews: 24,
    provider: {
      name: "Alex Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      online: true,
    },
    featured: true,
  },
];

const SkillMarketplace = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  interface Skill {
    id: number;
    title: string;
    category: string;
    description: string;
    credits: number;
    rating: number;
    reviews: number;
    provider: {
      name: string;
      image: string;
      online: boolean;
    };
    featured: boolean;
  }

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Skills");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header */}
      <header className="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border 
                           bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="btn-outline flex items-center space-x-2"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none btn-outline pr-10"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex items-center space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap
                          ${
                            selectedCategory === category
                              ? "bg-primary-500 text-white"
                              : "bg-gray-100 dark:bg-dark-bg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-card"
                          }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-primary-500" />
            <span>Featured Skills</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills
              .filter((skill) => skill.featured)
              .map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onSelect={() => setSelectedSkill(skill)}
                  featured
                />
              ))}
          </div>
        </section>

        {/* All Skills */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {skills
                .filter(
                  (skill) =>
                    (selectedCategory === "All Skills" ||
                      skill.category === selectedCategory) &&
                    (searchQuery === "" ||
                      skill.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
                )
                .map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onSelect={() => setSelectedSkill(skill)}
                  />
                ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && <FilterPanel onClose={() => setIsFilterOpen(false)} />}
      </AnimatePresence>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillDetailsModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillMarketplace;
