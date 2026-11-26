import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/siteData';

const PAGE_WHATSAPP_MESSAGES: Record<string, string> = {
  '/consultation':
    'Hello Suhas, I am reviewing your consultation services and would like to enquire about booking a session.',
  '/about':
    'Hello Suhas, I reviewed your credentials and project background and would like to discuss a consultation.',
  '/cctv-handbook':
    'Hello Suhas, I would like to enquire about the CCTV Handbook and CCTV & Security Consultancy.',
};

export function FloatingWhatsApp() {
  const { pathname } = useLocation();
  const message =
    PAGE_WHATSAPP_MESSAGES[pathname] ??
    'Hello Suhas, I would like to enquire about booking an electrical engineering consultation.';

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Suhas Krishnan"
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#D5FF38] px-4 text-xs font-bold text-[#003D49] shadow-xl ring-1 ring-[#003D49]/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#e2ff6b] sm:bottom-6 sm:right-6 sm:px-5 sm:text-sm"
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">Chat on WhatsApp</span>
    </a>
  );
}
