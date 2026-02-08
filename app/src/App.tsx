import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import Especialidades from './sections/Especialidades';
import Diferenciais from './sections/Diferenciais';
import Contato from './sections/Contato';
import CTAFinal from './sections/CTAFinal';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.getAll().forEach(st => st.disable());
    }

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFBF5] overflow-x-hidden">
      <Hero />
      <Especialidades />
      <Diferenciais />
      <Contato />
      <CTAFinal />
      <Footer />
    </main>
  );
}

export default App;
