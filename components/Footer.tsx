import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 md:pt-24 pb-8 border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 mb-12 md:mb-24">
          <div className="md:col-span-2">
            <h3 className="font-mono text-xs mb-4 text-neutral-500">[CONTACT_NODES]</h3>
            <div className="flex flex-col gap-2 font-mono text-base md:text-lg">
              <a href="#" className="hover:text-white/50 transition-colors">X (TWITTER) ↗</a>
              <a href="#" className="hover:text-white/50 transition-colors">LINKEDIN ↗</a>
              <a href="#" className="hover:text-white/50 transition-colors">EMAIL ↗</a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs mb-4 text-neutral-500">[LOCATION]</h3>
            <p className="font-mono text-xs md:text-sm text-neutral-400">
              DIGITAL SPACE<br />
              AVAILABLE WORLDWIDE<br />
              EST. 2025
            </p>
          </div>

          <div className="flex flex-col justify-between">
            {/* Abstract Barcode */}
            <div className="h-12 md:h-16 w-full flex items-end gap-[2px] opacity-30">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white"
                  style={{
                    width: Math.random() > 0.5 ? '1px' : '3px',
                    height: `${Math.random() * 100}%`
                  }}
                ></div>
              ))}
            </div>
            <p className="font-mono text-[9px] text-right mt-2 opacity-30">ID: SINTAX-8842</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex justify-between items-end">
          <h1 className="text-[14vw] leading-[0.8] font-bold tracking-tighter text-white mix-blend-difference select-none">
            SINTAX.AI
          </h1>
          <div className="hidden md:block font-mono text-xs text-right pb-4">
            © 2026 SINTAX AI.<br />
            ALL RIGHTS RESERVED.<br />
            CHAOS DEPURATION LTD.
          </div>
        </div>
      </div>
    </footer>
  );
};