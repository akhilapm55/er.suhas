import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import {
  CLIENT_TESTIMONIALS,
  CONFIRMED_PROJECTS,
  CONTACT_INFO,
  CREDENTIALS_TIMELINE,
  FEATURED_PROJECT,
  PROFESSIONAL_STANDING,
  SITE_ASSETS,
  buildWhatsAppUrl,
} from '../data/siteData';
import { fadeUpVariant, staggerContainer, useStaggeredScrollReveal } from '../utils/animations';
import { usePageMeta } from '../utils/usePageMeta';
import { ResilientImage } from '../components/ResilientImage';

export function AboutPage() {
  usePageMeta({
    title: 'About & Projects — Suhas Krishnan | Electrical Engineering Consultant',
    description:
      'Credentials, 16 years of electrical engineering experience since 2010, Chartered Electrical Engineer (IEI) status, and the Paramekkavu Convention Center MEP project.',
  });

  const mainRef = useRef<HTMLElement | null>(null);

  useStaggeredScrollReveal(mainRef, [
    {
      targets: '.js-about-standing-intro',
      trigger: '.js-about-credentials-section',
      y: 24,
      duration: 0.8,
      start: 'top 82%',
    },
    {
      targets: '.js-about-standing-item',
      trigger: '.js-about-standing-list',
      y: 18,
      duration: 0.7,
      stagger: 0.08,
      start: 'top 84%',
    },
    {
      targets: '.js-about-timeline-item',
      trigger: '.js-about-timeline',
      y: 24,
      duration: 0.75,
      stagger: 0.1,
      start: 'top 82%',
    },
    {
      targets: '.js-about-project-header',
      trigger: '#featured-project',
      y: 26,
      duration: 0.85,
      stagger: 0.1,
      start: 'top 82%',
    },
    {
      targets: '.js-about-project-spec',
      trigger: '.js-about-project-specs',
      y: 20,
      duration: 0.7,
      stagger: 0.08,
      start: 'top 86%',
    },
    {
      targets: '.js-about-project-cta',
      trigger: '.js-about-project-cta',
      y: 18,
      duration: 0.75,
      start: 'top 90%',
    },
  ]);

  const aboutWhatsApp = buildWhatsAppUrl(
    'Hello Suhas, I would like to discuss an electrical engineering or MEP consultation.'
  );

  return (
    <main ref={mainRef}>
      {/* Editorial Bio Hero */}
      <section className="bg-[#003D49] pt-28 pb-20 text-[#F5F8F8] sm:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              <motion.p
                variants={fadeUpVariant}
                className="font-mono-tech text-xs tracking-widest text-[#D5FF38]"
              >
                About &amp; Credentials
              </motion.p>
              <motion.h1
                variants={fadeUpVariant}
                className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.8rem)] leading-[1.06] tracking-tight text-balance"
              >
                <span className="font-extralight text-[#C5DFE8]">16 years of </span>
                <span className="font-bold text-[#F5F8F8]">electrical engineering practice.</span>
              </motion.h1>
              <motion.p
                variants={fadeUpVariant}
                className="mt-6 text-base leading-relaxed text-[#C5DFE8] sm:text-lg"
              >
                Suhas Krishnan is an independent electrical engineering consultant based in{' '}
                {CONTACT_INFO.location}, practicing since 2010. Alongside his independent advisory
                work, he serves as {CONTACT_INFO.affiliation}.
              </motion.p>
              <motion.p
                variants={fadeUpVariant}
                className="mt-4 text-base leading-relaxed text-[#C5DFE8]/85"
              >
                His technical background bridges utility field operations, AutoCAD electrical
                design, smart grid and electric vehicle engineering, and published guidance on
                surveillance planning through the CCTV Handbook.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5"
            >
              <div className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-[#00555A] lg:max-w-none">
                <div className="aspect-[3/4] w-full">
                  <ResilientImage
                    src={SITE_ASSETS.portrait}
                    alt="Suhas Krishnan, Independent Electrical Engineering Consultant"
                    loading="eager"
                    className="h-full w-full object-cover object-top"
                    containerClassName="h-full w-full"
                    fallbackTitle="Suhas Krishnan"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Professional Standing & Verified Credentials */}
      <section className="js-about-credentials-section bg-[#F5F8F8] py-20 text-[#062026] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="js-about-standing-intro">
                <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
                  Professional Standing
                </p>
                <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-[#003D49] text-balance sm:text-4xl">
                  <span className="font-extralight">Verified credentials &amp; </span>
                  <span className="font-bold">engineering timeline.</span>
                </h2>
              </div>

              <div className="js-about-standing-list mt-8 space-y-5 border-t border-[#003D49]/12 pt-6">
                {PROFESSIONAL_STANDING.map((item) => (
                  <div key={item.label} className="js-about-standing-item">
                    <p className="font-mono-tech text-xs text-[#00555A]">{item.label}</p>
                    <p className="mt-1 font-display text-base font-semibold text-[#062026]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Hairline Timeline */}
            <div className="lg:col-span-7">
              <div className="js-about-timeline relative space-y-10 pl-8 sm:pl-10">
                <div
                  aria-hidden="true"
                  className="absolute bottom-2 left-0 top-2 w-px bg-[#003D49]/20"
                />

                {CREDENTIALS_TIMELINE.map((item) => (
                  <div key={item.title} className="js-about-timeline-item relative">
                    <div
                      aria-hidden="true"
                      className="absolute -left-8 top-2 h-2 w-2 -translate-x-[3.5px] rounded-full bg-[#00555A] sm:-left-10"
                    />
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#456066]">
                      <span className="font-mono-tech font-semibold text-[#00555A] tabular-nums">
                        {item.period}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-[#003D49]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#223F45]">{item.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmed Project Case Study — Paramekkavu Convention Center */}
      <section
        id="featured-project"
        className="scroll-mt-20 bg-[#003D49] py-20 text-[#F5F8F8] sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="js-about-project-header font-mono-tech text-xs tracking-widest text-[#D5FF38]">
              Confirmed Project Case Study
            </p>
            <h2 className="js-about-project-header mt-4 font-display text-3xl leading-[1.08] tracking-tight text-balance sm:text-5xl">
              <span className="font-bold">{FEATURED_PROJECT.name}</span>
              <span className="font-extralight text-[#C5DFE8]"> — Thrissur</span>
            </h2>
            <p className="js-about-project-header mt-5 text-base leading-relaxed text-[#C5DFE8]">
              Large-scale MEP design consultancy and execution consultation delivered in
              affiliation with {FEATURED_PROJECT.affiliation}.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl bg-[#00555A]/40">
            <div className="aspect-[16/9] w-full">
              <ResilientImage
                src={FEATURED_PROJECT.image}
                alt={FEATURED_PROJECT.imageAlt}
                className="h-full w-full object-cover"
                containerClassName="h-full w-full"
                fallbackTitle={FEATURED_PROJECT.name}
              />
            </div>
          </div>

          <div className="js-about-project-specs mt-10 grid grid-cols-1 gap-8 border-t border-[#C5DFE8]/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="js-about-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Project Name &amp; Location</p>
              <p className="mt-2 font-display text-lg font-semibold text-[#F5F8F8]">
                {FEATURED_PROJECT.name}, {FEATURED_PROJECT.location}
              </p>
            </div>
            <div className="js-about-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Project Scale</p>
              <p className="mt-2 font-mono-tech text-lg font-medium text-[#D5FF38] tabular-nums">
                {FEATURED_PROJECT.area}
              </p>
            </div>
            <div className="js-about-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Completion Year</p>
              <p className="mt-2 font-mono-tech text-lg font-medium text-[#F5F8F8] tabular-nums">
                {FEATURED_PROJECT.completion}
              </p>
            </div>
            <div className="js-about-project-spec">
              <p className="text-xs text-[#C5DFE8]/70">Scope &amp; Affiliation</p>
              <p className="mt-2 text-sm leading-relaxed text-[#F5F8F8]">
                {FEATURED_PROJECT.involvement} · {FEATURED_PROJECT.affiliation}
              </p>
            </div>
          </div>

          {CONFIRMED_PROJECTS.length > 1 && (
            <div className="mt-16 border-t border-[#C5DFE8]/15 pt-14">
              <p className="font-mono-tech text-xs tracking-widest text-[#C5DFE8]">
                Additional Confirmed Projects
              </p>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {CONFIRMED_PROJECTS.slice(1).map((project) => (
                  <article
                    key={project.name}
                    className="overflow-hidden rounded-2xl border border-[#C5DFE8]/15 bg-[#00555A]/35"
                  >
                    <div className="aspect-[16/10] w-full">
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        className="h-full w-full object-cover"
                        containerClassName="h-full w-full"
                        fallbackTitle={project.name}
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-xl font-bold text-[#F5F8F8]">
                          {project.name}
                        </h3>
                        <span className="font-mono-tech text-xs text-[#D5FF38] tabular-nums">
                          {project.completion}
                        </span>
                      </div>
                      <p className="text-xs text-[#C5DFE8]">
                        {project.location} · {project.area} · {project.affiliation}
                      </p>
                      <p className="text-sm text-[#F5F8F8]/90">{project.involvement}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {CLIENT_TESTIMONIALS.length > 0 && (
            <div className="mt-16 border-t border-[#C5DFE8]/15 pt-14">
              <p className="font-mono-tech text-xs tracking-widest text-[#D5FF38]">
                Client Feedback
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                {CLIENT_TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.clientName + item.context}
                    className="rounded-2xl border border-[#C5DFE8]/15 bg-[#00555A]/30 p-7"
                  >
                    <p className="text-sm leading-relaxed text-[#F5F8F8]/95">“{item.quote}”</p>
                    <footer className="mt-4 text-xs text-[#C5DFE8]">
                      <span className="font-semibold text-[#F5F8F8]">{item.clientName}</span> ·{' '}
                      {item.context}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div className="js-about-project-cta mt-14 flex flex-wrap items-center gap-4 border-t border-[#C5DFE8]/15 pt-10">
            <a
              href={aboutWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#D5FF38] px-7 py-3.5 text-sm font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>Enquire via WhatsApp</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              to="/consultation"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#C5DFE8]/30 px-6 py-3.5 text-sm font-medium text-[#F5F8F8] transition-colors hover:bg-[#00555A]"
            >
              <span>View Consultation Services</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
