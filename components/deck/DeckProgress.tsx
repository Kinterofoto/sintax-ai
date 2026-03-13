import React from 'react';

interface DeckProgressProps {
  current: number;
  total: number;
}

export const DeckProgress: React.FC<DeckProgressProps> = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5">
      <div
        className="h-full bg-white/30 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
