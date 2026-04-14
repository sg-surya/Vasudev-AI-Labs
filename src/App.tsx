import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight, Sparkles, Activity, Cpu, Network, ArrowUpRight, Database, Lock, Zap, Code, ChevronLeft, Globe, Terminal as TerminalIcon } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Data ---
const customTabyeMarkdown = `
# Minimal Tab By Vasudev AI

A premium, Apple-style new tab dashboard for Chrome - built with pure HTML, CSS & JavaScript.

---

## About This Project

**Minimal Tab** replaces your default Chrome new tab with a beautiful, feature-rich dashboard. It comes with a Settings Panel offering 20+ customization options.

- **Version:** 1.1
- **License:** MIT
- **Demo:** [search.vasudev.online](http://search.vasudev.online/)
- **Repository:** [github.com/sg-surya/custom-tabye](https://github.com/sg-surya/custom-tabye)

---

## Features (20+)

### Core Features
- Live Clock with 12h/24h toggle
- Personalized Greeting (Good morning/afternoon/evening + Your Name)
- Google Search with Omnibox autocomplete
- Dark/Light Theme toggle
- Notes, Tasks & Calendar widgets
- Customizable Dock (add/remove websites)
- Apple-style 3D animations & floating gradient background

### Settings Panel (20 Premium Features)
1. Settings Panel UI (modal with inner+outer shadow)
2. Greeting with User Name
3. Custom Accent Color Picker (8 colors + custom)
4. Clock Options (show/hide, 12h/24h, seconds)
5. Focus Mode (hide everything except search)
6. Quotes / Motivation Widget
7. Theme Presets (Midnight, Ocean, Sunset, Forest, Mono)
8. Font Selector (Inter, Poppins, Space Grotesk, Outfit, JetBrains Mono)
9. Layout Options (Center, Compact, Minimal)
10. Weather Widget (OpenWeather API)
11. Pomodoro / Focus Timer
12. Quick Links Grid
13. Custom Background / Wallpaper
14. Habit Tracker
15. Bookmark shortcuts (dock-based)
16. Screen Time Analytics
17. Ambient Sound Player
18. Widget Layout (drag info)
19. Import/Export Settings (JSON)
20. Keyboard Shortcuts Panel (?)

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure |
| CSS3 | Styling, glassmorphism, animations |
| JavaScript (Vanilla) | All functionality |
| Chrome Manifest V3 | Extension config |
| Google Fonts | Typography |
| localStorage | Data persistence |

---

## Installation

### Chrome (Load Unpacked)
1. Download ZIP from GitHub
2. Go to \`chrome://extensions\`
3. Enable Developer Mode (top-right)
4. Click "Load unpacked"
5. Select the folder

### Keyboard Shortcuts
| Key | Action |
|-----|-------|
| \`/\` | Focus search |
| \`T\` | Toggle theme |
| \`W\` | Toggle widgets |
| \`S\` | Open settings |
| \`?\` | Show shortcuts |
| \`F\` | Toggle focus mode |
| \`Esc\` | Close panel |

---

## Future Roadmap

- [x] Weather widget
- [x] Pomodoro timer
- [x] Custom wallpaper
- [x] Accent color picker
- [x] Quotes widget
- [x] Habit tracker
- [ ] Browser sync across devices
- [ ] Multi-language support
- [ ] Chrome Web Store publish

---

## Links

- **Demo:** [search.vasudev.online](http://search.vasudev.online/)
- **GitHub:** [github.com/sg-surya/custom-tabye](https://github.com/sg-surya/custom-tabye)
- **Website:** [vasudev.online](https://vasudev.online)

---

*Built with care by Vasudev AI*
`;

const EXPERIMENTS = [
  {
    id: '01',
    slug: 'learnivo-ai',
    title: 'Learnivo AI',
    category: 'EdTech AI',
    description: 'An advanced EdTech AI tool designed specifically for schools and teachers to personalize learning and automate grading.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Beta',
    details: 'Learnivo AI is a comprehensive educational platform that leverages machine learning to adapt to individual student needs. It features automated essay scoring, personalized curriculum generation, and real-time analytics for educators to track student progress. The system is designed to reduce administrative overhead for teachers while providing students with a tailored learning experience.',
    techStack: ['Python', 'PyTorch', 'Next.js', 'PostgreSQL'],
    links: []
  },
  {
    id: '02',
    slug: 'custom-tabye',
    title: 'Custom-Tabye',
    category: 'Chrome Extension',
    description: 'A premium, minimal, Apple-style new tab experience for Chrome that replaces the default new tab with a highly efficient dashboard.',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Active',
    details: 'Custom-Tabye transforms the standard Chrome new tab into a beautifully crafted, minimal workspace. It features a clean, Apple-inspired aesthetic with customizable widgets, quick links, and keyboard shortcuts for power users. Built with performance in mind, it loads instantly and respects user privacy by operating entirely locally.',
    markdown: customTabyeMarkdown,
    techStack: ['HTML', 'CSS', 'JavaScript', 'Chrome API'],
    links: [
      { label: 'Live Demo', url: 'https://search.vasudev.online/', icon: <Globe className="w-4 h-4" /> },
      { label: 'GitHub Repo', url: 'https://github.com/sg-surya/custom-tabye', icon: <Code className="w-4 h-4" /> }
    ],
    screenshots: [
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop&grayscale=true',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop&grayscale=true'
    ]
  },
  {
    id: '03',
    slug: 'vasu-search',
    title: 'Vasu Search',
    category: 'Search Engine',
    description: 'A custom search engine with a premium, minimal UI and highly efficient retrieval features.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Active',
    details: 'Vasu Search is an experimental search engine designed for speed and precision. It features a distraction-free interface and utilizes advanced natural language processing to understand user intent better than keyword-based systems. The backend is powered by a distributed architecture ensuring rapid query resolution.',
    techStack: ['React', 'Node.js', 'Elasticsearch', 'Redis'],
    links: []
  },
  {
    id: '04',
    slug: 'project-omni',
    title: 'Project Omni',
    category: 'Multimodal Reasoning',
    description: 'A unified neural architecture capable of processing text, vision, and audio streams simultaneously with zero-shot capabilities.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Research',
    details: 'Omni represents our foundational research into true multimodal understanding. By mapping discrete sensory inputs into a continuous latent space, Omni achieves unprecedented cross-modal reasoning.',
    techStack: ['JAX', 'TPUv4', 'Flax', 'C++'],
    links: []
  },
  {
    id: '05',
    slug: 'neural-canvas',
    title: 'Neural Canvas',
    category: 'Latent Diffusion',
    description: 'Infinite workspace powered by real-time latent diffusion models. Generate, edit, and expand visual concepts at the speed of thought.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Internal',
    details: 'Neural Canvas acts as a direct interface between human intent and generative output. It utilizes a custom low-latency diffusion pipeline optimized for real-time interaction.',
    techStack: ['WebGL', 'WebRTC', 'TensorRT', 'CUDA'],
    links: []
  }
];

const CAPABILITIES = [
  { icon: <Database className="w-6 h-6" />, title: 'Large Scale Training', desc: 'Distributed training infrastructure capable of scaling to 100K+ GPUs.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Real-time Inference', desc: 'Ultra-low latency inference engines optimized for edge and cloud.' },
  { icon: <Lock className="w-6 h-6" />, title: 'AI Safety & Alignment', desc: 'Rigorous testing frameworks to ensure models are helpful and harmless.' },
  { icon: <Code className="w-6 h-6" />, title: 'Neural Architecture Search', desc: 'Automated discovery of optimal network topologies for specific tasks.' },
];

// --- Utilities & Shared Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 2;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center text-white"
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
        {/* Flask Icon with Liquid Fill */}
        <div className="relative w-24 h-24 md:w-28 md:h-28">
          
          {/* Floating Atoms/Molecules */}
          <motion.div 
            className="absolute -left-4 top-6 w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-[10px] font-mono font-bold text-white/60 backdrop-blur-sm"
            animate={{ y: [-4, 4, -4], x: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            AI
          </motion.div>
          <motion.div 
            className="absolute -right-2 -top-2 w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center text-[8px] font-mono font-bold text-white/60 backdrop-blur-sm"
            animate={{ y: [3, -3, 3], x: [2, -2, 2] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
          >
            V
          </motion.div>

          {/* Bubbles */}
          <AnimatePresence>
            {progress > 10 && progress < 100 && (
              <>
                <motion.div 
                  className="absolute w-2 h-2 bg-white rounded-full left-1/2 -ml-1 z-20"
                  initial={{ y: 20, opacity: 0, scale: 0.5 }}
                  animate={{ y: -60, opacity: [0, 1, 0], scale: 1.5 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute w-1.5 h-1.5 bg-white/80 rounded-full left-[40%] z-20"
                  initial={{ y: 30, opacity: 0, scale: 0.5 }}
                  animate={{ y: -40, opacity: [0, 1, 0], scale: 1 }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute w-3 h-3 bg-white/60 rounded-full right-[40%] z-20"
                  initial={{ y: 25, opacity: 0, scale: 0.5 }}
                  animate={{ y: -50, opacity: [0, 1, 0], scale: 1.2 }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.2, ease: "easeOut" }}
                />
              </>
            )}
          </AnimatePresence>

          {/* SVG Flask */}
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] relative z-10">
            <defs>
              <clipPath id="flask-clip">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2.5 2.5 0 0 0 2.28 3.45h10a2.5 2.5 0 0 0 2.28-3.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
              </clipPath>
            </defs>
            {/* Liquid Fill */}
            <motion.rect 
              x="0" 
              y="24" 
              width="24" 
              height="24" 
              fill="white" 
              clipPath="url(#flask-clip)"
              animate={{ y: 24 - (progress / 100) * 22 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
            {/* Flask Outline */}
            <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a2.5 2.5 0 0 0 2.28 3.45h10a2.5 2.5 0 0 0 2.28-3.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
            <path d="M8.5 2h7" />
          </svg>
        </div>

        {/* Text & Progress */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white mb-2">
            Vasudev Labs
          </h1>
          <div className="flex items-center gap-4 w-full max-w-[300px] md:max-w-full">
            <div className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full flex-1">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.3 }}
              />
            </div>
            <span className="font-mono text-xs text-gray-500 w-12 text-right">{progress}%</span>
          </div>
          <div className="mt-4 font-mono text-[10px] text-gray-600 uppercase tracking-widest h-4">
            {progress < 30 ? 'Synthesizing neural pathways...' : 
             progress < 60 ? 'Calibrating latent space...' : 
             progress < 90 ? 'Loading language models...' : 'System ready.'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text'>('default');

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('button') || target.closest('a') || target.closest('.project-row')) {
        setCursorState('hover');
      } else if (target.tagName.toLowerCase() === 'p' || target.tagName.toLowerCase() === 'h1' || target.tagName.toLowerCase() === 'h2' || target.tagName.toLowerCase() === 'h3') {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: { scale: 1, backgroundColor: '#fff', mixBlendMode: 'difference' as any },
    hover: { scale: 0.5, backgroundColor: '#fff', mixBlendMode: 'difference' as any },
    text: { scale: 1.5, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.5)', mixBlendMode: 'normal' as any }
  };

  const ringVariants = {
    default: { scale: 1, backgroundColor: 'transparent', backdropFilter: 'none' },
    hover: { scale: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(2px)' },
    text: { scale: 0, backgroundColor: 'transparent', backdropFilter: 'none' }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[100]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={variants[cursorState]}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[99]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={ringVariants[cursorState]}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
    </>
  );
};

const MagneticButton = ({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white"
    >
      <div className="max-w-[95%] md:max-w-[90%] mx-auto h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-display font-bold text-xl tracking-tighter uppercase">
            Vasudev AI
          </span>
          <span className="px-2 py-1 border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-widest">
            Labs
          </span>
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
            <Link to="/#about" className="hover:text-white/60 transition-colors">About</Link>
            <Link to="/#showcase" className="hover:text-white/60 transition-colors">Showcase</Link>
            <Link to="/#capabilities" className="hover:text-white/60 transition-colors">Capabilities</Link>
          </div>
          <MagneticButton className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
            <div className="w-4 h-4 flex flex-col justify-between pointer-events-none">
              <span className="w-full h-[1.5px] bg-current block" />
              <span className="w-full h-[1.5px] bg-current block" />
              <span className="w-full h-[1.5px] bg-current block" />
            </div>
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
};

// --- Page Components ---

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

  const [time, setTime] = useState(new Date().toISOString());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark z-0" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[800px] md:h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <motion.div 
        className="w-full max-w-[95%] md:max-w-[90%] mx-auto relative z-10"
        style={{ y: y1, opacity, scale }}
      >
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-300">
              Vasudev Experimental Research Facility
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[12vw] leading-[0.85] font-display font-bold tracking-tighter uppercase"
          >
            <span className="block text-outline">Engineering</span>
            <span className="block text-white">Intelligence.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-t border-white/10 pt-8"
          >
            <div>
              <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2">System Status</div>
              <div className="text-white font-mono text-xs md:text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Nominal
              </div>
            </div>
            <div>
              <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2">Global Time (UTC)</div>
              <div className="text-white font-mono text-xs md:text-sm">{time.split('T')[1].split('.')[0]}</div>
            </div>
            <div className="hidden md:block">
              <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2">Active Models</div>
              <div className="text-white font-mono text-xs md:text-sm">14.2B Parameters</div>
            </div>
            <div className="col-span-2 md:col-span-1 md:text-right flex items-end md:justify-end">
              <a href="#about" className="inline-flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest hover:text-blue-400 transition-colors group">
                Scroll to explore 
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="py-32 md:py-48 bg-[#030303] relative z-10">
      <div className="max-w-[90%] md:max-w-[70%] mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium leading-tight text-white mb-12">
            We are <span className="text-gray-500">Vasudev AI Labs</span>. A dedicated research collective focused on pushing the boundaries of <span className="text-blue-400">machine intelligence</span> and building the foundational models of tomorrow.
          </h2>
          <div className="flex flex-col md:flex-row gap-8 font-mono text-sm text-gray-400 uppercase tracking-widest">
            <div className="flex flex-col gap-2">
              <span className="text-white">Founded</span>
              <span>2024</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white">Focus</span>
              <span>AGI Research</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white">Location</span>
              <span>Global / Distributed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Showcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="showcase" className="py-32 relative z-10 bg-[#030303]">
      <div className="max-w-[95%] md:max-w-[90%] mx-auto mb-20 flex items-end justify-between">
        <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
          Experiments
        </h2>
        <span className="font-mono text-gray-500 text-sm uppercase tracking-widest hidden md:block">
          [ {EXPERIMENTS.length < 10 ? `0${EXPERIMENTS.length}` : EXPERIMENTS.length} Active Projects ]
        </span>
      </div>

      <div className="w-full border-t border-white/10 relative" onMouseLeave={() => setHoveredIndex(null)}>
        {EXPERIMENTS.map((exp, index) => (
          <div 
            key={exp.id}
            onClick={() => navigate(`/project/${exp.slug}`)}
            className="project-row border-b border-white/10 py-12 md:py-16 cursor-pointer relative group"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <div className="max-w-[95%] md:max-w-[90%] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              
              <div className="flex items-center gap-6 md:gap-8 md:w-2/5">
                <span className="font-mono text-xl md:text-2xl text-gray-600 group-hover:text-white transition-colors duration-300">
                  {exp.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white group-hover:translate-x-4 transition-transform duration-500 ease-out flex items-center gap-4">
                  {exp.title}
                  <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                </h3>
              </div>
              
              <div className="md:w-2/5">
                <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {exp.description}
                </p>
              </div>
              
              <div className="md:w-1/5 flex justify-start md:justify-end">
                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-2">
                  <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono text-white uppercase tracking-widest whitespace-nowrap">
                    {exp.category}
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${exp.status === 'Active' ? 'bg-green-500' : exp.status === 'Beta' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
                    {exp.status}
                  </span>
                </div>
              </div>

            </div>
            
            {/* Hover Background Highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}

        {/* Floating Image Reveal */}
        <motion.div
          className="fixed top-0 left-0 w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-lg overflow-hidden pointer-events-none z-40 hidden md:block shadow-2xl shadow-black/50"
          style={{
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            opacity: hoveredIndex !== null ? 1 : 0,
            scale: hoveredIndex !== null ? 1 : 0.8,
            rotate: hoveredIndex !== null ? (mouseX.getVelocity() * 0.01) : 0,
          }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.4, ease: "easeOut" } }}
        >
          <AnimatePresence mode="wait">
            {hoveredIndex !== null && (
              <motion.img
                key={hoveredIndex}
                src={EXPERIMENTS[hoveredIndex].image}
                alt="Project Preview"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <div className="max-w-[90%] mx-auto mt-20 flex justify-center">
        <MagneticButton className="px-8 py-4 border border-white/20 rounded-full text-white font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center gap-2 group">
          View All Archives
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </MagneticButton>
      </div>
    </section>
  );
};

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-32 bg-[#0A0A0A] border-y border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-50 pointer-events-none" />
      <div className="max-w-[90%] mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Core Capabilities</h2>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Infrastructure & Research Focus</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-white/10 bg-[#030303] hover:border-white/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all">
                {cap.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">{cap.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TerminalSection = () => {
  const [text, setText] = useState('');
  const fullText = "> Initializing Vasudev AI Core...\n> Loading neural weights... [OK]\n> Establishing secure connection... [OK]\n> Ready for input.\n_";
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView) {
      let i = 0;
      const timer = setInterval(() => {
        setText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(timer);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section className="py-32 bg-[#030303] relative z-10">
      <div className="max-w-[90%] md:max-w-[70%] mx-auto" ref={ref}>
        <div className="border border-white/20 rounded-lg overflow-hidden bg-[#0A0A0A] shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#111]">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-4 font-mono text-[10px] text-gray-500 uppercase tracking-widest">vasudev-terminal ~ root</span>
          </div>
          <div className="p-8 min-h-[200px] font-mono text-sm md:text-base text-green-400 whitespace-pre-wrap">
            {text}
          </div>
        </div>
      </div>
    </section>
  );
};

const Metrics = () => {
  return (
    <section className="py-20 bg-[#030303]">
      <div className="max-w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <Activity className="w-6 h-6 text-blue-500 mb-4" />
            <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">99.9%</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Model Uptime</div>
          </div>
          
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <Cpu className="w-6 h-6 text-green-500 mb-4" />
            <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">1.2 PFLOPs</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Compute Power</div>
          </div>
          
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <Network className="w-6 h-6 text-purple-500 mb-4" />
            <div className="text-5xl md:text-6xl font-display font-bold text-white mb-2">14.2B</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Parameters</div>
          </div>

        </div>
      </div>
    </section>
  );
};

const HugeMarquee = () => {
  return (
    <div className="py-20 overflow-hidden bg-[#030303] border-t border-white/10">
      <div className="marquee-container">
        <div className="marquee-content items-center gap-12">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[12vw] font-display font-bold uppercase tracking-tighter leading-none text-outline">
                Vasudev AI
              </span>
              <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-white" />
              <span className="text-[12vw] font-display font-bold uppercase tracking-tighter leading-none text-white">
                Research
              </span>
              <Sparkles className="w-12 h-12 md:w-20 md:h-20 text-white" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#030303] pt-32 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />
      <div className="max-w-[90%] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
          
          <div className="max-w-xl">
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
              Join the frontier of artificial intelligence.
            </h3>
            <MagneticButton className="px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors inline-flex items-center gap-2">
              Request API Access <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
          
          <div className="flex flex-wrap gap-16 font-mono text-sm">
            <div className="flex flex-col gap-4">
              <span className="text-gray-600 uppercase tracking-widest mb-2 text-xs">Lab</span>
              <Link to="/#showcase" className="text-gray-300 hover:text-white transition-colors">Experiments</Link>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Publications</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Team</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-gray-600 uppercase tracking-widest mb-2 text-xs">Connect</span>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Discord</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 font-mono text-[10px] text-gray-600 uppercase tracking-widest">
          <div>&copy; {new Date().getFullYear()} Vasudev AI Labs. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Routes ---

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <About />
      <Showcase />
      <Capabilities />
      <TerminalSection />
      <Metrics />
      <HugeMarquee />
    </motion.div>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = EXPERIMENTS.find(p => p.slug === slug);
  const navigate = useNavigate();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white font-mono">
        Project not found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 min-h-screen bg-[#030303] relative"
    >
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none z-0" />
      
      <div className="max-w-[90%] md:max-w-[70%] mx-auto relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-widest mb-12 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Lab
        </button>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="font-mono text-2xl text-gray-600">{project.id}</span>
          <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] font-mono text-white uppercase tracking-widest">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'Active' ? 'bg-green-500' : project.status === 'Beta' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
            {project.status}
          </span>
          
          {project.links && project.links.length > 0 && (
            <div className="flex gap-3 ml-auto">
              {project.links.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  {link.icon}
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 tracking-tighter">
          {project.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 font-sans leading-relaxed mb-16 max-w-3xl">
          {project.description}
        </p>

        <div className="w-full h-[40vh] md:h-[60vh] rounded-xl overflow-hidden mb-16 border border-white/10">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Project Overview</h2>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-sans leading-relaxed">
              {project.markdown ? (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-4xl font-display font-bold text-white mt-12 mb-6" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-3xl font-display font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-2xl font-display font-bold text-white mt-8 mb-4" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-300 font-sans leading-relaxed mb-6" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside text-gray-300 mb-6 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                    hr: ({node, ...props}) => <hr className="border-white/10 my-8" {...props} />,
                    table: ({node, ...props}) => <div className="overflow-x-auto mb-8"><table className="w-full text-left border-collapse" {...props} /></div>,
                    th: ({node, ...props}) => <th className="border-b border-white/20 py-3 px-4 text-white font-mono text-sm uppercase tracking-widest bg-white/5" {...props} />,
                    td: ({node, ...props}) => <td className="border-b border-white/10 py-3 px-4 text-gray-300" {...props} />,
                    pre: ({node, ...props}) => <pre className="block bg-[#0A0A0A] border border-white/10 p-4 rounded-lg overflow-x-auto mb-6" {...props} />,
                    code: ({node, className, ...props}) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />
                      ) : (
                        <code className={`font-mono text-sm text-green-400 ${className || ''}`} {...props} />
                      );
                    },
                  }}
                >
                  {project.markdown}
                </ReactMarkdown>
              ) : (
                <p>{project.details}</p>
              )}
            </div>
            
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-display font-bold text-white mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.screenshots.map((src, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-white/10">
                      <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-6">Tech Stack</h2>
            <div className="flex flex-col gap-4">
              {project.techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <TerminalIcon className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-sm text-gray-300 uppercase tracking-widest">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#030303] selection:bg-white/20 selection:text-white">
        <AnimatePresence>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        
        {!loading && (
          <>
            <div className="noise-bg" />
            <CustomCursor />
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/project/:slug" element={<ProjectDetail />} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}
