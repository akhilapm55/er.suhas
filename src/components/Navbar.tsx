import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { EDITORIAL_EASE } from '../utils/animations';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/consultation', label: 'Consultation' },
  { to: '/about', label: 'About & Projects' },
  { to: '/cctv-handbook', label: 'CCTV Handbook' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#003D49]/95 backdrop-blur-md border-b border-[#C5DFE8]/15'
          : 'bg-[#003D49]/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      {/* Subtle top scroll progress rule */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-[#D5FF38] transition-transform duration-100"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-5 sm:px-8 lg:h-[72px] lg:px-12">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-[#F5F8F8] whitespace-nowrap shrink-0 transition-opacity hover:opacity-85"
        >
          Suhas Krishnan
        </Link>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 lg:gap-9">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#D5FF38]'
                    : 'text-[#C5DFE8] hover:text-[#F5F8F8]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#D5FF38] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/consultation"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#D5FF38] px-5 py-2.5 text-xs font-bold tracking-wide text-[#003D49] whitespace-nowrap shrink-0 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff6b]"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#F5F8F8] hover:bg-[#00555A]/60 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
            className="border-t border-[#C5DFE8]/15 bg-[#003D49] px-5 pb-7 pt-4 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex min-h-[44px] items-center justify-between border-b border-[#C5DFE8]/10 py-3 font-display text-lg font-medium transition-colors ${
                      isActive ? 'text-[#D5FF38]' : 'text-[#F5F8F8] hover:text-[#C5DFE8]'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                </NavLink>
              ))}
              <div className="pt-5">
                <Link
                  to="/consultation"
                  className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#D5FF38] px-6 py-3 text-sm font-bold text-[#003D49]"
                >
                  <span>Book Consultation</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
