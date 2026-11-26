import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { CONSULTATION_SERVICES, buildWhatsAppUrl } from '../data/siteData';
import { animateStaggeredReveal, prefersReducedMotion } from '../utils/animations';
import { ResilientImage } from './ResilientImage';

gsap.registerPlugin(ScrollTrigger);

export function StickyZoomShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const zoomFrameRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      animateStaggeredReveal('.js-sticky-header', {
        trigger: sectionRef.current || '.js-sticky-header',
        y: 26,
        duration: 0.85,
        start: 'top 82%',
      });

      mm.add('(min-width: 1024px)', () => {
        if (zoomFrameRef.current && sectionRef.current) {
          gsap.fromTo(
            zoomFrameRef.current,
            { scale: 1 },
            {
              scale: 1.16,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.6,
              },
            }
          );
        }

        stepRefs.current.forEach((stepEl, idx) => {
          if (!stepEl) return;
          ScrollTrigger.create({
            trigger: stepEl,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIndex(idx),
            onEnterBack: () => setActiveIndex(idx),
          });
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.js-sticky-mobile-card').forEach((card) => {
          animateStaggeredReveal(card, {
            trigger: card,
            y: 28,
            duration: 0.75,
            start: 'top 86%',
          });
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative bg-[#00555A] text-[#F5F8F8]"
      aria-labelledby="expertise-heading"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Section Header */}
        <div className="js-sticky-header mb-14 max-w-3xl lg:mb-20">
          <p className="font-mono-tech text-xs font-medium tracking-widest text-[#C5DFE8]">
            Core Consultancy Practice
          </p>
          <h2
            id="expertise-heading"
            className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            <span className="font-extralight text-[#C5DFE8]">Four engineering disciplines, </span>
            <span className="font-bold text-[#F5F8F8]">evaluated before execution.</span>
          </h2>
        </div>

        {/* Desktop Sticky Storytelling + Sticky Scroll-Zoom Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* Left Column: Narrative Steps */}
          <div className="lg:col-span-5 space-y-6 pb-20">
            {CONSULTATION_SERVICES.map((service, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={service.id}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`cursor-pointer border-t border-[#C5DFE8]/20 py-10 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-45 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono-tech text-xs tracking-wider text-[#D5FF38]">
                      {service.index}.
                    </span>
                    <span className="font-mono-tech text-sm font-medium text-[#C5DFE8] tabular-nums">
                      {service.priceLabel}
                      {service.id === 'mep' ? ' / sq. ft. starting' : ''}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#F5F8F8]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#C5DFE8]/90">
                    {service.summary}
                  </p>

                  <ul className="mt-5 space-y-2 text-sm text-[#F5F8F8]/85">
                    {service.includes.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#D5FF38]" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {service.importantNote && (
                    <p className="mt-4 text-xs leading-relaxed text-[#C5DFE8]/80">
                      {service.importantNote}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <a
                      href={buildWhatsAppUrl(service.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#D5FF38] px-5 py-2.5 text-xs font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <Link
                      to={`/consultation#${service.id}`}
                      className="text-xs font-medium text-[#C5DFE8] underline underline-offset-4 transition-colors hover:text-[#F5F8F8]"
                    >
                      Full scope &amp; policy
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Image Frame with Scroll-Linked Zoom */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#003D49] shadow-2xl">
              <div ref={zoomFrameRef} className="h-full w-full will-change-transform">
                {CONSULTATION_SERVICES.map((service, idx) => (
                  <div
                    key={service.id}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      idx === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      className="h-full w-full object-cover"
                      containerClassName="h-full w-full"
                      loading="eager"
                      fallbackTitle={service.title}
                    />
                  </div>
                ))}
              </div>

              {/* Measured Bottom Contrast Scrim */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003D49]/90 via-[#003D49]/25 to-transparent"
              />

              {/* Quiet Editorial Caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7">
                <div>
                  <p className="font-mono-tech text-xs text-[#D5FF38] tabular-nums">
                    {CONSULTATION_SERVICES[activeIndex].index} / 04
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-[#F5F8F8]">
                    {CONSULTATION_SERVICES[activeIndex].title}
                  </p>
                </div>
                <p className="font-mono-tech text-lg font-medium text-[#C5DFE8] tabular-nums">
                  {CONSULTATION_SERVICES[activeIndex].priceLabel}
                </p>
              </div>
            </div>

            {/* Interactive Step Selector Buttons */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              {CONSULTATION_SERVICES.map((service, idx) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`min-h-[42px] rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                    idx === activeIndex
                      ? 'bg-[#003D49] text-[#D5FF38]'
                      : 'bg-[#003D49]/40 text-[#C5DFE8] hover:bg-[#003D49]/70'
                  }`}
                >
                  <span className="font-mono-tech mr-1.5 opacity-75">{service.index}</span>
                  <span className="truncate">{service.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Clean Stacked Layout (No awkward scroll pinning on small screens) */}
        <div className="space-y-12 lg:hidden">
          {CONSULTATION_SERVICES.map((service) => (
            <article
              key={service.id}
              className="js-sticky-mobile-card overflow-hidden rounded-2xl bg-[#003D49] border border-[#C5DFE8]/15"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <ResilientImage
                  src={service.image}
                  alt={service.imageAlt}
                  className="h-full w-full object-cover"
                  containerClassName="h-full w-full"
                  fallbackTitle={service.title}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#003D49]/85 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-5 right-5 flex items-baseline justify-between">
                  <span className="font-mono-tech text-xs text-[#D5FF38]">{service.index}.</span>
                  <span className="font-mono-tech text-base font-medium text-[#F5F8F8] tabular-nums">
                    {service.priceLabel}
                    {service.id === 'mep' ? ' / sq. ft.' : ''}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-[#F5F8F8]">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#C5DFE8]">{service.summary}</p>
                {service.importantNote && (
                  <p className="mt-3 text-xs leading-relaxed text-[#C5DFE8]/80">
                    {service.importantNote}
                  </p>
                )}
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <a
                    href={buildWhatsAppUrl(service.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#D5FF38] px-5 py-2.5 text-xs font-bold text-[#003D49]"
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                  <Link
                    to={`/consultation#${service.id}`}
                    className="text-xs font-medium text-[#C5DFE8] underline underline-offset-4"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
