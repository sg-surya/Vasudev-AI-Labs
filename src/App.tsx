import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight, Sparkles, Terminal as TerminalIcon, Activity, Cpu, Network, ArrowUpRight, Database, Lock, Zap, Code } from 'lucide-react';

// --- Data ---
const EXPERIMENTS = [
  {
    id: '01',
    title: 'Project Omni',
    category: 'Multimodal Reasoning',
    description: 'A unified neural architecture capable of processing text, vision, and audio streams simultaneously with zero-shot capabilities.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Active',
  },
  {
    id: '02',
    title: 'Neural Canvas',
    category: 'Latent Diffusion',
    description: 'Infinite workspace powered by real-time latent diffusion models. Generate, edit, and expand visual concepts at the speed of thought.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Beta',
  },
  {
    id: '03',
    title: 'CodeSynth V3',
    category: 'Autonomous Agents',
    description: 'Self-correcting coding agents that understand repository-level context, architect solutions, and submit pull requests.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Internal',
  },
  {
    id: '04',
    title: 'AudioForge',
    category: 'Generative Audio',
    description: 'High-fidelity spatial audio generation from text prompts. Create soundscapes, voices, and music with precise acoustic control.',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Research',
  },
  {
    id: '05',
    title: 'Quantum Sim',
    category: 'Quantum ML',
    description: 'Simulating quantum neural networks on classical hardware to discover new optimization landscapes for deep learning.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop&grayscale=true',
    status: 'Concept',
  }
];

const CAPABILITIES = [
  { icon: <Database className="w-6 h-6" />, title: 'Large Scale Training', desc: 'Distributed training infrastructure capable of scaling to 100K+ GPUs.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Real-time Inference', desc: 'Ultra-low latency inference engines optimized for edge and cloud.' },
  { icon: <Lock className="w-6 h-6" />, title: 'AI Safety & Alignment', desc: 'Rigorous testing frameworks to ensure models are helpful and harmless.' },
  { icon: <Code className="w-6 h-6" />, title: 'Neural Architecture Search', desc: 'Automated discovery of optimal network topologies for specific tasks.' },
];

// --- Components ---

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center text-white font-mono"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="w-64">
        <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-widest">
          <span>Booting System</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[1px] w-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="mt-4 text-[10px] text-gray-600 uppercase tracking-widest h-4">
          {progress < 30 ? 'Initializing neural pathways...' : 
           progress < 60 ? 'Loading language models...' : 
           progress < 90 ? 'Calibrating latent space...' : 'System ready.'}
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
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl tracking-tighter uppercase">
            Vasudev AI
          </span>
          <span className="px-2 py-1 border border-white/20 rounded-full text-[10px] font-mono uppercase tracking-widest">
            Labs
          </span>
        </div>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest">
            <a href="#about" className="hover:text-white/60 transition-colors">About</a>
            <a href="#showcase" className="hover:text-white/60 transition-colors">Showcase</a>
            <a href="#capabilities" className="hover:text-white/60 transition-colors">Capabilities</a>
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

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);

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
            className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 w-full border-t border-white/10 pt-8"
          >
            <div>
              <div className="text-gray-500 font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2">System Status</div>
              <div className="text-white font-mono text-xs md:text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Nominal
              </div>
            </div>
            <div>
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
            className="project-row border-b border-white/10 py-12 md:py-16 cursor-pointer relative group"
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <div className="max-w-[95%] md:max-w-[90%] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              
              <div className="flex items-center gap-6 md:gap-8 md:w-2/5">
                <span className="font-mono text-xl md:text-2xl text-gray-600 group-hover:text-white transition-colors duration-300">
                  {exp.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white group-hover:translate-x-4 transition-transform duration-500 ease-out">
                  {exp.title}
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
            rotate: hoveredIndex !== null ? (mouseX.getVelocity() * 0.01) : 0, // Slight rotation based on movement
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
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Experiments</a>
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

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#030303] selection:bg-white/20 selection:text-white">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="noise-bg" />
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Showcase />
            <Capabilities />
            <TerminalSection />
            <Metrics />
            <HugeMarquee />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
