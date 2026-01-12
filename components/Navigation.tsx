import React, { useState, useEffect } from 'react';
import { Menu, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: '01. Manifesto', href: '#manifesto' },
    { label: '02. Protocols', href: '#protocol' },
    { label: '03. Architecture', href: '#plans' },
  ];

  return (
    <>
      {/* Top Bar Fixed */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-start p-4 mix-blend-difference text-white">
        
        {/* Top Left: Logo */}
        <div className="flex flex-col">
          <a href="#" className="text-lg font-bold tracking-tighter font-sans leading-none">
            SINTAX.AI™
          </a>
          <span className="text-[10px] font-mono opacity-60">VER 2.5 // STABLE</span>
        </div>

        {/* Top Right: Time & Menu Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex font-mono text-xs gap-2 items-center opacity-70">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM: ONLINE
            <span className="ml-4">[{time}]</span>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="group flex items-center gap-2 font-mono text-xs uppercase hover:bg-white hover:text-black px-3 py-1 transition-colors border border-transparent hover:border-white"
          >
            {isOpen ? 'Close' : 'Menu'}
            {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Bottom Fixed Elements */}
      <div className="fixed bottom-0 left-0 w-full z-40 p-4 flex justify-between items-end pointer-events-none mix-blend-difference text-white">
        <div className="font-mono text-[10px] md:text-xs">
          <p>COORDS: {typeof window !== 'undefined' ? window.scrollX.toFixed(0) : 0}, {typeof window !== 'undefined' ? window.scrollY.toFixed(0) : 0}</p>
        </div>
        <div className="font-mono text-[10px] md:text-xs text-right">
          <p>SCROLL TO EXPLORE</p>
          <p className="opacity-50">↓↓↓</p>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center border-b border-cement"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.label} 
                  href={link.href} 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl md:text-7xl font-bold tracking-tighter hover:text-transparent hover:stroke-white hover:stroke-2 text-white transition-all duration-300 relative group"
                  style={{ WebkitTextStroke: '1px transparent' }}
                >
                  <span className="text-sm font-mono absolute -left-8 md:-left-12 top-2 md:top-6 opacity-0 group-hover:opacity-100 transition-opacity text-cement">
                    {`[LINK_0${i+1}]`}
                  </span>
                  {link.label.split('. ')[1]}
                </motion.a>
              ))}
              <motion.a 
                href="#contact"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsOpen(false)}
                className="text-4xl md:text-7xl font-bold tracking-tighter text-cement hover:text-white transition-colors pt-8"
              >
                INITIATE_
              </motion.a>
            </div>
            
            {/* Background Grid Lines inside menu */}
            <div className="absolute inset-0 pointer-events-none opacity-20" 
                 style={{ 
                   backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                   backgroundSize: '10rem 10rem',
                 }}>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};