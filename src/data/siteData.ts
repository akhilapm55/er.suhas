export const SITE_ASSETS = {
  portrait: '/src/assets/images/suhas_editorial_portrait_1795717449767.jpg',
  evInfrastructure: '/src/assets/images/ev_charging_infra_1795717448992.jpg',
  solarMep: '/src/assets/images/solar_mep_architecture_1795717450536.jpg',
  conventionCenter: '/src/assets/images/convention_center_architecture_1795717464799.jpg',
  cctvHandbook: '/src/assets/images/cctv_handbook_editorial_1795717450789.jpg',
} as const;

export const CONTACT_INFO = {
  name: 'Suhas Krishnan',
  role: 'Independent Electrical Engineering Consultant',
  affiliation: 'Managing Partner & EV Infra Projects Engineer, Next Watt',
  location: 'Kanhangad, Kerala',
  email: 'suhaskrishnansk@gmail.com',
  whatsappDisplay: '+91 80757 95458',
  whatsappBaseUrl: 'https://wa.me/918075795458',
  domain: 'suhaskrishnan.com',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `${CONTACT_INFO.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
}

export interface ConsultationService {
  id: 'ev' | 'solar' | 'cctv' | 'mep';
  index: string;
  title: string;
  shortTitle: string;
  priceLabel: string;
  priceUnit?: string;
  summary: string;
  includes: string[];
  importantNote?: string;
  ctaLabel: string;
  whatsappMessage: string;
  image: string;
  imageAlt: string;
}

export const CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: 'ev',
    index: '01',
    title: 'EV Charger Readiness Consultation',
    shortTitle: 'EV Charger Readiness',
    priceLabel: '₹699',
    priceUnit: 'Per Consultation',
    summary:
      'Focused technical evaluation for residential and commercial EV charger readiness, electrical load capacity, and coordinated solar considerations.',
    includes: [
      'EV charger readiness discussion tailored to your existing or planned electrical supply',
      'Basic guidance on EV charging infrastructure requirements and setup considerations',
      'Basic solar advice covered within the same consultation call',
    ],
    ctaLabel: 'Book EV Consultation',
    whatsappMessage:
      'Hello Suhas, I am interested in the EV Charger Readiness Consultation priced at ₹699. Please share the booking process.',
    image: SITE_ASSETS.evInfrastructure,
    imageAlt: 'Commercial EV fast-charging bays under a solar canopy at twilight',
  },
  {
    id: 'solar',
    index: '02',
    title: 'Solar Viability Check',
    shortTitle: 'Solar Viability',
    priceLabel: '₹999',
    priceUnit: 'Per Consultation',
    summary:
      'Independent assessment of solar viability before committing to vendors, system sizing, or rooftop investments.',
    includes: [
      'Dedicated solar viability consultation evaluating your site and energy context',
      'Initial technical guidance shaped around your specific consumption and building requirements',
    ],
    importantNote:
      'A detailed solar report is a separate paid service and is not included in the ₹999 consultation.',
    ctaLabel: 'Book Solar Consultation',
    whatsappMessage:
      'Hello Suhas, I am interested in the Solar Viability Check priced at ₹999. Please share the booking process.',
    image: SITE_ASSETS.solarMep,
    imageAlt: 'Commercial rooftop solar photovoltaic array integrated with neat electrical conduits',
  },
  {
    id: 'cctv',
    index: '03',
    title: 'CCTV & Security Consultancy',
    shortTitle: 'CCTV & Security',
    priceLabel: '₹699',
    priceUnit: 'Per Consultation',
    summary:
      'Objective security planning and surveillance architecture advice from the author of the CCTV Handbook.',
    includes: [
      'CCTV and security system consultancy focused on practical coverage and infrastructure clarity',
      'Professional guidance on system requirements, camera planning, and technical structuring',
      'Insights informed by Suhas Krishnan’s work as the author of the CCTV Handbook',
    ],
    ctaLabel: 'Book CCTV Consultation',
    whatsappMessage:
      'Hello Suhas, I am interested in the CCTV & Security Consultancy priced at ₹699. Please share the booking process.',
    image: SITE_ASSETS.cctvHandbook,
    imageAlt: 'Hardcover engineering handbook beside electrical schematic drawings and security camera lens',
  },
  {
    id: 'mep',
    index: '04',
    title: 'MEP Design Consultancy',
    shortTitle: 'MEP Design',
    priceLabel: '₹10',
    priceUnit: 'Starting at per sq. ft.',
    summary:
      'Comprehensive mechanical, electrical, and plumbing engineering consultancy structured for buildings across scales.',
    includes: [
      'Residential buildings of varying footprints and specifications',
      'Commercial developments requiring coordinated building services',
      'Industrial facilities and large-scale infrastructure projects',
    ],
    importantNote:
      'Final pricing depends on the building type and required services. ₹10 per sq. ft. is a starting indicator and not a guaranteed final price.',
    ctaLabel: 'Discuss Your MEP Project',
    whatsappMessage:
      'Hello Suhas, I would like to discuss MEP design consultancy for my project. Please share the consultation and pricing details.',
    image: SITE_ASSETS.conventionCenter,
    imageAlt: 'Contemporary large-scale convention center architectural facade with integrated building lighting',
  },
];

export const CONSULTATION_PROCESS = [
  {
    step: '01',
    title: 'Select Consultation Service',
    detail: 'Identify the advisory scope that matches your EV, solar, CCTV, or MEP requirement.',
  },
  {
    step: '02',
    title: 'Connect via WhatsApp',
    detail: 'Send the prefilled enquiry message to +91 80757 95458 to initiate the discussion.',
  },
  {
    step: '03',
    title: 'Discuss Scope & Payment Details',
    detail: 'Clarify initial requirements and receive direct advance payment instructions.',
  },
  {
    step: '04',
    title: 'Complete Advance Payment',
    detail: 'Settle the applicable consultation fee in advance via UPI, bank transfer, or arranged card payment.',
  },
  {
    step: '05',
    title: 'Confirm Consultation Schedule',
    detail: 'Lock in a convenient slot within consultation hours (Monday to Saturday, 10:00 AM to 5:00 PM).',
  },
  {
    step: '06',
    title: 'Attend the Consultation',
    detail: 'Review your site context, technical constraints, and engineering direction with Suhas Krishnan.',
  },
] as const;

export const CONSULTATION_POLICIES = {
  hours: {
    schedule: '10:00 AM to 5:00 PM',
    days: 'Monday to Saturday',
    closed: 'Sunday unavailable',
  },
  paymentMethods: ['UPI', 'Bank transfer', 'Card, where arranged'],
  siteVisits: [
    'Scheduled separately depending on availability.',
    'Free within 10 km of Kanhangad town.',
    'Beyond 10 km, travel expenses are charged at actuals.',
    'Travel charges are quoted after the initial discussion.',
  ],
  reports: [
    'Where a report is applicable, the PDF report is generally 5–10 pages.',
    'Delivery takes at least one week after the site visit.',
    'Printed reports are available at additional cost.',
  ],
  terms: [
    'All consultations are paid in advance.',
    'Consultation fees are non-refundable.',
    'Reworks are not included.',
    'Ask us about available discounts.',
    'Initiating a WhatsApp message starts an enquiry and does not confirm a booking or payment.',
  ],
} as const;

export const CREDENTIALS_TIMELINE = [
  {
    period: '2009',
    title: 'B.Tech in Electrical and Electronics Engineering',
    institution: 'Cochin University of Science and Technology (CUSAT)',
    category: 'Academic Foundation',
  },
  {
    period: '2010 – 2011',
    title: 'Sub Engineer',
    institution: 'Kerala State Electricity Board (KSEB)',
    category: 'Utility & Field Experience',
  },
  {
    period: '2011 – 2012',
    title: 'AutoCAD Certified Professional',
    institution: 'Autodesk CAD Center',
    category: 'Technical Design Certification',
  },
  {
    period: '2022',
    title: 'M.Tech in Power & Energy (Smart Grid & EV Specialization)',
    institution: 'Amrita University',
    category: 'Postgraduate Specialization',
  },
  {
    period: 'Ongoing',
    title: 'Pursuing PhD in Electric Vehicles',
    institution: 'VELS University',
    category: 'Doctoral Research',
  },
] as const;

export const PROFESSIONAL_STANDING = [
  {
    label: 'Chartered Status',
    value: 'Chartered Electrical Engineer, Institution of Engineers (India) — IEI',
  },
  {
    label: 'Practice Tenure',
    value: '16 years of electrical engineering experience, since 2010',
  },
  {
    label: 'Industry Leadership',
    value: 'Managing Partner & EV Infra Projects Engineer, Next Watt',
  },
  {
    label: 'Published Work',
    value: 'Author of the CCTV Handbook',
  },
] as const;

export interface ConfirmedProject {
  name: string;
  location: string;
  area: string;
  completion: string;
  involvement: string;
  affiliation: string;
  image: string;
  imageAlt: string;
}

/**
 * Add 3–5 additional verified projects here as Suhas supplies confirmed details & photographs.
 * Only confirmed projects should be listed.
 */
export const CONFIRMED_PROJECTS: ConfirmedProject[] = [
  {
    name: 'Paramekkavu Convention Center',
    location: 'Thrissur, Kerala',
    area: '1.5 Lakh sq. ft.',
    completion: '2026',
    involvement: 'MEP design consultancy and execution consultation',
    affiliation: 'Next Watt',
    image: SITE_ASSETS.conventionCenter,
    imageAlt:
      'Architectural representation of a large contemporary convention center in Kerala at dusk',
  },
];

export const FEATURED_PROJECT = CONFIRMED_PROJECTS[0];

/**
 * Approved one-line personal statement on "why I give independent advice" (Q28).
 * Leave `quote` empty until Suhas provides his exact approved wording.
 */
export const INDEPENDENT_ADVICE_STATEMENT = {
  quote: '',
  attribution: 'Suhas Krishnan · Independent Electrical Engineering Consultant',
} as const;

/**
 * Redacted 5–10 page sample consultation PDF (client information removed).
 * Place the PDF inside /public/reports/sample-report.pdf and set pdfUrl to '/reports/sample-report.pdf'.
 */
export const SAMPLE_REPORT = {
  pdfUrl: '',
  title: 'Redacted Sample Consultation Report (PDF)',
  description:
    '5–10 page PDF structure showing how site findings, electrical load context, and recommendations are documented with client details removed.',
  whatsappRequestMessage:
    'Hello Suhas, could you share a redacted sample consultation report to understand the report format?',
} as const;

export interface ClientTestimonial {
  quote: string;
  clientName: string;
  context: string;
}

/**
 * Collect and add verified testimonials after completed consultations.
 * Kept empty until real client feedback is received.
 */
export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [];
