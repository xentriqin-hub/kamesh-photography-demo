import React, { useState } from 'react';

type TabType = 'gallery' | 'stories' | 'inquiry';

interface ExhibitionPlate {
  id: string;
  folioNumber: string;
  category: string;
  categoryKey: 'bridal' | 'chettinad' | 'mandapam';
  title: string;
  location: string;
  subtitle: string;
  lens: string;
  filmStock: string;
  year: string;
  image: string;
  storyExcerpt: string;
  historicalContext: string;
}

interface SubmittedInquiry {
  id: string;
  patronName: string;
  contact: string;
  eventDetails: string;
  tier: string;
  notes: string;
  submittedAt: string;
}

const HERO_BRIDAL_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBk-qUtoLqWajOKoPq98LsgkUkERS8duIrbrWE3whiQhu22w0EzTBv5nBXNXCxgxlvhSYAjFQ8sJzWY7EZmbjtorurpbF_1R8qq4tXaeXDH9b4FGJu2wzKVTXzpjmPVmqyfQAU_SSZwt0idvNGfxCQULIzQpqymc7b8hHF4jmAqrAON9emteLUBd0mIetZvCmr1fhJJPF6KYubcVq5Jt2X9nLJKZtyzK9lWYn-ahuMI5lWxWxnQ3ZE-';

const CHETTINAD_SERIES_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDdEkfI5ptrpKjDkQfz0LTcHPweRGP7-Dtg4R_yLUHjOMTVBkqycLcOTFEcCGq_D4nWvirlgWl4x-Ewvu0KZIUiqqwZXl4f4xUZ5VLHjU11jArIBu2mYQt1vmt3X8SsB2RPsWWli80RaZJLQPSVyCUUa14hXXR3tZ6p6u6crR9uZ6kRYSfBENoIEmtnOB8SF5Q6fdzMwEE2Oj8TwA5AaEcef9vjx4RUIGMxxsgvkgx0IdoNtarEiKNf';

const ARCHIVAL_PLATES: ExhibitionPlate[] = [
  {
    id: 'folio-04',
    folioNumber: 'Folio № 04',
    category: 'Plates & Portraits',
    categoryKey: 'bridal',
    title: 'Traditional Kanchipuram Bridal Series, Dindigul',
    location: 'Dindigul',
    subtitle: 'Temple Mandapam ambient light · Handcrafted silks & heirloom jewels',
    lens: '50mm · ƒ/1.4',
    filmStock: 'Medium Format · Kodak Portra 400 Emulation',
    year: 'Autumn 2024',
    image: HERO_BRIDAL_IMAGE,
    storyExcerpt:
      'Captured during the quiet Brahma Muhurtham hour inside an ancestral granite mandapam in Dindigul. The handwoven korvai crimson Kanchipuram silk catches the first oil-lamp glow.',
    historicalContext:
      'Traditional South Indian bridal portraiture rooted in temple architectural symmetry, featuring antique Kempu and Oddiyanam gold smithery passed down through four generations.'
  },
  {
    id: 'folio-07',
    folioNumber: 'Folio № 07',
    category: 'Signature Archival',
    categoryKey: 'chettinad',
    title: 'The Chettinad Series — Athangudi Courtyard',
    location: 'Karaikudi & Dindigul',
    subtitle: 'Burmese teak pillars · Golden hour incense mist · 35mm & 120mm',
    lens: '80mm · ƒ/2.0',
    filmStock: '120mm Medium Format · Warm Sepia Split',
    year: 'Winter 2024',
    image: CHETTINAD_SERIES_IMAGE,
    storyExcerpt:
      'Seated on an intricately carved nineteenth-century rosewood swing within a Chettinad Valavu courtyard, surrounded by sacred turmeric rituals and family elders.',
    historicalContext:
      'Chettinad mansions are renowned for their open central courtyards (Valavu) that channel directional overhead light, creating chiaroscuro depth reminiscent of classical portraiture.'
  },
  {
    id: 'folio-09',
    folioNumber: 'Folio № 09',
    category: 'Sacred Rituals',
    categoryKey: 'mandapam',
    title: 'Muhurtham at Abirami Amman Sanctum, Dindigul',
    location: 'Dindigul Fort Foothills',
    subtitle: 'Vedic fire light · Jasmine garlands & heirloom mango mala',
    lens: '35mm · ƒ/1.4',
    filmStock: '35mm Archival Monochrome & Warm Bronze',
    year: 'Season 2025',
    image: HERO_BRIDAL_IMAGE,
    storyExcerpt:
      'An intimate documentation of the Mangalsutra tying ceremony as temple nadhaswaram echoes across the stone corridors at dawn.',
    historicalContext:
      'Documented with zero artificial flash to honor the sanctity of the Vedic ceremony and preserve the authentic warmth of ghee lamps.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isPatronDrawerOpen, setIsPatronDrawerOpen] = useState(false);
  const [lightboxPlate, setLightboxPlate] = useState<ExhibitionPlate | null>(null);
  const [savedPlateIds, setSavedPlateIds] = useState<string[]>(['folio-04']);

  // Folio Modal Quick Form state
  const [quickPatronName, setQuickPatronName] = useState('');
  const [quickEventDate, setQuickEventDate] = useState('');
  const [quickDestination, setQuickDestination] = useState('');
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);

  // Inquiry Tab State
  const [selectedTierId, setSelectedTierId] = useState<1 | 2>(1);
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [aestheticNotes, setAestheticNotes] = useState('');
  const [isTransmittingProposal, setIsTransmittingProposal] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);

  // Stories Tab Filter State
  const [storyFilter, setStoryFilter] = useState<'all' | 'bridal' | 'chettinad' | 'mandapam'>('all');

  // Submitted Inquiries History
  const [submittedInquiries, setSubmittedInquiries] = useState<SubmittedInquiry[]>([]);

  const toggleSavePlate = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPlateIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPatronName.trim()) return;
    setIsQuickSubmitting(true);

    const newEntry: SubmittedInquiry = {
      id: `INQ-${Date.now().toString().slice(-4)}`,
      patronName: quickPatronName.trim(),
      contact: 'Private Dossier Request',
      eventDetails: `${quickEventDate || 'Season 2025–2026'} · ${quickDestination || 'Dindigul'}`,
      tier: 'Series I · Heirloom Wedding Monograph',
      notes: 'Submitted via Folio Quick Commission Sheet',
      submittedAt: 'Just now'
    };

    setTimeout(() => {
      setSubmittedInquiries((prev) => [newEntry, ...prev]);
      setIsQuickSubmitting(false);
      setIsInquiryModalOpen(false);
      setQuickPatronName('');
      setQuickEventDate('');
      setQuickDestination('');
    }, 1000);
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientContact.trim() || !eventDetails.trim()) return;
    setIsTransmittingProposal(true);

    const newEntry: SubmittedInquiry = {
      id: `INQ-${Date.now().toString().slice(-4)}`,
      patronName: clientName.trim(),
      contact: clientContact.trim(),
      eventDetails: eventDetails.trim(),
      tier:
        selectedTierId === 1
          ? 'Series I · Heirloom Wedding Monograph'
          : 'Series II · Editorial Bridal & Portraiture',
      notes: aestheticNotes.trim() || 'Direct artistic curation requested.',
      submittedAt: 'Just now'
    };

    setTimeout(() => {
      setSubmittedInquiries((prev) => [newEntry, ...prev]);
      setIsTransmittingProposal(false);
      setProposalSubmitted(true);
    }, 900);
  };

  const filteredPlates =
    storyFilter === 'all'
      ? ARCHIVAL_PLATES
      : ARCHIVAL_PLATES.filter((plate) => plate.categoryKey === storyFilter);

  const scrollToCraftSection = () => {
    const el = document.getElementById('craft-legacy-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface text-on-surface antialiased flex flex-col min-h-screen w-full selection:bg-primary/20 selection:text-primary">
      {/* TOP HEADER BAR */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-surface/88 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.08)] border-b border-primary/12">
        <div className="h-16 md:h-20 w-full max-w-[1600px] mx-auto px-margin md:px-10 lg:px-[4.5rem] flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => {
              setActiveTab('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left cursor-pointer focus:outline-none shrink-0 group"
          >
            <div className="flex items-center gap-2.5 pr-1">
              <div className="flex flex-col items-start">
                <span className="font-label-caps text-[10px] md:text-[11px] font-semibold tracking-[0.26em] text-on-surface uppercase leading-none">
                  KAMESH
                </span>
                <span className="font-label-meta text-[6.5px] md:text-[7px] tracking-[0.3em] text-outline uppercase leading-none mt-1">
                  PHOTOGRAPHY
                </span>
              </div>
              <svg
                className="w-4 h-4 text-primary/80 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <circle cx="12" cy="12" r="6.5" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <line x1="12" y1="2" x2="12" y2="5.5" />
                <line x1="12" y1="18.5" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5.5" y2="12" />
                <line x1="18.5" y1="12" x2="22" y2="12" />
              </svg>
            </div>

            <div className="h-6 w-[1px] bg-outline-variant/40" />

            <div className="flex flex-col">
              <span className="font-headline-sm text-title-editorial md:text-[22px] text-primary tracking-wide leading-none group-hover:opacity-90 transition-opacity">
                Kamesh
              </span>
              <span className="font-label-meta text-[9px] uppercase tracking-[0.25em] text-outline text-left pt-0.5">
                Dindigul
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {[
              { id: 'gallery', label: 'Folio', icon: 'filter_vintage' },
              { id: 'stories', label: 'Stories & Archives', icon: 'auto_stories' },
              { id: 'inquiry', label: 'Bespoke Inquiry', icon: 'mail' }
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-2 font-label-caps text-label-caps uppercase tracking-[0.22em] whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'text-primary'
                      : 'text-on-surface-variant/75 hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsInquiryModalOpen(true)}
              className="hidden lg:flex items-center gap-2.5 h-10 px-5 bg-surface-container-low hover:bg-primary text-on-surface hover:text-on-primary border border-primary/30 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">
                Reserve 2025–26 Date
              </span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsPatronDrawerOpen(true)}
              aria-label="Open Patron Dossier"
              className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer hover:opacity-90 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px] md:text-[20px]">
                person
              </span>
              {submittedInquiries.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-col relative w-full pt-16 md:pt-20 pb-24 md:pb-16 bg-surface min-h-screen">
        {activeTab === 'gallery' && (
          <div className="flex flex-col w-full text-on-surface">
            {/* Section 1: Hero Section */}
            <section className="relative w-full overflow-hidden bg-surface-container-lowest border-b border-primary/10">
              {/* MOBILE HERO (< md) */}
              <div className="relative w-full h-[82vh] md:hidden overflow-hidden">
                <img
                  alt="Kamesh Photography South Indian Heritage Bride"
                  className="w-full h-full object-cover object-top scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                  src={HERO_BRIDAL_IMAGE}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-black/30" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(19,19,19,0.2)_50%,rgba(14,14,14,0.8)_100%)]" />

                <div className="absolute inset-0 flex flex-col justify-end px-margin pb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-6 h-[1px] bg-primary" />
                    <span className="font-label-caps text-label-caps uppercase tracking-[0.22em] text-primary">
                      Dindigul — Est. 2012
                    </span>
                  </div>

                  <h1 className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight font-normal mb-3">
                    Kamesh
                  </h1>

                  <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] leading-relaxed mb-8">
                    Timeless moments etched in light &amp; emotion.
                  </p>

                  <button
                    type="button"
                    onClick={scrollToCraftSection}
                    className="flex items-center gap-3 pt-2 w-fit cursor-pointer group focus:outline-none"
                  >
                    <div className="relative w-8 h-[1px] bg-outline-variant/40 overflow-hidden">
                      <div className="absolute inset-0 bg-primary translate-x-[-100%] animate-[shimmer_2.4s_infinite]" />
                    </div>
                    <span className="font-label-meta text-label-meta tracking-[0.2em] text-outline group-hover:text-primary transition-colors text-[10px] uppercase">
                      Scroll to uncover
                    </span>
                  </button>
                </div>
              </div>

              {/* DESKTOP / MONITOR HERO (>= md) */}
              <div className="hidden md:grid md:grid-cols-12 w-full min-h-[calc(100vh-5rem)] max-w-[1600px] mx-auto items-stretch">
                <div className="md:col-span-5 flex flex-col justify-between py-14 lg:py-20 pl-10 lg:pl-[4.5rem] pr-8 lg:pr-12 z-10 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest to-transparent">
                  <div className="flex items-center gap-3">
                    <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-outline">
                      Archival Exhibition Monograph
                    </span>
                  </div>

                  <div className="flex flex-col my-auto py-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-10 h-[1px] bg-primary" />
                      <span className="font-label-caps text-label-caps uppercase tracking-[0.24em] text-primary">
                        Dindigul — Est. 2012
                      </span>
                    </div>

                    <h1 className="font-display-hero text-[56px] lg:text-[72px] leading-[1.08] text-on-surface tracking-tight font-normal mb-5">
                      Kamesh
                    </h1>

                    <p className="font-title-editorial italic text-xl lg:text-2xl text-primary/90 mb-4">
                      South Indian Bridal Monographs &amp; Heirloom Portraiture
                    </p>

                    <p className="font-body-lg text-body-md lg:text-body-lg text-on-surface-variant max-w-md leading-relaxed mb-10">
                      Timeless moments etched in light &amp; emotion. Preserving sacred temple rituals, handcrafted Kanchipuram silks, and ancestral courtyards across Tamil Nadu.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setIsInquiryModalOpen(true)}
                        className="h-13 px-7 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>View Proposal &amp; Inquire</span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab('stories')}
                        className="h-13 px-6 bg-surface-container-low hover:bg-surface-container-high text-on-surface border border-primary/20 font-label-caps text-label-caps uppercase tracking-[0.2em] transition-all cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Explore 35mm Stories
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={scrollToCraftSection}
                    className="flex items-center gap-4 pt-4 w-fit cursor-pointer group focus:outline-none"
                  >
                    <div className="relative w-12 h-[1px] bg-outline-variant/40 overflow-hidden">
                      <div className="absolute inset-0 bg-primary translate-x-[-100%] animate-[shimmer_2.4s_infinite]" />
                    </div>
                    <span className="font-label-meta text-label-meta tracking-[0.22em] text-outline group-hover:text-primary transition-colors text-[11px] uppercase">
                      Scroll to uncover the craft
                    </span>
                  </button>
                </div>

                <div className="md:col-span-7 relative min-h-[calc(100vh-5rem)] overflow-hidden bg-surface-container-lowest">
                  <img
                    alt="Kamesh Photography South Indian Heritage Bride"
                    className="w-full h-full object-cover object-top scale-102 hover:scale-105 transition-transform duration-1000 ease-out cursor-pointer"
                    onClick={() => setLightboxPlate(ARCHIVAL_PLATES[0])}
                    referrerPolicy="no-referrer"
                    src={HERO_BRIDAL_IMAGE}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/20 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/25 pointer-events-none" />

                  <div className="absolute bottom-8 right-10 lg:right-[4.5rem] bg-surface-container-lowest/85 backdrop-blur-md border border-primary/20 px-5 py-3.5 flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="font-label-caps text-[10px] text-primary uppercase tracking-[0.2em]">
                        Plate № 04 · Kanchipuram Series
                      </span>
                      <span className="font-title-editorial italic text-sm text-on-surface">
                        Temple Mandapam Ambient Light, Dindigul
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightboxPlate(ARCHIVAL_PLATES[0])}
                      className="w-9 h-9 border border-primary/25 flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                      aria-label="Inspect full resolution plate"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_full
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Details & Legacy */}
            <section
              id="craft-legacy-section"
              className="relative w-full max-w-[1600px] mx-auto px-margin md:px-10 lg:px-[4.5rem] py-space-lg lg:py-24 bg-surface flex flex-col lg:grid lg:grid-cols-12 gap-space-lg lg:gap-12 items-start"
            >
              <div className="w-full lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-28">
                <div className="flex flex-col gap-space-xs">
                  <h2 className="font-headline-lg-mobile lg:text-headline-lg text-headline-lg-mobile text-on-surface">
                    The Craft &amp; Legacy
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-light mt-2 leading-relaxed">
                    Crafting intimate bridal monographs, heirloom weddings, and timeless portraiture across Tamil Nadu and South India.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-space-sm">
                  <div className="bg-surface-container-low p-space-md rounded-DEFAULT flex items-center justify-between shadow-sm border border-primary/10">
                    <div className="flex flex-col">
                      <span className="font-headline-md text-headline-md text-primary font-light tabular-nums">
                        12+
                      </span>
                      <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest mt-0.5">
                        Years of Storytelling
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-outline/40 text-[24px]">
                      history_edu
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-space-sm">
                    <div className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col justify-between shadow-sm border border-primary/10">
                      <span className="font-headline-md text-headline-md text-primary font-light tabular-nums">
                        850+
                      </span>
                      <div className="flex flex-col mt-2">
                        <span className="font-label-caps text-[10px] leading-tight text-outline uppercase tracking-wider">
                          Heirloom
                        </span>
                        <span className="font-label-caps text-[10px] leading-tight text-on-surface-variant uppercase tracking-wider">
                          Weddings
                        </span>
                      </div>
                    </div>

                    <div className="bg-surface-container-low p-space-md rounded-DEFAULT flex flex-col justify-between shadow-sm border border-primary/10">
                      <span className="material-symbols-outlined text-primary text-[22px] mb-1">
                        travel_explore
                      </span>
                      <div className="flex flex-col mt-2">
                        <span className="font-label-caps text-[10px] leading-tight text-outline uppercase tracking-wider">
                          Dindigul &amp;
                        </span>
                        <span className="font-label-caps text-[10px] leading-tight text-on-surface-variant uppercase tracking-wider">
                          Global Excursions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col gap-4 pt-2">
                  <button
                    className="w-full h-14 bg-surface-container-high hover:bg-primary text-on-surface hover:text-on-primary transition-all duration-300 rounded-DEFAULT flex items-center justify-between px-space-md group cursor-pointer shadow-sm"
                    onClick={() => setIsInquiryModalOpen(true)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary group-hover:bg-on-primary transition-colors" />
                      <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase transition-colors">
                        View Proposal &amp; Inquire
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-primary text-[20px] group-hover:text-on-primary group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-outline text-[14px]">
                      lock
                    </span>
                    <span className="font-label-meta text-[11px] text-outline tracking-wider">
                      Strictly limited to 24 bespoke commissions annually
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:col-span-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md">
                <div
                  onClick={() => setLightboxPlate(ARCHIVAL_PLATES[0])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLightboxPlate(ARCHIVAL_PLATES[0]);
                    }
                  }}
                  className="md:col-span-1 lg:col-span-7 bg-surface-container-low p-space-sm lg:p-5 rounded-DEFAULT shadow-md flex flex-col gap-space-xs cursor-pointer group border border-primary/10"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-DEFAULT bg-surface-container-lowest">
                    <img
                      alt="Traditional Kanchipuram Bridal Series, Dindigul"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      src={HERO_BRIDAL_IMAGE}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-space-sm right-space-sm bg-surface-container-highest/80 backdrop-blur-md px-2.5 py-1 rounded-DEFAULT">
                      <span className="font-label-meta text-[10px] text-primary tracking-widest uppercase">
                        Folio № 04
                      </span>
                    </div>
                  </div>

                  <div className="pt-space-xs px-space-xs flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                        Plates &amp; Portraits
                      </span>
                      <span className="font-label-meta text-label-meta text-outline">
                        50mm · ƒ/1.4
                      </span>
                    </div>
                    <p className="font-title-editorial text-title-editorial text-on-surface font-normal">
                      Traditional Kanchipuram Bridal Series, Dindigul
                    </p>
                    <span className="font-label-meta text-[11px] text-on-surface-variant/70 tracking-wider pt-0.5">
                      Temple Mandapam ambient light · Handcrafted silks &amp; heirloom jewels
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => setLightboxPlate(ARCHIVAL_PLATES[1])}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLightboxPlate(ARCHIVAL_PLATES[1]);
                    }
                  }}
                  className="hidden md:flex md:col-span-1 lg:col-span-5 bg-surface-container-low p-space-sm lg:p-5 rounded-DEFAULT shadow-md flex-col justify-between gap-space-xs cursor-pointer group border border-primary/10 lg:mt-16"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-DEFAULT bg-surface-container-lowest">
                    <img
                      alt="The Chettinad Series, Dindigul"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      src={CHETTINAD_SERIES_IMAGE}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-space-sm right-space-sm bg-surface-container-highest/80 backdrop-blur-md px-2.5 py-1 rounded-DEFAULT">
                      <span className="font-label-meta text-[10px] text-primary tracking-widest uppercase">
                        Folio № 07
                      </span>
                    </div>
                  </div>

                  <div className="pt-space-xs px-space-xs flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                        Signature Archival
                      </span>
                      <span className="font-label-meta text-label-meta text-outline">
                        80mm · ƒ/2.0
                      </span>
                    </div>
                    <p className="font-title-editorial text-title-editorial text-on-surface font-normal">
                      The Chettinad Series — Athangudi Courtyard
                    </p>
                    <span className="font-label-meta text-[11px] text-on-surface-variant/70 tracking-wider pt-0.5">
                      Dindigul &amp; Karaikudi · 35mm &amp; 120mm Medium Format
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:hidden pt-space-xs pb-space-sm flex flex-col gap-4">
                <button
                  className="w-full h-14 bg-surface-container-high active:bg-primary hover:bg-surface-container-highest transition-all duration-300 rounded-DEFAULT flex items-center justify-between px-space-md group cursor-pointer shadow-sm"
                  onClick={() => setIsInquiryModalOpen(true)}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary group-active:bg-on-primary transition-colors" />
                    <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase text-on-surface group-active:text-on-primary transition-colors">
                      View Proposal &amp; Inquire
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[20px] group-active:text-on-primary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </button>
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-outline text-[14px]">
                    lock
                  </span>
                  <span className="font-label-meta text-[11px] text-outline tracking-wider">
                    Strictly limited to 24 bespoke commissions annually
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="flex flex-col w-full text-on-surface">
            <div className="w-full bg-surface-container-low/40 border-b border-outline-variant/20">
              <div className="max-w-[1600px] mx-auto px-margin md:px-10 lg:px-[4.5rem] py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[14px]">
                    auto_stories
                  </span>
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.2em]">
                    Archival Monographs
                  </span>
                </div>
                <span className="font-label-meta text-label-meta text-outline">
                  Dindigul · Chettinad · Madurai
                </span>
              </div>
            </div>

            <div className="w-full max-w-[1600px] mx-auto px-margin md:px-10 lg:px-[4.5rem]">
              <header className="pt-space-md lg:pt-12 pb-space-sm flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-[0.25em]">
                      Exhibition Index
                    </span>
                    <span className="h-px w-6 bg-outline-variant/40" />
                  </div>
                  <h1 className="font-headline-lg-mobile lg:text-headline-lg text-headline-lg-mobile text-on-surface tracking-tight">
                    Visual Stories &amp; Plates
                  </h1>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant font-light max-w-md">
                  Intimate wedding essays and fine-art silver halide &amp; medium-format studies preserved by Kamesh across South India.
                </p>
              </header>

              <div className="py-space-sm flex items-center gap-6 overflow-x-auto border-b border-outline-variant/25">
                {[
                  { key: 'all', label: 'All Plates', count: '03' },
                  { key: 'bridal', label: 'Kanchipuram Bridal', count: '01' },
                  { key: 'chettinad', label: 'Chettinad Courtyards', count: '01' },
                  { key: 'mandapam', label: 'Sacred Rituals', count: '01' }
                ].map((item) => {
                  const active = storyFilter === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setStoryFilter(item.key as 'all' | 'bridal' | 'chettinad' | 'mandapam')
                      }
                      className={`py-1.5 font-label-caps text-label-caps uppercase tracking-[0.18em] whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-baseline gap-1.5 ${
                        active
                          ? 'text-primary border-b border-primary'
                          : 'text-outline hover:text-on-surface-variant'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="font-title-editorial italic text-[11px] opacity-80">
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <section className="py-space-md lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg lg:gap-8">
                {filteredPlates.map((plate) => {
                  const isSaved = savedPlateIds.includes(plate.id);
                  return (
                    <article
                      key={plate.id}
                      className="bg-surface-container-low p-space-sm lg:p-4 rounded-DEFAULT shadow-md flex flex-col justify-between gap-space-sm border border-primary/10"
                    >
                      <div
                        onClick={() => setLightboxPlate(plate)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setLightboxPlate(plate);
                          }
                        }}
                        className="relative w-full aspect-[4/5] overflow-hidden rounded-DEFAULT bg-surface-container-lowest cursor-pointer group"
                      >
                        <img
                          alt={plate.title}
                          src={plate.image}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/85 via-transparent to-black/20" />

                        <div className="absolute top-space-sm left-space-sm right-space-sm flex items-center justify-between">
                          <div className="bg-surface-container-highest/80 backdrop-blur-md px-2.5 py-1 rounded-DEFAULT">
                            <span className="font-label-meta text-[10px] text-primary tracking-widest uppercase">
                              {plate.folioNumber}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => toggleSavePlate(plate.id, e)}
                            aria-label="Bookmark plate to Patron Dossier"
                            className="w-9 h-9 rounded-DEFAULT bg-surface-container-highest/80 backdrop-blur-md flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {isSaved ? 'bookmark_added' : 'bookmark_border'}
                            </span>
                          </button>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <span className="font-label-meta text-[11px] text-on-surface-variant bg-surface-container-lowest/75 backdrop-blur-sm px-2.5 py-1 rounded-DEFAULT">
                            {plate.location} · {plate.year}
                          </span>
                          <span className="font-label-caps text-[10px] uppercase tracking-widest text-primary bg-surface-container-lowest/75 backdrop-blur-sm px-2.5 py-1 rounded-DEFAULT flex items-center gap-1">
                            <span>Inspect</span>
                            <span className="material-symbols-outlined text-[13px]">
                              open_in_full
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="px-space-xs pt-1 pb-space-xs flex flex-col gap-2 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                            {plate.category}
                          </span>
                          <span className="font-label-meta text-label-meta text-outline">
                            {plate.lens}
                          </span>
                        </div>

                        <h2 className="font-title-editorial text-title-editorial text-on-surface font-normal">
                          {plate.title}
                        </h2>

                        <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed">
                          {plate.storyExcerpt}
                        </p>

                        <div className="pt-3 mt-auto border-t border-outline-variant/25 flex items-center justify-between">
                          <span className="font-label-meta text-[11px] text-outline truncate max-w-[55%]">
                            {plate.filmStock}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setEventDetails(
                                `${plate.location} · Inspired by ${plate.folioNumber}`
                              );
                              setActiveTab('inquiry');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="font-title-editorial italic text-sm text-primary hover:underline flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <span>Commission Series</span>
                            <span>→</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </div>
          </div>
        )}

        {activeTab === 'inquiry' && (
          <div className="flex flex-col w-full text-on-surface">
            <div className="w-full bg-surface-container-low/40 border-b border-outline-variant/20">
              <div className="max-w-[1600px] mx-auto px-margin md:px-10 lg:px-[4.5rem] py-space-sm flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">
                    Season 2025 – 2026
                  </span>
                </div>
                <span className="font-label-meta text-label-meta text-outline">
                  Limited Dates / Tamil Nadu
                </span>
              </div>
            </div>

            <div className="w-full max-w-[1600px] mx-auto lg:px-[4.5rem] md:px-10 lg:py-12 flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 items-start">
              <div className="w-full lg:col-span-5 flex flex-col">
                <header className="px-margin md:px-0 pt-space-md lg:pt-0 pb-space-sm flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-[0.25em]">
                      Folio Commission
                    </span>
                    <span className="h-px w-6 bg-outline-variant/40" />
                  </div>
                  <h1 className="font-headline-lg-mobile lg:text-headline-lg text-headline-lg-mobile text-primary tracking-tight">
                    Bespoke Commissions
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light">
                    Select your preferred experience to receive a tailored monograph proposal.
                  </p>
                </header>

                <section className="px-margin md:px-0 my-space-sm">
                  <div
                    onClick={() => setLightboxPlate(ARCHIVAL_PLATES[1])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setLightboxPlate(ARCHIVAL_PLATES[1]);
                      }
                    }}
                    className="relative w-full rounded-xl bg-surface-container-low p-space-xs overflow-hidden shadow-xl cursor-pointer group"
                  >
                    <div className="relative h-60 lg:h-72 w-full overflow-hidden rounded-lg">
                      <img
                        alt="The Chettinad Series — South Indian Heritage Bride"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        src={CHETTINAD_SERIES_IMAGE}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                        <div className="flex flex-col">
                          <span className="font-label-caps text-[10px] text-primary uppercase tracking-[0.2em]">
                            Signature Archival
                          </span>
                          <span className="font-title-editorial text-body-lg text-on-surface italic">
                            The Chettinad Series
                          </span>
                        </div>
                        <span className="font-label-meta text-label-meta text-outline px-2 py-0.5 rounded bg-surface-container-highest/80 backdrop-blur-md">
                          Dindigul • 35mm &amp; 120mm
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="px-margin md:px-0 py-space-sm flex flex-col gap-space-sm">
                  <div className="flex justify-between items-baseline">
                    <h2 className="font-title-editorial text-title-editorial text-on-surface font-normal">
                      Select Experience
                    </h2>
                    <span className="font-label-meta text-label-meta text-outline tabular-nums">
                      Option 0{selectedTierId} of 02
                    </span>
                  </div>

                  <div
                    onClick={() => setSelectedTierId(1)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedTierId(1);
                    }}
                    className={`group cursor-pointer relative p-space-md rounded-xl transition-all duration-300 ${
                      selectedTierId === 1
                        ? 'bg-surface-container-high shadow-md'
                        : 'bg-surface-container-low shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-label-caps text-label-caps uppercase tracking-[0.18em] ${
                              selectedTierId === 1 ? 'text-secondary' : 'text-outline'
                            }`}
                          >
                            Series I
                          </span>
                          <span className="text-outline/40 text-xs">•</span>
                          <span className="font-label-meta text-label-meta text-outline">
                            Full Narrative
                          </span>
                        </div>
                        <h3
                          className={`font-headline-sm text-headline-sm tracking-normal transition-colors ${
                            selectedTierId === 1
                              ? 'text-primary'
                              : 'text-on-surface group-hover:text-primary'
                          }`}
                        >
                          Heirloom Wedding Monograph
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant font-light mt-1">
                          Complete traditional coverage, pre-wedding rituals, cinematic highlight reel, and custom hand-bound Florentine leather album.
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          selectedTierId === 1 ? 'bg-primary' : 'bg-surface-variant'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] font-bold ${
                            selectedTierId === 1 ? 'text-on-primary' : 'text-transparent'
                          }`}
                        >
                          check
                        </span>
                      </div>
                    </div>
                    <div className="mt-space-sm pt-space-xs flex items-center gap-4 text-outline font-label-meta text-label-meta">
                      <span className="flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-[14px] ${
                            selectedTierId === 1 ? 'text-secondary' : 'text-outline'
                          }`}
                        >
                          camera_roll
                        </span>{' '}
                        3-Day Presence
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-[14px] ${
                            selectedTierId === 1 ? 'text-secondary' : 'text-outline'
                          }`}
                        >
                          auto_stories
                        </span>{' '}
                        120-Page Book
                      </span>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedTierId(2)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedTierId(2);
                    }}
                    className={`group cursor-pointer relative p-space-md rounded-xl transition-all duration-300 ${
                      selectedTierId === 2
                        ? 'bg-surface-container-high shadow-md'
                        : 'bg-surface-container-low shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-label-caps text-label-caps uppercase tracking-[0.18em] ${
                              selectedTierId === 2 ? 'text-secondary' : 'text-outline'
                            }`}
                          >
                            Series II
                          </span>
                          <span className="text-outline/40 text-xs">•</span>
                          <span className="font-label-meta text-label-meta text-outline">
                            Intimate Session
                          </span>
                        </div>
                        <h3
                          className={`font-headline-sm text-headline-sm tracking-normal transition-colors ${
                            selectedTierId === 2
                              ? 'text-primary'
                              : 'text-on-surface group-hover:text-primary'
                          }`}
                        >
                          Editorial Bridal &amp; Portraiture
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant font-light mt-1">
                          Signature natural light composition, private heritage courtyards, hand-printed archival fine art proofs curated in Dindigul.
                        </p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          selectedTierId === 2 ? 'bg-primary' : 'bg-surface-variant'
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[16px] font-bold ${
                            selectedTierId === 2 ? 'text-on-primary' : 'text-transparent'
                          }`}
                        >
                          check
                        </span>
                      </div>
                    </div>
                    <div className="mt-space-sm pt-space-xs flex items-center gap-4 text-outline font-label-meta text-label-meta">
                      <span className="flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-[14px] ${
                            selectedTierId === 2 ? 'text-secondary' : 'text-outline'
                          }`}
                        >
                          wb_twilight
                        </span>{' '}
                        Heritage Golden Hour
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className={`material-symbols-outlined text-[14px] ${
                            selectedTierId === 2 ? 'text-secondary' : 'text-outline'
                          }`}
                        >
                          photo_prints
                        </span>{' '}
                        20 Museum Proofs
                      </span>
                    </div>
                  </div>
                </section>
              </div>

              <section className="w-full lg:col-span-7 px-margin md:px-0 mt-space-md lg:mt-0 pb-space-lg flex flex-col gap-space-md">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.2em]">
                      Inquiry Form
                    </span>
                  </div>
                  <h2 className="font-headline-sm lg:text-headline-md text-headline-sm text-on-surface">
                    Your Nuptial Canvas
                  </h2>
                  <p className="font-body-sm lg:text-body-md text-body-sm text-on-surface-variant font-light">
                    Share the intimate contour of your celebration. Every commission receives Kamesh’s direct artistic curation.
                  </p>
                </div>

                {!proposalSubmitted ? (
                  <form
                    className="flex flex-col gap-space-md bg-surface-container-low p-space-md lg:p-8 rounded-xl shadow-lg border border-primary/10"
                    onSubmit={handleProposalSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                          htmlFor="client-name"
                        >
                          Patron&apos;s Full Name *
                        </label>
                        <div className="relative flex items-center bg-surface-container-high rounded-lg px-space-sm py-2.5">
                          <input
                            className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline/50 focus:outline-none"
                            id="client-name"
                            placeholder="e.g. Priyadarshini & Anand"
                            required
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                          />
                          <span className="material-symbols-outlined text-outline text-[18px]">
                            person
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label
                          className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                          htmlFor="client-contact"
                        >
                          WhatsApp &amp; Direct Phone *
                        </label>
                        <div className="relative flex items-center bg-surface-container-high rounded-lg px-space-sm py-2.5">
                          <input
                            className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline/50 focus:outline-none tracking-wide"
                            id="client-contact"
                            placeholder="+91 98421 •••••"
                            required
                            type="tel"
                            value={clientContact}
                            onChange={(e) => setClientContact(e.target.value)}
                          />
                          <span className="material-symbols-outlined text-outline text-[18px]">
                            chat
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                        htmlFor="event-details"
                      >
                        Event Dates &amp; Heritage Venue *
                      </label>
                      <div className="relative flex items-center bg-surface-container-high rounded-lg px-space-sm py-2.5">
                        <input
                          className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline/50 focus:outline-none"
                          id="event-details"
                          placeholder="e.g. Nov 2025 • Chettinad Palace / Madurai"
                          required
                          type="text"
                          value={eventDetails}
                          onChange={(e) => setEventDetails(e.target.value)}
                        />
                        <span className="material-symbols-outlined text-outline text-[18px]">
                          calendar_month
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider"
                        htmlFor="aesthetic-notes"
                      >
                        Aesthetic Desires &amp; Specific Rituals
                      </label>
                      <div className="relative bg-surface-container-high rounded-lg px-space-sm py-2.5">
                        <textarea
                          className="w-full bg-transparent text-on-surface font-body-sm text-body-sm placeholder:text-outline/50 focus:outline-none resize-none"
                          id="aesthetic-notes"
                          placeholder="Tell us about the families, heirloom saree palettes, or temple architecture nuances..."
                          rows={4}
                          value={aestheticNotes}
                          onChange={(e) => setAestheticNotes(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      className={`w-full mt-2 py-3.5 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-caps text-label-caps uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] cursor-pointer ${
                        isTransmittingProposal ? 'opacity-75' : ''
                      }`}
                      disabled={isTransmittingProposal}
                      type="submit"
                    >
                      {isTransmittingProposal ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-[18px]">
                            progress_activity
                          </span>
                          <span>Transmitting Folio...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Private Proposal</span>
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>

                    <p className="font-label-meta text-[11px] text-center text-outline">
                      Strict privacy guaranteed. We personally review each wedding date within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="flex flex-col gap-space-sm p-space-md lg:p-8 rounded-xl bg-surface-container-highest shadow-xl">
                    <div className="flex items-center gap-2 text-secondary">
                      <span className="material-symbols-outlined text-[20px]">
                        verified
                      </span>
                      <span className="font-label-caps text-label-caps uppercase tracking-widest">
                        Inquiry Received with Honour
                      </span>
                    </div>
                    <p className="font-body-sm lg:text-body-md text-body-sm text-on-surface font-light">
                      Thank you, <span className="text-primary">{clientName}</span>. Kamesh and our studio director have reserved your transmission for{' '}
                      <span className="text-on-surface-variant">{eventDetails}</span>. A private PDF proposal and bespoke quotation will be dispatched to your WhatsApp shortly.
                    </p>
                    <div className="pt-2 flex items-center justify-between border-t border-outline-variant/30">
                      <button
                        type="button"
                        onClick={() => {
                          setProposalSubmitted(false);
                          setClientName('');
                          setClientContact('');
                          setEventDetails('');
                          setAestheticNotes('');
                        }}
                        className="font-label-caps text-[10px] text-primary uppercase tracking-widest hover:underline cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsPatronDrawerOpen(true)}
                        className="font-label-meta text-[11px] text-outline hover:text-on-surface cursor-pointer"
                      >
                        View in Patron Dossier →
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-space-md lg:p-6 rounded-xl bg-surface-container-lowest flex flex-col gap-space-sm shadow-inner border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[22px]">
                        photo_camera
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-editorial text-body-lg text-primary leading-tight">
                        Master Craftsmanship
                      </span>
                      <span className="font-label-meta text-label-meta text-outline">
                        Three Decades of Tamil Nuptials
                      </span>
                    </div>
                  </div>
                  <div className="h-px w-full bg-surface-variant/40" />
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-label-meta text-label-meta text-outline">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-secondary shrink-0 pt-0.5">
                        location_on
                      </span>
                      <span>
                        Kamesh Photography Atelier, Main Bazaar Road, Near Clock Tower, Dindigul 624001, Tamil Nadu
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">
                        call
                      </span>
                      <a
                        className="hover:text-primary transition-colors text-on-surface-variant"
                        href="tel:+919842100000"
                      >
                        +91 (0451) 242 8899 / Concierge Desk
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* MODAL DIALOG */}
        <div
          className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity duration-300 flex flex-col justify-end md:justify-center md:items-center md:p-6 ${
            isInquiryModalOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsInquiryModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-xl bg-surface-container p-margin md:p-8 rounded-t-xl md:rounded-xl border border-primary/15 transition-transform duration-300 flex flex-col gap-space-md max-h-[85vh] overflow-y-auto ${
              isInquiryModalOpen
                ? 'translate-y-0 md:scale-100'
                : 'translate-y-full md:translate-y-0 md:scale-95'
            }`}
          >
            <div className="flex items-center justify-between pb-2">
              <div className="flex flex-col">
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                  Commission
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Begin a Dialogue with Kamesh
                </h3>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer hover:bg-surface-container-highest"
                onClick={() => setIsInquiryModalOpen(false)}
              >
                <span className="material-symbols-outlined text-[18px]">
                  close
                </span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant font-light">
              We preserve sacred rituals and family heritage with bespoke care. Share your dates for private calendar review.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleQuickFormSubmit}>
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                  Patron Name
                </label>
                <input
                  className="w-full bg-surface-container-low text-on-surface px-space-sm py-3 rounded-DEFAULT font-body-md text-body-md placeholder:text-outline/40 focus:outline-none focus:bg-surface-container-high transition-colors"
                  placeholder="e.g. Priyadarshini & Anand"
                  required
                  type="text"
                  value={quickPatronName}
                  onChange={(e) => setQuickPatronName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                    Event Celebration Date
                  </label>
                  <input
                    className="w-full bg-surface-container-low text-on-surface px-space-sm py-3 rounded-DEFAULT font-body-md text-body-md placeholder:text-outline/40 focus:outline-none focus:bg-surface-container-high transition-colors"
                    placeholder="November 2025"
                    type="text"
                    value={quickEventDate}
                    onChange={(e) => setQuickEventDate(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                    Heritage Destination
                  </label>
                  <input
                    className="w-full bg-surface-container-low text-on-surface px-space-sm py-3 rounded-DEFAULT font-body-md text-body-md placeholder:text-outline/40 focus:outline-none focus:bg-surface-container-high transition-colors"
                    placeholder="Dindigul, Madurai, or Destination"
                    type="text"
                    value={quickDestination}
                    onChange={(e) => setQuickDestination(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="w-full h-12 mt-2 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-widest rounded-DEFAULT hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer"
                disabled={isQuickSubmitting}
                type="submit"
              >
                {isQuickSubmitting
                  ? 'Dispatched · Gratitude'
                  : 'Dispatch Inquiry Dossier'}
              </button>
            </form>

            <div className="flex items-center justify-between pt-1 pb-2 border-t border-outline-variant/20">
              <span className="font-label-meta text-[11px] text-outline">
                Studio: Spencer Compound, Dindigul · Tamil Nadu
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsInquiryModalOpen(false);
                  setActiveTab('inquiry');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-label-caps text-[10px] text-primary uppercase tracking-widest hover:underline cursor-pointer"
              >
                Full Bespoke Form →
              </button>
            </div>
          </div>
        </div>

        {/* LIGHTBOX */}
        {lightboxPlate && (
          <div
            className="fixed inset-0 z-50 bg-[#0A0A0A]/96 backdrop-blur-xl flex flex-col justify-between p-margin md:p-10 overflow-y-auto"
            onClick={() => setLightboxPlate(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1440px] mx-auto flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-[0.2em]">
                  {lightboxPlate.folioNumber}
                </span>
                <span className="text-outline">·</span>
                <span className="font-label-meta text-label-meta text-outline">
                  {lightboxPlate.lens}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleSavePlate(lightboxPlate.id, e)}
                  className="h-9 px-3 rounded-DEFAULT border border-primary/25 text-primary font-label-caps text-[10px] uppercase tracking-widest flex items-center gap-1.5 cursor-pointer hover:bg-primary hover:text-on-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {savedPlateIds.includes(lightboxPlate.id)
                      ? 'bookmark_added'
                      : 'bookmark_border'}
                  </span>
                  <span>
                    {savedPlateIds.includes(lightboxPlate.id) ? 'Saved' : 'Save Plate'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxPlate(null)}
                  className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[1440px] mx-auto my-auto py-4 flex flex-col lg:grid lg:grid-cols-12 gap-space-md lg:gap-10 items-center"
            >
              <div className="w-full lg:col-span-8 relative max-h-[65vh] lg:max-h-[78vh] overflow-hidden rounded-DEFAULT border border-primary/20 bg-surface-container-lowest p-2">
                <img
                  alt={lightboxPlate.title}
                  src={lightboxPlate.image}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[60vh] lg:max-h-[74vh] object-contain mx-auto"
                />
              </div>

              <div className="w-full lg:col-span-4 bg-surface-container-low p-space-md lg:p-7 rounded-DEFAULT border border-primary/15 flex flex-col gap-3">
                <div className="flex items-center justify-between text-outline font-label-meta text-label-meta">
                  <span>{lightboxPlate.category}</span>
                  <span>{lightboxPlate.year}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary">
                  {lightboxPlate.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-light leading-relaxed">
                  {lightboxPlate.storyExcerpt}
                </p>
                <div className="h-px w-full bg-outline-variant/25 my-1" />
                <div className="flex flex-col gap-1 font-label-meta text-xs text-outline">
                  <span>Optics: {lightboxPlate.lens}</span>
                  <span>Medium: {lightboxPlate.filmStock}</span>
                  <span>Location: {lightboxPlate.location}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant/80 font-light leading-relaxed pt-1">
                  {lightboxPlate.historicalContext}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PATRON DOSSIER DRAWER */}
        {isPatronDrawerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end md:justify-center md:items-center md:p-6"
            onClick={() => setIsPatronDrawerOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-surface-container p-margin md:p-8 rounded-t-xl md:rounded-xl border border-primary/15 flex flex-col gap-space-md max-h-[82vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-outline-variant/25">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                    Private Collector Vault
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Kamesh Patron Dossier
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPatronDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  Bookmarked Monograph Plates ({savedPlateIds.length})
                </span>
                {savedPlateIds.length === 0 ? (
                  <p className="font-body-sm text-body-sm text-outline py-2">
                    No plates bookmarked yet. Explore Stories to curate your reference folio.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {ARCHIVAL_PLATES.filter((p) =>
                      savedPlateIds.includes(p.id)
                    ).map((plate) => (
                      <div
                        key={plate.id}
                        onClick={() => {
                          setIsPatronDrawerOpen(false);
                          setLightboxPlate(plate);
                        }}
                        className="p-2.5 rounded-DEFAULT bg-surface-container-low flex items-center justify-between gap-3 cursor-pointer hover:bg-surface-container-high transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={plate.image}
                            alt={plate.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-DEFAULT object-cover shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-caps text-[10px] text-primary uppercase tracking-widest">
                              {plate.folioNumber} · {plate.location}
                            </span>
                            <span className="font-title-editorial text-sm text-on-surface truncate">
                              {plate.title}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => toggleSavePlate(plate.id, e)}
                          className="text-outline hover:text-primary p-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            bookmark_remove
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/25">
                <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                  Dispatched Commission Inquiries ({submittedInquiries.length})
                </span>
                {submittedInquiries.length === 0 ? (
                  <p className="font-body-sm text-body-sm text-outline py-2">
                    No active commission transmissions in this session.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {submittedInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-3 rounded-DEFAULT bg-surface-container-low flex flex-col gap-1 border border-secondary/20"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest">
                            {inq.id} · {inq.tier}
                          </span>
                          <span className="font-label-meta text-[11px] text-outline">
                            {inq.submittedAt}
                          </span>
                        </div>
                        <span className="font-title-editorial text-base text-on-surface">
                          {inq.patronName}
                        </span>
                        <span className="font-label-meta text-xs text-on-surface-variant">
                          {inq.eventDetails}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="hidden md:block w-full border-t border-primary/12 bg-surface-container-lowest py-8">
        <div className="max-w-[1600px] mx-auto px-10 lg:px-[4.5rem] flex items-center justify-between text-outline font-label-meta text-xs">
          <div className="flex items-center gap-4">
            <span className="text-primary font-title-editorial text-base">
              Kamesh Photography — Dindigul
            </span>
            <span>·</span>
            <span>Archival South Indian Bridal Monographs since 2012</span>
          </div>
          <div>
            <span>Main Bazaar Road, Near Clock Tower, Dindigul 624001 · Tamil Nadu</span>
          </div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV */}
      <nav
        className="md:hidden fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.4)] border-t border-primary/10"
        data-active-classes="text-primary"
      >
        <div className="flex justify-around items-center h-16 px-margin max-w-md mx-auto">
          <button
            type="button"
            aria-current={activeTab === 'gallery' ? 'page' : undefined}
            onClick={() => {
              setActiveTab('gallery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'text-primary'
                : 'text-on-surface-variant/70 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              filter_vintage
            </span>
            <span className="font-label-caps text-[10px] uppercase tracking-widest">
              Folio
            </span>
          </button>

          <button
            type="button"
            aria-current={activeTab === 'stories' ? 'page' : undefined}
            onClick={() => {
              setActiveTab('stories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
              activeTab === 'stories'
                ? 'text-primary'
                : 'text-on-surface-variant/70 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              auto_stories
            </span>
            <span className="font-label-caps text-[10px] uppercase tracking-widest">
              Stories
            </span>
          </button>

          <button
            type="button"
            aria-current={activeTab === 'inquiry' ? 'page' : undefined}
            onClick={() => {
              setActiveTab('inquiry');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-colors cursor-pointer ${
              activeTab === 'inquiry'
                ? 'text-primary'
                : 'text-on-surface-variant/70 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
            <span className="font-label-caps text-[10px] uppercase tracking-widest">
              Inquiry
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
