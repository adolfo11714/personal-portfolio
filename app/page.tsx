import Image from 'next/image';
import { FaGithub, FaLinkedin, FaGlobe, FaCode, FaDatabase, FaServer, FaJava, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiMysql } from 'react-icons/si';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#0a192f] text-gray-100">
      {/* Hero Section */}
      <section className="relative bg-[#0a192f] text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f] via-transparent to-[#0a192f]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-primary/50 animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src="/images/me.jpg"
                  alt="Adolfo Martinez"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
                <h2 className="text-sm font-mono">About Me</h2>
                <div className="h-px w-20 bg-[#64ffda]"></div>
              </div>
              <h1 className="text-6xl font-bold">
                <span className="text-[#64ffda]">&lt;</span>
                Hi, I am Adolfo
                <span className="text-[#64ffda]">/&gt;</span>
              </h1>
              <p className="text-2xl text-gray-400 max-w-2xl leading-relaxed">
                I am a Junior Developer studying Computer Science at UNCC, passionate about creating impactful technological solutions.
              </p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 text-[#64ffda] mb-4">
              <h2 className="text-4xl font-bold text-white">Skills</h2>
              <div className="h-px w-20 bg-[#64ffda]"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <FaJava className="w-10 h-10 text-[#64ffda]" />, 
                title: 'Java', 
                description: 'Strong foundation in object-oriented programming and software development.',
                color: 'from-[#112240] to-[#1d3461]'
              },
              { 
                icon: <FaServer className="w-10 h-10 text-[#64ffda]" />, 
                title: 'Next.js & Node.js', 
                description: 'Building modern web applications with React and server-side technologies.',
                color: 'from-[#112240] to-[#1d3461]'
              },
              { 
                icon: <FaDatabase className="w-10 h-10 text-[#64ffda]" />, 
                title: 'SQL', 
                description: 'Database design and management with SQL technologies.',
                color: 'from-[#112240] to-[#1d3461]'
              },
            ].map((skill) => (
              <div 
                key={skill.title} 
                className={`bg-gradient-to-br ${skill.color} p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-[#64ffda]/20`}
              >
                <div className="mb-6">{skill.icon}</div>
                <h3 className="text-2xl font-semibold text-white mb-3">{skill.title}</h3>
                <p className="text-gray-400 leading-relaxed">{skill.description}</p>
              </div>
            ))}
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
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'Java', icon: <FaJava className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
              { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
              { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
              { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
              { name: 'SQL', icon: <SiMysql className="w-6 h-6" />, color: 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20' },
            ].map((tech) => (
              <div
                key={tech.name}
                className={`${tech.color} px-6 py-3 rounded-lg text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2`}
              >
                {tech.icon}
                {tech.name}
              </div>
            ))}
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