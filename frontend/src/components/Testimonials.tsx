import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Developer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "SkillMart has been a game-changer for my career. I have learned new skills and made valuable connections.",
    skills: ["Node.js", "React"],
  },
  {
    name: "Michael Chen",
    role: "Digital Marketer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "The credit system makes skill exchange fair and transparent. Its a fantastic platform for professionals.",
    skills: ["SEO", "Content Marketing"],
  },
  {
    name: "Emma Davis",
    role: "UI/UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    content:
      "I love how easy it is to find and exchange skills. The community is supportive and professional.",
    skills: ["Figma", "Adobe XD"],
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-500/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gray-300">What Our </span>
            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Community
            </span>{" "}
            <span className="text-gray-300">Says</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied users who are already benefiting from
            our skill exchange platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card p-6"
            >
              <div className="flex items-center space-x-4 mb-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                "{testimonial.content}"
              </p>

              <div className="flex flex-wrap gap-2">
                {testimonial.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-sm rounded-full bg-primary-100 dark:bg-primary-900/30 
                             text-primary-600 dark:text-primary-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
