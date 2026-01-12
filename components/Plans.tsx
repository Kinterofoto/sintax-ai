import React from 'react';
import { Plan } from '../types';
import { Button } from './Button';

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'INITIATE',
    tagline: 'Remove the immediate noise.',
    priceLabel: 'LEVEL 1',
    features: ['Audit_Logs', 'Task_Deletion', 'Basic_Auto', 'Report_Wkly']
  },
  {
    id: 'pro',
    name: 'ACCELERATE',
    tagline: 'Decouple time from output.',
    priceLabel: 'LEVEL 2',
    features: ['Full_Architecture', 'Custom_Agents', 'Data_Sanitization', 'Priority_Bus']
  },
  {
    id: 'enterprise',
    name: 'DOMINATE',
    tagline: 'Total reality reconstruction.',
    priceLabel: 'LEVEL 3',
    features: ['Neural_Net', 'Algorithm_Dev', 'Unlimited_Ops', 'Strategic_Council']
  }
];

export const Plans: React.FC = () => {
  return (
    <section id="plans" className="bg-white text-black py-24 md:py-32 border-b border-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black pb-8">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-xl">
            ARCHITECTURE<br/>LEVELS
          </h2>
          <p className="font-mono text-sm max-w-xs text-right mt-8 md:mt-0">
            Select your required level of operational clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 border-l border-black">
          {plans.map((plan, i) => (
            <div key={plan.id} className="border-r border-b lg:border-b-0 border-black p-8 md:p-12 flex flex-col justify-between min-h-[500px] relative hover:bg-neutral-50 transition-colors">
              
              <div className="absolute top-4 right-4 font-mono text-[10px] border border-black px-2 py-0.5 rounded-full">
                {plan.priceLabel}
              </div>

              <div>
                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <p className="font-mono text-xs text-neutral-500 mb-12 h-10">
                  // {plan.tagline}
                </p>
                
                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 group">
                      <div className="w-1.5 h-1.5 bg-neutral-300 group-hover:bg-black transition-colors"></div>
                      <span className="font-mono text-sm uppercase">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <Button variant="primary" className="w-full !bg-black !text-white hover:!bg-white hover:!text-black hover:!border-black border border-transparent">
                  SELECT_GRID
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};