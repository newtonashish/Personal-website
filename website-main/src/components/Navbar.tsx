import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ORCID_URL } from '../data/practiceData';
import { TRANSLATIONS, type Language, type SitePage } from '../data/translations';

type FlyoutKey = 'practice' | 'care' | 'research';

interface NavbarProps {
  language: Language;
  activePage: SitePage;
  onNavigate: (page: SitePage, anchor?: string) => void;
  onOpenWhatsAppDrawer: () => void;
}

export function Navbar({
  language,
  activePage,
  onNavigate,
  onOpenWhatsAppDrawer,
}: NavbarProps) {
  const [openFlyout, setOpenFlyout] = useState<FlyoutKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<FlyoutKey | null>('care');
  const headerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const copy = TRANSLATIONS[language];
  const flyoutData = copy.nav.flyout;

  const topLinks: {
    key: 'home' | FlyoutKey;
    label: string;
    page: SitePage;
    hasFlyout: boolean;
  }[] = [
    { key: 'home', label: copy.nav.home, page: 'home', hasFlyout: false },
    { key: 'practice', label: copy.nav.practice, page: 'practice', hasFlyout: true },
    { key: 'care', label: copy.nav.services, page: 'care', hasFlyout: true },
    { key: 'research', label: copy.nav.research, page: 'research', hasFlyout: true },
  ];

  function clearCloseTimer() {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenFlyout(null);
    }, 140);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpenFlyout(null);
        setMobileOpen(false);
      }
    }

    function handlePointerDown(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenFlyout(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
      clearCloseTimer();
    };
  }, []);

  function handleSelectPage(page: SitePage, anchor?: string) {
    clearCloseTimer();
    setOpenFlyout(null);
    setMobileOpen(false);
    onNavigate(page, anchor);
  }

  function handleQuickAction(action: 'appointment' | 'whatsapp' | 'orcid') {
    setOpenFlyout(null);
    setMobileOpen(false);
    if (action === 'appointment') {
      onNavigate('appointment');
    } else if (action === 'whatsapp') {
      onOpenWhatsAppDrawer();
    }
  }

  const activeFlyoutCategory = openFlyout ? flyoutData.categories[openFlyout] : null;

  return (
    <>
      <div
        ref={headerRef}
        onMouseLeave={() => {
          if (openFlyout) scheduleClose();
        }}
        className="sticky top-0 z-40"
      >
        <header className="relative z-40 bg-[#fbfaf7]/85 backdrop-blur-xl border-b border-[#123f43]/10">
          <div className="max-w-[1100px] mx-auto px-5 sm:px-8 h-12 flex items-center justify-between gap-8">
            {/* Zone 1: Clean single-element wordmark */}
            <button
              type="button"
              onClick={() => handleSelectPage('home')}
              className="font-serif text-[17px] font-medium tracking-tight text-[#123f43] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#287873] rounded-xs"
            >
              {copy.brandName}
            </button>

            {/* Zone 2: Concise single-line Apple-style nav links with desktop flyout triggers */}
            <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
              {topLinks.map((item) => {
                const isActive = activePage === item.page;
                const isExpanded = item.hasFlyout && openFlyout === item.key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onMouseEnter={() => {
                      clearCloseTimer();
                      setOpenFlyout(item.hasFlyout ? (item.key as FlyoutKey) : null);
                    }}
                    onFocus={() => {
                      clearCloseTimer();
                      if (item.hasFlyout) {
                        setOpenFlyout(item.key as FlyoutKey);
                      } else {
                        setOpenFlyout(null);
                      }
                    }}
                    onClick={() => handleSelectPage(item.page)}
                    aria-expanded={item.hasFlyout ? isExpanded : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative h-12 inline-flex items-center text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] rounded-xs ${
                      isActive || isExpanded
                        ? 'text-[#123f43]'
                        : 'text-[#4e6462] hover:text-[#123f43]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#123f43]"
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Single primary CTA + Mobile drawer button */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleSelectPage('appointment')}
                className={`hidden md:inline-flex items-center justify-center px-4 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] ${
                  activePage === 'appointment'
                    ? 'bg-[#287873] text-white'
                    : 'bg-[#123f43] hover:bg-[#0d3135] text-white'
                }`}
              >
                {copy.nav.bookVisit}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="apple-mobile-curtain"
                aria-label={mobileOpen ? copy.nav.closeMenu : copy.nav.openMenu}
                className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873]"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Desktop Apple-style Full-Width Frosted Curtain Dropdown */}
        <AnimatePresence>
          {activeFlyoutCategory && (
            <motion.div
              key={openFlyout}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={clearCloseTimer}
              onMouseLeave={scheduleClose}
              className="hidden md:block absolute inset-x-0 top-12 z-30 bg-[#fbfaf7]/95 backdrop-blur-2xl border-b border-[#d6e2dc] shadow-lg"
            >
              <div className="max-w-[1000px] mx-auto px-8 py-9 grid grid-cols-12 gap-10">
                <div className="col-span-8">
                  <p className="text-xs font-medium text-[#607774] mb-4">
                    {flyoutData.explorePrefix} {activeFlyoutCategory.title}
                  </p>
                  <ul className="space-y-4">
                    {activeFlyoutCategory.links.map((sublink) => (
                      <li key={`${sublink.page}-${sublink.anchor ?? 'top'}`}>
                        <button
                          type="button"
                          onClick={() => handleSelectPage(sublink.page, sublink.anchor)}
                          className="group w-full text-left flex items-start justify-between gap-4 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#287873] rounded-xs"
                        >
                          <div>
                            <span className="inline-flex items-center gap-1.5 font-serif text-xl font-medium text-[#123f43] group-hover:text-[#287873] transition-colors">
                              <span>{sublink.label}</span>
                              <ChevronRight
                                className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                                aria-hidden="true"
                              />
                            </span>
                            <p className="mt-0.5 text-xs text-[#5d7370] leading-relaxed">
                              {sublink.description}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-4 border-l border-[#e3ece7] pl-8">
                  <p className="text-xs font-medium text-[#607774] mb-4">
                    {flyoutData.quickHeading}
                  </p>
                  <ul className="space-y-3">
                    {flyoutData.quickLinks.map((qLink) =>
                      qLink.action === 'orcid' ? (
                        <li key={qLink.action}>
                          <a
                            href={ORCID_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpenFlyout(null)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#263f40] hover:text-[#123f43] underline-offset-4 hover:underline transition-colors"
                          >
                            <span>{qLink.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </li>
                      ) : (
                        <li key={qLink.action}>
                          <button
                            type="button"
                            onClick={() => handleQuickAction(qLink.action)}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#263f40] hover:text-[#123f43] underline-offset-4 hover:underline transition-colors cursor-pointer"
                          >
                            <span>{qLink.label}</span>
                            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-screen translucent mobile Apple curtain */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="apple-mobile-curtain"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed inset-x-0 top-12 bottom-0 z-40 bg-[#fbfaf7]/98 backdrop-blur-xl overflow-y-auto px-6 py-6 border-t border-[#e3ebe6]"
            >
              <nav aria-label="Mobile Navigation" className="space-y-3 pb-16">
                <button
                  type="button"
                  onClick={() => handleSelectPage('home')}
                  className="w-full min-h-[44px] flex items-center justify-between font-serif text-2xl font-medium text-[#123f43] py-2 border-b border-[#e3ebe6] cursor-pointer"
                >
                  <span>{copy.nav.home}</span>
                  <ChevronRight className="w-4 h-4 text-[#607774]" aria-hidden="true" />
                </button>

                {(['practice', 'care', 'research'] as const).map((catKey) => {
                  const category = flyoutData.categories[catKey];
                  const isOpen = mobileExpanded === catKey;
                  return (
                    <div key={catKey} className="border-b border-[#e3ebe6] pb-2">
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isOpen ? null : catKey)}
                        aria-expanded={isOpen}
                        className="w-full min-h-[44px] flex items-center justify-between font-serif text-2xl font-medium text-[#123f43] py-2 cursor-pointer"
                      >
                        <span>{category.title}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-[#607774] transition-transform ${
                            isOpen ? 'rotate-90' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <ul className="pl-2 pb-2 space-y-1">
                          {category.links.map((link) => (
                            <li key={`${link.page}-${link.anchor ?? 'root'}`}>
                              <button
                                type="button"
                                onClick={() => handleSelectPage(link.page, link.anchor)}
                                className="w-full min-h-[44px] flex items-center justify-between px-2 py-2 text-left text-sm font-medium text-[#3b5754] hover:text-[#123f43] hover:bg-[#edf5f1] rounded-md transition-colors cursor-pointer"
                              >
                                <span>{link.label}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-[#7a928f]" aria-hidden="true" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handleSelectPage('appointment')}
                    className="w-full min-h-[44px] inline-flex items-center justify-center bg-[#123f43] hover:bg-[#0d3135] text-white text-sm font-medium px-5 py-3 rounded-md transition-colors cursor-pointer"
                  >
                    {copy.nav.bookVisit}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Frosted backdrop dimmer behind open desktop flyout */}
      <AnimatePresence>
        {openFlyout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setOpenFlyout(null)}
            aria-hidden="true"
            className="hidden md:block fixed inset-0 top-12 z-20 bg-[#0c3033]/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
