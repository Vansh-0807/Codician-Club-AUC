import { useState, useEffect } from "react";
import BorderGlow from './components/BorderGlow/BorderGlow';
import TextType from './components/TextType/TextType';
import TrueFocus from './components/TrueFocus/TrueFocus';
import GooeyNav from './components/GooeyNav/GooeyNav';
import GlareHover from './components/GlareHover';
import DepthCarousel from './components/DepthCarousel';

import "./App.css";
import { settingsData, aboutUsData, collegeData, domainsData, collaboratorsData, eventsData, leadersData, mentorsData, coreTeamData, speakersData } from "./data";


const projects = [
  { title: "RakshakLink", desc: "Autonomous emergency routing system leveraging real-time traffic data.", tags: ["React", "Python"] },
  { title: "FinGuard ML", desc: "Predictive financial modeling to secure and analyze digital assets.", tags: ["TensorFlow", "Node.js"] },
  { title: "LunarVision", desc: "Computer vision mapping of lunar surfaces from satellite imagery.", tags: ["OpenCV", "SpaceX API"] },
];

const teamMembers = [
  {
    name: "Alex Mercer",
    position: "Lead Developer",
    course: "B.Tech Computer Science",
    semester: "Semester 6",
    description: "Architects the core systems and leads the development of our open-source tools.",
    linkedin: "https://linkedin.com/in/alexmercer",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Sarah Chen",
    position: "AI & ML Head",
    course: "M.Tech Data Science",
    semester: "Semester 2",
    description: "Spearheads AI research, trains predictive models, and conducts deep learning masterclasses.",
    linkedin: "https://linkedin.com/in/sarahchen",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "James Holden",
    position: "UI/UX Designer",
    course: "BCA",
    semester: "Semester 4",
    description: "Designs pixel-perfect, glassmorphism interfaces and ensures a premium user experience.",
    linkedin: "https://linkedin.com/in/jamesholden",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];




// If you are an admin, you can set the club logo URL here (e.g., "/logo.png" or "https://..."). 
// Set to null to display the default "Codician" text.
const ADMIN_LOGO_URL = "/logo.png";

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${import.meta.env.BASE_URL}media/${path}`;
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  const logoUrl = settingsData?.logo ? getImageUrl(settingsData.logo) : ADMIN_LOGO_URL;
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [viewingLogo, setViewingLogo] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com/company/codician",
    email: "contact@codician.club",
    instagram: "https://instagram.com/codician"
  });
  const [zoomedImage, setZoomedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [expandedEvents, setExpandedEvents] = useState({});
    useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    if (settingsData?.tagline) {
      document.title = `Codician Club | ${settingsData.tagline}`;
    }
    setSocialLinks({
      linkedin: settingsData?.linkedin_url || "https://linkedin.com/company/codician",
      email: settingsData?.email || "contact@codician.club",
      instagram: settingsData?.instagram_url || "https://instagram.com/codician"
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-[#ededed] overflow-x-hidden selection:bg-gray-900 dark:bg-white/20">
      
      {/* Animated Aurora Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 aurora-bg mix-blend-screen"></div>
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+CiAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPgogIDwvZmlsdGVyPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZUZpbHRlcikiLz4KPC9zdmc+')] mix-blend-overlay"></div>
      </div>

      {/* Full Width Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-300 ${scrolled ? 'bg-gray-900/90 dark:bg-black/90 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-2xl py-2' : 'bg-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-4 relative group">
            {logoUrl ? (
              <div className="relative flex items-center">
                <button onClick={() => setViewingLogo(true)} className="focus:outline-none transition-transform hover:scale-105">
                  <img src={logoUrl} alt="Club Logo" className="h-14 w-14 rounded-full object-cover border-2 border-black/10 dark:border-white/10 drop-shadow-md bg-gray-100 dark:bg-black" />
                </button>
              </div>
            ) : (
              <a href="#home" className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-black dark:from-white to-gray-400 text-gray-100 dark:text-black flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)]">C</span>
                <span className="font-bold tracking-tight text-gray-900 dark:text-white text-xl">Codician</span>
              </a>
            )}
          </div>

        <div className={`flex-[2] justify-center ${menuOpen ? 'flex absolute top-[80px] left-0 right-0 flex-col p-6 rounded-3xl bg-gray-900 dark:bg-black/90 backdrop-blur-2xl shadow-2xl' : 'hidden'} md:flex md:static md:flex-row md:bg-transparent md:border-none md:p-0 gap-6 items-center scale-90 md:scale-100`}>
          <GooeyNav
            items={[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'College', href: '#college' },
              { label: 'Mentors', href: '#mentors' },
              { label: 'Team', href: '#team' },
              { label: 'Domains', href: '#domains' },
              { label: 'Collaborators', href: '#collaborators' },
              { label: 'Speakers', href: '#speakers' },
              { label: 'Events', href: '#events' },
              { label: 'Contact', href: '#contact' }
            ]}
          />
          {/* Mobile Theme Toggle (Inside Menu) */}
          <button 
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
              setMenuOpen(false);
            }} 
            className="md:hidden mt-6 w-full flex items-center justify-center gap-3 p-3 rounded-2xl border border-white/20 text-white bg-white/10 hover:bg-white/20 transition-all font-semibold tracking-wide"
          >
            {theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500/30 text-gray-800 dark:text-white bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-all text-lg" aria-label="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button className="md:hidden w-10 h-10 flex items-center justify-center text-gray-800 dark:text-white text-xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Navigation">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
        </div>
      </header>
      {/* Interactive Background Mesh */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gray-100 dark:bg-[#020403]"></div>
        <div className="absolute inset-0 mesh-bg opacity-70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto px-6 pt-32">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[85vh] w-full flex flex-col justify-center items-center text-center mt-12 mb-16 animate-fade-in-up relative">
          
          {logoUrl ? (
             <div className="mb-8 md:mb-12 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.15)] bg-gray-100 dark:bg-black/50 flex items-center justify-center mx-auto">
               <img src={logoUrl} alt="Club Logo" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 drop-shadow-xl" />
             </div>
          ) : (
             <div className="mb-8 md:mb-12 w-48 h-48 md:w-64 md:h-64 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center bg-gradient-to-br from-black dark:from-white/10 to-transparent backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               <span className="text-7xl font-bold text-gray-900 dark:text-white opacity-80">C</span>
             </div>
          )}

          <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter mb-6" style={{ filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.5))' }}>
            <TrueFocus 
              sentence="CODICIAN CLUB"
              manualMode={false}
              blurAmount={4}
              borderColor="#10b981"
              glowColor="rgba(16, 185, 129, 0.4)"
              animationDuration={1}
              pauseBetweenAnimations={1}
              wordClassName="text-transparent bg-clip-text bg-gradient-to-b from-black dark:from-white via-gray-200 to-gray-500"
            />
          </h1>
          
          <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 font-medium tracking-[0.2em] md:tracking-[0.3em] mb-16 uppercase px-4 text-shadow-sm min-h-[3rem]">
            <TextType 
              text={['"WHERE CODERS BECOME CREATORS."']}
              typingSpeed={75}
              pauseDuration={5000}
              deletingSpeed={30}
              showCursor={true}
              cursorCharacter="|"
            />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center z-20">
            <a href="#about" className="bg-gray-900 dark:bg-white text-gray-100 dark:text-black font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-full shimmer-btn hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2">
              Explore
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </a>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="w-full scroll-mt-32 mb-32 text-center">
          <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">About Us</h2>
          </div>
          
          <div className="relative mb-12 rounded-3xl shadow-2xl border border-black/5 dark:border-white/5 w-full h-auto">
            <GlareHover
              width="100%"
              height="100%"
              glareColor="#ffffff"
              glareOpacity={0.3}
              glareAngle={-30}
              glareSize={300}
              transitionDuration={800}
              playOnce={false}
              borderRadius="1.5rem"
            >
              <img 
                src="/media/about_us/About Us.png" 
                alt="About Us" 
                className="w-full h-auto object-cover block"
                style={{ aspectRatio: 'auto' }}
              />
            </GlareHover>
          </div>

          <div className="p-10 md:p-16 rounded-3xl premium-glass shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 text-left">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-all duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
             
             <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium relative z-10">
               {aboutUsData?.text}
             </p>
          </div>
        </section>

        {/* COLLEGE SECTION */}
        <section id="college" className="w-full scroll-mt-32 mb-32 text-center">
          <div className="mb-12 border-b border-black/10 dark:border-white/10 pb-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Our College</h2>
          </div>
          
          <div className="p-8 md:p-12 rounded-3xl premium-glass shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-left">
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-700 pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="flex-shrink-0 relative z-10 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:border-black/30 dark:border-white/30 transition-all duration-500">
                <img src={getImageUrl(collegeData.image)} alt="College Logo/Campus" className="w-full h-full object-cover" />
             </div>

             <div className="relative z-10 flex flex-col text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:dark:from-white group-hover:to-blue-300 transition-all duration-300">
                  {collegeData.name}
                </h3>     
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium mb-6">
                  {collegeData.description}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {collegeData.location && (
                    <a 
                      href={collegeData.location} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-emerald-400 backdrop-blur-md transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {collegeData.location_name}
                    </a>
                  )}
                </div>
             </div>
          </div>
        </section>

        {/* DOMAINS SECTION */}
        <section id="domains" className="w-full scroll-mt-32 mb-32 text-center">
          <div className="mb-16 border-b border-black/10 dark:border-white/10 pb-8 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Our Domains</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">We specialize in mastering the core pillars of modern engineering.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {domainsData.map((domain, i) => (
              <BorderGlow key={i} className="w-full h-full"><div  className="h-full w-full group flex flex-col p-8 rounded-3xl premium-glass hover:-translate-y-2 cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black dark:from-white/10 to-transparent flex items-center justify-center text-3xl mb-8 border border-black/10 dark:border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:bg-gray-900 hover:dark:bg-white/20 transition-all duration-500 overflow-hidden">
                  {domain.image ? (
                    <img src={getImageUrl(domain.image)} alt={domain.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-gray-500">Img</span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">{domain.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">{domain.description}</p>
              </div></BorderGlow>
            ))}
          </div>
        </section>



        {/* COLLABORATORS SECTION */}
        <section id="collaborators" className="w-full scroll-mt-32 mb-32 text-center">
          <div className="mb-16 border-b border-black/10 dark:border-white/10 pb-8 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Our Collaborators</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">Organizations that partner with us to create impactful experiences.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {collaboratorsData.map((org, i) => (
              <BorderGlow key={i} className="w-full max-w-md">
                <div className="h-full w-full flex flex-col items-center p-10 md:p-12 rounded-[2.5rem] premium-glass shadow-2xl relative overflow-hidden hover:-translate-y-2 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-black/10 dark:border-white/10 mb-6 bg-gray-100 dark:bg-black relative z-10 shadow-lg flex items-center justify-center">
                    <img src={getImageUrl(org.logo)} alt={org.name} className="w-full h-full object-contain p-2" />
                  </div>
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 relative z-10">{org.tagline}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight relative z-10">{org.name}</h3>
                </div>
              </BorderGlow>
            ))}
          </div>
        </section>

        {/* GUEST SPEAKERS SECTION */}
        <section id="speakers" className="w-full scroll-mt-32 mb-32 text-center">
          <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Guest Speakers</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">Industry leaders and visionaries who have shared their expertise with the Codician Club.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-6xl mx-auto px-4">
            {speakersData.map((speaker, i) => (
              <BorderGlow key={i} className="w-full h-full"><div className="h-full w-full group flex flex-col items-center text-center p-8 rounded-[2rem] bg-gray-100 dark:bg-black/50 border border-black/10 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-2 transition-all duration-500 premium-glass relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 dark:from-white/[0.02] to-transparent pointer-events-none"></div>
                
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-6 bg-gray-100 dark:bg-black relative z-10 shadow-lg flex items-center justify-center mx-auto">
                  <img src={getImageUrl(speaker.photo)} alt={speaker.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors relative z-10">{speaker.name}</h3>
                <p className="text-sm font-bold text-emerald-500 uppercase tracking-wide mb-4 relative z-10">{speaker.title}</p>
                

                
                <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white bg-black/5 dark:bg-white/5 hover:bg-gray-900 hover:dark:bg-white hover:text-white hover:dark:text-black px-5 py-2.5 rounded-full transition-all duration-300 border border-black/10 dark:border-white/10 shadow-md relative z-10">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              </div></BorderGlow>
            ))}
          </div>
        </section>

        {/* EVENTS SECTION (ALBUMS) */}

        <section id="events" className="w-full scroll-mt-32 mb-32 text-center">
          <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-16 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Event Galleries</h2>

          </div>

          {/* DYNAMIC ROADMAP TIMELINE */}
          <div className="relative flex flex-col w-full max-w-6xl mx-auto py-10 text-left">
            
            {/* Central mobile line (hidden on desktop) */}
            <div className="absolute left-8 md:hidden top-0 bottom-0 w-1 bg-black/10 dark:bg-white/10 rounded-full z-0"></div>

            {[...eventsData].reverse().map((event, i) => {
              const isEven = i % 2 === 0;
              const pinClasses = [
                { bg: 'bg-[#C7A287]', tail: 'border-t-[#C7A287]' },
                { bg: 'bg-[#F28B82]', tail: 'border-t-[#F28B82]' },
                { bg: 'bg-[#81C995]', tail: 'border-t-[#81C995]' },
                { bg: 'bg-[#8AB4F8]', tail: 'border-t-[#8AB4F8]' },
                { bg: 'bg-[#C58AF9]', tail: 'border-t-[#C58AF9]' }
              ];
              const p = pinClasses[i % pinClasses.length];

              return (
                <div key={i} className="relative flex items-center w-full min-h-[500px] mb-16 md:mb-0">
                  
                  {/* DESKTOP ROADMAP SVG (Hidden on mobile) */}
                  <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
                     <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-60">
                        <path 
                          d={isEven 
                            ? `M 50 0 C 50 30, 20 30, 20 50 ${i === eventsData.length - 1 ? '' : 'C 20 70, 50 70, 50 100'}` 
                            : `M 50 0 C 50 30, 80 30, 80 50 ${i === eventsData.length - 1 ? '' : 'C 80 70, 50 70, 50 100'}`
                          } 
                          stroke="#4b5563" 
                          strokeWidth="3" 
                          fill="none" 
                          vectorEffect="non-scaling-stroke" 
                          strokeLinecap="round" 
                        />
                     </svg>
                  </div>

                  {/* MAP PIN (Desktop) */}
                  <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full border-[5px] border-white items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.6)] z-20 ${p.bg} ${isEven ? 'left-[20%] -translate-x-1/2' : 'left-[80%] -translate-x-1/2'}`}>
                     <div className="w-4 h-4 lg:w-6 lg:h-6 bg-gray-900 dark:bg-white rounded-full"></div>
                     <div className={`absolute -bottom-3 lg:-bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[10px] lg:border-l-[10px] lg:border-r-[10px] lg:border-t-[14px] border-l-transparent border-r-transparent ${p.tail}`}></div>
                  </div>

                  {/* MAP PIN (Mobile) */}
                  <div className={`md:hidden absolute left-8 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-[3px] border-white flex items-center justify-center shadow-lg z-20 ${p.bg}`}>
                     <div className="w-2.5 h-2.5 bg-gray-900 dark:bg-white rounded-full"></div>
                  </div>

                  {/* EVENT CARD CONTAINER */}
                  <div className={`relative z-10 w-full pl-20 pr-4 md:px-0 md:w-[45%] ${isEven ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                     
                     {/* EVENT CARD */}
                     <BorderGlow className="w-full h-full"><div className="h-full w-full group flex flex-col rounded-[2.5rem] premium-glass hover:-translate-y-2 cursor-pointer overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-black/10 dark:border-white/10" onClick={() => { setActiveAlbum(event); if (event.images.length > 0) { setZoomedImage(event.images[0].image); setZoomLevel(1); } }}>
                       {/* Image Section */}
                       <div className="relative h-56 lg:h-72 w-full bg-gray-100 dark:bg-black overflow-hidden flex items-center justify-center">
                         {event.images.length > 0 && (
                           <img src={getImageUrl(event.images[0].image)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 blur-3xl transition-all duration-700 group-hover:scale-110" />
                         )}
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                           {event.images.length > 0 ? (
                             <img src={getImageUrl(event.images[0].image)} alt={event.title} className="w-full h-full object-cover drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700" />
                           ) : (
                             <div className="w-full h-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-gray-500">No images</div>
                           )}
                         </div>
                       </div>
                       
                       {/* Content Section */}
                       <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between bg-white/60 dark:bg-[#111] backdrop-blur-xl relative border-t border-black/5 dark:border-white/5">
                         <div>
                           <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors duration-300">{event.title}</h3>
                           <p className={`text-gray-800 dark:text-gray-300 text-sm font-medium leading-relaxed mb-4 transition-all duration-500 ${expandedEvents[i] ? '' : 'line-clamp-2'}`}>
                             {event.text}
                           </p>
                           {event.text && event.text.length > 100 && (
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 setExpandedEvents(prev => ({ ...prev, [i]: !prev[i] }));
                               }}
                               className="text-emerald-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1 mb-6"
                             >
                               {expandedEvents[i] ? 'Show Less' : 'Read More'}
                               <svg className={`w-3 h-3 transition-transform duration-300 ${expandedEvents[i] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                             </button>
                           )}
                         </div>
                         <div className="flex justify-end">
                           {event.images.length > 0 && (
                             <div className="inline-flex bg-white/5 hover:bg-white/10 backdrop-blur-xl px-4 py-2 lg:px-5 lg:py-3 rounded-full text-xs lg:text-sm font-bold text-gray-900 dark:text-white border border-white/10 items-center gap-2 transition-all duration-500 shadow-xl">
                               <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                               {event.images.length} Photos
                             </div>
                           )}
                         </div>
                       </div>
                     </div></BorderGlow>
                     {/* END EVENT CARD */}

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* MENTORS SECTION */}
        <section id="mentors" className="w-full scroll-mt-32 mb-32">
          <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Our Mentors</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">The guiding forces shaping the technical trajectory of our community.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center max-w-5xl mx-auto">
            {mentorsData.length > 0 ? (
              mentorsData.map((ldr, i) => (
                <BorderGlow key={i} className="w-full md:w-[calc(50%-1rem)]"><div  className="h-full w-full group flex flex-col items-center p-10 rounded-[2.5rem] premium-glass hover:-translate-y-3 cursor-pointer shadow-2xl relative overflow-hidden bg-gradient-to-b from-black/5 to-transparent dark:from-white/[0.02]">
                  <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none opacity-50"></div>
                  <div 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-emerald-500/30 group-hover:border-emerald-500/60 transition-all duration-500 mb-8 bg-gray-100 dark:bg-black relative z-10 shadow-lg cursor-pointer flex items-center justify-center"
                    onClick={() => { if (ldr.image) { setZoomedImage(ldr.image); setZoomLevel(1); } }}
                  >
                    {ldr.image ? (
                      <img src={getImageUrl(ldr.image)} alt={ldr.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">No Photo</div>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-400 transition-colors mb-2 relative z-10 tracking-tight">{ldr.name}</h3>
                  <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-6 relative z-10 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">{ldr.role}</span>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-8 relative z-10">{ldr.description}</p>
                  
                  {ldr.linkedin && (
                    <a href={ldr.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white bg-black/10 dark:bg-white/10 hover:bg-emerald-500 hover:text-white px-6 py-3 rounded-full transition-all duration-300 border border-black/20 dark:border-white/20 relative z-10 shadow-md">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                       LinkedIn
                    </a>
                  )}
                </div></BorderGlow>
              ))
            ) : (
              // PLACEHOLDERS
              [
                { role: "Club Mentor", name: "Add in Admin Panel" }
              ].map((ldr, i) => (
                <BorderGlow key={i} className="w-full md:w-[calc(50%-1rem)]"><div  className="h-full w-full group flex flex-col items-center p-10 rounded-[2.5rem] premium-glass hover:-translate-y-3 cursor-pointer shadow-2xl relative overflow-hidden opacity-50 border-dashed border-2 border-black/20 dark:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none opacity-50"></div>
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-8 bg-gray-100 dark:bg-black relative z-10 shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm text-center px-4">Awaiting Profile</div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-600 dark:text-gray-400 transition-colors mb-2 relative z-10 tracking-tight">{ldr.name}</h3>
                  <span className="text-sm font-bold text-emerald-400/50 uppercase tracking-widest mb-6 relative z-10 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">{ldr.role}</span>
                  <p className="text-gray-500 text-base leading-relaxed mb-8 relative z-10">Add this member's description and profile via the Django Admin Panel to replace this placeholder.</p>
                </div></BorderGlow>
              ))
            )}
          </div>
        </section>

        {/* CLUB LEADERS SECTION */}
        <section id="leadership" className="w-full scroll-mt-32 mb-32">
          <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Club Leaders</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">The visionaries steering the Codician Club towards a future of innovation and excellence.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            {leadersData.length > 0 ? (
              leadersData.map((ldr, i) => (
                <BorderGlow key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"><div  className="h-full w-full group flex flex-col items-center p-8 rounded-3xl premium-glass hover:-translate-y-2 cursor-pointer shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none"></div>
                  <div 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-6 bg-gray-100 dark:bg-black relative z-10 shadow-lg cursor-pointer flex items-center justify-center"
                    onClick={() => { if (ldr.image) { setZoomedImage(ldr.image); setZoomLevel(1); } }}
                  >
                    {ldr.image ? (
                      <img src={getImageUrl(ldr.image)} alt={ldr.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">No Photo</div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-300 transition-colors mb-1 relative z-10">{ldr.name}</h3>
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 relative z-10">{ldr.role}</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 relative z-10">{ldr.description}</p>
                  
                  {ldr.linkedin && (
                    <a href={ldr.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white bg-black/10 dark:bg-white/10 hover:bg-gray-900 hover:dark:bg-white hover:text-gray-100 hover:dark:text-black px-4 py-2 rounded-full transition-all duration-300 border border-black/20 dark:border-white/20 relative z-10">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      LinkedIn
                    </a>
                  )}
                </div></BorderGlow>
              ))
            ) : (
              // PLACEHOLDERS
              [
                { role: "President", name: "Add in Admin Panel" },
                { role: "Vice President", name: "Add in Admin Panel" }
              ].map((ldr, i) => (
                <BorderGlow key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"><div  className="h-full w-full group flex flex-col items-center p-8 rounded-3xl premium-glass hover:-translate-y-2 cursor-pointer shadow-xl relative overflow-hidden opacity-50 border-dashed border-2 border-black/20 dark:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none"></div>
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-6 bg-gray-100 dark:bg-black relative z-10 shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm text-center px-4">Awaiting Profile</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 transition-colors mb-1 relative z-10">{ldr.name}</h3>
                  <span className="text-sm font-bold text-emerald-400/50 uppercase tracking-widest mb-4 relative z-10">{ldr.role}</span>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">Add this member's description and profile via the Django Admin Panel to replace this placeholder.</p>
                </div></BorderGlow>
              ))
            )}
          </div>
        </section>

        {/* CORE TEAM SECTION */}
        <section id="team" className="w-full scroll-mt-32 mb-16">
          <div className="border-b border-black/10 dark:border-white/10 pb-8 mb-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">Core Team</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">The brilliant minds working tirelessly behind the scenes to make it all happen.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            {coreTeamData.length > 0 ? (
              coreTeamData.map((member, i) => (
                <BorderGlow key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"><div  className="h-full w-full group flex flex-col items-center p-8 rounded-3xl premium-glass hover:-translate-y-2 cursor-pointer shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none"></div>
                  <div 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-6 bg-gray-100 dark:bg-black relative z-10 shadow-lg cursor-pointer flex items-center justify-center"
                    onClick={() => { if (member.photo) { setZoomedImage(member.photo); setZoomLevel(1); } }}
                  >
                    {member.photo ? (
                      <img src={getImageUrl(member.photo)} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">No Photo</div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-300 transition-colors mb-1 relative z-10">{member.name}</h3>
                  <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2 relative z-10">{member.position}</span>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-4 relative z-10">{member.course}, {member.semester}</span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 relative z-10">{member.description}</p>
                  
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white bg-black/10 dark:bg-white/10 hover:bg-gray-900 hover:dark:bg-white hover:text-gray-100 hover:dark:text-black px-4 py-2 rounded-full transition-all duration-300 border border-black/20 dark:border-white/20 relative z-10">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      LinkedIn
                    </a>
                  )}
                </div></BorderGlow>
              ))
            ) : (
              // PLACEHOLDERS
              [
                { position: "Lead Developer", name: "Add in Admin Panel" },
                { position: "UI/UX Designer", name: "Add in Admin Panel" },
                { position: "AI Head", name: "Add in Admin Panel" }
              ].map((member, i) => (
                <BorderGlow key={i} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"><div  className="h-full w-full group flex flex-col items-center p-8 rounded-3xl premium-glass hover:-translate-y-2 cursor-pointer shadow-xl relative overflow-hidden opacity-50 border-dashed border-2 border-black/20 dark:border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none"></div>
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-6 bg-gray-100 dark:bg-black relative z-10 shadow-lg">
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm text-center px-4">Awaiting Profile</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 transition-colors mb-1 relative z-10">{member.name}</h3>
                  <span className="text-sm font-bold text-emerald-400/50 uppercase tracking-widest mb-4 relative z-10">{member.position}</span>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 relative z-10">Add this team member's description and profile via the Django Admin Panel to replace this placeholder.</p>
                </div></BorderGlow>
              ))
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="w-full scroll-mt-32 mb-24 flex flex-col items-center">
          <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-6 w-full text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">We're always looking to connect with passionate developers.</p>
          </div>
          
          <div className="w-full max-w-3xl p-10 md:p-16 rounded-[2.5rem] premium-glass flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-black dark:from-white/[0.02] to-transparent pointer-events-none"></div>
            
            {/* Profile Image & Name */}
            <div className="mb-10 flex flex-col items-center relative z-10 cursor-pointer" onClick={() => { if(logoUrl) setViewingLogo(true); }}>
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-black/10 dark:border-white/10 group-hover:border-black/30 dark:border-white/30 transition-all duration-500 mb-6 bg-gray-100 dark:bg-black shadow-xl relative flex items-center justify-center">
                 <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                 <img src={logoUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80"} alt="Codician Club" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 drop-shadow-lg" />
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-400/30 transition-all duration-700 -z-10 pointer-events-none"></div>
              
              <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:dark:from-white group-hover:to-emerald-200 transition-all duration-500">
                Codician Club
              </h3>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-10">
              <a href={`mailto:${socialLinks.email}`} className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-gray-900 hover:dark:bg-white hover:text-gray-100 hover:dark:text-black hover:scale-105 text-gray-700 dark:text-gray-300 transition-all duration-300 text-sm font-semibold shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Email Us
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-[#0077b5]/90 hover:border-transparent hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:dark:text-white transition-all duration-300 text-sm font-semibold shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-gradient-to-r hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] hover:border-transparent hover:scale-105 text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:dark:text-white transition-all duration-300 text-sm font-semibold shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
            </div>
          </div>
        </section>

      </main>


      {/* MODAL OVERLAY */}
      {/* FULL SCREEN ZOOM VIEWER (REPLACED WITH DEPTH CAROUSEL) */}
      {activeAlbum && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/95 backdrop-blur-3xl" onClick={() => { setActiveAlbum(null); setZoomedImage(null); }}>
          
          {/* Controls */}
          <div className="absolute top-6 right-6 flex gap-4 z-10" onClick={e => e.stopPropagation()}>
            <button className="text-white hover:text-black hover:bg-white p-3 rounded-full bg-white/10 transition-all border border-white/20 ml-4" onClick={() => { setActiveAlbum(null); setZoomedImage(null); }} aria-label="Close fullscreen">✕</button>
          </div>

          {/* Image Container */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden p-4" onClick={e => e.stopPropagation()}>
            {activeAlbum.images.length > 0 ? (
              <DepthCarousel 
                items={activeAlbum.images.map(img => ({ image: getImageUrl(img.image), alt: activeAlbum.title }))}
                cardWidth={800}
                cardHeight={500}
                depth={220}
                spread={90}
                tilt={22}
                tiltDirection="right"
                perspective={1400}
                visibleCards={4}
                falloff={0.2}
                blur={6}
                autoplay={true}
                loop={true}
              />
            ) : (
              <div className="text-white">No images available for this event.</div>
            )}
          </div>
        </div>
      )}
      {/* LOGO VIEW MODAL */}
      {viewingLogo && logoUrl && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-gray-100 dark:bg-black/80 backdrop-blur-xl animate-[fade-in-up_0.3s_ease-out]" onClick={() => setViewingLogo(false)}>
          <button className="absolute top-6 right-6 text-gray-900 dark:text-white hover:text-gray-700 hover:dark:text-gray-300 transition-colors text-2xl z-10" onClick={() => setViewingLogo(false)} aria-label="Close logo view">✕</button>
          <img src={logoUrl} alt="Club Logo Full Size" className="max-w-[90vw] max-h-[90vh] object-contain drop-shadow-2xl rounded-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default App;
