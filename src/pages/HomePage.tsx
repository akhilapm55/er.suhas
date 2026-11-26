import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react';
import {
  CLIENT_TESTIMONIALS,
  CONTACT_INFO,
  CONSULTATION_SERVICES,
  CREDENTIALS_TIMELINE,
  FEATURED_PROJECT,
  INDEPENDENT_ADVICE_STATEMENT,
  PROFESSIONAL_STANDING,
  SITE_ASSETS,
  buildWhatsAppUrl,
} from '../data/siteData';
import {
  EDITORIAL_EASE,
  animateStaggeredReveal,
  fadeUpVariant,
  prefersReducedMotion,
  staggerContainer,
} from '../utils/animations';
import { usePageMeta } from '../utils/usePageMeta';
import { ResilientImage } from '../components/ResilientImage';
import { StickyZoomShowcase } from '../components/StickyZoomShowcase';
import { InteractiveTiltCard } from '../components/InteractiveTiltCard';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  usePageMeta({
    title: 'Suhas Krishnan — Independent Electrical Engineering Consultant',
    description:
      'Independent electrical engineering consultancy by Suhas Krishnan (CEng IEI) in Kanhangad, Kerala. EV charger readiness, solar viability, CCTV & security, and MEP design.',
  });

  const mainRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const portraitWrapRef = useRef<HTMLDivElement | null>(null);
  const projectMaskRef = useRef<HTMLDivElement | null>(null);
  const projectWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Hero portrait subtle parallax
      if (portraitWrapRef.current && heroRef.current) {
        gsap.to(portraitWrapRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Reusable staggered reveals for homepage text blocks, lists, and cards
      animateStaggeredReveal('.js-hero-stat', {
        trigger: '.js-hero-stats-row',
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        start: 'top 92%',
      });

      animateStaggeredReveal('.js-advisory-reveal', {
        trigger: '.js-advisory-section',
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        start: 'top 80%',
      });

      gsap.from('.js-advisory-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: '.js-advisory-rule',
          start: 'top 88%',
          once: true,
        },
      });

      animateStaggeredReveal('.js-bento-header', {
        trigger: '.js-bento-section',
        y: 24,
        duration: 0.8,
        start: 'top 82%',
      });

      animateStaggeredReveal('.js-bento-card', {
        trigger: '.js-bento-grid',
        y: 36,
        scale: 0.985,
        duration: 0.85,
        stagger: 0.12,
        start: 'top 80%',
      });

      animateStaggeredReveal('.js-project-header', {
        trigger: '.js-project-section',
        y: 24,
        duration: 0.85,
        start: 'top 82%',
      });

      if (projectMaskRef.current) {
        gsap.fromTo(
          projectMaskRef.current,
          { clipPath: 'inset(7% 0% 7% 0% round 16px)', opacity: 0.75 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 16px)',
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            clearProps: 'clipPath,opacity',
            scrollTrigger: {
              trigger: projectMaskRef.current,
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      if (projectWrapRef.current) {
        gsap.fromTo(
          projectWrapRef.current,
          { scale: 1.08 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: projectWrapRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      }

      animateStaggeredReveal('.js-project-spec', {
        trigger: '.js-project-specs-row',
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        start: 'top 86%',
      });

      animateStaggeredReveal('.js-credentials-intro', {
        trigger: '.js-credentials-section',
        y: 26,
        duration: 0.85,
        start: 'top 80%',
      });

      animateStaggeredReveal('.js-credential-row', {
        trigger: '.js-credentials-list',
        y: 20,
        duration: 0.7,
        stagger: 0.075,
        start: 'top 82%',
      });

      animateStaggeredReveal('.js-cta-reveal', {
        trigger: '.js-cta-section',
        y: 26,
        duration: 0.85,
        stagger: 0.14,
        start: 'top 84%',
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToExpertise = () => {
    const el = document.getElementById('expertise');
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }
  };

  const heroWhatsApp = buildWhatsAppUrl(
    'Hello Suhas, I would like to enquire about an electrical engineering consultation.'
  );

  return (
    <main ref={mainRef}>
      {/* 1. CINEMATIC ASYMMETRIC HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[#003D49] pt-24 pb-16 text-[#F5F8F8] sm:pt-32 lg:pt-36 lg:pb-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left Typographic Composition */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-between lg:col-span-7 lg:py-4"
            >
              <div>
                <motion.p
                  variants={fadeUpVariant}
                  className="font-mono-tech text-xs tracking-widest text-[#C5DFE8]"
                >
                  Suhas Krishnan · Chartered Electrical Engineer (IEI)
                </motion.p>

                <motion.h1
                  variants={fadeUpVariant}
                  className="mt-6 font-display text-[clamp(2.5rem,5.4vw,4.65rem)] leading-[1.03] tracking-tight text-balance"
                >
                  <span className="block">
                    <span className="font-extralight text-[#C5DFE8]">Engineering </span>
                    <span className="font-bold text-[#F5F8F8]">Clarity.</span>
                  </span>
                  <span className="mt-1 block">
                    <span className="font-extralight text-[#C5DFE8]">Building </span>
                    <span className="font-bold text-[#F5F8F8]">Confidence.</span>
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUpVariant}
                  className="mt-7 max-w-xl text-base leading-relaxed text-[#C5DFE8]/90 sm:text-lg"
                >
                  Independent electrical engineering consultancy across EV charging infrastructure,
                  solar viability, CCTV &amp; security systems, and MEP design. Sound technical
                  guidance before you commit capital.
                </motion.p>
              </div>

              <motion.div variants={fadeUpVariant} className="mt-10 space-y-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    to="/consultation"
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#D5FF38] px-7 py-3.5 text-sm font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff6b]"
                  >
                    <span>Book a Consultation</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <button
                    type="button"
                    onClick={scrollToExpertise}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#C5DFE8]/30 px-6 py-3.5 text-sm font-medium text-[#F5F8F8] transition-colors duration-200 hover:border-[#C5DFE8]/70 hover:bg-[#00555A]/50"
                  >
                    <span>Explore Services</span>
                    <ArrowDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#C5DFE8]/85">
                  <a
                    href={heroWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-[#D5FF38] transition-opacity hover:opacity-80"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="font-mono-tech tabular-nums">
                      WhatsApp {CONTACT_INFO.whatsappDisplay}
                    </span>
                  </a>
                  <span aria-hidden="true" className="text-[#C5DFE8]/40">
                    ·
                  </span>
                  <span>Mon–Sat · 10:00 AM to 5:00 PM</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Layered Portrait Composition */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EDITORIAL_EASE, delay: 0.15 }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none lg:h-full">
                {/* Architectural offset border layer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full rounded-2xl border border-[#C5DFE8]/25 sm:block"
                />

                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#00555A] lg:h-full lg:min-h-[480px]">
                  <div ref={portraitWrapRef} className="h-full w-full will-change-transform">
                    <ResilientImage
                      src={SITE_ASSETS.portrait}
                      alt="Portrait of Suhas Krishnan, Independent Electrical Engineering Consultant"
                      loading="eager"
                      className="h-full w-full object-cover object-top"
                      containerClassName="h-full w-full"
                      fallbackTitle="Suhas Krishnan"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003D49]/85 via-transparent to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-base font-semibold text-[#F5F8F8]">
                      Suhas Krishnan
                    </p>
                    <p className="mt-0.5 text-xs text-[#C5DFE8]">
                      Kanhangad, Kerala · Experience Since 2010
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Full-width Baseline Strip Below Hero Split */}
          <div className="js-hero-stats-row mt-14 grid grid-cols-2 gap-6 border-t border-[#C5DFE8]/15 pt-8 sm:grid-cols-4 lg:mt-16">
            <div className="js-hero-stat">
              <p className="font-display text-2xl font-bold tracking-tight text-[#F5F8F8] tabular-nums">
                16 Years
              </p>
              <p className="mt-1 text-xs text-[#C5DFE8]/80">Electrical engineering since 2010</p>
            </div>
            <div className="js-hero-stat">
              <p className="font-display text-2xl font-bold tracking-tight text-[#F5F8F8]">
                CEng (IEI)
              </p>
              <p className="mt-1 text-xs text-[#C5DFE8]/80">Chartered Electrical Engineer</p>
            </div>
            <div className="js-hero-stat">
              <p className="font-display text-2xl font-bold tracking-tight text-[#F5F8F8]">
                PhD Pursuing
              </p>
              <p className="mt-1 text-xs text-[#C5DFE8]/80">Electric Vehicles · VELS University</p>
            </div>
            <div className="js-hero-stat">
              <p className="font-display text-2xl font-bold tracking-tight text-[#F5F8F8]">
                4 Domains
              </p>
              <p className="mt-1 text-xs text-[#C5DFE8]/80">EV · Solar · CCTV · MEP Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION & INDEPENDENT ADVICE */}
      <section className="js-advisory-section bg-[#F5F8F8] py-20 text-[#062026] sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="js-advisory-reveal lg:col-span-5">
              <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
                Independent Advisory
              </p>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-[#003D49] text-balance sm:text-4xl lg:text-[2.75rem]">
                <span className="font-extralight">Unbiased technical judgement </span>
                <span className="font-bold">before procurement begins.</span>
              </h2>
            </div>

            <div className="js-advisory-reveal lg:col-span-7 space-y-6 text-base leading-relaxed text-[#223F45] sm:text-lg">
              <p>
                Infrastructure decisions in EV charging, rooftop solar, surveillance networks, and
                building MEP services often suffer when technical advice comes solely from parties
                selling equipment or installation contracts.
              </p>
              <p>
                With 16 years of electrical engineering practice—spanning utility operations at
                KSEB, postgraduate research in Smart Grids &amp; Electric Vehicles, and ongoing
                doctoral work—Suhas Krishnan provides clear, direct engineering consultancy so you
                understand feasibility, electrical load implications, and realistic project scope
                upfront.
              </p>
              {INDEPENDENT_ADVICE_STATEMENT.quote.trim() && (
                <blockquote className="rounded-xl border border-[#003D49]/15 bg-white p-6">
                  <p className="font-display text-lg font-medium leading-snug text-[#003D49]">
                    “{INDEPENDENT_ADVICE_STATEMENT.quote}”
                  </p>
                  <footer className="mt-2 font-mono-tech text-xs text-[#456066]">
                    {INDEPENDENT_ADVICE_STATEMENT.attribution}
                  </footer>
                </blockquote>
              )}
              <div className="js-advisory-rule h-px w-full bg-[#003D49]/15" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-6 pt-1 sm:grid-cols-2">
                <div>
                  <p className="font-display text-sm font-semibold text-[#003D49]">
                    Current Leadership Role
                  </p>
                  <p className="mt-1 text-sm text-[#456066]">{CONTACT_INFO.affiliation}</p>
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-[#003D49]">
                    Published Authorship
                  </p>
                  <p className="mt-1 text-sm text-[#456066]">
                    Author of the{' '}
                    <Link
                      to="/cctv-handbook"
                      className="font-medium text-[#00555A] underline underline-offset-4 hover:text-[#003D49]"
                    >
                      CCTV Handbook
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL STORYTELLING + STICKY ZOOM */}
      <StickyZoomShowcase />

      {/* 4. ASYMMETRIC BENTO SERVICE & FEE OVERVIEW */}
      <section className="js-bento-section bg-[#C5DFE8] py-20 text-[#062026] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="js-bento-header flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
                Transparent Consultation Fees
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[1.08] tracking-tight text-[#003D49] text-balance sm:text-4xl lg:text-[2.85rem]">
                <span className="font-extralight">Structured scopes. </span>
                <span className="font-bold">Clear starting fees.</span>
              </h2>
            </div>

            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#003D49] underline underline-offset-4 transition-colors hover:text-[#00555A] sm:self-auto"
            >
              <span>View booking process &amp; terms</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Asymmetric 12-Column Bento Composition */}
          <div className="js-bento-grid mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Tile 1: EV Charger Readiness (Wide Dark Feature) */}
            <div className="js-bento-card lg:col-span-7">
              <InteractiveTiltCard className="h-full rounded-2xl bg-[#003D49] p-7 text-[#F5F8F8] sm:p-9">
                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-tech text-xs text-[#D5FF38]">01. EV Infrastructure</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        EV Charger Readiness Consultation
                      </h3>
                    </div>
                    <p className="font-mono-tech text-2xl font-medium text-[#D5FF38] tabular-nums sm:text-3xl">
                      ₹699
                    </p>
                  </div>

                  <p className="max-w-xl text-sm leading-relaxed text-[#C5DFE8] sm:text-base">
                    Covers EV charger readiness discussion, foundational guidance on charging
                    infrastructure, and basic solar advice during the same consultation call.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={buildWhatsAppUrl(CONSULTATION_SERVICES[0].whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#D5FF38] px-5 py-2.5 text-xs font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span>Book EV Consultation</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <Link
                      to="/consultation#ev"
                      className="text-xs font-medium text-[#C5DFE8] underline underline-offset-4 hover:text-[#F5F8F8]"
                    >
                      Scope details
                    </Link>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>

            {/* Tile 2: Solar Viability Check */}
            <div className="js-bento-card lg:col-span-5">
              <InteractiveTiltCard
                spotlightColor="rgba(0, 85, 90, 0.1)"
                className="h-full rounded-2xl border border-[#003D49]/10 bg-[#F5F8F8] p-7 text-[#062026] sm:p-9"
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-tech text-xs text-[#00555A]">02. Solar Advisory</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#003D49]">
                        Solar Viability Check
                      </h3>
                    </div>
                    <p className="font-mono-tech text-2xl font-medium text-[#00555A] tabular-nums">
                      ₹999
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-sm leading-relaxed text-[#223F45]">
                      Initial solar viability consultation and practical guidance based on your
                      requirements.
                    </p>
                    <p className="text-xs leading-relaxed text-[#456066]">
                      Note: A detailed solar report is a separate paid service and is not included in
                      this consultation.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={buildWhatsAppUrl(CONSULTATION_SERVICES[1].whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#003D49] px-5 py-2.5 text-xs font-bold text-[#F5F8F8] transition-colors hover:bg-[#00555A]"
                    >
                      <span>Book Solar Consultation</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>

            {/* Tile 3: CCTV & Security Consultancy */}
            <div className="js-bento-card lg:col-span-5">
              <InteractiveTiltCard
                spotlightColor="rgba(0, 85, 90, 0.1)"
                className="h-full rounded-2xl border border-[#003D49]/10 bg-[#F5F8F8] p-7 text-[#062026] sm:p-9"
              >
                <div className="relative z-10 flex h-full flex-col justify-between gap-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-tech text-xs text-[#00555A]">03. Surveillance</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#003D49]">
                        CCTV &amp; Security Consultancy
                      </h3>
                    </div>
                    <p className="font-mono-tech text-2xl font-medium text-[#00555A] tabular-nums">
                      ₹699
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-[#223F45]">
                    Professional guidance on surveillance system requirements and planning, backed
                    by Suhas Krishnan’s authorship of the{' '}
                    <Link
                      to="/cctv-handbook"
                      className="font-semibold text-[#00555A] underline underline-offset-4"
                    >
                      CCTV Handbook
                    </Link>
                    .
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={buildWhatsAppUrl(CONSULTATION_SERVICES[2].whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#003D49] px-5 py-2.5 text-xs font-bold text-[#F5F8F8] transition-colors hover:bg-[#00555A]"
                    >
                      <span>Book CCTV Consultation</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>

            {/* Tile 4: MEP Design Consultancy (Wide Primary Teal Feature) */}
            <div className="js-bento-card lg:col-span-7">
              <InteractiveTiltCard className="h-full rounded-2xl bg-[#00555A] p-7 text-[#F5F8F8] sm:p-9">
                <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono-tech text-xs text-[#D5FF38]">04. Building Services</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                        MEP Design Consultancy
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="font-mono-tech text-2xl font-medium text-[#D5FF38] tabular-nums sm:text-3xl">
                        ₹10 <span className="text-sm font-normal text-[#C5DFE8]">/ sq. ft.</span>
                      </p>
                      <p className="text-[11px] text-[#C5DFE8]/80">Starting fee</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <p className="max-w-xl text-sm leading-relaxed text-[#C5DFE8] sm:text-base">
                      Structured for residential, commercial, and industrial buildings across
                      project scales.
                    </p>
                    <p className="text-xs leading-relaxed text-[#C5DFE8]/80">
                      Final pricing depends on the building type and required engineering services.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href={buildWhatsAppUrl(CONSULTATION_SERVICES[3].whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#D5FF38] px-5 py-2.5 text-xs font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span>Discuss Your MEP Project</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                    <Link
                      to="/consultation#mep"
                      className="text-xs font-medium text-[#C5DFE8] underline underline-offset-4 hover:text-[#F5F8F8]"
                    >
                      MEP consultancy details
                    </Link>
                  </div>
                </div>
              </InteractiveTiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CONFIRMED PROJECT — PARAMEKKAVU CONVENTION CENTER */}
      <section className="js-project-section bg-[#003D49] py-20 text-[#F5F8F8] sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="js-project-header flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono-tech text-xs font-medium tracking-widest text-[#D5FF38]">
                Featured Project
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[1.08] tracking-tight text-balance sm:text-4xl lg:text-[3rem]">
                <span className="font-bold">{FEATURED_PROJECT.name}, </span>
                <span className="font-extralight text-[#C5DFE8]">Thrissur</span>
              </h2>
            </div>

            <Link
              to="/about#featured-project"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C5DFE8] underline underline-offset-4 transition-colors hover:text-[#D5FF38]"
            >
              <span>Full project record</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div
            ref={projectMaskRef}
            className="mt-10 overflow-hidden rounded-2xl bg-[#00555A]/40 will-change-transform"
          >
            <div ref={projectWrapRef} className="aspect-[16/9] w-full will-change-transform">
              <ResilientImage
                src={FEATURED_PROJECT.image}
                alt={FEATURED_PROJECT.imageAlt}
                className="h-full w-full object-cover"
                containerClassName="h-full w-full"
                fallbackTitle={FEATURED_PROJECT.name}
              />
            </div>
          </div>

          <div className="js-project-specs-row mt-10 grid grid-cols-2 gap-6 border-t border-[#C5DFE8]/15 pt-8 sm:grid-cols-3 lg:grid-cols-5">
            <div className="js-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Location</p>
              <p className="mt-1.5 font-display text-base font-semibold text-[#F5F8F8]">
                {FEATURED_PROJECT.location}
              </p>
            </div>
            <div className="js-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Project Area</p>
              <p className="mt-1.5 font-mono-tech text-base font-medium text-[#F5F8F8] tabular-nums">
                {FEATURED_PROJECT.area}
              </p>
            </div>
            <div className="js-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Completion</p>
              <p className="mt-1.5 font-mono-tech text-base font-medium text-[#F5F8F8] tabular-nums">
                {FEATURED_PROJECT.completion}
              </p>
            </div>
            <div className="js-project-spec col-span-2 sm:col-span-2 lg:col-span-1">
              <p className="text-xs text-[#C5DFE8]/70">Involvement</p>
              <p className="mt-1.5 text-sm font-medium text-[#F5F8F8]">
                {FEATURED_PROJECT.involvement}
              </p>
            </div>
            <div className="js-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Project Affiliation</p>
              <p className="mt-1.5 font-display text-base font-semibold text-[#C5DFE8]">
                {FEATURED_PROJECT.affiliation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CREDENTIALS & EXPERIENCE SNAPSHOT */}
      <section className="js-credentials-section bg-[#F5F8F8] py-20 text-[#062026] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="js-credentials-intro lg:col-span-5">
              <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
                Credentials &amp; Standing
              </p>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-[#003D49] text-balance sm:text-4xl">
                <span className="font-extralight">Academic rigor, </span>
                <span className="font-bold">field-tested since 2010.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#456066]">
                Every consultation draws upon formal electrical engineering training, utility-sector
                exposure, and active doctoral research in electric mobility.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#003D49]/25 px-6 py-3 text-sm font-semibold text-[#003D49] transition-colors hover:bg-[#003D49] hover:text-[#F5F8F8]"
                >
                  <span>Explore full timeline &amp; credentials</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="js-credentials-list lg:col-span-7">
              <div className="divide-y divide-[#003D49]/12 border-y border-[#003D49]/12">
                {PROFESSIONAL_STANDING.map((item) => (
                  <div
                    key={item.label}
                    className="js-credential-row grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-6"
                  >
                    <p className="font-mono-tech text-xs font-medium text-[#00555A] sm:col-span-4">
                      {item.label}
                    </p>
                    <p className="font-display text-base font-medium text-[#062026] sm:col-span-8">
                      {item.value}
                    </p>
                  </div>
                ))}
                {CREDENTIALS_TIMELINE.slice(0, 3).map((edu) => (
                  <div
                    key={edu.title}
                    className="js-credential-row grid grid-cols-1 gap-1 py-5 sm:grid-cols-12 sm:gap-6"
                  >
                    <p className="font-mono-tech text-xs font-medium text-[#456066] tabular-nums sm:col-span-4">
                      {edu.period}
                    </p>
                    <div className="sm:col-span-8">
                      <p className="font-display text-base font-medium text-[#062026]">
                        {edu.title}
                      </p>
                      <p className="mt-0.5 text-sm text-[#456066]">{edu.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {CLIENT_TESTIMONIALS.length > 0 && (
        <section className="bg-[#C5DFE8] py-20 text-[#062026] sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
              Client Feedback
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.08] tracking-tight text-[#003D49] text-balance sm:text-4xl">
              <span className="font-extralight">Verified notes from </span>
              <span className="font-bold">consultation clients.</span>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CLIENT_TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.clientName + item.context}
                  className="flex flex-col justify-between rounded-2xl border border-[#003D49]/12 bg-[#F5F8F8] p-7"
                >
                  <p className="text-sm leading-relaxed text-[#223F45]">“{item.quote}”</p>
                  <footer className="mt-6 border-t border-[#003D49]/10 pt-4">
                    <p className="font-display text-sm font-bold text-[#003D49]">
                      {item.clientName}
                    </p>
                    <p className="mt-0.5 text-xs text-[#456066]">{item.context}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FINAL CONVERSION CTA BAND */}
      <section className="js-cta-section bg-[#00555A] py-20 text-[#F5F8F8] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="js-cta-reveal max-w-2xl">
              <p className="font-mono-tech text-xs tracking-widest text-[#D5FF38]">
                Start an Enquiry
              </p>
              <h2 className="mt-4 font-display text-3xl leading-[1.08] tracking-tight text-balance sm:text-5xl">
                <span className="font-extralight text-[#C5DFE8]">Ready to clarify your </span>
                <span className="font-bold text-[#F5F8F8]">electrical or MEP scope?</span>
              </h2>
              <p className="mt-4 text-base text-[#C5DFE8]">
                Consultations are scheduled Monday to Saturday, 10:00 AM to 5:00 PM, following
                advance payment confirmation.
              </p>
            </div>

            <div className="js-cta-reveal flex flex-wrap items-center gap-4">
              <a
                href={heroWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#D5FF38] px-7 py-3.5 text-sm font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff6b]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Message on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/consultation"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#C5DFE8]/35 px-6 py-3.5 text-sm font-medium text-[#F5F8F8] transition-colors hover:bg-[#003D49]/60"
              >
                <span>Compare Consultation Options</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
