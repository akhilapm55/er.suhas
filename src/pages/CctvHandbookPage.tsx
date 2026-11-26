import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight, BookOpen, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, SITE_ASSETS, buildWhatsAppUrl } from '../data/siteData';
import { fadeUpVariant, staggerContainer, useStaggeredScrollReveal } from '../utils/animations';
import { usePageMeta } from '../utils/usePageMeta';
import { ResilientImage } from '../components/ResilientImage';

export function CctvHandbookPage() {
  usePageMeta({
    title: 'CCTV Handbook — Authored by Suhas Krishnan',
    description:
      'Learn about the CCTV Handbook authored by Suhas Krishnan, supporting structured CCTV and security system planning, alongside ₹699 CCTV consultancy.',
  });

  const mainRef = useRef<HTMLElement | null>(null);

  useStaggeredScrollReveal(mainRef, [
    {
      targets: '.js-handbook-planning-left',
      trigger: '.js-handbook-planning-section',
      y: 24,
      duration: 0.8,
      start: 'top 82%',
    },
    {
      targets: '.js-handbook-planning-block',
      trigger: '.js-handbook-planning-right',
      y: 22,
      duration: 0.75,
      stagger: 0.12,
      start: 'top 82%',
    },
  ]);

  const handbookWhatsApp = buildWhatsAppUrl(
    'Hello Suhas, I would like to enquire about the CCTV Handbook.'
  );
  const cctvConsultWhatsApp = buildWhatsAppUrl(
    'Hello Suhas, I am interested in the CCTV & Security Consultancy priced at ₹699. Please share the booking process.'
  );

  return (
    <main ref={mainRef}>
      {/* Editorial Publication Showcase */}
      <section className="bg-[#003D49] pt-28 pb-20 text-[#F5F8F8] sm:pt-36 lg:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6"
            >
              <motion.p
                variants={fadeUpVariant}
                className="font-mono-tech text-xs tracking-widest text-[#D5FF38]"
              >
                Published Work · By Suhas Krishnan
              </motion.p>
              <motion.h1
                variants={fadeUpVariant}
                className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.9rem)] leading-[1.06] tracking-tight text-balance"
              >
                <span className="font-extralight text-[#C5DFE8]">The </span>
                <span className="font-bold text-[#F5F8F8]">CCTV Handbook</span>
              </motion.h1>
              <motion.p
                variants={fadeUpVariant}
                className="mt-6 text-base leading-relaxed text-[#C5DFE8] sm:text-lg"
              >
                Authored by Chartered Electrical Engineer Suhas Krishnan, the CCTV Handbook is a
                dedicated engineering reference supporting clear, practical CCTV and security system
                planning.
              </motion.p>

              <motion.div variants={fadeUpVariant} className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={handbookWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-[#D5FF38] px-7 py-3.5 text-sm font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff6b]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Enquire About the Handbook</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={cctvConsultWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#C5DFE8]/30 px-6 py-3.5 text-sm font-medium text-[#F5F8F8] transition-colors hover:bg-[#00555A]"
                >
                  <span>Book CCTV Consultancy (₹699)</span>
                </a>
              </motion.div>

              <motion.p
                variants={fadeUpVariant}
                className="mt-5 text-xs text-[#C5DFE8]/80"
              >
                Direct enquiry via WhatsApp ({CONTACT_INFO.whatsappDisplay}). Availability and order
                details are shared directly upon enquiry.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
              className="lg:col-span-6"
            >
              <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-[#00555A] shadow-2xl lg:max-w-lg">
                <div className="aspect-[3/4] w-full">
                  <ResilientImage
                    src={SITE_ASSETS.cctvHandbook}
                    alt="Editorial still-life representing the CCTV Handbook alongside architectural electrical blueprints and security optics"
                    loading="eager"
                    className="h-full w-full object-cover"
                    containerClassName="h-full w-full"
                    fallbackTitle="CCTV Handbook — Suhas Krishnan"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Structured CCTV Planning Matters */}
      <section className="js-handbook-planning-section bg-[#F5F8F8] py-20 text-[#062026] sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="js-handbook-planning-left lg:col-span-5">
              <div className="flex items-center gap-2 text-[#00555A]">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <p className="font-mono-tech text-xs font-medium tracking-widest">
                  Security System Planning
                </p>
              </div>
              <h2 className="mt-4 font-display text-3xl leading-[1.1] tracking-tight text-[#003D49] text-balance sm:text-4xl">
                <span className="font-extralight">Why engineering planning </span>
                <span className="font-bold">precedes camera installation.</span>
              </h2>
            </div>

            <div className="js-handbook-planning-right lg:col-span-7 space-y-6 text-base leading-relaxed text-[#223F45]">
              <p className="js-handbook-planning-block">
                Surveillance installations frequently underperform when camera placement, cable
                routing, power resilience, and recording architecture are treated as afterthoughts
                rather than engineered systems.
              </p>
              <p className="js-handbook-planning-block">
                The CCTV Handbook reflects Suhas Krishnan’s practical field perspective—bridging
                electrical infrastructure discipline with clear security system requirements for
                residential, commercial, and institutional buildings.
              </p>

              <div className="js-handbook-planning-block border-t border-[#003D49]/12 pt-6">
                <h3 className="font-display text-lg font-bold text-[#003D49]">
                  Need project-specific CCTV &amp; security guidance?
                </h3>
                <p className="mt-2 text-sm text-[#456066]">
                  Book a dedicated CCTV &amp; Security Consultancy session (₹699) to review system
                  requirements and planning directly with Suhas Krishnan.
                </p>
                <div className="mt-5">
                  <Link
                    to="/consultation#cctv"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#00555A] underline underline-offset-4 hover:text-[#003D49]"
                  >
                    <span>View CCTV Consultation Scope</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
