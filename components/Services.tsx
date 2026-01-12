import React from 'react';
import { HorizontalSection } from './HorizontalSection';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '01',
    originalName: 'Automation',
    redefinedName: 'WORKFLOW_DEPURATION',
    description: 'Identifying and excising low-value cognitive loops.'
  },
  {
    id: '02',
    originalName: 'AI Agents',
    redefinedName: 'AUTONOMOUS_WORKERS',
    description: 'Deploying intelligence that sleeps 0 hours/day.'
  },
  {
    id: '03',
    originalName: 'Analytics',
    redefinedName: 'SIGNAL_EXTRACTION',
    description: 'Translating raw chaos into binary truth.'
  },
  {
    id: '04',
    originalName: 'Development',
    redefinedName: 'SYSTEM_ARCHITECTURE',
    description: 'Bespoke infrastructure for high-velocity teams.'
  }
];

export const Services: React.FC = () => {
  return (
    <div id="protocol">
      <HorizontalSection>
        {services.map((service, index) => (
          <div key={service.id} className="h-[100dvh] w-screen flex-shrink-0 flex items-center justify-center p-6 md:p-24 border-r border-white/10 bg-black relative overflow-hidden group">
            {/* Background ID */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] font-bold text-neutral-900/40 select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              {service.id}
            </div>

            <div className="relative z-10 max-w-4xl w-full">
              <div className="font-mono text-[10px] md:text-xs text-cement mb-4">PROTOCOL // 0{index + 1}</div>
              <h3 className="text-4xl sm:text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-6 md:mb-8 leading-[0.9] break-words">
                {service.redefinedName.replace('_', '_\n')}
              </h3>
              <p className="text-lg md:text-3xl font-light text-neutral-400 max-w-2xl leading-relaxed">
                {service.description}
              </p>

              <div className="mt-8 md:mt-12 flex items-center gap-4">
                <div className="h-[1px] w-12 md:w-24 bg-white/50"></div>
                <span className="font-mono text-[10px] md:text-sm tracking-widest uppercase opacity-50">Initializing...</span>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute bottom-16 right-6 md:right-12 font-mono text-[9px] md:text-[10px] text-cement text-right opacity-40">
              SYS_STATUS: ACTIVE<br />
              LATENCY: 0.001ms<br />
              REDEFINING_REALITY...
            </div>
          </div>
        ))}
      </HorizontalSection>

      {/* Transition area */}
      <section className="h-[40vh] md:h-[50vh] flex items-center justify-center bg-white text-black">
        <div className="text-center px-6">
          <div className="font-mono text-[10px] mb-4">END_OF_PROTOCOLS</div>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tighter uppercase transition-all duration-500 hover:tracking-normal cursor-default">
            Ready to scale?
          </h2>
        </div>
      </section>
    </div>
  );
};