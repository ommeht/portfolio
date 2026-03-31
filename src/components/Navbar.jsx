import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 4.354a.75.75 0 01.75.75V6.5a.75.75 0 01-1.5 0V5.104a.75.75 0 01.75-.75zM12 17.5a.75.75 0 01.75.75v1.396a.75.75 0 01-1.5 0V18.25a.75.75 0 01.75-.75zM4.354 12a.75.75 0 01.75-.75H6.5a.75.75 0 010 1.5H5.104a.75.75 0 01-.75-.75zM17.5 12a.75.75 0 01.75-.75h1.396a.75.75 0 010 1.5H18.25a.75.75 0 01-.75-.75zM6.343 6.343a.75.75 0 011.06 0l.985.984a.75.75 0 11-1.06 1.06l-.985-.984a.75.75 0 010-1.06zM15.612 15.612a.75.75 0 011.06 0l.985.984a.75.75 0 11-1.06 1.06l-.985-.984a.75.75 0 010-1.06zM6.343 17.657a.75.75 0 010-1.06l.984-.985a.75.75 0 111.06 1.06l-.984.985a.75.75 0 01-1.06 0zM15.612 8.388a.75.75 0 010-1.06l.984-.985a.75.75 0 111.06 1.06l-.984.985a.75.75 0 01-1.06 0zM12 8a4 4 0 100 8 4 4 0 000-8z"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.752 15.002A9.718 9.718 0 0118 15.75 9.75 9.75 0 018.25 6a9.718 9.718 0 01.75-3.752A9.753 9.753 0 003 12c0 5.385 4.365 9.75 9.75 9.75 4.94 0 9.055-3.674 9.75-8.498a.75.75 0 00-.748-.75z"/>
  </svg>
);

export const Navbar = ({ activeSection, isDarkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "education", label: "Education", path: "/education" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { when: "afterChildren" } },
    open: { opacity: 1, height: "auto", transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  const linkClass = (id) =>
    `relative px-4 py-2 rounded-lg mx-1 transition-colors duration-300 ${
      activeSection === id
        ? "text-indigo-600 dark:text-indigo-400 font-medium"
        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

  const mobileLinkClass = (id) =>
    `block px-4 py-3 rounded-lg transition-colors duration-300 ${
      activeSection === id
        ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-lg"
          : "bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-transparent bg-clip-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Om's Portfolio
            </motion.span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, i) => (
              <motion.div key={item.id} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
                <Link to={item.path} className={linkClass(item.id)}>
                  {activeSection === item.id && (
                    <motion.span
                      className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg -z-10"
                      layoutId="navHighlight"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.button
              onClick={toggleDarkMode}
              className="ml-2 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </motion.button>
          </div>

          {/* Mobile: dark mode toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </motion.button>
            <motion.button
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          variants={mobileMenuVariants}
          initial="closed"
          animate={isMobileMenuOpen ? "open" : "closed"}
        >
          <div className="py-2 space-y-1">
            {navItems.map((item) => (
              <motion.div key={item.id} variants={mobileNavItemVariants}>
                <Link to={item.path} className={mobileLinkClass(item.id)}>
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
