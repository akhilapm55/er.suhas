import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { ConsultationPage } from './pages/ConsultationPage';
import { AboutPage } from './pages/AboutPage';
import { CctvHandbookPage } from './pages/CctvHandbookPage';
import { prefersReducedMotion } from './utils/animations';
import Preloader from "./components/Preloader";

gsap.registerPlugin(ScrollTrigger);

function ScrollAndLenisManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
        }
      }, 60);
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
    ScrollTrigger.refresh();
    return undefined;
  }, [pathname, hash]);

  return null;
}


export default function App() {
  return (
    <BrowserRouter>
      <ScrollAndLenisManager />

      <Preloader />

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cctv-handbook" element={<CctvHandbookPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
