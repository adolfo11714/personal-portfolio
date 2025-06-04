'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin, FaGlobe, FaCode, FaDatabase, FaServer, FaJava, FaNodeJs, FaReact, FaPython, FaHtml5, FaCss3Alt, FaJs, FaArrowUp, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMysql, SiFirebase, SiFastapi, SiTypescript } from 'react-icons/si';
import styles from './styles/TechStack.module.css';
import { useEffect, useState, useCallback, useRef } from 'react';

export default function ProfilePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const skills = [
    { 
      icon: <FaJava className="w-10 h-10 text-[#64ffda]" />, 
      title: 'Java', 
      description: 'Strong foundation in object-oriented programming and software development.',
      color: 'from-[#112240] to-[#1d3461]'
    },
    { 
      icon: <FaNodeJs className="w-10 h-10 text-[#64ffda]" />, 
      title: 'Node.js', 
      description: 'Building scalable server-side applications and RESTful APIs with Express.js.',
      color: 'from-[#112240] to-[#1d3461]'
    },
    { 
      icon: <SiNextdotjs className="w-10 h-10 text-[#64ffda]" />, 
      title: 'Next.js', 
      description: 'Developing modern, SEO-friendly web applications with server-side rendering and static site generation.',
      color: 'from-[#112240] to-[#1d3461]'
    },
    { 
      icon: <FaReact className="w-10 h-10 text-[#64ffda]" />, 
      title: 'React', 
      description: 'Creating dynamic and interactive user interfaces with component-based architecture.',
      color: 'from-[#112240] to-[#1d3461]'
    },
    { 
      icon: <SiTypescript className="w-10 h-10 text-[#64ffda]" />, 
      title: 'TypeScript', 
      description: 'Writing type-safe JavaScript code with enhanced development experience and better maintainability.',
      color: 'from-[#112240] to-[#1d3461]'
    },
    { 
      icon: <FaJs className="w-10 h-10 text-[#64ffda]" />, 
      title: 'JavaScript', 
      description: 'Building interactive web applications with modern ES6+ features and asynchronous programming.',
      color: 'from-[#112240] to-[#1d3461]'
    },
    { 
      icon: <FaDatabase className="w-10 h-10 text-[#64ffda]" />, 
      title: 'SQL', 
      description: 'Database design and management with SQL technologies.',
      color: 'from-[#112240] to-[#1d3461]'
    },
  ];

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSkill = useCallback(() => {
    setCurrentSkillIndex((prevIndex) => {
      const step = isMobile ? 1 : 3;
      const nextIndex = prevIndex + step;
      // If we're at the end, go back to the beginning
      if (nextIndex >= skills.length) {
        return 0;
      }
      // If the next step would show an incomplete group on desktop, adjust to show the last complete group
      if (!isMobile && nextIndex + 3 > skills.length) {
        return Math.max(0, skills.length - 3);
      }
      return nextIndex;
    });
  }, [skills.length, isMobile]);

  const prevSkill = useCallback(() => {
    setCurrentSkillIndex((prevIndex) => {
      const step = isMobile ? 1 : 3;
      const nextIndex = prevIndex - step;
      // If we're at the beginning, go to the last valid position
      if (nextIndex < 0) {
        return isMobile ? skills.length - 1 : Math.max(0, skills.length - 3);
      }
      return nextIndex;
    });
  }, [skills.length, isMobile]);

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextSkill, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSkill]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSkill();
      } else if (e.key === 'ArrowRight') {
        nextSkill();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSkill, prevSkill]);

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSkill();
    } else if (isRightSwipe) {
      prevSkill();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-gray-100">
      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#64ffda] transition-colors"
            onClick={() => setShowImageModal(false)}
            aria-label="Close modal"
          >
            <FaTimes className="w-8 h-8" />
          </button>
          <div className="relative w-[min(80vw,500px)] aspect-square">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/50 animate-pulse"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="/images/me.jpg"
                alt="Adolfo Martinez"
                fill
                sizes="(max-width: 768px) 80vw, 500px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-[#64ffda] text-[#0a192f] rounded-full shadow-lg hover:bg-[#4cd8b2] transition-all duration-300 z-40"
          aria-label="Back to top"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Hero Section */}
      <section className="relative bg-[#0a192f] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-transparent to-[#0a192f]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div 
              className="relative w-48 h-48 mb-8 cursor-pointer group"
              onClick={() => setShowImageModal(true)}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/50 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/me.jpg"
                  alt="Adolfo Martinez"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium">Click to enlarge</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              </div>
              <h1 className="text-6xl font-bold">
                <span className="text-[#64ffda]">&lt;</span>
                Hi, I am Adolfo
                <span className="text-[#64ffda]">/&gt;</span>
              </h1>
              <p className="text-2xl text-gray-400 max-w-2xl leading-relaxed">
                I am a Junior Developer studying Computer Science at UNCC with a concentration in Software Engineering, passionate about creating impactful technological solutions.
              </p>
              <a
                href="/AdolfoEMartinezResume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#64ffda] text-[#0a192f] rounded-lg font-medium hover:bg-[#64ffda]/90 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Resume</span>
                <FaGlobe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#0a192f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              <h2 className="text-4xl font-bold text-white">About Me</h2>
              <div className="h-px w-20 bg-[#64ffda]"></div>
            </div>
          </div>
          <div className="prose prose-lg max-w-none text-gray-400 space-y-6">
            <p className="text-lg leading-relaxed">
              I am a junior studying Computer Science at the University of North Carolina at Charlotte, I bring a mix of academic dedication and practical experience to the field. My background in the customer service industry has helped me shape a strong work ethic, excellent communication skills, and valuable management experience that I'm eager to apply to my future in technology.
            </p>
            <p className="text-lg leading-relaxed">
              Through continuous learning and a commitment to excellence, I aim to leverage my unique combination of practical experience and growing technical proficiency to drive innovation in computer science, tackling real-world challenges and creating impactful technological solutions that can positively transform lives and industries.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-[#112240]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              <h2 className="text-4xl font-bold text-white">Skills</h2>
              <div className="h-px w-20 bg-[#64ffda]"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#112240] to-[#1d3461] p-6 sm:p-8 rounded-lg shadow-lg border border-[#64ffda]/20 transition-all duration-300 hover:shadow-[#64ffda]/10 hover:border-[#64ffda]/40"
              >
                <div className="mb-4 sm:mb-6 transform transition-transform duration-300 hover:scale-110">{skill.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3">{skill.title}</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-[#0a192f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              <h2 className="text-4xl font-bold text-white">Projects</h2>
              <div className="h-px w-20 bg-[#64ffda]"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-[#112240] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#64ffda]/20">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Personal Portfolio</h3>
                <p className="text-gray-400 mb-4">
                  A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features a clean design, smooth animations, and a tech stack showcase.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Next.js</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Tailwind CSS</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">React</span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/adolfo11714/personal-portfolio"
                    className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="#"
                    className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-[#112240] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#64ffda]/20">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">My Air Charlotte</h3>
                <p className="text-gray-400 mb-4">
                  Built a responsive business website using Next.js and Tailwind CSS, implementing SEO optimization and creating an intuitive user interface for a local air quality company.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Next.js</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Tailwind CSS</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">React</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">SEO</span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://myairclt.com"
                    className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-[#112240] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#64ffda]/20">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Restaurant API</h3>
                <p className="text-gray-400 mb-4">
                  Collaborated with a team of 4 to develop a RESTful API using Python and FastAPI, featuring Swagger UI documentation and MySQL database integration for restaurant management.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Python</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">FastAPI</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">MySQL</span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/adolfo11714/RestaurantAPI"
                    className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-[#112240] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#64ffda]/20">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">Best Toys for Dogs</h3>
                <p className="text-gray-400 mb-4">
                  Developed an eBay-like e-commerce platform for used dog toys using Node.js and Express, featuring MongoDB Atlas integration and user authentication for a secure shopping experience.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Node.js</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">Express</span>
                  <span className="px-3 py-1 text-sm bg-[#0a192f] text-[#64ffda] rounded-full">MongoDB Atlas</span>
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://best-toysfor-dogs-15psm5kg6-adolfo11714s-projects.vercel.app/"
                    className="text-[#64ffda] hover:text-[#64ffda]/80 transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGlobe className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-[#0a192f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              <h2 className="text-4xl font-bold text-white">Tech Stack</h2>
              <div className="h-px w-20 bg-[#64ffda]"></div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.animateScroll}>
              {[
                { name: 'Java', icon: <FaJava className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Python', icon: <FaPython className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'HTML5', icon: <FaHtml5 className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'CSS', icon: <FaCss3Alt className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'JavaScript', icon: <FaJs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'TypeScript', icon: <SiTypescript className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'C/C++', icon: <FaCode className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'SQL', icon: <SiMysql className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Firebase', icon: <SiFirebase className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'FastAPI', icon: <SiFastapi className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
              ].map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className={`${tech.color} px-6 py-3 rounded-lg text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-2 flex-shrink-0`}
                >
                  {tech.icon}
                  {tech.name}
                </div>
              ))}
              {/* Duplicate items for seamless loop */}
              {[
                { name: 'Java', icon: <FaJava className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Python', icon: <FaPython className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'HTML5', icon: <FaHtml5 className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'CSS', icon: <FaCss3Alt className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'JavaScript', icon: <FaJs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'TypeScript', icon: <SiTypescript className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'C/C++', icon: <FaCode className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'SQL', icon: <SiMysql className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'Firebase', icon: <SiFirebase className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
                { name: 'FastAPI', icon: <SiFastapi className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
              ].map((tech, index) => (
                <div
                  key={`${tech.name}-duplicate-${index}`}
                  className={`${tech.color} px-6 py-3 rounded-lg text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-2 flex-shrink-0`}
                >
                  {tech.icon}
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#112240]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              <h2 className="text-4xl font-bold text-white">Connect with me</h2>
              <div className="h-px w-20 bg-[#64ffda]"></div>
            </div>
          </div>
          <div className="flex justify-center gap-12">
            <a
              href="https://github.com/adolfo11714"
              className="group flex items-center gap-3 text-gray-400 hover:text-[#64ffda] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#0a192f] shadow-sm flex items-center justify-center group-hover:shadow-lg transition-shadow border border-[#64ffda]/20">
                <FaGithub className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/adolfomartinez11714"
              className="group flex items-center gap-3 text-gray-400 hover:text-[#64ffda] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-lg bg-[#0a192f] shadow-sm flex items-center justify-center group-hover:shadow-lg transition-shadow border border-[#64ffda]/20">
                <FaLinkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}