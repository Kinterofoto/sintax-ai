import React, { useEffect } from 'react';
import { NoiseOverlay } from './components/NoiseOverlay';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { PixelTransition } from './components/PixelTransition';
import { Manifesto } from './components/Manifesto';
import { Services } from './components/Services';
import { Plans } from './components/Plans';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Experience } from './components/Experience';
import { LenisScroll } from './components/SmoothScroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    // Show root once React is mounted (prevents white flash)
    const root = document.getElementById('root');
    if (root) root.style.opacity = '1';
    ScrollTrigger.refresh();
  }, []);

  return (
    <LenisScroll>
      <div className="bg-black min-h-screen text-white antialiased selection:bg-white selection:text-black relative overflow-x-hidden">
        <Experience />
        <NoiseOverlay />
        <Navigation />

        <main className="relative z-10">
          <Hero />
          <PixelTransition />
          <Manifesto />
          <Services />
          <Plans />
          <Contact />
        </main>

        <Footer />
      </div>
    </LenisScroll>
  );
};

export default App;