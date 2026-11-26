import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO, buildWhatsAppUrl } from '../data/siteData';

export function Footer() {
  const generalWhatsApp = buildWhatsAppUrl(
    'Hello Suhas, I would like to enquire about an electrical engineering consultation.'
  );

  return (
    <footer className="bg-[#003D49] text-[#F5F8F8] border-t border-[#C5DFE8]/15">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-24 sm:px-8 lg:px-12 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Identity Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <Link
                to="/"
                className="font-display text-2xl font-bold tracking-tight text-[#F5F8F8]"
              >
                Suhas Krishnan
              </Link>
              <p className="mt-2 text-sm text-[#C5DFE8]">
                Independent Electrical Engineering Consultant · Chartered Engineer (IEI)
              </p>
              <p className="mt-1 text-xs text-[#C5DFE8]/75">
                {CONTACT_INFO.affiliation}
              </p>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-[#C5DFE8]/85">
              Advising residential, commercial, and industrial clients across EV charging
              readiness, solar viability, CCTV &amp; security planning, and MEP design
              consultancy from Kanhangad, Kerala.
            </p>

            <div className="pt-2">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-[#D5FF38] px-6 py-3 text-sm font-bold text-[#003D49] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff6b]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Enquire on WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="font-display text-xs font-semibold tracking-wider text-[#C5DFE8]/70">
              Navigation
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-[#F5F8F8]/90 transition-colors hover:text-[#D5FF38]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-[#F5F8F8]/90 transition-colors hover:text-[#D5FF38]"
                >
                  Consultation Services &amp; Fees
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#F5F8F8]/90 transition-colors hover:text-[#D5FF38]"
                >
                  About &amp; Confirmed Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/cctv-handbook"
                  className="text-[#F5F8F8]/90 transition-colors hover:text-[#D5FF38]"
                >
                  CCTV Handbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Consultation Hours Column */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="font-display text-xs font-semibold tracking-wider text-[#C5DFE8]/70">
              Direct Contact &amp; Hours
            </h2>
            <div className="space-y-3 text-sm text-[#F5F8F8]/90">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 transition-colors hover:text-[#D5FF38]"
              >
                <MessageCircle className="h-4 w-4 text-[#D5FF38]" aria-hidden="true" />
                <span className="font-mono-tech tabular-nums">{CONTACT_INFO.whatsappDisplay}</span>
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-[#D5FF38]"
              >
                <Mail className="h-4 w-4 text-[#C5DFE8]" aria-hidden="true" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>

            <div className="border-t border-[#C5DFE8]/15 pt-4 text-xs leading-relaxed text-[#C5DFE8]/80 space-y-1">
              <p className="font-medium text-[#F5F8F8]">Consultation Hours</p>
              <p className="font-mono-tech tabular-nums">Monday – Saturday · 10:00 AM to 5:00 PM</p>
              <p>Sunday unavailable · Site visits within 10 km of Kanhangad town free</p>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-[#C5DFE8]/15 pt-8 text-xs text-[#C5DFE8]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Suhas Krishnan · {CONTACT_INFO.domain}</p>
          <p>
            WhatsApp enquiries initiate scope discussion and do not constitute a confirmed booking or
            payment.
          </p>
        </div>
      </div>
    </footer>
  );
}
