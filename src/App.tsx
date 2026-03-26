import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Terminal, Cpu, Sparkles, Code2, Layers, Fingerprint, Globe, Play, ExternalLink } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F9FA]/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-black">
            Vasudev AI Labs
          </span>
          <span className="hidden md:inline-block ml-4 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            Internal Preview v2.4
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#experiments" className="hover:text-black transition-colors">Experiments</a>
            <a href="#research" className="hover:text-black transition-colors">Research</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            Request Access
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Engineered Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-7"
            style={{ y: y1, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-google-blue animate-pulse" />
              <span className="text-xs font-mono font-medium text-google-blue uppercase tracking-wider">System Online</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-black leading-[0.9] mb-6"
            >
              Building the <br />
              <span className="text-gray-400">next era</span> of AI.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 max-w-xl mb-10 font-sans leading-relaxed"
            >
              Vasudev AI Labs is an experimental research facility dedicated to pushing the boundaries of machine intelligence, generative models, and human-computer interaction.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button className="bg-google-blue text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                Explore Experiments <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white text-black border border-gray-200 px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Read the Docs
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Terminal/Widget */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              {/* Terminal Header */}
              <div className="bg-gray-900 px-4 py-3 border-b border-gray-800 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="mx-auto text-[10px] font-mono text-gray-500">vasudev-core-v3.sh</div>
              </div>
              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm text-green-400 h-[300px] flex flex-col gap-2">
                <p className="text-gray-500">$ initialize_sequence --model=vasudev-omni</p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                >
                  &gt; Loading neural pathways... [OK]
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                >
                  &gt; Calibrating attention mechanisms... [OK]
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                >
                  &gt; Connecting to global knowledge graph... [OK]
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
                  className="text-white mt-4"
                >
                  Vasudev Omni is ready. Awaiting input...
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
                  className="w-2 h-4 bg-white mt-1"
                />
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl border border-gray-200 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-google-red/10 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-google-red" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase">Compute</div>
                <div className="text-sm font-bold text-black">1.2 PETAFLOPS</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-black py-4 border-y border-gray-800 transform -rotate-1 scale-105 z-20 relative">
      <div className="marquee-container">
        <div className="marquee-content items-center gap-8">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-white font-display font-bold text-xl uppercase tracking-widest">Experimental Research</span>
              <Sparkles className="w-5 h-5 text-google-yellow" />
              <span className="text-white font-display font-bold text-xl uppercase tracking-widest">Generative Models</span>
              <Sparkles className="w-5 h-5 text-google-blue" />
              <span className="text-white font-display font-bold text-xl uppercase tracking-widest">Neural Interfaces</span>
              <Sparkles className="w-5 h-5 text-google-green" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

const BentoGrid = () => {
  return (
    <section id="experiments" className="py-32 bg-[#F8F9FA] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-google-blue uppercase tracking-wider mb-3">Featured Projects</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-black tracking-tight">
            Explore the Lab
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Large Featured Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 bg-white rounded-[2rem] border border-gray-200 p-8 md:p-12 lab-card relative overflow-hidden group flex flex-col justify-between min-h-[400px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-google-blue/5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform duration-700 group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600">EXP-01</span>
              </div>
              
              <h4 className="text-3xl font-display font-bold text-black mb-4">Project Omni</h4>
              <p className="text-gray-600 max-w-md text-lg leading-relaxed">
                A multimodal reasoning engine capable of understanding text, vision, and audio simultaneously in real-time.
              </p>
            </div>
            
            <div className="relative z-10 mt-12 flex items-center justify-between">
              <button className="flex items-center gap-2 text-sm font-bold text-black group-hover:text-google-blue transition-colors">
                Launch Experiment <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">V1</div>
                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-bold">V2</div>
                <div className="w-8 h-8 rounded-full bg-google-blue border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">V3</div>
              </div>
            </div>
          </motion.div>

          {/* Small Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-black rounded-[2rem] p-8 lab-card relative overflow-hidden group flex flex-col justify-between min-h-[250px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <Code2 className="w-8 h-8 text-google-green" />
                <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-mono text-gray-400">EXP-02</span>
              </div>
              <h4 className="text-xl font-display font-bold text-white mb-2">CodeSynth</h4>
              <p className="text-gray-400 text-sm">Autonomous agent for complex refactoring and architecture design.</p>
            </div>
            
            <div className="relative z-10 mt-6">
              <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <ExternalLink className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>

          {/* Small Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-white rounded-[2rem] border border-gray-200 p-8 lab-card relative overflow-hidden group flex flex-col justify-between min-h-[250px]"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <Layers className="w-8 h-8 text-google-red" />
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-mono text-gray-600">EXP-03</span>
              </div>
              <h4 className="text-xl font-display font-bold text-black mb-2">Neural Canvas</h4>
              <p className="text-gray-600 text-sm">Infinite workspace powered by latent diffusion models.</p>
            </div>
            
            <div className="relative z-10 mt-6">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <ExternalLink className="w-4 h-4 text-black" />
              </button>
            </div>
          </motion.div>

          {/* Wide Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-12 bg-[#E8F0FE] rounded-[2rem] border border-[#D2E3FC] p-8 md:p-12 lab-card relative overflow-hidden group flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint className="w-6 h-6 text-google-blue" />
                <span className="text-sm font-mono text-google-blue font-bold uppercase tracking-wider">Research Paper</span>
              </div>
              <h4 className="text-2xl md:text-3xl font-display font-bold text-black mb-4">
                Attention is All You Need (Revisited)
              </h4>
              <p className="text-gray-700 text-lg">
                Read our latest publication on optimizing transformer architectures for edge devices with 10x efficiency gains.
              </p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <button className="bg-white text-google-blue px-8 py-4 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                Read Paper <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-black">
                Vasudev AI Labs
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              An experimental division focused on applied artificial intelligence, generative models, and the future of computing.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-gray-500 uppercase">All systems operational</span>
            </div>
          </div>
          
          <div>
            <h5 className="font-bold text-black mb-4">Experiments</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-google-blue transition-colors">Project Omni</a></li>
              <li><a href="#" className="hover:text-google-blue transition-colors">CodeSynth</a></li>
              <li><a href="#" className="hover:text-google-blue transition-colors">Neural Canvas</a></li>
              <li><a href="#" className="hover:text-google-blue transition-colors">AudioForge</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold text-black mb-4">Resources</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-google-blue transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-google-blue transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-google-blue transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-google-blue transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-gray-400">
            &copy; {new Date().getFullYear()} Vasudev AI Labs. Internal Prototype.
          </div>
          <div className="flex gap-6 text-xs font-mono text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-google-blue/20 selection:text-google-blue">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}

