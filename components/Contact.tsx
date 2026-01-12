import React from 'react';
import { Button } from './Button';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="bg-black text-white border-b border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        <div className="p-8 md:p-24 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6">
            INITIATE<br />SEQUENCE
          </h2>
          <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-md">
            Ready to purge the inefficiencies? Fill out the parameters. The system is waiting.
          </p>
        </div>

        <div className="p-8 md:p-24 bg-neutral-900/10">
          <form className="space-y-6 md:space-y-8 max-w-lg mx-auto lg:mx-0">
            <div className="relative border-b border-white/20 focus-within:border-white transition-colors">
              <label className="font-mono text-[9px] uppercase text-neutral-500 absolute -top-3 left-0">Identity</label>
              <input type="text" className="w-full bg-transparent py-3 outline-none font-mono text-base md:text-lg placeholder-white/10" placeholder="NAME / ORG" />
            </div>

            <div className="relative border-b border-white/20 focus-within:border-white transition-colors">
              <label className="font-mono text-[9px] uppercase text-neutral-500 absolute -top-3 left-0">Signal</label>
              <input type="email" className="w-full bg-transparent py-3 outline-none font-mono text-base md:text-lg placeholder-white/10" placeholder="EMAIL ADDRESS" />
            </div>

            <div className="relative border-b border-white/20 focus-within:border-white transition-colors">
              <label className="font-mono text-[9px] uppercase text-neutral-500 absolute -top-3 left-0">Data Packet</label>
              <textarea rows={2} className="w-full bg-transparent py-3 outline-none font-mono text-base md:text-lg placeholder-white/10 resize-none" placeholder="DESCRIBE YOUR CHAOS"></textarea>
            </div>

            <div className="pt-4 md:pt-8 text-center md:text-left">
              <Button variant="outline" className="w-full justify-between">
                <span>EXECUTE_TRANSMISSION</span>
                <span>[ENTER]</span>
              </Button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};