import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, CheckCircle, Clock, Info } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
const categories = [
  {
    label: "Development",
    subcategories: [
      "Web",
      "Mobile",
      "Backend",
      "Frontend",
      "Fullstack",
      "AI",
      "ML",
      "Data Science",
      "Blockchain",
      "Game Development",
    ],
  },
  {
    label: "Design",
    subcategories: ["UI/UX", "Graphic Design", "Logo Design"],
  },
  { label: "Writing", subcategories: ["Content", "Technical", "Creative"] },
  { label: "Marketing", subcategories: ["Digital", "Social Media", "SEO"] },
];

const PostRequestSkill = () => {
  const [activeTab, setActiveTab] = useState<"offer" | "request">("offer");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [credits, setCredits] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 3) {
        setErrors({ files: "Maximum 3 files allowed" });
        return;
      }

      const newFiles = acceptedFiles.slice(0, 3 - files.length);
      setFiles((prev) => [...prev, ...newFiles]);

      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
      "application/pdf": [".pdf"],
    },
    maxSize: 5242880, // 5MB
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = "Title is required";
    if (!category) newErrors.category = "Category is required";
    if (!description) newErrors.description = "Description is required";
    if (!duration) newErrors.duration = "Duration is required";
    if (!credits) newErrors.credits = "Credits is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  interface FormData {
    title: string;
    category: string;
    description: string;
    credit_cost: number;
    images: string[];
    type: "offer" | "request";
  }

  interface ErrorResponse {
    errors?: Record<string, string>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(title, category, subcategory, description, duration, credits);
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YjcwMzUyNi0yNTZkLTRiYjItYWYxYy03OWE0ZmRlN2Q2M2EiLCJlbWFpbCI6ImFtYmVya29pcnVAZ21haWwuY29tIiwiaWF0IjoxNzM4OTM3MDM4LCJleHAiOjE3Mzg5NDA2Mzh9.zvxwnQ8RhGxGLQN9Cgubxopw_RoOfvFH6s8GtRvY2qM"; // Fetch token dynamically
    console.log(jwtToken);
    if (!jwtToken) {
      toast.error("Authentication token is missing");
      return;
    }

    const data = {
      title: title, // Taken from state
      category: category, // Ensure it matches API's expected categories
      description: description,
      credit_cost: credits,
      images: previewUrls.length > 0 ? previewUrls : [],
      type: activeTab === "offer" ? "offer" : "request",
    };

    try {
      const response = await fetch(
        `https://skill-mart.vercel.app/api/skill/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("skillId", result.id);
        toast.success("Skill posted successfully");
        setLoading(false);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
        toast.error("Failed to post skill");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred while posting the skill");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("offer")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors
                      ${
                        activeTab === "offer"
                          ? "bg-primary-500 text-white"
                          : "bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400"
                      }`}
          >
            Post a Skill
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab("request")}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors
                      ${
                        activeTab === "request"
                          ? "bg-primary-500 text-white"
                          : "bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400"
                      }`}
          >
            Request a Skill
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold mb-6">
              {activeTab === "offer" ? "Post Your Skill" : "Request a Skill"}
            </h2>

            {/* Title */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Title
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
                maxLength={100}
                className="input"
                placeholder="Enter a descriptive title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">{errors.title}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {title.length}/100 characters
              </p>
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                  <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory("");
                    setErrors((prev) => ({ ...prev, category: "" }));
                  }}
                  className="input"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.label} value={cat.label}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subcategory
                </label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="input"
                  disabled={!category}
                >
                  <option value="">Select Subcategory</option>
                  {category &&
                    categories
                      .find((cat) => cat.label === category)
                      ?.subcategories.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Description
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: "" }));
                }}
                rows={5}
                className="input"
                placeholder={`Describe what you'll ${
                  activeTab === "offer" ? "offer" : "need"
                } in detail`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Duration and Credits */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Credits
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={credits}
                  onChange={(e) => {
                    setCredits(e.target.value);
                    setErrors((prev) => ({ ...prev, credits: "" }));
                  }}
                  min="1"
                  className="input"
                  placeholder="Enter credits"
                />
                {errors.credits && (
                  <p className="mt-1 text-sm text-red-500">{errors.credits}</p>
                )}
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Upload Files (Optional)
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                          transition-colors
                          ${
                            isDragActive
                              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/10"
                              : "border-gray-300 dark:border-dark-border"
                          }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Max 3 files. Supported formats: PNG, JPG, JPEG.
                </p>
              </div>
              {errors.files && (
                <p className="mt-1 text-sm text-red-500">{errors.files}</p>
              )}

              {/* File Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={url} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2 px-4 py-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span>
                      {activeTab === "offer"
                        ? "Posting Skill..."
                        : "Submitting Request..."}
                    </span>
                  </>
                ) : activeTab === "offer" ? (
                  "Post Skill"
                ) : (
                  "Submit Request"
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setTitle("");
                  setCategory("");
                  setSubcategory("");
                  setDescription("");
                  setDuration("");
                  setCredits("");
                  setProficiency("");
                  setFiles([]);
                  setPreviewUrls([]);
                  setErrors({});
                }}
                className="btn-outline"
              >
                Reset
              </motion.button>
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            <div className="prose dark:prose-invert max-w-none">
              {title ? (
                <>
                  <h3 className="text-xl font-semibold mb-4">{title}</h3>
                  {category && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm">
                        {category}
                      </span>
                      {subcategory && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-400 text-sm">
                          {subcategory}
                        </span>
                      )}
                    </div>
                  )}
                  {description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {description}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {duration && (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-primary-500" />
                        <span>{duration} days</span>
                      </div>
                    )}
                    {credits && (
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                          {credits} credits
                        </span>
                      </div>
                    )}
                  </div>
                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {previewUrls.map((url, index) => (
                        <img
                          key={url}
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Info className="w-12 h-12 mx-auto mb-2" />
                  <p>Fill out the form to see the preview</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg 
                     shadow-lg flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>
              Successfully {activeTab === "offer" ? "posted" : "requested"}{" "}
              skill!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostRequestSkill;
