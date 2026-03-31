import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export const Home = ({ isDarkMode }) => {
  const bgCanvasRef = useRef(null);
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const celestialObjects = [];
    
    // Sun
    celestialObjects.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 30,
      color: "#FDB813",
      glowRadius: 100,
      glowColor: "rgba(253, 184, 19, 0.2)",
      isFixed: true
    });
    
    // Planets
    const planetColors = ["#8A9597", "#E7CDCD", "#6B93D6", "#C1440E", "#E29468", "#C7AA72"];
    const orbitRadii = [120, 180, 250, 320, 400, 480];
    
    for (let i = 0; i < 6; i++) {
      celestialObjects.push({
        angle: Math.random() * Math.PI * 2,
        orbitRadius: orbitRadii[i],
        radius: 5 + i * 3,
        speed: 0.002 / (i * 0.5 + 1),
        color: planetColors[i],
        orbit: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          visible: true
        }
      });
    }
    
    // Stars
    for (let i = 0; i < 120; i++) {
      celestialObjects.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.5,
        color: "rgba(255, 255, 255, 0.8)",
        twinkle: {
          speed: Math.random() * 0.03 + 0.01,
          phase: Math.random() * Math.PI * 2
        },
        isStar: true
      });
    }
    
    // Animation loop
    let animationId;
    
    const renderFrame = () => {
      const bg = isDarkMode ? "#0f0f1e" : "#e8f0fe";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw celestial objects
      celestialObjects.forEach(obj => {
        if (obj.isStar) {
          obj.twinkle.phase += obj.twinkle.speed;
          const opacity = 0.5 + Math.sin(obj.twinkle.phase) * 0.5;
          ctx.fillStyle = isDarkMode
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(80, 80, 180, ${opacity * 0.6})`;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (obj.isFixed) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            obj.x, obj.y, 0,
            obj.x, obj.y, obj.glowRadius
          );
          gradient.addColorStop(0, obj.color);
          gradient.addColorStop(0.2, obj.color);
          gradient.addColorStop(1, "rgba(253, 184, 19, 0)");
          ctx.fillStyle = gradient;
          ctx.arc(obj.x, obj.y, obj.glowRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = obj.color;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          obj.angle += obj.speed;
          const x = obj.orbit.x + Math.cos(obj.angle) * obj.orbitRadius;
          const y = obj.orbit.y + Math.sin(obj.angle) * obj.orbitRadius;
          if (obj.orbit.visible) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 100, 0.15)";
            ctx.arc(obj.orbit.x, obj.orbit.y, obj.orbitRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = obj.color;
          ctx.beginPath();
          ctx.arc(x, y, obj.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      animationId = requestAnimationFrame(renderFrame);
    };
    
    renderFrame();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  // Tilt effect for profile image
  useEffect(() => {
    const handleMouseMove = (e) => {
      const profileImg = document.getElementById("profile-img");
      if (!profileImg) return;
      const rect = profileImg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (centerY - y) / 20;
      const tiltY = (x - centerX) / 20;
      profileImg.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    };
    
    const handleMouseLeave = () => {
      const profileImg = document.getElementById("profile-img");
      if (profileImg) profileImg.style.transform = "";
    };
    
    const imgContainer = document.getElementById("img-container");
    if (imgContainer) {
      imgContainer.addEventListener("mousemove", handleMouseMove);
      imgContainer.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (imgContainer) {
        imgContainer.removeEventListener("mousemove", handleMouseMove);
        imgContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 20px rgba(99, 102, 241, 0.4)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const gradientText = "bg-gradient-to-r from-pink-500 via-indigo-500 to-blue-500 text-transparent bg-clip-text";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <canvas 
        ref={bgCanvasRef} 
        className="absolute top-0 left-0 w-full h-full" 
        style={{ zIndex: 0 }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="md:w-1/2 mb-12 md:mb-0 flex justify-center" variants={itemVariants}>
            <div id="img-container" className="relative group transition-transform duration-300">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-60 group-hover:opacity-100"></div>
              <img
                id="profile-img"
                src="https://media.licdn.com/dms/image/v2/D5603AQFnU-GKluPKcQ/profile-displayphoto-scale_200_200/B56Z1CntDTK4AY-/0/1774939203412?e=1776297600&v=beta&t=YKSBp6M4zdV8JT9i2AfLAWv1qxAXqGwfUVIrVMRnm2k"
                alt="Om Mehta"
                className="relative z-10 rounded-full w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div className="md:w-1/2 text-center md:text-left" variants={itemVariants}>
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 dark:text-white text-gray-800" variants={itemVariants}>
              Hi, I'm <span className={gradientText}>Om Mehta</span>
            </motion.h1>

            <motion.h2 className="text-lg sm:text-xl md:text-2xl dark:text-indigo-200 text-indigo-600 mb-6" variants={itemVariants}>
              <TypeAnimation
                sequence={[
                  "Computer Science Student",
                  1000,
                  "Full Stack Web Developer",
                  1000,
                  "UI/UX Enthusiast",
                  1000,
                  "AI Enthusiast",
                  1000,
                   "Lifelong Learner",
                  1000,
                  "Problem Solver",
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </motion.h2>

            <motion.p
  className="text-base sm:text-lg md:text-xl font-medium mb-8 leading-relaxed dark:text-yellow-300 text-gray-800"
  variants={itemVariants}
>
  Crafting delightful digital experiences with a blend of creative design and modern code.
</motion.p>





            <motion.div className="flex flex-wrap gap-4 justify-center md:justify-start" variants={itemVariants}>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/contact" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md flex items-center gap-2">
                  <span>Contact Me</span>
                  <FaEnvelope />
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Link to="/projects" className="px-6 py-3 border-2 border-indigo-400 dark:text-indigo-200 text-indigo-600 rounded-lg flex items-center gap-2">
                  <span>View Projects</span>
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <a href="/resume.pdf" download className="px-6 py-3 bg-pink-600 text-white rounded-lg flex items-center gap-2">
                  <span>Download CV</span>
                  <FaDownload />
                </a>
              </motion.div>
            </motion.div>

            <motion.div className="flex mt-10 space-x-6 justify-center md:justify-start" variants={itemVariants}>
              <motion.a href="https://github.com/ommeht/" target="_blank" className="dark:text-white text-gray-700 hover:text-indigo-400" whileHover={{ scale: 1.2 }}>
                <FaGithub size={26} />
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/om-mehta-135443294/" target="_blank" className="dark:text-white text-gray-700 hover:text-blue-400" whileHover={{ scale: 1.2 }}>
                <FaLinkedin size={26} />
              </motion.a>
              <motion.a href="mailto:ommehta708@gmail.com" className="dark:text-white text-gray-700 hover:text-red-400" whileHover={{ scale: 1.2 }}>
                <FaEnvelope size={26} />
              </motion.a>
              <motion.a href="tel:8901408941" className="dark:text-white text-gray-700 hover:text-green-400" whileHover={{ scale: 1.2 }}>
                <FaPhone size={26} />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;


