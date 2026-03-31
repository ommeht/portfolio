
// export default App;

import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

// Lazy load components for better performance
const Home = lazy(() => import("./components/Home").then(module => ({ default: module.Home })));
const About = lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Skills = lazy(() => import("./components/Skills").then(module => ({ default: module.Skills })));
const Projects = lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Education = lazy(() => import("./components/Education").then(module => ({ default: module.Education })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
  </div>
);

// Layout component that wraps each route with common elements
const Layout = ({ children, isDarkMode, toggleDarkMode, particlesOptions, particlesInit }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Extract the path without the leading slash to set active section
    const path = location.pathname.substring(1) || "home";
    setActiveSection(path);
  }, [location]);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          className="fixed inset-0 -z-10"
        />
        <Navbar activeSection={activeSection} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize using system preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Enhanced vibrant particles configuration
  const particlesOptions = {
    fullScreen: { enable: false },
    fpsLimit: 120,
    particles: {
      color: {
        value: isDarkMode ? 
          ["#ff3f81", "#58c8ed", "#f9c80e", "#7b4fff", "#2ecc71"] : 
          ["#e94560", "#0652dd", "#f9a828", "#574b90", "#16a085"]
      },
      links: {
        color: isDarkMode ? "#ffffff" : "#000000",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce"
        },
        random: true,
        speed: 2,
        straight: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.7,
        random: {
          enable: true,
          minimumValue: 0.1
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      shape: {
        type: ["circle", "triangle", "star", "polygon"],
      },
      size: {
        value: { min: 1, max: 5 },
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      }
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    },
    detectRetina: true
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Memoized Layout props to prevent unnecessary re-renders
  const layoutProps = {
    isDarkMode,
    toggleDarkMode,
    particlesOptions,
    particlesInit
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout {...layoutProps}>
            <Home />
          </Layout>
        } />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/about" element={
          <Layout {...layoutProps}>
            <About />
          </Layout>
        } />
        <Route path="/skills" element={
          <Layout {...layoutProps}>
            <Skills />
          </Layout>
        } />
        <Route path="/projects" element={
          <Layout {...layoutProps}>
            <Projects />
          </Layout>
        } />
        <Route path="/education" element={
          <Layout {...layoutProps}>
            <Education />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout {...layoutProps}>
            <Contact />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;