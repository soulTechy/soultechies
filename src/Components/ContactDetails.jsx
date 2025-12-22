import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Moon, Sun, Check } from 'lucide-react';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PRIMARY = "#7c3bed";
const PRIMARY_TEXT = "#ffffff";

const ContactForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const services = [
    'Web Design',
    'UX Design',
    'App Development',
    'Tech Consultancy',
    'Other'
  ];

  const budgetOptions = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+'
  ];

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handleSubmit = async () => {
  if (isSubmitting) return;

  if (!formData.name || !formData.email || !formData.message) {
    toast.error("Please fill all required fields");
    return;
  }

  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  setIsSubmitting(true);

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    company: formData.company,
    location: formData.location,
    budget: formData.budget,
    services: formData.services.join(", "),
    message: formData.message,
  };

  try {
    await emailjs.send(
      "service_nk9r0gv",
      'template_rd6zrzr',
      templateParams,
      '7C-85egHbu1MKeIFc'
    );

    toast.success("Message sent successfully 🚀");
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      location: "",
      phone: "",
      company: "",
      budget: "",
      message: "",
      services: [],
    });

  } catch (error) {
    console.error(error);
    toast.error("Failed to send message ❌");
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitted(false), 3000);
  }
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div id="contact" className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      {/* Dark Mode Toggle */}
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Let's Transform Your Idea
            <br />
            <span style={{ color: PRIMARY }}>Into a Project</span>
          </motion.h1>
          <motion.p
            className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Tell us about your vision and we'll make it reality
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {[
              { icon: Mail, title: 'Email', value: 'soulte3h@gmail.com', href: 'mailto:soulte3h@gmail.com' },
              { icon: Phone, title: 'Phone', value: '+91 6289 549 477', href: 'tel:+15551234567' },
              { icon: MapPin, title: 'Location', value: 'Kolkata, West Bengal', href: null }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-2xl backdrop-blur-sm ${darkMode
                    ? 'bg-gray-800/50 border border-gray-700'
                    : 'bg-white shadow-lg'
                  }`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${PRIMARY}20` }}
                >
                  <item.icon style={{ color: PRIMARY }} size={24} />
                </div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className={`${darkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {item.value}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div
              className={`p-8 md:p-10 rounded-3xl backdrop-blur-sm ${darkMode
                  ? 'bg-gray-800/50 border border-gray-700'
                  : 'bg-white shadow-2xl'
                }`}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Email */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                    placeholder="john@example.com"
                  />
                </motion.div>

                {/* Phone */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                    placeholder="+91 1234 578 890"
                  />
                </motion.div>

                {/* Company */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                    placeholder="Your Company"
                  />
                </motion.div>

                {/* Location */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                    placeholder="San Francisco, CA"
                  />
                </motion.div>

                {/* Budget */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Budget in Mind
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${darkMode
                        ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                      }`}
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </motion.div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <label className={`block mb-4 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Services Needed
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {services.map((service) => (
                    <motion.button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${formData.services.includes(service)
                          ? darkMode
                            ? 'border-purple-500 text-white'
                            : 'border-purple-500 text-gray-900'
                          : darkMode
                            ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      style={formData.services.includes(service) ? { backgroundColor: `${PRIMARY}15` } : {}}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {formData.services.includes(service) && (
                          <Check size={16} style={{ color: PRIMARY }} />
                        )}
                        {service}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <motion.div whileFocus={{ scale: 1.01 }} className="mb-6">
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none resize-none ${darkMode
                      ? 'bg-gray-700/50 border-gray-600 text-white focus:border-purple-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500'
                    }`}
                  placeholder="Tell us about your project..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                style={{ backgroundColor: PRIMARY, color: PRIMARY_TEXT }}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 rounded-xl bg-green-500/20 border border-green-500 text-green-600 dark:text-green-400 text-center font-medium"
                  >
                    ✓ Opening your email client...
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;