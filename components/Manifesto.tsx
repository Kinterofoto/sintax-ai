import React from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifesto" className="relative bg-white text-black border-b border-black">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Sticky Title */}
        <div className="lg:sticky lg:top-0 lg:h-screen p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-black flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-black"></div>
              <span className="font-mono text-xs uppercase tracking-widest">Chapter 01: Core Belief</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-4">
              PURE<br/>FOCUS.
            </h2>
          </div>
          
          <div className="hidden lg:block relative w-full aspect-square border border-black overflow-hidden">
             {/* Architectural lines graphic */}
             <svg width="100%" height="100%" className="absolute inset-0">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="black" strokeWidth="1" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="black" strokeWidth="1" />
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="black" strokeWidth="1" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center font-mono text-xs bg-white/80 w-fit h-fit m-auto px-2">
               FIG 1.1: ELIMINATION
             </div>
          </div>
        </div>

        {/* Right Column: Scrollable Content */}
        <div className="p-8 md:p-16 lg:pt-32 flex flex-col gap-24">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-black/10"></div>
            <p className="text-2xl md:text-4xl font-light leading-tight">
              Chaos is the default state of the universe. Without intervention, entropy consumes efficiency.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 bg-black text-white w-fit px-2 py-1">The Problem</h3>
            <p className="text-xl text-neutral-600 leading-relaxed font-mono">
              You are drowning in low-bandwidth tasks. Spreadsheets, emails, manual data entry. This is the noise. It masks the signal. It kills creativity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-black pt-12"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest mb-6 bg-black text-white w-fit px-2 py-1">The Sintax</h3>
            <p className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              We do not add.<br/>We subtract.
            </p>
            <p className="text-lg text-neutral-700 max-w-md">
              We remove the friction. We automate the mundane. We leave you with only what matters: Vision and Strategy.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};