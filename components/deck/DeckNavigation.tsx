import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DeckNavigationProps {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export const DeckNavigation: React.FC<DeckNavigationProps> = ({ current, total, onNext, onPrev }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={() => navigate('/')}
          className="font-mono text-[10px] md:text-xs text-white/30 hover:text-white/70 tracking-[0.3em] uppercase transition-colors duration-300"
        >
          SINTAX.AI
        </button>
        <span className="font-mono text-[10px] text-white/20 tracking-widest">
          CONFIDENTIAL BRIEFING
        </span>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4">
        <button
          onClick={onPrev}
          className={`font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2 ${
            current === 0 ? 'text-white/10 cursor-default' : 'text-white/30 hover:text-white/70'
          }`}
          disabled={current === 0}
        >
          <span>←</span> PREV
        </button>

        <div className="font-mono text-[10px] md:text-xs text-white/30 tracking-[0.3em]">
          <span className="text-white/60">{String(current + 1).padStart(2, '0')}</span>
          <span className="text-white/15 mx-2">/</span>
          <span>{String(total).padStart(2, '0')}</span>
        </div>

        <button
          onClick={onNext}
          className={`font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase transition-colors duration-300 flex items-center gap-2 ${
            current === total - 1 ? 'text-white/10 cursor-default' : 'text-white/30 hover:text-white/70'
          }`}
          disabled={current === total - 1}
        >
          NEXT <span>→</span>
        </button>
      </div>

      {/* Keyboard hints */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 font-mono text-[8px] text-white/10 tracking-widest hidden md:block">
        ← → NAVIGATE · ESC EXIT · 1-0 JUMP
      </div>
    </>
  );
};
