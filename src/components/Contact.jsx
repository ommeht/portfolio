import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeGlow, setActiveGlow] = useState(null);

  // Handle mouse movement for glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ from_name: '', from_email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  // Background particles configuration
  const particles = Array.from({ length: 20 }, (_, i) => i);

  const getW = () => (typeof window !== 'undefined' ? window.innerWidth : 800);
  const getH = () => (typeof window !== 'undefined' ? window.innerHeight : 600);

  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 transition-colors relative overflow-hidden min-h-screen">
      {/* Floating particles */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-500 opacity-20"
          initial={{
            x: Math.random() * getW(),
            y: Math.random() * getH(),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: [
              Math.random() * getW(),
              Math.random() * getW(),
              Math.random() * getW(),
            ],
            y: [
              Math.random() * getH(),
              Math.random() * getH(),
              Math.random() * getH(),
            ],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            width: `${Math.random() * 15 + 5}px`,
            height: `${Math.random() * 15 + 5}px`,
          }}
        />
      ))}

      {/* Glowing orb that follows cursor */}
      <motion.div
        className="fixed w-64 h-64 rounded-full bg-blue-500 opacity-10 pointer-events-none blur-3xl"
        animate={{
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          x: { duration: 0.2, ease: "easeOut" },
          y: { duration: 0.2, ease: "easeOut" },
          scale: { duration: 3, repeat: Infinity },
          opacity: { duration: 3, repeat: Infinity },
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white relative inline-block left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get In 
          <motion.span 
            className="ml-2 text-blue-400 relative"
            animate={{ 
              textShadow: ["0 0 8px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.7)", "0 0 8px rgba(59, 130, 246, 0)"] 
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Touch
          </motion.span>
          
          {/* Animated underline */}
          <motion.div 
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 mb-6 border border-gray-700 relative overflow-hidden"
            onMouseEnter={() => setActiveGlow("info")}
            onMouseLeave={() => setActiveGlow(null)}
          >
            {/* Glow effect when active */}
            {activeGlow === "info" && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse" />
            )}
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400" />

            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <motion.span 
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-block mr-3 text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </motion.span>
              Contact Information
            </h3>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="mt-1 mr-4 text-blue-400 bg-blue-900/30 p-3 rounded-full">
                  <FaMapMarkerAlt size={20} className="group-hover:animate-bounce" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg">Location</h4>
                  <p className="text-gray-300">Narwana, Haryana 126116</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="mt-1 mr-4 text-blue-400 bg-blue-900/30 p-3 rounded-full">
                  <FaEnvelope size={20} className="group-hover:animate-pulse" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg">Email</h4>
                  <a
                    href="mailto:ommehta708@gmail.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    ommehat708@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="mt-1 mr-4 text-blue-400 bg-blue-900/30 p-3 rounded-full">
                  <FaPhone size={20} className="group-hover:animate-pulse" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg">Phone</h4>
                  <a
                    href="tel:890140894"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    +91 8901408941
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.h3 
              className="text-2xl font-semibold mt-12 mb-6 text-white flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.span 
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-block mr-3 text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.span>
              Social Profiles
            </motion.h3>

            <div className="flex space-x-5">
              <motion.a
                href="https://github.com/ommeht/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-700 text-gray-300 rounded-full hover:bg-blue-900 hover:text-blue-300 transition-colors shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/om-mehta-135443294/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-700 text-gray-300 rounded-full hover:bg-blue-900 hover:text-blue-300 transition-colors shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="mailto:ommehta708@gmail.com"
                className="p-4 bg-gray-700 text-gray-300 rounded-full hover:bg-blue-900 hover:text-blue-300 transition-colors shadow-lg relative overflow-hidden group"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity" />
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-gray-700 relative overflow-hidden"
            onMouseEnter={() => setActiveGlow("form")}
            onMouseLeave={() => setActiveGlow(null)}
          >
            {/* Glow effect when active */}
            {activeGlow === "form" && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 animate-pulse" />
            )}
            
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400" />

            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center">
              <motion.span 
                animate={{ rotate: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-block mr-3 text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.span>
              Send Me a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white transition-all"
                    placeholder="Name"
                  />
                  <div className="absolute inset-0 border border-blue-400/0 rounded-lg pointer-events-none transition-all peer-focus:border-blue-400/50" />
                </motion.div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    value={formData.from_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white transition-all"
                    placeholder="yourmail@example.com"
                  />
                </motion.div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white transition-all"
                    placeholder="Project Inquiry"
                  />
                </motion.div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700/50 text-white transition-all"
                    placeholder="Hello, I would like to discuss..."
                  ></textarea>
                </motion.div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700"
                } text-white font-medium rounded-lg transition-all shadow-lg flex justify-center items-center relative overflow-hidden group`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated background */}
                {!isSubmitting && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}

                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center">
                      <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </span>
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-green-900/50 border border-green-500 text-green-300 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Your message has been sent successfully! I'll get back to you soon.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};