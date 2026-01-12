import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.07]">
      <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
    </div>
  );
};