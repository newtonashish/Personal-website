import { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { AppointmentSection, type BookingTab } from './components/AppointmentSection';
import { ChapterSubnav } from './components/ChapterSubnav';
import { ClinicGallery } from './components/ClinicGallery';
import { ContactFooter } from './components/ContactFooter';
import { FaqSection } from './components/FaqSection';
import { GoogleAdSlot } from './components/GoogleAdSlot';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { OralHealthQuiz } from './components/OralHealthQuiz';
import { PatientPortalSection } from './components/PatientPortalSection';
import { ResearchSection } from './components/ResearchSection';
import { SeoManager } from './components/SeoManager';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ToastNotification, type ToastState } from './components/ToastNotification';
import { WhatsAppDrawer } from './components/WhatsAppDrawer';
import {
  BOOKINGS_STORAGE_KEY,
  DEFAULT_CLINIC_WHATSAPP,
  WHATSAPP_STORAGE_KEY,
  isValidClinicWhatsApp,
  type BookingRecord,
  type BookingStatus,
} from './data/practiceData';
import {
  LANGUAGE_STORAGE_KEY,
  TRANSLATIONS,
  type AppointmentReasonKey,
  type Language,
  type SitePage,
} from './data/translations';

function resolveRouteFromHash(rawHash: string): { page: SitePage; anchor?: string } {
  const normalized = rawHash.replace(/^#\/?/, '').toLowerCase();
  if (!normalized || normalized === 'home') {
    return { page: 'home' };
  }
  if (
    normalized === 'services' ||
    normalized === 'gallery' ||
    normalized === 'testimonials' ||
    normalized === 'appointment'
  ) {
    return { page: 'home', anchor: normalized };
  }
  if (normalized === 'practice' || normalized === 'about') {
    return {
      page: 'practice',
      anchor: normalized === 'practice' ? undefined : normalized,
    };
  }
  if (normalized === 'care' || normalized === 'patient-portal' || normalized === 'oral-quiz') {
    return {
      page: 'care',
      anchor: normalized === 'care' ? undefined : normalized,
    };
  }
  if (normalized === 'research' || normalized === 'faq') {
    return {
      page: 'research',
      anchor: normalized === 'research' ? undefined : normalized,
    };
  }
  return { page: 'home' };
}

function loadStoredBookings(): BookingRecord[] {
  try {
    const raw = window.localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return saved === 'ne' ? 'ne' : 'en';
    } catch {
      return 'en';
    }
  });

  const [activePage, setActivePage] = useState<SitePage>(() =>
    resolveRouteFromHash(window.location.hash).page
  );
  const pendingAnchorRef = useRef<string | undefined>(
    resolveRouteFromHash(window.location.hash).anchor
  );

  const [bookingTab, setBookingTab] = useState<BookingTab>('book');
  const [bookings, setBookings] = useState<BookingRecord[]>(loadStoredBookings);
  const [selectedReasonKey, setSelectedReasonKey] = useState<AppointmentReasonKey | ''>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [clinicWhatsApp, setClinicWhatsApp] = useState<string>(() => {
    try {
      const saved = window.localStorage.getItem(WHATSAPP_STORAGE_KEY);
      return saved && isValidClinicWhatsApp(saved) ? saved : DEFAULT_CLINIC_WHATSAPP;
    } catch {
      return DEFAULT_CLINIC_WHATSAPP;
    }
  });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    try {
      window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Ignore storage write failure in private browsing
    }
  }, [bookings]);

  const scrollToAnchor = useCallback(
    (anchor: string) => {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    },
    [prefersReducedMotion]
  );

  useEffect(() => {
    const target = pendingAnchorRef.current;
    if (!target) return;
    pendingAnchorRef.current = undefined;
    const frameId = window.requestAnimationFrame(() => {
      scrollToAnchor(target);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [activePage, scrollToAnchor]);

  useEffect(() => {
    function handleHashChange() {
      const resolved = resolveRouteFromHash(window.location.hash);
      pendingAnchorRef.current = resolved.anchor;
      setActivePage(resolved.page);
      if (!resolved.anchor) {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [prefersReducedMotion]);

  const copy = TRANSLATIONS[language];

  const handleNavigate = useCallback(
    (page: SitePage, anchor?: string) => {
      // Appointment/booking section lives cleanly on the main conversion home journey
      const targetPage: SitePage = page === 'appointment' ? 'home' : page;
      const targetAnchor = page === 'appointment' ? 'appointment' : anchor;
      if (page === 'appointment') {
        setBookingTab('book');
      }

      const nextHash = targetAnchor
        ? `#${targetAnchor}`
        : targetPage === 'home'
          ? '#home'
          : `#/${targetPage}`;

      if (window.location.hash !== nextHash) {
        window.history.pushState(null, '', nextHash);
      }

      if (targetPage === activePage) {
        if (targetAnchor) {
          scrollToAnchor(targetAnchor);
        } else {
          window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
        return;
      }

      pendingAnchorRef.current = targetAnchor;
      setActivePage(targetPage);
      if (!targetAnchor) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    [activePage, prefersReducedMotion, scrollToAnchor]
  );

  function handleChangeLanguage(nextLanguage: Language) {
    if (nextLanguage === language) return;
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Ignore storage write restriction in private mode
    }
    const nextToasts = TRANSLATIONS[nextLanguage].toasts;
    setToast({
      id: Date.now(),
      title: nextToasts.languageSwitchedTitle,
      description: nextToasts.languageSwitchedDesc,
    });
  }

  function handleUpdateClinicWhatsApp(nextNumber: string) {
    setClinicWhatsApp(nextNumber);
    try {
      window.localStorage.setItem(WHATSAPP_STORAGE_KEY, nextNumber);
    } catch {
      // Ignore storage write restriction in private mode
    }
    setToast({
      id: Date.now(),
      title: copy.toasts.numberSavedTitle,
      description: copy.toasts.numberSavedDesc,
    });
  }

  function handleSelectService(reasonKey: AppointmentReasonKey) {
    setSelectedReasonKey(reasonKey);
    setBookingTab('book');
    handleNavigate('home', 'appointment');
  }

  function handleOpenManageBookings() {
    setBookingTab('manage');
    handleNavigate('home', 'appointment');
  }

  function handleJumpToAppointment() {
    setBookingTab('book');
    handleNavigate('home', 'appointment');
  }

  const handleCreateBooking = useCallback((record: BookingRecord) => {
    setBookings((prev) => [record, ...prev]);
  }, []);

  const handleUpdateBookingStatus = useCallback(
    (id: string, status: BookingStatus) => {
      setBookings((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const next = { ...item, status };
          const activeCopy = TRANSLATIONS[language].appointment.bookingSystem;
          setToast({
            id: Date.now(),
            title: activeCopy.updatedToastTitle,
            description: activeCopy.updatedToastDesc(item.referenceCode),
          });
          return next;
        })
      );
    },
    [language]
  );

  const handleRescheduleBooking = useCallback(
    (id: string, nextDate: string, nextSlotId: string) => {
      setBookings((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const next = { ...item, date: nextDate, slotId: nextSlotId };
          const activeCopy = TRANSLATIONS[language].appointment.bookingSystem;
          setToast({
            id: Date.now(),
            title: activeCopy.updatedToastTitle,
            description: activeCopy.updatedToastDesc(item.referenceCode),
          });
          return next;
        })
      );
    },
    [language]
  );

  const handleDeleteBooking = useCallback((id: string) => {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleBookingPrepared = useCallback(
    (referenceCode: string) => {
      const sysCopy = TRANSLATIONS[language].appointment.bookingSystem;
      setToast({
        id: Date.now(),
        title: sysCopy.bookedToastTitle,
        description: sysCopy.bookedToastDesc(referenceCode),
      });
    },
    [language]
  );

  const handleDismissToast = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf7] text-[#263f40]">
      <SeoManager language={language} />

      <Navbar
        language={language}
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenWhatsAppDrawer={() => setIsDrawerOpen(true)}
      />

      <ToastNotification toast={toast} onDismiss={handleDismissToast} />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'home' && (
              <>
                <HeroSection
                  language={language}
                  onChangeLanguage={handleChangeLanguage}
                  onQuickBook={handleSelectService}
                  onOpenManageBookings={handleOpenManageBookings}
                  onScrollToServices={() => handleNavigate('home', 'services')}
                />
                <ServicesSection language={language} onSelectService={handleSelectService} />
                <GoogleAdSlot
                  language={language}
                  slotId={import.meta.env.VITE_ADSENSE_SLOT_SERVICES}
                  format="horizontal"
                />
                <ClinicGallery language={language} />
                <TestimonialsSection language={language} onSelectReason={handleSelectService} />
                <AppointmentSection
                  language={language}
                  selectedReasonKey={selectedReasonKey}
                  activeTab={bookingTab}
                  onChangeTab={setBookingTab}
                  clinicWhatsApp={clinicWhatsApp}
                  onUpdateClinicWhatsApp={handleUpdateClinicWhatsApp}
                  bookings={bookings}
                  onCreateBooking={handleCreateBooking}
                  onUpdateBookingStatus={handleUpdateBookingStatus}
                  onRescheduleBooking={handleRescheduleBooking}
                  onDeleteBooking={handleDeleteBooking}
                  onBookingPrepared={handleBookingPrepared}
                />
              </>
            )}

            {activePage === 'practice' && (
              <>
                <ChapterSubnav
                  language={language}
                  page="practice"
                  onNavigateHome={() => handleNavigate('home')}
                  onJumpAnchor={scrollToAnchor}
                />
                <AboutSection language={language} />
                <ClinicGallery language={language} />
                <TestimonialsSection language={language} onSelectReason={handleSelectService} />
              </>
            )}

            {activePage === 'care' && (
              <>
                <ChapterSubnav
                  language={language}
                  page="care"
                  onNavigateHome={() => handleNavigate('home')}
                  onJumpAnchor={scrollToAnchor}
                />
                <ServicesSection language={language} onSelectService={handleSelectService} />
                <PatientPortalSection
                  language={language}
                  onSelectReason={handleSelectService}
                  onOpenWhatsAppDrawer={() => setIsDrawerOpen(true)}
                />
                <OralHealthQuiz language={language} onSelectReason={handleSelectService} />
              </>
            )}

            {activePage === 'research' && (
              <>
                <ChapterSubnav
                  language={language}
                  page="research"
                  onNavigateHome={() => handleNavigate('home')}
                  onJumpAnchor={scrollToAnchor}
                />
                <ResearchSection language={language} />
                <GoogleAdSlot
                  language={language}
                  slotId={import.meta.env.VITE_ADSENSE_SLOT_FAQ}
                  format="auto"
                />
                <FaqSection
                  language={language}
                  onSelectReason={handleSelectService}
                  onOpenWhatsAppDrawer={() => setIsDrawerOpen(true)}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <ContactFooter
        language={language}
        onChangeLanguage={handleChangeLanguage}
        onOpenWhatsAppDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Compact floating WhatsApp trigger */}
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        aria-label={copy.whatsappDrawer.title}
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-30 inline-flex items-center gap-2 h-10 sm:h-11 px-4 rounded-lg bg-[#168b57] hover:bg-[#127347] text-white text-xs sm:text-sm font-semibold shadow-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123f43]"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        <span>{copy.contactFooter.floatingCta}</span>
      </button>

      <WhatsAppDrawer
        language={language}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        clinicWhatsApp={clinicWhatsApp}
        onJumpToAppointment={handleJumpToAppointment}
      />
    </div>
  );
}
