import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Clock, CreditCard, FileText, MapPin, MessageCircle } from 'lucide-react';
import {
  CONSULTATION_POLICIES,
  CONSULTATION_PROCESS,
  CONSULTATION_SERVICES,
  CONTACT_INFO,
  SAMPLE_REPORT,
  buildWhatsAppUrl,
  type ConsultationService,
} from '../data/siteData';
import {
  animateStaggeredReveal,
  fadeUpVariant,
  prefersReducedMotion,
  staggerContainer,
  useStaggeredScrollReveal,
} from '../utils/animations';
import { usePageMeta } from '../utils/usePageMeta';
import { ResilientImage } from '../components/ResilientImage';

gsap.registerPlugin(ScrollTrigger);

type FilterTab = 'all' | ConsultationService['id'];

export function ConsultationPage() {
  usePageMeta({
    title: 'Consultations & Fees — Suhas Krishnan | EV, Solar, CCTV & MEP',
    description:
      'Book paid electrical engineering consultations with Suhas Krishnan via WhatsApp: EV Charger Readiness (₹699), Solar Viability (₹999), CCTV Consultancy (₹699), and MEP Design (from ₹10/sq. ft.).',
  });

  const mainRef = useRef<HTMLElement | null>(null);
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<FilterTab>('all');

  const visibleServices =
    selectedFilter === 'all'
      ? CONSULTATION_SERVICES
      : CONSULTATION_SERVICES.filter((s) => s.id === selectedFilter);

  useStaggeredScrollReveal(mainRef, [
    {
      targets: '.js-consult-process-header',
      trigger: '.js-consult-process-section',
      y: 24,
      duration: 0.8,
      start: 'top 84%',
    },
    {
      targets: '.js-consult-process-step',
      trigger: '.js-consult-process-grid',
      y: 26,
      duration: 0.75,
      stagger: 0.09,
      start: 'top 82%',
    },
    {
      targets: '.js-consult-terms-header',
      trigger: '.js-consult-terms-section',
      y: 24,
      duration: 0.8,
      start: 'top 84%',
    },
    {
      targets: '.js-consult-terms-card',
      trigger: '.js-consult-terms-grid',
      y: 26,
      duration: 0.8,
      stagger: 0.12,
      start: 'top 82%',
    },
    {
      targets: '.js-consult-policy-item',
      trigger: '.js-consult-policy-box',
      y: 18,
      duration: 0.7,
      stagger: 0.08,
      start: 'top 86%',
    },
  ]);

  useEffect(() => {
    if (prefersReducedMotion() || !servicesSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.js-service-article').forEach((article) => {
        animateStaggeredReveal(article, {
          trigger: article,
          y: 30,
          duration: 0.8,
          start: 'top 86%',
        });

        const listItems = article.querySelectorAll('.js-service-feature-item');
        if (listItems.length > 0) {
          animateStaggeredReveal(listItems, {
            trigger: article,
            y: 14,
            duration: 0.6,
            stagger: 0.07,
            delay: 0.12,
            start: 'top 84%',
          });
        }
      });
    }, servicesSectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [selectedFilter]);

  return (
    <main ref={mainRef}>
      {/* Header Section */}
      <section className="bg-[#003D49] pt-28 pb-16 text-[#F5F8F8] sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUpVariant}
              className="font-mono-tech text-xs tracking-widest text-[#D5FF38]"
            >
              Paid Advisory &amp; Booking
            </motion.p>
            <motion.h1
              variants={fadeUpVariant}
              className="mt-4 font-display text-[clamp(2.25rem,4.6vw,3.9rem)] leading-[1.05] tracking-tight text-balance"
            >
              <span className="font-extralight text-[#C5DFE8]">Focused engineering </span>
              <span className="font-bold text-[#F5F8F8]">consultations.</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariant}
              className="mt-6 text-base leading-relaxed text-[#C5DFE8] sm:text-lg"
            >
              Choose the consultation matching your requirement and start an enquiry on WhatsApp. All
              consultations are paid in advance, with scheduling confirmed after fee settlement.
            </motion.p>
          </motion.div>

          {/* Functional Service Filter Controls */}
          <div className="mt-10 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter consultation services">
            <button
              type="button"
              role="tab"
              aria-selected={selectedFilter === 'all'}
              onClick={() => setSelectedFilter('all')}
              className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#D5FF38] text-[#003D49]'
                  : 'bg-[#00555A]/60 text-[#C5DFE8] hover:bg-[#00555A]'
              }`}
            >
              All Services (4)
            </button>
            {CONSULTATION_SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={selectedFilter === service.id}
                onClick={() => setSelectedFilter(service.id)}
                className={`min-h-[40px] rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedFilter === service.id
                    ? 'bg-[#D5FF38] text-[#003D49]'
                    : 'bg-[#00555A]/60 text-[#C5DFE8] hover:bg-[#00555A]'
                }`}
              >
                {service.shortTitle}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Distinct Service Compositions */}
      <section ref={servicesSectionRef} className="bg-[#F5F8F8] py-16 text-[#062026] sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl space-y-12 px-5 sm:px-8 lg:space-y-16 lg:px-12">
          {visibleServices.map((service, index) => {
            const isDark = index % 2 === 1;
            const isReversed = index % 2 === 1;
            const whatsappHref = buildWhatsAppUrl(service.whatsappMessage);

            return (
              <article
                key={service.id}
                id={service.id}
                className={`js-service-article scroll-mt-24 overflow-hidden rounded-2xl border ${
                  isDark
                    ? 'border-[#C5DFE8]/15 bg-[#003D49] text-[#F5F8F8]'
                    : 'border-[#003D49]/12 bg-[#FFFFFF] text-[#062026]'
                }`}
              >
                <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
                  {/* Editorial Visual Side */}
                  <div
                    className={`relative min-h-[260px] lg:col-span-5 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      className="h-full w-full object-cover"
                      containerClassName="h-full w-full"
                      fallbackTitle={service.title}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003D49]/75 via-transparent to-transparent lg:hidden"
                    />
                  </div>

                  {/* Content & Conversion Side */}
                  <div
                    className={`flex flex-col justify-between p-7 sm:p-10 lg:col-span-7 lg:p-12 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-current/10 pb-6">
                        <div>
                          <p
                            className={`font-mono-tech text-xs ${
                              isDark ? 'text-[#D5FF38]' : 'text-[#00555A]'
                            }`}
                          >
                            Service {service.index}
                          </p>
                          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                            {service.title}
                          </h2>
                        </div>

                        <div className="text-left sm:text-right">
                          <p
                            className={`font-mono-tech text-3xl font-bold tabular-nums ${
                              isDark ? 'text-[#D5FF38]' : 'text-[#003D49]'
                            }`}
                          >
                            {service.priceLabel}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? 'text-[#C5DFE8]/80' : 'text-[#456066]'
                            }`}
                          >
                            {service.priceUnit}
                          </p>
                        </div>
                      </div>

                      <p
                        className={`mt-6 text-base leading-relaxed ${
                          isDark ? 'text-[#C5DFE8]' : 'text-[#223F45]'
                        }`}
                      >
                        {service.summary}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {service.includes.map((point) => (
                          <li
                            key={point}
                            className="js-service-feature-item flex items-start gap-3 text-sm sm:text-base"
                          >
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                isDark ? 'text-[#D5FF38]' : 'text-[#00555A]'
                              }`}
                              aria-hidden="true"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {service.id === 'cctv' && (
                        <p className="mt-4 text-xs">
                          <Link
                            to="/cctv-handbook"
                            className={`font-semibold underline underline-offset-4 ${
                              isDark ? 'text-[#D5FF38]' : 'text-[#00555A]'
                            }`}
                          >
                            Explore the CCTV Handbook authored by Suhas Krishnan
                          </Link>
                        </p>
                      )}

                      {service.importantNote && (
                        <div
                          className={`mt-6 rounded-xl p-4 text-xs leading-relaxed sm:text-sm ${
                            isDark
                              ? 'bg-[#00555A]/60 text-[#F5F8F8]'
                              : 'bg-[#C5DFE8]/45 text-[#003D49]'
                          }`}
                        >
                          <span className="font-semibold">Scope Note: </span>
                          {service.importantNote}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-current/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5 ${
                          isDark
                            ? 'bg-[#D5FF38] text-[#003D49] hover:bg-[#e2ff6b]'
                            : 'bg-[#003D49] text-[#F5F8F8] hover:bg-[#00555A]'
                        }`}
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        <span>{service.ctaLabel}</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>

                      <p
                        className={`text-xs ${
                          isDark ? 'text-[#C5DFE8]/75' : 'text-[#456066]'
                        }`}
                      >
                        Enquiry via WhatsApp ({CONTACT_INFO.whatsappDisplay}) · Advance payment
                        required
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 6-Step Consultation Process */}
      <section className="js-consult-process-section bg-[#C5DFE8] py-20 text-[#062026] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="js-consult-process-header max-w-2xl">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
              How Booking Works
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-[#003D49] text-balance sm:text-4xl">
              <span className="font-extralight">Six clear steps from </span>
              <span className="font-bold">enquiry to consultation.</span>
            </h2>
          </div>

          <div className="js-consult-process-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CONSULTATION_PROCESS.map((item) => (
              <div
                key={item.step}
                className="js-consult-process-step rounded-2xl border border-[#003D49]/10 bg-[#F5F8F8] p-7"
              >
                <p className="font-mono-tech text-xs font-semibold text-[#00555A] tabular-nums">
                  Step {item.step}
                </p>
                <h3 className="mt-3 font-display text-lg font-bold text-[#003D49]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#223F45]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours, Site Visits, Reports, Payment & Clear Policies */}
      <section className="js-consult-terms-section bg-[#F5F8F8] py-20 text-[#062026] sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="js-consult-terms-header max-w-2xl">
            <p className="font-mono-tech text-xs font-medium tracking-widest text-[#00555A]">
              Terms &amp; Logistics
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-[#003D49] text-balance sm:text-4xl">
              <span className="font-extralight">Consultation hours, site visits &amp; </span>
              <span className="font-bold">important policies.</span>
            </h2>
          </div>

          <div className="js-consult-terms-grid mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Hours & Payment */}
            <div className="js-consult-terms-card space-y-6 rounded-2xl border border-[#003D49]/12 bg-white p-8">
              <div>
                <div className="flex items-center gap-2.5 text-[#00555A]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#003D49]">
                    Consultation Hours
                  </h3>
                </div>
                <p className="mt-3 font-mono-tech text-base font-medium text-[#062026] tabular-nums">
                  {CONSULTATION_POLICIES.hours.schedule}
                </p>
                <p className="mt-1 text-sm text-[#456066]">
                  {CONSULTATION_POLICIES.hours.days} · {CONSULTATION_POLICIES.hours.closed}
                </p>
              </div>

              <div className="border-t border-[#003D49]/10 pt-6">
                <div className="flex items-center gap-2.5 text-[#00555A]">
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#003D49]">
                    Accepted Payment Methods
                  </h3>
                </div>
                <p className="mt-3 text-sm text-[#223F45]">
                  All consultations are paid in advance. Payment instructions are shared directly
                  during the WhatsApp discussion for:
                </p>
                <ul className="mt-3 space-y-1.5 text-sm font-medium text-[#003D49]">
                  {CONSULTATION_POLICIES.paymentMethods.map((method) => (
                    <li key={method} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00555A]" aria-hidden="true" />
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Site Visits & Reports */}
            <div className="js-consult-terms-card space-y-6 rounded-2xl border border-[#003D49]/12 bg-white p-8">
              <div>
                <div className="flex items-center gap-2.5 text-[#00555A]">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#003D49]">Site Visits</h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#223F45]">
                  {CONSULTATION_POLICIES.siteVisits.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00555A]" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#003D49]/10 pt-6">
                <div className="flex items-center gap-2.5 text-[#00555A]">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold text-[#003D49]">
                    Written Reports (Where Applicable)
                  </h3>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-[#223F45]">
                  {CONSULTATION_POLICIES.reports.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00555A]" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-xl bg-[#F5F8F8] p-4 border border-[#003D49]/10">
                  <p className="font-display text-xs font-bold text-[#003D49]">
                    {SAMPLE_REPORT.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#456066]">
                    {SAMPLE_REPORT.description}
                  </p>
                  <div className="mt-3">
                    {SAMPLE_REPORT.pdfUrl ? (
                      <a
                        href={SAMPLE_REPORT.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00555A] underline underline-offset-4 hover:text-[#003D49]"
                      >
                        <span>Download Redacted Sample PDF</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <a
                        href={buildWhatsAppUrl(SAMPLE_REPORT.whatsappRequestMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00555A] underline underline-offset-4 hover:text-[#003D49]"
                      >
                        <span>Request Redacted Sample Report via WhatsApp</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Policy Conditions (Prominent, Legible, Transparent) */}
          <div className="js-consult-policy-box mt-8 rounded-2xl bg-[#003D49] p-8 text-[#F5F8F8] sm:p-10">
            <h3 className="font-display text-xl font-bold text-[#D5FF38]">
              Important Consultation Policies
            </h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONSULTATION_POLICIES.terms.map((term) => (
                <div
                  key={term}
                  className="js-consult-policy-item border-t border-[#C5DFE8]/20 pt-3 text-sm leading-relaxed text-[#F5F8F8]/95"
                >
                  {term}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
