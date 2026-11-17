export type Language = 'en' | 'ne';

export type SitePage = 'home' | 'practice' | 'care' | 'research' | 'appointment';

export const LANGUAGE_STORAGE_KEY = 'monika_kumal_site_language';

export type AppointmentReasonKey =
  | 'checkup'
  | 'toothache'
  | 'root_canal'
  | 'trauma'
  | 'paediatric'
  | 'gum'
  | 'other';

export type PreferredTimeKey = 'flexible' | 'morning' | 'afternoon' | 'evening';

export const APPOINTMENT_REASON_KEYS: AppointmentReasonKey[] = [
  'checkup',
  'toothache',
  'root_canal',
  'trauma',
  'paediatric',
  'gum',
  'other',
];

export const PREFERRED_TIME_KEYS: PreferredTimeKey[] = [
  'flexible',
  'morning',
  'afternoon',
  'evening',
];

export interface LocalizedContent {
  brandName: string;
  languageSwitch: {
    label: string;
    english: string;
    nepali: string;
  };
  nav: {
    home: string;
    practice: string;
    about: string;
    services: string;
    research: string;
    faq: string;
    appointment: string;
    bookVisit: string;
    openMenu: string;
    closeMenu: string;
    backToHome: string;
    flyout: {
      explorePrefix: string;
      quickHeading: string;
      quickLinks: {
        label: string;
        action: 'appointment' | 'whatsapp' | 'orcid';
      }[];
      categories: {
        practice: {
          title: string;
          links: {
            label: string;
            description: string;
            page: SitePage;
            anchor?: string;
          }[];
        };
        care: {
          title: string;
          links: {
            label: string;
            description: string;
            page: SitePage;
            anchor?: string;
          }[];
        };
        research: {
          title: string;
          links: {
            label: string;
            description: string;
            page: SitePage;
            anchor?: string;
          }[];
        };
      };
    };
  };
  homeChapters: {
    kicker: string;
    title: string;
    items: {
      number: string;
      label: string;
      title: string;
      summary: string;
      cta: string;
      page: SitePage;
    }[];
  };
  chapterSubnav: {
    practice: {
      title: string;
      links: { label: string; anchor: string }[];
    };
    care: {
      title: string;
      links: { label: string; anchor: string }[];
    };
    research: {
      title: string;
      links: { label: string; anchor: string }[];
    };
    appointment: {
      title: string;
      links: { label: string; anchor: string }[];
    };
  };
  hero: {
    kicker: string;
    headlineLine1: string;
    headlineLine2: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    manageBookingsCta: string;
    quickBookTitle: string;
    quickBookSubtitle: string;
    quickBookOptions: {
      label: string;
      duration: string;
      reasonKey: AppointmentReasonKey;
    }[];
    comfortPromises: string[];
    portraitAlt: string;
    portraitFallbackTitle: string;
    portraitFallbackSubtitle: string;
    stripQualificationLabel: string;
    stripQualificationValue: string;
    stripFocusLabel: string;
    stripFocusValue: string;
    stripAcademicLabel: string;
    stripAcademicLink: string;
  };
  about: {
    kicker: string;
    titlePrefix: string;
    titleSuffix: string;
    bio1: string;
    bio2: string;
    metaClinical: string;
    metaAcademic: string;
    orcidLink: string;
    imageAlt: string;
    imageFallbackTitle: string;
    imageFallbackSubtitle: string;
  };
  services: {
    kicker: string;
    title: string;
    subtitle: string;
    featuredTag: string;
    cardTag: string;
    featuredCta: string;
    cardCta: string;
    durationSuffix: string;
    notice: string;
    toolsImageAlt: string;
    toolsFallbackTitle: string;
    toolsFallbackSubtitle: string;
    items: {
      id: string;
      number: string;
      title: string;
      summary: string;
      clinicalNote: string;
      reasonKey: AppointmentReasonKey;
      imageKey:
        | 'clinicalTools'
        | 'serviceEndodontics'
        | 'serviceRestorative'
        | 'serviceTrauma'
        | 'servicePaediatric'
        | 'serviceOralEducation';
      imageAlt: string;
      featured?: boolean;
    }[];
  };
  testimonials: {
    kicker: string;
    title: string;
    subtitle: string;
    actionLabel: string;
    note: string;
    filters: {
      all: string;
      endodontics: string;
      familyTrauma: string;
    };
    items: {
      id: string;
      number: string;
      category: 'endodontics' | 'family-trauma';
      serviceLabel: string;
      outcomeLabel: string;
      quote: string;
      patientName: string;
      patientContext: string;
      reasonKey: AppointmentReasonKey;
    }[];
  };
  clinicGallery: {
    kicker: string;
    title: string;
    subtitle: string;
    viewPhotoLabel: string;
    closeLightboxLabel: string;
    prevLabel: string;
    nextLabel: string;
    filters: {
      all: string;
      rooms: string;
      equipment: string;
    };
    items: {
      id: string;
      number: string;
      category: 'rooms' | 'equipment';
      categoryLabel: string;
      title: string;
      caption: string;
      alt: string;
      imageKey: 'imagingSuite' | 'clinicInterior' | 'waitingLounge' | 'clinicalTools';
    }[];
  };
  research: {
    kicker: string;
    title: string;
    filters: {
      all: string;
      clinical: string;
      patientTech: string;
    };
    orcidNote: string;
    orcidLink: string;
    items: {
      id: string;
      number: string;
      title: string;
      category: 'clinical' | 'patient-tech';
      categoryLabel: string;
      description: string;
    }[];
  };
  patientPortal: {
    kicker: string;
    title: string;
    subtitle: string;
    stages: {
      all: string;
      pre: string;
      post: string;
    };
    preCareHeading: string;
    postCareHeading: string;
    warningHeading: string;
    checklistProgressLabel: string;
    copyGuideLabel: string;
    copiedLabel: string;
    bookLabel: string;
    whatsappLabel: string;
    treatments: {
      id: string;
      number: string;
      categoryLabel: string;
      title: string;
      overview: string;
      reasonKey: AppointmentReasonKey;
      preCare: string[];
      postCare: string[];
      whenToContact: string;
    }[];
  };
  oralHealthQuiz: {
    kicker: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    stepLabel: string;
    prevButton: string;
    nextButton: string;
    finishButton: string;
    retakeButton: string;
    copyTipsButton: string;
    copiedButton: string;
    bookCtaLabel: string;
    resultsHeading: string;
    resultsSummaryStrong: string;
    resultsSummaryModerate: string;
    resultsSummaryAttention: string;
    questions: {
      id: 'brushing' | 'flossing' | 'sugar' | 'symptoms' | 'checkup';
      number: string;
      topic: string;
      prompt: string;
      options: {
        value: 'good' | 'fair' | 'needs-care';
        label: string;
        tip: string;
      }[];
    }[];
  };
  faq: {
    kicker: string;
    title: string;
    subtitle: string;
    askPrompt: string;
    askAction: string;
    requestPrefix: string;
    items: {
      id: string;
      number: string;
      topic: string;
      question: string;
      answer: string;
      relatedReasonKey?: AppointmentReasonKey;
    }[];
  };
  appointment: {
    kicker: string;
    title: string;
    subtitle: string;
    details: {
      whatsappTitle: string;
      whatsappDesc: string;
      availabilityTitle: string;
      availabilityDesc: string;
      locationTitle: string;
      locationDesc: string;
    };
    config: {
      activePrefix: string;
      notConfigured: string;
      configure: string;
      close: string;
      inputLabel: string;
      save: string;
      cancel: string;
      error: string;
    };
    form: {
      heading: string;
      nameLabel: string;
      namePlaceholder: string;
      nameError: string;
      phoneLabel: string;
      phonePlaceholder: string;
      phoneError: string;
      reasonLabel: string;
      reasonPlaceholder: string;
      reasonError: string;
      dateLabel: string;
      datePicker: {
        placeholder: string;
        clearLabel: string;
        todayShortcut: string;
        tomorrowShortcut: string;
        nextWeekShortcut: string;
        prevMonthLabel: string;
        nextMonthLabel: string;
        helperNote: string;
      };
      timeLabel: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitButton: string;
      privacyNotice: string;
      reasons: Record<AppointmentReasonKey, string>;
      times: Record<PreferredTimeKey, string>;
    };
    confirmation: {
      title: string;
      descWithNumber: string;
      descWithoutNumber: string;
      sendWhatsApp: string;
      setNumber: string;
      copyText: string;
      copied: string;
    };
    bookingSystem: {
      tabs: {
        book: string;
        manage: string;
      };
      visitTypeLabel: string;
      visitTypes: {
        'new-patient': string;
        'follow-up': string;
      };
      slotLabel: string;
      slotBookedTag: string;
      slotAvailableNote: string;
      slotError: string;
      dateRequiredError: string;
      referenceLabel: string;
      statuses: {
        confirmed: string;
        'checked-in': string;
        completed: string;
        cancelled: string;
      };
      filterTabs: {
        all: string;
        upcoming: string;
        completed: string;
        cancelled: string;
      };
      searchPlaceholder: string;
      stats: {
        total: string;
        upcoming: string;
        completed: string;
      };
      actions: {
        reschedule: string;
        saveSlot: string;
        cancelReschedule: string;
        checkIn: string;
        complete: string;
        cancelBooking: string;
        restoreBooking: string;
        deleteBooking: string;
        sendWhatsApp: string;
        copyPass: string;
        copiedPass: string;
        viewInManager: string;
        bookAnother: string;
      };
      emptyTitle: string;
      emptyDesc: string;
      emptyFilteredDesc: string;
      emptyCta: string;
      bookedToastTitle: string;
      bookedToastDesc: (ref: string) => string;
      updatedToastTitle: string;
      updatedToastDesc: (ref: string) => string;
    };
  };
  whatsappDrawer: {
    kicker: string;
    title: string;
    closeLabel: string;
    descConfiguredPrefix: string;
    descConfiguredSuffix: string;
    descUnconfigured: string;
    enquiryMessage: string;
    openWhatsApp: string;
    goToForm: string;
    copyMessage: string;
    copied: string;
  };
  contactFooter: {
    kicker: string;
    title: string;
    subtitle: string;
    cta: string;
    floatingCta: string;
    brandLine: string;
    disclaimer: string;
    orcidLabel: string;
    rightsReserved: string;
  };
  toasts: {
    numberSavedTitle: string;
    numberSavedDesc: string;
    requestReadyTitle: string;
    requestReadyDescWithNum: (name: string) => string;
    requestReadyDescNoNum: (name: string) => string;
    languageSwitchedTitle: string;
    languageSwitchedDesc: string;
  };
}

export const TRANSLATIONS: Record<Language, LocalizedContent> = {
  en: {
    brandName: 'Dr. Monika Kumal',
    languageSwitch: {
      label: 'Website language',
      english: 'English',
      nepali: 'नेपाली',
    },
    nav: {
      home: 'Home',
      practice: 'Practice',
      about: 'About',
      services: 'Care',
      research: 'Research',
      faq: 'FAQ',
      appointment: 'Appointment',
      bookVisit: 'Book Visit',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      backToHome: 'Home',
      flyout: {
        explorePrefix: 'Explore',
        quickHeading: 'Quick Links',
        quickLinks: [
          { label: 'Schedule a Dental Visit', action: 'appointment' },
          { label: 'WhatsApp Consultation Desk', action: 'whatsapp' },
          { label: 'ORCID Research Record', action: 'orcid' },
        ],
        categories: {
          practice: {
            title: 'Practice',
            links: [
              {
                label: 'About Dr. Monika Kumal',
                description: 'Gold Medalist BDS qualification and clinical philosophy at Bakulahar Hospital.',
                page: 'practice',
                anchor: 'about',
              },
              {
                label: 'Clinic Gallery',
                description: 'Treatment suites, digital imaging room, and sterilisation standards.',
                page: 'practice',
                anchor: 'gallery',
              },
              {
                label: 'Patient Reviews',
                description: 'Verified reflections from patients treated at Ratnanagar.',
                page: 'practice',
                anchor: 'testimonials',
              },
            ],
          },
          care: {
            title: 'Clinical Care',
            links: [
              {
                label: 'Dental Services',
                description: 'Check-ups, root canal therapy, trauma care, and paediatric dentistry.',
                page: 'care',
                anchor: 'services',
              },
              {
                label: 'Patient Care Guides',
                description: 'Pre-care preparation checklists and post-procedure recovery steps.',
                page: 'care',
                anchor: 'patient-portal',
              },
              {
                label: 'Oral Health Quiz',
                description: 'Interactive 5-step habit check for personalised daily care tips.',
                page: 'care',
                anchor: 'oral-quiz',
              },
            ],
          },
          research: {
            title: 'Research & FAQ',
            links: [
              {
                label: 'Academic Publications',
                description: 'Peer-reviewed endodontic case reports and technology insights.',
                page: 'research',
                anchor: 'research',
              },
              {
                label: 'Patient FAQ',
                description: 'Clear answers on root canal prep, check-ups, and appointments.',
                page: 'research',
                anchor: 'faq',
              },
            ],
          },
        },
      },
    },
    homeChapters: {
      kicker: 'Explore the Practice',
      title: 'Everything designed around clarity.',
      items: [
        {
          number: '01',
          label: 'Practice & Clinic',
          title: 'Meet Dr. Kumal & Tour the Clinic',
          summary: 'Gold Medalist credentials, sterile examination rooms, and patient feedback at Bakulahar Hospital.',
          cta: 'Explore Practice',
          page: 'practice',
        },
        {
          number: '02',
          label: 'Care & Tools',
          title: 'Treatments, Guides & Health Quiz',
          summary: 'Endodontic and preventive care, pre/post-procedure checklists, and a 1-minute oral habit quiz.',
          cta: 'Explore Care',
          page: 'care',
        },
        {
          number: '03',
          label: 'Academic & Answers',
          title: 'Published Research & Patient FAQ',
          summary: 'Peer-reviewed dental publications alongside practical answers for your upcoming visit.',
          cta: 'Explore Research',
          page: 'research',
        },
      ],
    },
    chapterSubnav: {
      practice: {
        title: 'Practice',
        links: [
          { label: 'About Dr. Kumal', anchor: 'about' },
          { label: 'Clinic Gallery', anchor: 'gallery' },
          { label: 'Patient Reviews', anchor: 'testimonials' },
        ],
      },
      care: {
        title: 'Care',
        links: [
          { label: 'Dental Services', anchor: 'services' },
          { label: 'Care Guides', anchor: 'patient-portal' },
          { label: 'Oral Health Quiz', anchor: 'oral-quiz' },
        ],
      },
      research: {
        title: 'Research & FAQ',
        links: [
          { label: 'Publications', anchor: 'research' },
          { label: 'Patient FAQ', anchor: 'faq' },
        ],
      },
      appointment: {
        title: 'Book Visit',
        links: [
          { label: 'Appointment Form', anchor: 'appointment' },
        ],
      },
    },
    hero: {
      kicker: 'Dental Surgeon · BDS (Gold Medalist) · Bakulahar Hospital, Ratnanagar',
      headlineLine1: 'Healthy smiles.',
      headlineLine2: 'Confident lives.',
      lead: 'Compassionate, pain-conscious dental care led by Gold Medalist Dr. Monika Kumal at Bakulahar Hospital, Ratnanagar. Choose a treatment and reserve your preferred OPD slot online in under a minute.',
      primaryCta: 'Reserve a dental slot',
      secondaryCta: 'View treatments',
      manageBookingsCta: 'Manage bookings',
      quickBookTitle: 'Quick Treatment Booking',
      quickBookSubtitle: 'Select your dental concern to jump straight into open OPD time slots:',
      quickBookOptions: [
        { label: 'Dental Check-up & Cleaning', duration: '30 min', reasonKey: 'checkup' },
        { label: 'Tooth Pain & Root Canal', duration: '45 min', reasonKey: 'root_canal' },
        { label: 'Tooth-Coloured Filling', duration: '30 min', reasonKey: 'toothache' },
        { label: "Children's Dental Care", duration: '30 min', reasonKey: 'paediatric' },
      ],
      comfortPromises: [
        'Gentle pain-conscious care',
        'Clear X-ray explanations',
        'Direct OPD slot tracking',
      ],
      portraitAlt: 'Portrait of Dr. Monika Kumal, Gold Medalist Dental Surgeon',
      portraitFallbackTitle: 'Dr. Monika Kumal, BDS',
      portraitFallbackSubtitle: 'Gold Medalist · Dental Surgeon',
      stripQualificationLabel: 'Academic Distinction',
      stripQualificationValue: 'BDS · Gold Medalist',
      stripFocusLabel: 'Hospital Practice',
      stripFocusValue: 'Bakulahar Hospital, Ratnanagar',
      stripAcademicLabel: 'Academic Record',
      stripAcademicLink: 'ORCID Research Profile',
    },
    about: {
      kicker: 'About the Dentist',
      titlePrefix: 'Dr. Monika Kumal,',
      titleSuffix: 'BDS (Gold Medalist)',
      bio1: 'Dr. Monika Kumal is a Gold Medalist dental surgeon practising at Bakulahar Hospital, Ratnanagar, with academic and clinical interests in endodontics, dental trauma, restorative dentistry, paediatric dentistry, and emerging dental technologies.',
      bio2: "Her scholarly contributions include clinical case reports and peer-reviewed publications. In day-to-day clinical care, she prioritises unhurried communication, thoughtful treatment planning, and evidence-informed dental practice tailored to each patient's comfort.",
      metaClinical: 'BDS Gold Medalist · Bakulahar Hospital, Ratnanagar',
      metaAcademic: 'Peer-Reviewed Case Reports',
      orcidLink: 'View ORCID research profile',
      imageAlt: 'Dr. Monika Kumal in dental clinical scrubs',
      imageFallbackTitle: 'Dr. Monika Kumal, BDS',
      imageFallbackSubtitle: 'Gold Medalist · Bakulahar Hospital',
    },
    services: {
      kicker: 'Dental Services',
      title: 'Comprehensive dental care',
      subtitle: 'Select any care area below to enquire about your dental concerns and pre-fill your appointment request.',
      featuredTag: 'Preventive Care',
      cardTag: 'Clinical Care',
      featuredCta: 'Book Check-up Slot',
      cardCta: 'Book This Treatment',
      durationSuffix: 'min visit',
      notice: 'Service availability must be confirmed directly with the clinic prior to your visit.',
      toolsImageAlt: 'Sterile stainless steel dental examination instruments on a ceramic tray',
      toolsFallbackTitle: 'Clinical Examination',
      toolsFallbackSubtitle: 'Preventive dental care',
      items: [
        {
          id: 'checkup',
          number: '01',
          title: 'Dental Check-up',
          summary: 'Comprehensive oral examination, preventive advice and thoughtful treatment planning.',
          clinicalNote: 'Early detection of caries, periodontal health screening, and personalised oral care guidance.',
          reasonKey: 'checkup',
          imageKey: 'clinicalTools',
          imageAlt: 'Sterile stainless steel dental examination instruments prepared on a ceramic tray',
          featured: true,
        },
        {
          id: 'endodontics',
          number: '02',
          title: 'Endodontics',
          summary: 'Assessment of tooth pain and comfortable, gentle root canal treatment to save your natural tooth.',
          clinicalNote: 'Focused on preserving natural dentition and resolving pulpal discomfort without stress.',
          reasonKey: 'root_canal',
          imageKey: 'serviceEndodontics',
          imageAlt: 'Calm sunlit dental suite designed for comfortable pain-free endodontic care',
        },
        {
          id: 'restorative',
          number: '03',
          title: 'Restorative Dentistry',
          summary: 'Natural tooth-coloured restorations and conservative repair of chipped or decayed teeth.',
          clinicalNote: 'Evidence-informed shade-matched fillings designed for seamless smile aesthetics and strength.',
          reasonKey: 'toothache',
          imageKey: 'serviceRestorative',
          imageAlt: 'Natural porcelain tooth shade tabs prepared for seamless restorative dentistry',
        },
        {
          id: 'trauma',
          number: '04',
          title: 'Dental Trauma',
          summary: 'Prompt, attentive evaluation of dental injuries and structured tooth preservation care.',
          clinicalNote: 'Reassuring step-by-step assessment for fractured or injured teeth following accidents.',
          reasonKey: 'trauma',
          imageKey: 'serviceTrauma',
          imageAlt: 'Dentist and smiling patient reviewing a tooth preservation model during consultation',
        },
        {
          id: 'paediatric',
          number: '05',
          title: 'Paediatric Dentistry',
          summary: "Gentle children's oral health visits that build comfort, trust, and confident smiles.",
          clinicalNote: 'Calm, child-friendly consultations supporting positive lifelong dental experiences.',
          reasonKey: 'paediatric',
          imageKey: 'servicePaediatric',
          imageAlt: 'Happy smiling child sitting comfortably in a bright child-friendly dental chair',
        },
        {
          id: 'education',
          number: '06',
          title: 'Oral Health Education',
          summary: 'Practical, empowering guidance on daily oral hygiene, enamel protection and lasting habits.',
          clinicalNote: 'Clear, jargon-free guidance tailored to your daily routine and preventive wellness.',
          reasonKey: 'checkup',
          imageKey: 'serviceOralEducation',
          imageAlt: 'Minimalist daily oral hygiene brushes, floss, and ceramic cup in natural morning light',
        },
      ],
    },
    testimonials: {
      kicker: 'Patient Experiences',
      title: 'Calm, clear dental care in Ratnanagar',
      subtitle: 'Feedback from patients treated for root canal pain, dental trauma, and family preventive visits.',
      actionLabel: 'Enquire for similar care',
      note: 'Shared as representative patient experiences illustrating treatment communication and clinical follow-up.',
      filters: {
        all: 'All Experiences',
        endodontics: 'Endodontics & Restorative',
        familyTrauma: 'Paediatric & Trauma',
      },
      items: [
        {
          id: 'rev-bikash',
          number: '01',
          category: 'endodontics',
          serviceLabel: 'Endodontics',
          outcomeLabel: 'Root Canal Care',
          quote:
            'I arrived with severe molar pain and was nervous about needing a root canal. Dr. Monika Kumal walked me through the X-ray step by step before starting, and the procedure itself was comfortable and pain-free. My tooth was saved and healed smoothly.',
          patientName: 'Bikash Adhikari',
          patientContext: 'Secondary School Teacher · Ratnanagar',
          reasonKey: 'root_canal',
        },
        {
          id: 'rev-sita',
          number: '02',
          category: 'family-trauma',
          serviceLabel: 'Paediatric Care',
          outcomeLabel: 'First Check-up',
          quote:
            'My seven-year-old daughter used to cry at the sight of a dental chair. Dr. Kumal spoke gently with her, showed her the mirror first, and turned her check-up into a calm, positive visit. We now follow her brushing advice every evening.',
          patientName: 'Sita Gurung',
          patientContext: 'Parent · Tandi, Chitwan',
          reasonKey: 'paediatric',
        },
        {
          id: 'rev-ramesh',
          number: '03',
          category: 'family-trauma',
          serviceLabel: 'Dental Trauma',
          outcomeLabel: 'Tooth Preservation',
          quote:
            'After a bicycle fall chipped my front tooth, I visited Bakulahar Hospital worried it could not be repaired naturally. Dr. Monika assessed the injury carefully, restored the shape seamlessly, and checked vitality during follow-up.',
          patientName: 'Ramesh Pokhrel',
          patientContext: 'Local Business Owner · Ratnanagar',
          reasonKey: 'trauma',
        },
        {
          id: 'rev-anjana',
          number: '04',
          category: 'endodontics',
          serviceLabel: 'Restorative Care',
          outcomeLabel: 'Preventive & Filling',
          quote:
            'What stood out most was how clearly she explained why a conservative filling was enough instead of rushing into unnecessary work. Everything felt transparent, hygienic, and unhurried from check-up to completion.',
          patientName: 'Anjana Subedi',
          patientContext: 'University Student · Chitwan',
          reasonKey: 'toothache',
        },
      ],
    },
    clinicGallery: {
      kicker: 'Facilities & Equipment',
      title: 'Clinical spaces built for calm, hygienic care',
      subtitle: 'Take a look inside our examination rooms, consultation areas, and sterilised diagnostic instrumentation.',
      viewPhotoLabel: 'View full size',
      closeLightboxLabel: 'Close image preview',
      prevLabel: 'Previous photo',
      nextLabel: 'Next photo',
      filters: {
        all: 'All Spaces',
        rooms: 'Rooms & Lounge',
        equipment: 'Equipment & Sterility',
      },
      items: [
        {
          id: 'suite-treatment',
          number: '01',
          category: 'rooms',
          categoryLabel: 'Examination & Treatment Suite',
          title: 'Primary Dental Treatment Suite',
          caption: 'Ergonomic dental chair, articulated clinical LED lighting, and chairside digital X-ray arm supporting accurate diagnostics.',
          alt: 'Modern dental treatment room with white dental chair, overhead lamp, and digital X-ray arm',
          imageKey: 'imagingSuite',
        },
        {
          id: 'suite-consultation',
          number: '02',
          category: 'rooms',
          categoryLabel: 'Consultation Room',
          title: 'Patient Consultation & Planning Space',
          caption: 'Daylight-filled room designed for unhurried review of X-rays, oral health findings, and personalised treatment options.',
          alt: 'Calm modern dental consultation studio with oak desk and natural window light',
          imageKey: 'clinicInterior',
        },
        {
          id: 'suite-waiting',
          number: '03',
          category: 'rooms',
          categoryLabel: 'Patient Facilities',
          title: 'Reception & Patient Waiting Lounge',
          caption: 'Clean, peaceful reception and seating environment designed to keep adults and children relaxed before their visit.',
          alt: 'Bright contemporary dental reception desk and comfortable patient waiting area',
          imageKey: 'waitingLounge',
        },
        {
          id: 'suite-instruments',
          number: '04',
          category: 'equipment',
          categoryLabel: 'Sterilised Instrumentation',
          title: 'Diagnostic & Endodontic Instruments',
          caption: 'Precision stainless steel mirrors, explorers, and clinical hand instruments maintained under strict sterilisation protocols.',
          alt: 'Sterile stainless steel dental examination instruments neatly arranged on a ceramic tray',
          imageKey: 'clinicalTools',
        },
      ],
    },
    research: {
      kicker: 'Academic Profile',
      title: 'Research and academic interests',
      filters: {
        all: 'All Focus Areas',
        clinical: 'Clinical & Restorative',
        patientTech: 'Patient & Technology',
      },
      orcidNote: 'Published case reports and peer-reviewed scholarly records are indexed on ORCID.',
      orcidLink: 'View ORCID profile',
      items: [
        {
          id: 'endo',
          number: '01',
          title: 'Endodontics and root canal treatment',
          category: 'clinical',
          categoryLabel: 'Clinical Practice',
          description: 'Exploring predictable cleaning, shaping, and obturation strategies that prioritise long-term tooth retention.',
        },
        {
          id: 'trauma-res',
          number: '02',
          title: 'Dental trauma and tooth preservation',
          category: 'clinical',
          categoryLabel: 'Clinical Practice',
          description: 'Clinical decision-making and case documentation for managing acute dental injuries and preserving vitality.',
        },
        {
          id: 'restorative-res',
          number: '03',
          title: 'Restorative dentistry',
          category: 'clinical',
          categoryLabel: 'Clinical Practice',
          description: 'Conservative adhesive and restorative techniques supporting functional recovery after caries or fracture.',
        },
        {
          id: 'anxiety-res',
          number: '04',
          title: 'Dental anxiety and patient experience',
          category: 'patient-tech',
          categoryLabel: 'Patient Experience',
          description: 'Understanding communication strategies and calm clinical environments that reduce patient apprehension.',
        },
        {
          id: 'paediatric-res',
          number: '05',
          title: 'Paediatric dentistry',
          category: 'clinical',
          categoryLabel: 'Clinical Practice',
          description: 'Preventive strategies and behaviour guidance tailored to growing smiles and family oral health.',
        },
        {
          id: 'digital-res',
          number: '06',
          title: 'Digital dentistry and emerging technologies',
          category: 'patient-tech',
          categoryLabel: 'Emerging Technology',
          description: 'Evaluating modern diagnostic tools, imaging workflows, and digital innovations in clinical dentistry.',
        },
      ],
    },
    patientPortal: {
      kicker: 'Patient Care Portal',
      title: 'Pre-care & post-procedure guidance',
      subtitle: 'Select your planned treatment to review preparation checklists, recovery steps, and follow-up guidance.',
      stages: {
        all: 'Complete Guide',
        pre: 'Pre-Care',
        post: 'Post-Procedure',
      },
      preCareHeading: 'Before Your Appointment',
      postCareHeading: 'After Your Procedure',
      warningHeading: 'When to Contact the Clinic',
      checklistProgressLabel: 'Preparation checklist',
      copyGuideLabel: 'Copy care guide',
      copiedLabel: 'Copied',
      bookLabel: 'Book this consultation',
      whatsappLabel: 'Ask a care question',
      treatments: [
        {
          id: 'portal-rct',
          number: '01',
          categoryLabel: 'Endodontics',
          title: 'Root Canal Treatment',
          overview: 'Steps to prepare comfortably for endodontic therapy and protect the tooth afterward.',
          reasonKey: 'root_canal',
          preCare: [
            'Eat a light, balanced meal 1–2 hours before your visit since local numbness lasts a few hours afterward.',
            'Continue regular daily medications unless instructed otherwise by your physician.',
            'Bring recent dental X-rays or referral notes and inform Dr. Monika Kumal of any allergies or dental anxiety.',
          ],
          postCare: [
            'Avoid chewing hard or crunchy foods on the treated side until numbness wears off and the final restoration is placed.',
            'Mild tenderness when biting for 2–3 days is common; take only prescribed pain relief as directed.',
            'Brush and floss gently around the area and attend your follow-up appointment for the definitive crown or filling.',
          ],
          whenToContact: 'Contact the clinic promptly if you notice visible facial swelling, fever, severe throbbing pain after 3 days, or a loosened temporary filling.',
        },
        {
          id: 'portal-restorative',
          number: '02',
          categoryLabel: 'Restorative Dentistry',
          title: 'Dental Fillings & Restorations',
          overview: 'Practical preparation and aftercare for tooth-coloured composite and restorative fillings.',
          reasonKey: 'toothache',
          preCare: [
            'Brush and rinse cleanly before your appointment and avoid heavy caffeine right before sitting in the chair.',
            'Note which tooth feels sensitive to cold, sweet foods, or pressure so it can be checked accurately.',
            'Allow time after your visit for local anaesthesia to wear off before scheduling meals.',
          ],
          postCare: [
            'Wait until lip and tongue numbness completely subsides before eating or drinking hot beverages.',
            'Temporary sensitivity to cold or biting usually settles within one to two weeks.',
            'Contact the clinic for a quick bite adjustment if the new filling feels high when closing your teeth.',
          ],
          whenToContact: 'Reach out if sharp biting pain persists beyond a few days or if your bite feels uneven.',
        },
        {
          id: 'portal-trauma',
          number: '03',
          categoryLabel: 'Dental Trauma',
          title: 'Tooth Injury & Emergency Assessment',
          overview: 'Immediate pre-visit handling and post-stabilisation care for chipped, displaced, or knocked-out teeth.',
          reasonKey: 'trauma',
          preCare: [
            'Handle a dislodged tooth strictly by the crown (white chewing part)—never touch or scrub the root.',
            'Place any tooth fragment or avulsed tooth in cold milk or sterile saline and keep it moist on the way.',
            'Apply gentle pressure with clean gauze if bleeding and avoid biting on the injured tooth.',
          ],
          postCare: [
            'Follow a soft diet for 1–2 weeks and avoid biting directly into hard foods with splinted front teeth.',
            'Brush carefully with a soft-bristled brush after meals to keep the gums clean during healing.',
            'Attend scheduled vitality and X-ray follow-ups so nerve healing can be monitored closely.',
          ],
          whenToContact: 'Seek urgent re-evaluation if a splint loosens, swelling increases, or a gum bump appears near the injured root.',
        },
        {
          id: 'portal-paediatric',
          number: '04',
          categoryLabel: 'Paediatric Dentistry',
          title: "Children's Dental Visit",
          overview: 'Helping children arrive calm and supporting healthy enamel care after preventive or restorative visits.',
          reasonKey: 'paediatric',
          preCare: [
            'Speak positively and calmly about the visit ahead—avoid using words that suggest pain or fear.',
            'Schedule morning appointments when younger children are typically well-rested and cooperative.',
            'Bring a list of any medical conditions or recent medications your child has taken.',
          ],
          postCare: [
            'If local numbing gel or anaesthesia was used, watch closely so your child does not bite their numb lip or cheek.',
            'Follow fluoride or sealant aftercare advice—avoid sticky foods for the rest of the day if advised.',
            'Supervise twice-daily brushing with an age-appropriate pea-sized amount of fluoridated toothpaste.',
          ],
          whenToContact: 'Contact us if your child experiences persistent discomfort, fever, or accidental lip biting after numbness.',
        },
        {
          id: 'portal-checkup',
          number: '05',
          categoryLabel: 'Preventive Care',
          title: 'Routine Check-up & Oral Cleaning',
          overview: 'Preparing for your six-month oral examination and maintaining gum health afterward.',
          reasonKey: 'checkup',
          preCare: [
            'Brush and floss normally prior to your appointment; no fasting is needed.',
            'Prepare any questions regarding bleeding gums, sensitivity, or daily oral hygiene products.',
            'Share updates on systemic health conditions such as diabetes, pregnancy, or blood thinners.',
          ],
          postCare: [
            'Mild gum sensitivity for 24 hours after scaling is normal; rinse gently with lukewarm saltwater if helpful.',
            'Avoid heavily staining drinks (strong tea, coffee) for a few hours if polishing or fluoride was applied.',
            'Maintain a soft-bristle brushing routine and interdental cleaning as demonstrated during your visit.',
          ],
          whenToContact: 'Let the clinic know if prolonged gum bleeding or localised discomfort persists past 48 hours.',
        },
      ],
    },
    oralHealthQuiz: {
      kicker: 'Preventive Self-Check',
      title: 'Oral health habit quiz',
      subtitle: 'Answer five quick questions about your daily routine to receive tailored oral hygiene tips.',
      disclaimer: 'Provides general preventive guidance only — not a substitute for an in-person clinical examination.',
      stepLabel: 'Question',
      prevButton: 'Previous',
      nextButton: 'Next question',
      finishButton: 'View personalised tips',
      retakeButton: 'Retake quiz',
      copyTipsButton: 'Copy my tips',
      copiedButton: 'Copied',
      bookCtaLabel: 'Book recommended consultation',
      resultsHeading: 'Your personalised oral care tips',
      resultsSummaryStrong: 'Strong daily foundation — keep your preventive routine steady with regular six-month check-ups.',
      resultsSummaryModerate: 'Good habits in place — a few small daily adjustments will protect your enamel and gums even better.',
      resultsSummaryAttention: 'Priority attention recommended — booking a clinical check-up soon will help address sensitivity or overdue care.',
      questions: [
        {
          id: 'brushing',
          number: '01',
          topic: 'Brushing Routine',
          prompt: 'How often do you brush your teeth with fluoride toothpaste?',
          options: [
            {
              value: 'good',
              label: 'Twice a day (morning and before bed)',
              tip: 'Keep brushing twice daily for two full minutes using gentle circular strokes with a soft-bristled brush, especially before sleep.',
            },
            {
              value: 'fair',
              label: 'Once a day, usually in the morning',
              tip: 'Adding a second brush right before bed is one of the highest-impact habits—saliva slows down at night, leaving plaque acids unbuffered.',
            },
            {
              value: 'needs-care',
              label: 'Irregularly or less than once a day',
              tip: 'Aim to anchor brushing to morning and bedtime routines with a soft brush and pea-sized fluoride paste to prevent plaque build-up.',
            },
          ],
        },
        {
          id: 'flossing',
          number: '02',
          topic: 'Interdental Cleaning',
          prompt: 'How often do you floss or clean between your teeth?',
          options: [
            {
              value: 'good',
              label: 'Daily',
              tip: 'Excellent interdental care—daily flossing reaches the ~35% of tooth surfaces a toothbrush bristles cannot clean.',
            },
            {
              value: 'fair',
              label: 'A few times a week',
              tip: 'Try keeping floss beside your toothbrush at night so interdental cleaning becomes an automatic daily habit.',
            },
            {
              value: 'needs-care',
              label: 'Rarely or never',
              tip: 'Start gently with dental floss or interdental brushes 3–4 evenings a week; mild initial gum tenderness usually settles within a week of consistent cleaning.',
            },
          ],
        },
        {
          id: 'sugar',
          number: '03',
          topic: 'Diet & Enamel',
          prompt: 'How often do you have sweet snacks, sugary tea, or acidic drinks between meals?',
          options: [
            {
              value: 'good',
              label: 'Rarely between meals',
              tip: 'Limiting between-meal sugars gives saliva time to naturally remineralise enamel between meals.',
            },
            {
              value: 'fair',
              label: '1–2 times a day',
              tip: 'When having sweet tea or snacks, enjoy them closer to main meals and rinse with plain water afterward rather than brushing immediately.',
            },
            {
              value: 'needs-care',
              label: 'Frequently throughout the day',
              tip: 'Frequent sipping of sweetened tea or acidic drinks keeps enamel under continuous acid exposure—try rinsing with plain water right after each cup.',
            },
          ],
        },
        {
          id: 'symptoms',
          number: '04',
          topic: 'Comfort & Gums',
          prompt: 'Are you currently experiencing tooth sensitivity, bleeding gums, or discomfort?',
          options: [
            {
              value: 'good',
              label: 'No sensitivity or bleeding',
              tip: 'No current symptoms is encouraging; routine visual checks still help catch silent early cavities before pain starts.',
            },
            {
              value: 'fair',
              label: 'Occasional cold sensitivity or gum bleeding',
              tip: 'Bleeding when brushing or cold twinges often signal early gum inflammation or exposed dentin—use a gentle soft brush and schedule a preventive check.',
            },
            {
              value: 'needs-care',
              label: 'Ongoing toothache or pain when biting',
              tip: 'Persistent pain or biting tenderness warrants timely clinical assessment and X-ray evaluation to rule out deep decay or nerve inflammation.',
            },
          ],
        },
        {
          id: 'checkup',
          number: '05',
          topic: 'Preventive Visits',
          prompt: 'When did you last have a professional dental check-up?',
          options: [
            {
              value: 'good',
              label: 'Within the last 6 months',
              tip: 'Staying on a six-month check-up schedule keeps tartar controlled and catches small enamel changes early.',
            },
            {
              value: 'fair',
              label: '6 to 18 months ago',
              tip: 'Consider booking a routine examination and cleaning soon so hardened plaque around the gumline can be gently removed.',
            },
            {
              value: 'needs-care',
              label: 'More than 18 months ago (or never)',
              tip: 'Schedule a baseline dental examination at Bakulahar Hospital to check gum health, existing fillings, and preventive needs.',
            },
          ],
        },
      ],
    },
    faq: {
      kicker: 'Patient Information',
      title: 'Frequently asked questions',
      subtitle: 'Clear answers to common questions about preparing for dental procedures, insurance enquiries, and preventive visits.',
      askPrompt: 'Have a specific question for the clinic?',
      askAction: 'Ask via WhatsApp',
      requestPrefix: 'Request',
      items: [
        {
          id: 'root-canal-prep',
          number: '01',
          topic: 'Endodontics',
          question: 'How should I prepare for a root canal?',
          answer:
            'Have a light, comfortable meal an hour or two before your appointment, as local anaesthesia can keep your lip and cheek numb for a few hours afterward. Continue any regular prescribed medications unless your physician advises otherwise, bring recent dental X-rays if you have them, and inform Dr. Monika Kumal about any allergies or dental anxiety so comfort measures can be planned ahead.',
          relatedReasonKey: 'root_canal',
        },
        {
          id: 'insurance-billing',
          number: '02',
          topic: 'Appointments & Billing',
          question: 'Do you accept insurance?',
          answer:
            'Acceptance depends on your health or dental policy and current clinic arrangements. Please send a quick WhatsApp enquiry prior to your visit with your insurer details so the clinic desk can confirm applicable coverage, required documentation, or itemised receipts for reimbursement.',
          relatedReasonKey: 'checkup',
        },
        {
          id: 'dental-trauma-steps',
          number: '03',
          topic: 'Dental Trauma',
          question: 'What should I do if a tooth is chipped or knocked out?',
          answer:
            'Avoid scrubbing a dislodged tooth or touching its root surface. Keep any clean tooth fragment or displaced tooth moist in milk or sterile saline, avoid biting on the injured area, and contact the clinic promptly—early clinical assessment plays a critical role in preserving the tooth.',
          relatedReasonKey: 'trauma',
        },
        {
          id: 'checkup-frequency',
          number: '04',
          topic: 'Preventive Care',
          question: 'How often should I schedule a dental check-up?',
          answer:
            'For most patients, a routine oral examination every six months helps identify early enamel wear, decay, or gum inflammation before symptoms develop. Based on your individual oral health, Dr. Kumal may recommend a personalised follow-up interval.',
          relatedReasonKey: 'checkup',
        },
        {
          id: 'dental-anxiety',
          number: '05',
          topic: 'Patient Comfort',
          question: 'How are anxious patients supported during treatment?',
          answer:
            'Appointments begin with unhurried conversation and clear explanations of every step before treatment starts. Gentle local anaesthesia, unhurried pacing, and simple hand signals to pause whenever needed help ensure a calm, predictable experience.',
          relatedReasonKey: 'checkup',
        },
        {
          id: 'paediatric-first-visit',
          number: '06',
          topic: 'Paediatric Care',
          question: 'When should children have their first dental consultation?',
          answer:
            'Early preventive visits—typically as primary teeth emerge or in early childhood—help children build familiarity with the dental chair in a gentle setting while giving parents practical guidance on brushing, fluoride care, and tooth-friendly habits.',
          relatedReasonKey: 'paediatric',
        },
      ],
    },
    appointment: {
      kicker: 'Patient Appointments',
      title: 'Book your dental visit',
      subtitle: 'Complete the form to prepare your appointment enquiry for direct transmission to the clinic through WhatsApp.',
      details: {
        whatsappTitle: 'WhatsApp Enquiries',
        whatsappDesc: 'Structured appointment requests sent directly to +977 9713664352.',
        availabilityTitle: 'Appointment Availability',
        availabilityDesc: 'Visit times are confirmed directly upon review via WhatsApp.',
        locationTitle: 'Hospital Location',
        locationDesc: 'Bakulahar Hospital, Ratnanagar — please confirm OPD consultation hours before visiting.',
      },
      config: {
        activePrefix: 'Clinic WhatsApp active',
        notConfigured: 'Clinic WhatsApp number not configured yet',
        configure: 'Configure number',
        close: 'Close',
        inputLabel: 'Clinic WhatsApp Number (digits with country code)',
        save: 'Save Number',
        cancel: 'Cancel',
        error: 'Enter 10 to 15 digits with country code (for example, 97798XXXXXXXX).',
      },
      form: {
        heading: 'Appointment request',
        nameLabel: 'Patient name *',
        namePlaceholder: 'Enter your full name',
        nameError: 'Please enter the patient name.',
        phoneLabel: 'Phone number *',
        phonePlaceholder: '+977',
        phoneError: 'Please enter a valid contact phone number.',
        reasonLabel: 'Reason for visit *',
        reasonPlaceholder: 'Select concern',
        reasonError: 'Please select a reason for your visit.',
        dateLabel: 'Preferred date',
        datePicker: {
          placeholder: 'Suggest a preferred date',
          clearLabel: 'Clear selected date',
          todayShortcut: 'Today',
          tomorrowShortcut: 'Tomorrow',
          nextWeekShortcut: 'Next week',
          prevMonthLabel: 'Previous month',
          nextMonthLabel: 'Next month',
          helperNote: 'Exact OPD slot is confirmed directly via WhatsApp.',
        },
        timeLabel: 'Preferred time',
        messageLabel: 'Additional message',
        messagePlaceholder: 'Briefly describe your dental concern',
        submitButton: 'Prepare WhatsApp Appointment Request',
        privacyNotice:
          'This form prepares your appointment details for WhatsApp. Your appointment is not confirmed until the clinic responds. Avoid sharing sensitive medical information through this form.',
        reasons: {
          checkup: 'Dental check-up',
          toothache: 'Toothache',
          root_canal: 'Root canal consultation',
          trauma: 'Broken or injured tooth',
          paediatric: "Children's dental consultation",
          gum: 'Gum concern',
          other: 'Other',
        },
        times: {
          flexible: 'Flexible',
          morning: 'Morning',
          afternoon: 'Afternoon',
          evening: 'Evening',
        },
      },
      confirmation: {
        title: 'Appointment slot reserved',
        descWithNumber: 'Your booking reference is saved locally. Send your pass via WhatsApp to confirm your OPD turn.',
        descWithoutNumber: 'Configure the clinic WhatsApp number on the left to enable direct WhatsApp launch, or copy your booking pass below.',
        sendWhatsApp: 'Confirm via WhatsApp',
        setNumber: 'Set Clinic WhatsApp Number',
        copyText: 'Copy booking pass',
        copied: 'Copied',
      },
      bookingSystem: {
        tabs: {
          book: 'Reserve a Slot',
          manage: 'Manage Bookings',
        },
        visitTypeLabel: 'Visit type',
        visitTypes: {
          'new-patient': 'First-time visit',
          'follow-up': 'Follow-up visit',
        },
        slotLabel: 'Available OPD time slots *',
        slotBookedTag: 'Reserved',
        slotAvailableNote: 'Pick a date above to check live slot availability for that day.',
        slotError: 'Please choose a preferred OPD time slot.',
        dateRequiredError: 'Please select an appointment date.',
        referenceLabel: 'Booking Ref',
        statuses: {
          confirmed: 'Confirmed Request',
          'checked-in': 'Checked In',
          completed: 'Completed',
          cancelled: 'Cancelled',
        },
        filterTabs: {
          all: 'All',
          upcoming: 'Upcoming',
          completed: 'Completed',
          cancelled: 'Cancelled',
        },
        searchPlaceholder: 'Search by booking ref (BK-), patient name, or phone...',
        stats: {
          total: 'Total Bookings',
          upcoming: 'Active Upcoming',
          completed: 'Completed Visits',
        },
        actions: {
          reschedule: 'Reschedule',
          saveSlot: 'Save New Slot',
          cancelReschedule: 'Cancel',
          checkIn: 'Check In',
          complete: 'Mark Complete',
          cancelBooking: 'Cancel Booking',
          restoreBooking: 'Restore',
          deleteBooking: 'Remove',
          sendWhatsApp: 'WhatsApp',
          copyPass: 'Copy Pass',
          copiedPass: 'Copied',
          viewInManager: 'View in Manage Bookings',
          bookAnother: 'Book Another Slot',
        },
        emptyTitle: 'No bookings recorded yet',
        emptyDesc: 'Reserved appointment requests appear here so patients or clinic staff can reschedule times, update visit statuses, or resend WhatsApp passes.',
        emptyFilteredDesc: 'No bookings match your current search or status filter.',
        emptyCta: 'Reserve First Slot',
        bookedToastTitle: 'Appointment slot reserved',
        bookedToastDesc: (ref) => `Booking reference ${ref} saved. Review or send via WhatsApp below.`,
        updatedToastTitle: 'Booking updated',
        updatedToastDesc: (ref) => `Changes to appointment ${ref} have been saved.`,
      },
    },
    whatsappDrawer: {
      kicker: 'Clinic Enquiry',
      title: 'WhatsApp Consultation Desk',
      closeLabel: 'Close WhatsApp enquiry dialog',
      descConfiguredPrefix: 'Send a direct WhatsApp message to',
      descConfiguredSuffix: 'to enquire about clinic timings, location, or dental appointments.',
      descUnconfigured: 'The clinic WhatsApp number has not been configured yet. You can set it in the Appointment section or copy the enquiry message below.',
      enquiryMessage: 'Hello Dr. Monika Kumal, I would like to enquire about a dental appointment at Bakulahar Hospital, Ratnanagar.',
      openWhatsApp: 'Open WhatsApp',
      goToForm: 'Go to Appointment Form',
      copyMessage: 'Copy message',
      copied: 'Copied',
    },
    contactFooter: {
      kicker: 'Contact',
      title: "Let's care for your smile.",
      subtitle: 'Have a dental enquiry? Connect on WhatsApp (+977 9713664352) or submit an appointment request above.',
      cta: 'Chat on WhatsApp',
      floatingCta: 'WhatsApp Chat',
      brandLine: 'Dr. Monika Kumal, BDS (Gold Medalist) · Dental Surgeon · Bakulahar Hospital, Ratnanagar',
      disclaimer: 'This website provides general information and appointment enquiries, not diagnosis or emergency dental care.',
      orcidLabel: 'ORCID Profile',
      rightsReserved: 'Dr. Monika Kumal. All rights reserved.',
    },
    toasts: {
      numberSavedTitle: 'Clinic WhatsApp number saved',
      numberSavedDesc: 'Direct WhatsApp appointment links are now enabled.',
      requestReadyTitle: 'Appointment request ready',
      requestReadyDescWithNum: (name) =>
        `Thank you, ${name}. Click "Send on WhatsApp" below to complete your enquiry.`,
      requestReadyDescNoNum: (name) =>
        `Thank you, ${name}. Your formatted enquiry is ready to copy or send below.`,
      languageSwitchedTitle: 'Language updated to English',
      languageSwitchedDesc: 'All clinic information and appointment forms are now displayed in English.',
    },
  },
  ne: {
    brandName: 'डा. मोनिका कुमाल',
    languageSwitch: {
      label: 'वेबसाइट भाषा छान्नुहोस्',
      english: 'English',
      nepali: 'नेपाली',
    },
    nav: {
      home: 'गृहपृष्ठ',
      practice: 'क्लिनिक',
      about: 'परिचय',
      services: 'उपचार',
      research: 'अनुसन्धान',
      faq: 'प्रश्नोत्तर',
      appointment: 'समय लिनुहोस्',
      bookVisit: 'भेट बुक गर्नुहोस्',
      openMenu: 'मेनु खोल्नुहोस्',
      closeMenu: 'मेनु बन्द गर्नुहोस्',
      backToHome: 'गृहपृष्ठ',
      flyout: {
        explorePrefix: 'हेर्नुहोस्:',
        quickHeading: 'द्रुत लिङ्कहरू',
        quickLinks: [
          { label: 'दन्त भेटको समय लिनुहोस्', action: 'appointment' },
          { label: 'WhatsApp परामर्श डेस्क', action: 'whatsapp' },
          { label: 'ORCID अनुसन्धान अभिलेख', action: 'orcid' },
        ],
        categories: {
          practice: {
            title: 'क्लिनिक र परिचय',
            links: [
              {
                label: 'डा. मोनिका कुमालको परिचय',
                description: 'स्वर्ण पदक विजेता BDS योग्यता र बकुलहर अस्पतालको सेवा दर्शन।',
                page: 'practice',
                anchor: 'about',
              },
              {
                label: 'क्लिनिक ग्यालेरी',
                description: 'उपचार कक्ष, डिजिटल एक्स-रे सुविधा र सफाइ मापदण्ड।',
                page: 'practice',
                anchor: 'gallery',
              },
              {
                label: 'बिरामीका अनुभवहरू',
                description: 'रत्ननगरमा उपचार गराएका बिरामीहरूका वास्तविक प्रतिक्रिया।',
                page: 'practice',
                anchor: 'testimonials',
              },
            ],
          },
          care: {
            title: 'दन्त उपचार र हेरचाह',
            links: [
              {
                label: 'दन्त सेवाहरू',
                description: 'नियमित जाँच, रूट क्यानाल, चोटपटक र बाल दन्त सेवा।',
                page: 'care',
                anchor: 'services',
              },
              {
                label: 'उपचारपूर्व र पछिको हेरचाह',
                description: 'उपचारअघि र पछिका आवश्यक चेकलिस्ट र सावधानीहरू।',
                page: 'care',
                anchor: 'patient-portal',
              },
              {
                label: 'मुख स्वास्थ्य प्रश्नोत्तरी',
                description: 'दैनिक बानीअनुसार व्यक्तिगत सल्लाह पाउने ५-चरणको क्विज।',
                page: 'care',
                anchor: 'oral-quiz',
              },
            ],
          },
          research: {
            title: 'अनुसन्धान र प्रश्नोत्तर',
            links: [
              {
                label: 'शैक्षिक प्रकाशनहरू',
                description: 'एन्डोडोन्टिक्स केस रिपोर्ट र आधुनिक प्रविधि अध्ययन।',
                page: 'research',
                anchor: 'research',
              },
              {
                label: 'बिरामी प्रश्नोत्तर (FAQ)',
                description: 'रूट क्यानाल तयारी, बीमा र अपोइन्टमेन्टसम्बन्धी स्पष्ट उत्तर।',
                page: 'research',
                anchor: 'faq',
              },
            ],
          },
        },
      },
    },
    homeChapters: {
      kicker: 'सेवा र जानकारी',
      title: 'सहज र स्पष्ट दन्त मार्गदर्शन।',
      items: [
        {
          number: '०१',
          label: 'क्लिनिक र परिचय',
          title: 'चिकित्सक परिचय र क्लिनिक दृश्य',
          summary: 'बकुलहर अस्पतालमा स्वर्ण पदक विजेता दन्त सेवा, उपचार कक्ष र बिरामी प्रतिक्रिया।',
          cta: 'क्लिनिक हेर्नुहोस्',
          page: 'practice',
        },
        {
          number: '०२',
          label: 'उपचार र क्विज',
          title: 'दन्त सेवा, निर्देशिका र स्वास्थ्य क्विज',
          summary: 'रूट क्यानालदेखि बाल दन्त सेवा, उपचारपछिको स्याहार र १-मिनेटको मुख स्वास्थ्य क्विज।',
          cta: 'उपचार हेर्नुहोस्',
          page: 'care',
        },
        {
          number: '०३',
          label: 'अनुसन्धान र FAQ',
          title: 'वैज्ञानिक लेख र सामान्य प्रश्नोत्तर',
          summary: 'समकक्षी-समीक्षित दन्त अध्ययन र बिरामीका सामान्य जिज्ञासाहरूको स्पष्ट समाधान।',
          cta: 'अनुसन्धान हेर्नुहोस्',
          page: 'research',
        },
      ],
    },
    chapterSubnav: {
      practice: {
        title: 'क्लिनिक र परिचय',
        links: [
          { label: 'डा. कुमालको परिचय', anchor: 'about' },
          { label: 'क्लिनिक ग्यालेरी', anchor: 'gallery' },
          { label: 'बिरामी अनुभव', anchor: 'testimonials' },
        ],
      },
      care: {
        title: 'दन्त उपचार',
        links: [
          { label: 'दन्त सेवाहरू', anchor: 'services' },
          { label: 'हेरचाह निर्देशिका', anchor: 'patient-portal' },
          { label: 'स्वास्थ्य क्विज', anchor: 'oral-quiz' },
        ],
      },
      research: {
        title: 'अनुसन्धान र FAQ',
        links: [
          { label: 'प्रकाशनहरू', anchor: 'research' },
          { label: 'प्रश्नोत्तर', anchor: 'faq' },
        ],
      },
      appointment: {
        title: 'भेट बुक गर्नुहोस्',
        links: [
          { label: 'अपोइन्टमेन्ट फारम', anchor: 'appointment' },
        ],
      },
    },
    hero: {
      kicker: 'दन्त चिकित्सक · BDS (स्वर्ण पदक विजेता) · बकुलहर अस्पताल, रत्ननगर',
      headlineLine1: 'स्वस्थ मुस्कान।',
      headlineLine2: 'आत्मविश्वासपूर्ण जीवन।',
      lead: 'बकुलहर अस्पताल, रत्ननगरमा स्वर्ण पदक विजेता डा. मोनिका कुमालद्वारा प्रदान गरिने पीडारहित र बिरामी-केन्द्रित दन्त सेवा। उपचार छान्नुहोस् र एक मिनेटभित्रै अनलाइन ओपीडी समय सुरक्षित गर्नुहोस्।',
      primaryCta: 'दन्त समय बुक गर्नुहोस्',
      secondaryCta: 'उपचार सेवा हेर्नुहोस्',
      manageBookingsCta: 'बुकिङ व्यवस्थापन',
      quickBookTitle: 'छिटो अपोइन्टमेन्ट बुकिङ',
      quickBookSubtitle: 'उपलब्ध ओपीडी समय तुरुन्त हेर्न आफ्नो दन्त समस्या छान्नुहोस्:',
      quickBookOptions: [
        { label: 'दन्त जाँच र सफाइ', duration: '३० मिनेट', reasonKey: 'checkup' },
        { label: 'दाँत दुखाइ र रूट क्यानाल', duration: '४५ मिनेट', reasonKey: 'root_canal' },
        { label: 'प्राकृतिक रङको फिलिङ', duration: '३० मिनेट', reasonKey: 'toothache' },
        { label: 'बाल दन्त सेवा', duration: '३० मिनेट', reasonKey: 'paediatric' },
      ],
      comfortPromises: [
        'सहज र संवेदनशील उपचार',
        'स्पष्ट एक्स-रे र उपचार सल्लाह',
        'तत्काल ओपीडी समय ट्र्याकिङ',
      ],
      portraitAlt: 'स्वर्ण पदक विजेता दन्त चिकित्सक डा. मोनिका कुमालको तस्बिर',
      portraitFallbackTitle: 'डा. मोनिका कुमाल, BDS',
      portraitFallbackSubtitle: 'स्वर्ण पदक विजेता · दन्त चिकित्सक',
      stripQualificationLabel: 'शैक्षिक सम्मान',
      stripQualificationValue: 'BDS (स्वर्ण पदक विजेता)',
      stripFocusLabel: 'कार्यरत अस्पताल',
      stripFocusValue: 'बकुलहर अस्पताल, रत्ननगर',
      stripAcademicLabel: 'शैक्षिक अभिलेख',
      stripAcademicLink: 'ORCID अनुसन्धान प्रोफाइल',
    },
    about: {
      kicker: 'दन्त चिकित्सकको परिचय',
      titlePrefix: 'डा. मोनिका कुमाल,',
      titleSuffix: 'BDS (स्वर्ण पदक विजेता)',
      bio1: 'डा. मोनिका कुमाल बकुलहर अस्पताल, रत्ननगरमा कार्यरत स्वर्ण पदक विजेता दन्त चिकित्सक हुनुहुन्छ। उहाँको शैक्षिक तथा चिकित्सकीय रुचि एन्डोडोन्टिक्स (रूट क्यानाल), दन्त आघात (डेन्टल ट्रमा), रेस्टोरेटिभ डेन्टिस्ट्री, बाल दन्त चिकित्सा र आधुनिक दन्त प्रविधिमा केन्द्रित छ।',
      bio2: 'उहाँका क्लिनिकल केस रिपोर्ट तथा समकक्षी-समीक्षित (peer-reviewed) वैज्ञानिक लेखहरू प्रकाशित छन्। दैनिक उपचारमा उहाँ बिरामीसँग सहज संवाद, सुझबुझपूर्ण उपचार योजना र प्रमाणमा आधारित दन्त अभ्यासलाई प्राथमिकता दिनुहुन्छ।',
      metaClinical: 'BDS स्वर्ण पदक विजेता · बकुलहर अस्पताल, रत्ननगर',
      metaAcademic: 'प्रकाशित केस रिपोर्टहरू',
      orcidLink: 'ORCID अनुसन्धान प्रोफाइल हेर्नुहोस्',
      imageAlt: 'क्लिनिकल ड्रेसमा दन्त चिकित्सक डा. मोनिका कुमाल',
      imageFallbackTitle: 'डा. मोनिका कुमाल, BDS',
      imageFallbackSubtitle: 'स्वर्ण पदक विजेता · बकुलहर अस्पताल',
    },
    services: {
      kicker: 'दन्त सेवाहरू',
      title: 'समग्र दन्त उपचार सेवा',
      subtitle: 'आफ्नो दाँतसम्बन्धी समस्याअनुसार सेवा छान्नुहोस् र सिधै अपोइन्टमेन्ट फारममा विषय भर्नुहोस्।',
      featuredTag: 'निवारक सेवा',
      cardTag: 'क्लिनिकल सेवा',
      featuredCta: 'जाँचको समय बुक गर्नुहोस्',
      cardCta: 'यो उपचार बुक गर्नुहोस्',
      durationSuffix: 'मिनेट परामर्श',
      notice: 'क्लिनिक आउनुअघि सेवा उपलब्धता क्लिनिकसँग सिधै यकिन गर्नुहोस्।',
      toolsImageAlt: 'सफा सेरामिक ट्रेमा राखिएका दन्त जाँचका उपकरणहरू',
      toolsFallbackTitle: 'दन्त परीक्षण',
      toolsFallbackSubtitle: 'निवारक दन्त उपचार',
      items: [
        {
          id: 'checkup',
          number: '०१',
          title: 'दन्त जाँच (Dental Check-up)',
          summary: 'मुख तथा दाँतको विस्तृत परीक्षण, निवारक सल्लाह र स्पष्ट उपचार योजना।',
          clinicalNote: 'दाँतको किराले खाएको वा गिजाको समस्या समयमै पत्ता लगाई व्यक्तिगत स्याहार सुझाव।',
          reasonKey: 'checkup',
          imageKey: 'clinicalTools',
          imageAlt: 'सफा सेरामिक ट्रेमा राखिएका दन्त जाँचका उपकरणहरू',
          featured: true,
        },
        {
          id: 'endodontics',
          number: '०२',
          title: 'एन्डोडोन्टिक्स (रूट क्यानाल)',
          summary: 'दाँत दुखाइको परीक्षण र प्राकृतिक दाँत जोगाउने सहज, पीडारहित रूट क्यानाल उपचार।',
          clinicalNote: 'बिरामीको सहजता र प्राकृतिक दाँत जोगाउँदै नसाको संक्रमण समाधानमा केन्द्रित।',
          reasonKey: 'root_canal',
          imageKey: 'serviceEndodontics',
          imageAlt: 'सहज र शान्त वातावरणमा रूट क्यानाल परामर्शका लागि तयार आधुनिक दन्त उपचार कक्ष',
        },
        {
          id: 'restorative',
          number: '०३',
          title: 'रेस्टोरेटिभ डेन्टिस्ट्री',
          summary: 'दाँतकै प्राकृतिक रङसँग मिल्ने फिलिङ तथा क्षतिग्रस्त दाँतको सुरक्षित पुनर्स्थापना।',
          clinicalNote: 'प्राकृतिक मुस्कान, बलियो चपाइ र दीर्घकालीन सौन्दर्यका लागि सटीक उपचार।',
          reasonKey: 'toothache',
          imageKey: 'serviceRestorative',
          imageAlt: 'दाँतको प्राकृतिक रङ मिलाउन प्रयोग हुने पोर्सिलेन शेड गाइड',
        },
        {
          id: 'trauma',
          number: '०४',
          title: 'दन्त आघात (Dental Trauma)',
          summary: 'चोटपटक लागेको दाँतको तत्काल मूल्याङ्कन र दाँत जोगाउने आश्वस्त उपचार परामर्श।',
          clinicalNote: 'दुर्घटनामा भाँचिएको वा हल्लिएको दाँत जोगाउन चरणबद्ध र स्पष्ट मार्गदर्शन।',
          reasonKey: 'trauma',
          imageKey: 'serviceTrauma',
          imageAlt: 'चिकित्सकले बिरामीलाई दाँतको नमुना देखाउँदै स्पष्ट परामर्श दिँदै गरेको दृश्य',
        },
        {
          id: 'paediatric',
          number: '०५',
          title: 'बाल दन्त चिकित्सा',
          summary: 'बालबालिकालाई डररहित, रमाइलो र मैत्रीपूर्ण वातावरणमा गरिने मुख स्वास्थ्य जाँच।',
          clinicalNote: 'बालमैत्री परामर्शमार्फत सानैदेखि स्वस्थ र आत्मविश्वासी मुस्कानको विकास।',
          reasonKey: 'paediatric',
          imageKey: 'servicePaediatric',
          imageAlt: 'उज्यालो बालमैत्री दन्त कुर्सीमा मुस्कुराउँदै बसेको बालक',
        },
        {
          id: 'education',
          number: '०६',
          title: 'मुख स्वास्थ्य शिक्षा',
          summary: 'दैनिक सरसफाइ, इनामेल सुरक्षा र जीवनभर दाँत स्वस्थ राख्ने व्यावहारिक मार्गदर्शन।',
          clinicalNote: 'तपाईंको दैनिक खानपान र ब्रसिङ बानीअनुसार सरल र उपयोगी सल्लाह।',
          reasonKey: 'checkup',
          imageKey: 'serviceOralEducation',
          imageAlt: 'सफा दैनिक दन्त स्याहार सामग्री, नरम ब्रस र फ्लस',
        },
      ],
    },
    testimonials: {
      kicker: 'बिरामीहरूको अनुभव',
      title: 'रत्ननगरमा स्पष्ट र सहज दन्त उपचार',
      subtitle: 'रूट क्यानाल, दन्त आघात र परिवारमुखी निवारक जाँच सेवा लिनुभएका बिरामीहरूको अनुभव।',
      actionLabel: 'यस्तै परामर्शको समय लिनुहोस्',
      note: 'उपचार संवाद र क्लिनिकल हेरचाहको अनुभव झल्काउने प्रतिनिधि बिरामी प्रतिक्रियाहरू।',
      filters: {
        all: 'सबै अनुभवहरू',
        endodontics: 'रूट क्यानाल र फिलिङ',
        familyTrauma: 'बाल दन्त र चोटपटक',
      },
      items: [
        {
          id: 'rev-bikash',
          number: '०१',
          category: 'endodontics',
          serviceLabel: 'एन्डोडोन्टिक्स',
          outcomeLabel: 'रूट क्यानाल उपचार',
          quote:
            'बंगाराको तीव्र दुखाइ लिएर आउँदा म रूट क्यानालसँग निकै डराएको थिएँ। डा. मोनिका कुमालले एक्स-रे देखाएर हरेक चरण बुझाएपछि उपचार गर्नुभयो, जसले गर्दा पीडारहित रूपमा मेरो दाँत जोगियो र राम्ररी निको भयो।',
          patientName: 'विकास अधिकारी',
          patientContext: 'माध्यमिक विद्यालय शिक्षक · रत्ननगर',
          reasonKey: 'root_canal',
        },
        {
          id: 'rev-sita',
          number: '०२',
          category: 'family-trauma',
          serviceLabel: 'बाल दन्त सेवा',
          outcomeLabel: 'पहिलो दन्त जाँच',
          quote:
            'मेरी सात वर्षकी छोरी पहिले डेन्टल चेयर देख्नेबित्तिकै रुन्थिन्। डा. कुमालले अत्यन्त स्नेहका साथ पहिले ऐना देखाएर सहज बनाउनुभयो र जाँच सजिलै सम्पन्न भयो। अहिले हामी उहाँले सिकाउनुभएको ब्रसिङ तरिका नियमित पालना गर्छौँ।',
          patientName: 'सीता गुरुङ',
          patientContext: 'अभिभावक · टाँडी, चितवन',
          reasonKey: 'paediatric',
        },
        {
          id: 'rev-ramesh',
          number: '०३',
          category: 'family-trauma',
          serviceLabel: 'दन्त आघात',
          outcomeLabel: 'दाँत संरक्षण',
          quote:
            'साइकलबाट लडेर अगाडिको दाँत भाँचिँदा प्राकृतिक जस्तो बन्दैन कि भन्ने चिन्ता थियो। बकुलहर अस्पतालमा डा. मोनिकाले सावधानीपूर्वक परीक्षण गरी दाँतलाई पुरानै आकारमा जोगाइदिनुभयो र फलो-अप जाँच पनि गर्नुभयो।',
          patientName: 'रमेश पोखरेल',
          patientContext: 'व्यवसायी · रत्ननगर',
          reasonKey: 'trauma',
        },
        {
          id: 'rev-anjana',
          number: '०४',
          category: 'endodontics',
          serviceLabel: 'रेस्टोरेटिभ सेवा',
          outcomeLabel: 'परामर्श र फिलिङ',
          quote:
            'अनावश्यक उपचार नगरी सानो फिलिङले नै पुग्ने कुरा उहाँले स्पष्ट रूपमा सम्झाउनुभएको मलाई सबैभन्दा राम्रो लाग्यो। जाँचदेखि उपचारसम्मको सम्पूर्ण प्रक्रिया सफा, पारदर्शी र हताररहित थियो।',
          patientName: 'अन्जना सुवेदी',
          patientContext: 'स्नातक विद्यार्थी · चितवन',
          reasonKey: 'toothache',
        },
      ],
    },
    clinicGallery: {
      kicker: 'सुविधा र उपकरण',
      title: 'शान्त र सुरक्षित दन्त उपचार कक्षहरू',
      subtitle: 'दन्त परीक्षण कक्ष, परामर्श स्थान, प्रतीक्षालय र निस्संक्रमण गरिएका उपकरणहरूको झलक हेर्नुहोस्।',
      viewPhotoLabel: 'ठूलो तस्बिर हेर्नुहोस्',
      closeLightboxLabel: 'तस्बिर बन्द गर्नुहोस्',
      prevLabel: 'अघिल्लो तस्बिर',
      nextLabel: 'अर्को तस्बिर',
      filters: {
        all: 'सबै तस्बिर',
        rooms: 'कक्ष र प्रतीक्षालय',
        equipment: 'उपकरण र सरसफाइ',
      },
      items: [
        {
          id: 'suite-treatment',
          number: '०१',
          category: 'rooms',
          categoryLabel: 'परीक्षण तथा उपचार कक्ष',
          title: 'मुख्य दन्त उपचार कक्ष',
          caption: 'आधुनिक डेन्टल चेयर, क्लिनिकल एलईडी लाइट र डिजिटल एक्स-रे सुविधासहित आरामदायी उपचार व्यवस्था।',
          alt: 'आधुनिक डेन्टल चेयर र डिजिटल एक्स-रे उपकरणसहितको दन्त उपचार कक्ष',
          imageKey: 'imagingSuite',
        },
        {
          id: 'suite-consultation',
          number: '०२',
          category: 'rooms',
          categoryLabel: 'परामर्श कक्ष',
          title: 'बिरामी परामर्श र योजना कक्ष',
          caption: 'एक्स-रे, मुख स्वास्थ्य परीक्षण र उपचार विकल्पबारे बिरामीसँग सहज संवाद गर्न तयार शान्त कक्ष।',
          alt: 'प्राकृतिक उज्यालो भएको शान्त दन्त परामर्श कक्ष',
          imageKey: 'clinicInterior',
        },
        {
          id: 'suite-waiting',
          number: '०३',
          category: 'rooms',
          categoryLabel: 'बिरामी सुविधा',
          title: 'रिसेप्सन र प्रतीक्षालय',
          caption: 'भेटअघि बालबालिका तथा वयस्क सबैका लागि सफा, शान्त र आरामदायी बसाइ व्यवस्था।',
          alt: 'सफा र उज्यालो दन्त क्लिनिक रिसेप्सन र प्रतीक्षालय',
          imageKey: 'waitingLounge',
        },
        {
          id: 'suite-instruments',
          number: '०४',
          category: 'equipment',
          categoryLabel: 'निस्संक्रमण उपकरण',
          title: 'परीक्षण र एन्डोडोन्टिक उपकरणहरू',
          caption: 'कठोर स्टेरिलाइजेसन मापदण्डअनुसार तयार पारिएका स्टेनलेस स्टील परीक्षण ऐना र दन्त उपकरणहरू।',
          alt: 'सेरामिक ट्रेमा सफासँग राखिएका दन्त परीक्षण उपकरणहरू',
          imageKey: 'clinicalTools',
        },
      ],
    },
    research: {
      kicker: 'शैक्षिक प्रोफाइल',
      title: 'अनुसन्धान र शैक्षिक रुचिहरू',
      filters: {
        all: 'सबै क्षेत्रहरू',
        clinical: 'क्लिनिकल र रेस्टोरेटिभ',
        patientTech: 'बिरामी अनुभव र प्रविधि',
      },
      orcidNote: 'प्रकाशित क्लिनिकल केस रिपोर्ट र वैज्ञानिक अभिलेखहरू ORCID मा उपलब्ध छन्।',
      orcidLink: 'ORCID प्रोफाइल हेर्नुहोस्',
      items: [
        {
          id: 'endo',
          number: '०१',
          title: 'एन्डोडोन्टिक्स र रूट क्यानाल उपचार',
          category: 'clinical',
          categoryLabel: 'क्लिनिकल अभ्यास',
          description: 'दाँतलाई दीर्घकालसम्म सुरक्षित राख्ने प्रभावकारी सफाइ, सेपिङ र सिलिङ विधिको अध्ययन।',
        },
        {
          id: 'trauma-res',
          number: '०२',
          title: 'दन्त आघात र दाँत संरक्षण',
          category: 'clinical',
          categoryLabel: 'क्लिनिकल अभ्यास',
          description: 'आकस्मिक दन्त चोटपटकको व्यवस्थापन र दाँतको जीवन्तता जोगाउने क्लिनिकल निर्णय र अभिलेख।',
        },
        {
          id: 'restorative-res',
          number: '०३',
          title: 'रेस्टोरेटिभ डेन्टिस्ट्री',
          category: 'clinical',
          categoryLabel: 'क्लिनिकल अभ्यास',
          description: 'दाँत क्षय वा भाँचिएपछि कार्यात्मक पुनर्स्थापनाका लागि आधुनिक एडेसिभ प्रविधि।',
        },
        {
          id: 'anxiety-res',
          number: '०४',
          title: 'दन्त डर (Dental Anxiety) र बिरामी अनुभव',
          category: 'patient-tech',
          categoryLabel: 'बिरामी अनुभव',
          description: 'उपचारप्रतिको डर घटाउने संवाद शैली र शान्त क्लिनिकल वातावरणको अध्ययन।',
        },
        {
          id: 'paediatric-res',
          number: '०५',
          title: 'बाल दन्त चिकित्सा',
          category: 'clinical',
          categoryLabel: 'क्लिनिकल अभ्यास',
          description: 'बालबालिकाको बढ्दो दाँतको सुरक्षा र परिवारमुखी निवारक उपायहरूको अभ्यास।',
        },
        {
          id: 'digital-res',
          number: '०६',
          title: 'डिजिटल डेन्टिस्ट्री र नवीन प्रविधि',
          category: 'patient-tech',
          categoryLabel: 'नवीन प्रविधि',
          description: 'आधुनिक निदान उपकरण, इमेजिङ र डिजिटल दन्त प्रविधिहरूको क्लिनिकल मूल्याङ्कन।',
        },
      ],
    },
    patientPortal: {
      kicker: 'बिरामी स्याहार पोर्टल',
      title: 'उपचारअघि र उपचारपछिको हेरचाह निर्देशिका',
      subtitle: 'आफ्नो उपचारअनुसार तयारी चेकलिस्ट, उपचारपछिको सावधानी र फलो-अप सल्लाह हेर्न सेवा छान्नुहोस्।',
      stages: {
        all: 'पूर्ण निर्देशिका',
        pre: 'उपचारअघिको तयारी',
        post: 'उपचारपछिको हेरचाह',
      },
      preCareHeading: 'भेटको समयअघिको तयारी',
      postCareHeading: 'उपचारपछिको सावधानी',
      warningHeading: 'कहिले क्लिनिकमा सम्पर्क गर्ने',
      checklistProgressLabel: 'तयारी चेकलिस्ट',
      copyGuideLabel: 'निर्देशिका कपी गर्नुहोस्',
      copiedLabel: 'कपी भयो',
      bookLabel: 'यो सेवाको समय लिनुहोस्',
      whatsappLabel: 'थप सल्लाह सोध्नुहोस्',
      treatments: [
        {
          id: 'portal-rct',
          number: '०१',
          categoryLabel: 'एन्डोडोन्टिक्स',
          title: 'रूट क्यानाल उपचार (Root Canal)',
          overview: 'रूट क्यानाल उपचारका लागि सहज तयारी गर्ने र उपचारपछि दाँत जोगाउने मुख्य उपायहरू।',
          reasonKey: 'root_canal',
          preCare: [
            'लोकल एनेस्थेसियाले केही घण्टा सुन्निने हुनाले उपचारभन्दा १–२ घण्टाअघि हल्का खाना खानुहोस्।',
            'चिकित्सकले नरोक्न भनेसम्म नियमित खाइरहनुभएका औषधिहरू निरन्तर राख्नुहोस्।',
            'पुरानो एक्स-रे साथमा ल्याउनुहोस् र औषधिको एलर्जी वा डर भएमा डा. मोनिका कुमाललाई पहिल्यै जानकारी दिनुहोस्।',
          ],
          postCare: [
            'सुन्निएको हराउन र स्थायी फिलिङ/क्याप राख्नुअघिसम्म उपचार गरिएको भागबाट कडा चिज नचपाउनुहोस्।',
            'सुरुवाती २–३ दिन टोक्दा हल्का दुखाइ हुनु सामान्य हो; चिकित्सकको सल्लाहअनुसार मात्र दुखाइको औषधि लिनुहोस्।',
            'बिस्तारै ब्रस गर्नुहोस् र स्थायी पुनर्स्थापनाका लागि तोकिएको फलो-अप समयमा अवश्य आउनुहोस्।',
          ],
          whenToContact: 'गालामा स्पष्ट सुजन आएमा, ज्वरो आएमा, ३ दिनपछि पनि तीव्र दुखाइ रहेमा वा अस्थायी फिलिङ निस्किएमा तुरुन्त सम्पर्क गर्नुहोस्।',
        },
        {
          id: 'portal-restorative',
          number: '०२',
          categoryLabel: 'रेस्टोरेटिभ डेन्टिस्ट्री',
          title: 'दाँत भर्ने (फिलिङ) उपचार',
          overview: 'किराले खाएको वा क्षतिग्रस्त दाँतमा गरिने फिलिङअघिको तयारी र उपचारपछिको स्याहार।',
          reasonKey: 'toothache',
          preCare: [
            'भेटअघि दाँत सफा गरी आउनुहोस् र उपचारअघि अत्यधिक क्याफिनयुक्त पेय पदार्थ नलिनुहोस्।',
            'चिसो, गुलियो वा चपाउँदा कुन दाँतमा समस्या महसुस हुन्छ भन्ने स्पष्ट टिपोट राख्नुहोस्।',
            'सुन्निएको निको नहुन्जेल खाना खाने समय त्यहीअनुसार मिलाउनुहोस्।',
          ],
          postCare: [
            'ओठ र जिब्रोको सुन्निएको पूर्ण रूपमा हटेपछि मात्र खाना वा तातो पेय पदार्थ लिनुहोस्।',
            'केही दिन चिसोमा हल्का संवेदनशीलता देखिनु सामान्य हो, जुन १–२ हप्तामा कम हुँदै जान्छ।',
            'दाँत जोड्दा फिलिङ अग्लो महसुस भएमा मिलाउनका लागि क्लिनिकमा सम्पर्क गर्नुहोस्।',
          ],
          whenToContact: 'केही दिनपछि पनि टोक्दा तिखो दुखाइ रहेमा वा दाँत बराबर नबसेको महसुस भएमा तुरुन्त जानकारी गराउनुहोस्।',
        },
        {
          id: 'portal-trauma',
          number: '०३',
          categoryLabel: 'दन्त आघात',
          title: 'दाँत चोटपटक र आकस्मिक जाँच',
          overview: 'भाँचिएको, हल्लिएको वा खसेको दाँतको आकस्मिक संरक्षण र उपचारपछिको हेरचाह।',
          reasonKey: 'trauma',
          preCare: [
            'खसेको दाँतको सेतो भाग (crown) बाट मात्र समात्नुहोस्—जरा कहिल्यै नछुनुहोस् र नघोट्नुहोस्।',
            'भाँचिएको टुक्रा वा दाँतलाई चिसो दूध वा सलाइन पानीमा भिजाएर क्लिनिक ल्याउनुहोस्।',
            'रगत बगेमा सफा गजले हल्का थिच्नुहोस् र चोट लागेको दाँतले नटोक्नुहोस्।',
          ],
          postCare: [
            '१–२ हप्ता नरम खाना खानुहोस् र अगाडिको दाँतले कडा फलफूल वा खानेकुरा नटोक्नुहोस्।',
            'नरम ब्रस प्रयोग गरी प्रत्येक खानापछि बिस्तारै गिजा र दाँत सफा राख्नुहोस्।',
            'दाँतको नसा र जराको अवस्था जाँच गर्न तोकिएको एक्स-रे फलो-अपमा नियमित आउनुहोस्।',
          ],
          whenToContact: 'लगाइएको स्प्लिन्ट खुकुलो भएमा, सुजन बढेमा वा गिजामा सानो फोका देखिएमा तुरुन्त जाँच गराउनुहोस्।',
        },
        {
          id: 'portal-paediatric',
          number: '०४',
          categoryLabel: 'बाल दन्त सेवा',
          title: 'बालबालिकाको दन्त परामर्श',
          overview: 'बच्चाहरूलाई सहज रूपमा जाँचका लागि तयार पार्ने र उपचारपछि सुरक्षित हेरचाह गर्ने तरिका।',
          reasonKey: 'paediatric',
          preCare: [
            'भेटअघि बच्चासँग सकारात्मक र शान्त कुराकानी गर्नुहोस्—डर वा पीडा जनाउने शब्द प्रयोग नगर्नुहोस्।',
            'साना बालबालिकाका लागि बिहानको समय (जब उनीहरू फ्रेस हुन्छन्) छान्नु उपयुक्त हुन्छ।',
            'बच्चाको स्वास्थ्य अवस्था वा हाल खाइरहेको औषधिको विवरण साथमा ल्याउनुहोस्।',
          ],
          postCare: [
            'सुन्न्याउने औषधि प्रयोग गरिएको छ भने बच्चाले सुन्निएको ओठ वा गाला नटोकोस् भनेर ध्यान दिनुहोस्।',
            'फ्लोराइड वा सिलेन्ट उपचारपछि सल्लाह दिइएअनुसार त्यही दिन टाँसिने खानेकुरा नदिनुहोस्।',
            'अभिभावकको निगरानीमा बिहान–बेलुका मटरको दानाजति फ्लोराइडयुक्त मन्जनले ब्रस गराउनुहोस्।',
          ],
          whenToContact: 'सुन्निएको हटेपछि लगातार दुखाइ भएमा, ज्वरो आएमा वा ओठ टोकिएर घाउ भएमा क्लिनिकमा सम्पर्क गर्नुहोस्।',
        },
        {
          id: 'portal-checkup',
          number: '०५',
          categoryLabel: 'निवारक सेवा',
          title: 'नियमित दन्त जाँच र सफाइ (Scaling)',
          overview: 'छ-महिने नियमित मुख परीक्षणका लागि तयारी र सफाइपछिको गिजा हेरचाह।',
          reasonKey: 'checkup',
          preCare: [
            'भेटअघि सामान्य रूपमा ब्रस र कुल्ला गर्नुहोस्; खाली पेट बस्नु आवश्यक हुँदैन।',
            'गिजाबाट रगत आउने, दाँत सिरिङ्ग हुने वा दैनिक ब्रसिङबारे आफ्ना जिज्ञासा तयार राख्नुहोस्।',
            'मधुमेह, गर्भावस्था वा रगत पातलो बनाउने औषधि सेवनबारे चिकित्सकलाई जानकारी दिनुहोस्।',
          ],
          postCare: [
            'दाँत सफाइपछि २४ घण्टासम्म गिजामा हल्का संवेदनशीलता हुनु सामान्य हो; मनतातो नुनपानीले कुल्ला गर्न सकिन्छ।',
            'पोलिसिङ वा फ्लोराइड लगाइएको छ भने केही घण्टा कडा चिया वा कफी नलिनुहोस्।',
            'भेटमा सिकाइएको नरम ब्रस र दाँतबीच सफा गर्ने तरिका नियमित पालना गर्नुहोस्।',
          ],
          whenToContact: '४८ घण्टापछि पनि गिजाबाट रगत आइरहेमा वा असहज दुखाइ महसुस भएमा सम्पर्क गर्नुहोस्।',
        },
      ],
    },
    oralHealthQuiz: {
      kicker: 'निवारक स्व-परीक्षण',
      title: 'मुख स्वास्थ्य बानी प्रश्नोत्तरी',
      subtitle: 'आफ्नो दैनिक बानीबारे पाँचवटा सरल प्रश्नको उत्तर दिनुहोस् र व्यक्तिगत दन्त स्याहार सुझाव प्राप्त गर्नुहोस्।',
      disclaimer: 'यो सामान्य निवारक मार्गदर्शन मात्र हो — प्रत्यक्ष दन्त चिकित्सकको परीक्षणको विकल्प होइन।',
      stepLabel: 'प्रश्न',
      prevButton: 'अघिल्लो',
      nextButton: 'अर्को प्रश्न',
      finishButton: 'मेरो सुझाव हेर्नुहोस्',
      retakeButton: 'फेरि सुरु गर्नुहोस्',
      copyTipsButton: 'सुझाव कपी गर्नुहोस्',
      copiedButton: 'कपी भयो',
      bookCtaLabel: 'सिफारिस गरिएको परामर्श बुक गर्नुहोस्',
      resultsHeading: 'तपाईंको व्यक्तिगत मुख स्याहार सुझाव',
      resultsSummaryStrong: 'तपाईंको दैनिक बानी निकै राम्रो छ — प्रत्येक छ महिनामा नियमित जाँचसँगै यसलाई निरन्तर राख्नुहोस्।',
      resultsSummaryModerate: 'राम्रो आधार बनेको छ — दैनिक बानीमा सानो सुधारले तपाईंको दाँत र गिजालाई अझ बलियो बनाउनेछ।',
      resultsSummaryAttention: 'प्राथमिक जाँच उपयुक्त देखिन्छ — सिरिङ्ग हुने, रगत आउने वा ढिला भएको जाँचका लागि छिट्टै परामर्श लिनुहोस्।',
      questions: [
        {
          id: 'brushing',
          number: '०१',
          topic: 'ब्रस गर्ने बानी',
          prompt: 'तपाईं फ्लोराइडयुक्त मन्जनले दिनमा कति पटक ब्रस गर्नुहुन्छ?',
          options: [
            {
              value: 'good',
              label: 'दिनमा दुई पटक (बिहान र सुत्नुअघि)',
              tip: 'बिहान र विशेषगरी राति सुत्नुअघि नरम ब्रसले दुई मिनेटसम्म कोमल रूपमा ब्रस गर्ने यो उत्कृष्ट बानी कायम राख्नुहोस्।',
            },
            {
              value: 'fair',
              label: 'दिनमा एक पटक, प्रायः बिहान',
              tip: 'राति सुत्नुअघि दोस्रो पटक ब्रस गर्ने बानी थप्नुहोस्—निद्रामा थुक कम बन्ने हुँदा राति ब्रस गर्नु अत्यन्तै महत्वपूर्ण हुन्छ।',
            },
            {
              value: 'needs-care',
              label: 'नियमित छैन वा दिनमा एक पटकभन्दा कम',
              tip: 'दैनिक बिहान र राति सुत्नुअघि नरम ब्रस र मटरको दानाजति फ्लोराइड मन्जन प्रयोग गरेर ब्रस गर्ने नियमित तालिका बनाउनुहोस्।',
            },
          ],
        },
        {
          id: 'flossing',
          number: '०२',
          topic: 'दाँतबीचको सफाइ',
          prompt: 'तपाईं कति समयमा फ्लस (floss) वा दाँतबीच सफा गर्नुहुन्छ?',
          options: [
            {
              value: 'good',
              label: 'प्रत्येक दिन',
              tip: 'उत्कृष्ट बानी—दैनिक फ्लसिङले ब्रस नपुग्ने दाँतबीचको करिब ३५% सतह सफा राख्न मद्दत गर्छ।',
            },
            {
              value: 'fair',
              label: 'हप्तामा केही पटक',
              tip: 'राति ब्रससँगै फ्लस राख्ने बानीले दाँतबीचको सफाइलाई सजिलै दैनिक बानीमा बदल्न मद्दत गर्छ।',
            },
            {
              value: 'needs-care',
              label: 'बिरलै वा कहिल्यै होइन',
              tip: 'हप्तामा ३–४ साँझ बिस्तारै डेन्टल फ्लस वा इन्टरडेन्टल ब्रस सुरु गर्नुहोस्; सुरुमा हल्का संवेदनशीलता देखिए पनि एक हप्तामा सहज हुन्छ।',
            },
          ],
        },
        {
          id: 'sugar',
          number: '०३',
          topic: 'खानपान र इनामेल',
          prompt: 'खानाबीचमा गुलियो खाजा, चिनी हालेको चिया वा पेय पदार्थ कति पटक लिनुहुन्छ?',
          options: [
            {
              value: 'good',
              label: 'खानाबीचमा बिरलै',
              tip: 'खानाबीचमा गुलियो कम गर्नाले थुकले दाँतको इनामेललाई प्राकृतिक रूपमा बलियो बनाउने समय पाउँछ।',
            },
            {
              value: 'fair',
              label: 'दिनमा १–२ पटक',
              tip: 'गुलियो चिया वा खाजा मुख्य खानाको आसपास लिनुहोस् र लगत्तै ब्रस गर्नुको सट्टा सफा पानीले कुल्ला गर्नुहोस्।',
            },
            {
              value: 'needs-care',
              label: 'दिनभरि धेरै पटक',
              tip: 'पटक-पटक गुलियो चिया वा अमिलो पेय पिउँदा इनामेल कमजोर हुन सक्छ—प्रत्येक कपपछि सादा पानीले कुल्ला गर्ने बानी बसाल्नुहोस्।',
            },
          ],
        },
        {
          id: 'symptoms',
          number: '०४',
          topic: 'गिजा र संवेदनशीलता',
          prompt: 'के हाल तपाईंलाई दाँत सिरिङ्ग हुने, गिजाबाट रगत आउने वा दुखाइ महसुस हुन्छ?',
          options: [
            {
              value: 'good',
              label: 'कुनै संवेदनशीलता वा रगत आउँदैन',
              tip: 'कुनै लक्षण नदेखिनु राम्रो संकेत हो; तर दुखाइ नहुँदै सुरुवाती समस्या चिन्न नियमित जाँच उपयोगी रहन्छ।',
            },
            {
              value: 'fair',
              label: 'कहिलेकाहीँ चिसो लाग्ने वा गिजाबाट रगत आउने',
              tip: 'ब्रस गर्दा रगत आउनु वा चिसो लाग्नु सुरुवाती गिजा सुजन वा इनामेल खिइने लक्षण हुन सक्छ—नरम ब्रस प्रयोग गरी दन्त जाँच गराउनुहोस्।',
            },
            {
              value: 'needs-care',
              label: 'लगातार दाँत दुख्ने वा चपाउँदा दुख्ने',
              tip: 'निरन्तर दुखाइ वा चपाउँदा असहजता भएमा गहिरो किरा वा नसाको अवस्था जाँच गर्न समयमै दन्त परीक्षण र एक्स-रे गराउनु उपयुक्त हुन्छ।',
            },
          ],
        },
        {
          id: 'checkup',
          number: '०५',
          topic: 'नियमित दन्त जाँच',
          prompt: 'तपाईंले पछिल्लो पटक दन्त चिकित्सकबाट जाँच गराउनुभएको कहिले हो?',
          options: [
            {
              value: 'good',
              label: 'पछिल्लो ६ महिनाभित्र',
              tip: 'छ–महिने नियमित जाँचले दन्त पत्थर (tartar) जम्न नदिई मुख स्वास्थ्य स्थिर राख्न मद्दत गर्छ।',
            },
            {
              value: 'fair',
              label: '६ देखि १८ महिनाअघि',
              tip: 'गिजाको छेउमा जमेको हल्का फोहोर सफा गर्न र दाँतको अवस्था जाँच्न चाँडै नियमित जाँचको समय लिनुहोस्।',
            },
            {
              value: 'needs-care',
              label: '१८ महिनाभन्दा अघि (वा कहिल्यै होइन)',
              tip: 'गिजा स्वास्थ्य, पुराना फिलिङ र समग्र मुख स्वास्थ्य मूल्याङ्कनका लागि बकुलहर अस्पतालमा आधारभूत दन्त जाँचको समय लिनुहोस्।',
            },
          ],
        },
      ],
    },
    faq: {
      kicker: 'बिरामीका लागि जानकारी',
      title: 'बारम्बार सोधिने प्रश्नहरू',
      subtitle: 'दन्त उपचारको तयारी, बीमासम्बन्धी जानकारी र नियमित जाँचबारे सामान्य प्रश्नहरूको स्पष्ट उत्तर।',
      askPrompt: 'के तपाईंसँग क्लिनिकका लागि अन्य प्रश्न छन्?',
      askAction: 'WhatsApp मार्फत सोध्नुहोस्',
      requestPrefix: 'छान्नुहोस्:',
      items: [
        {
          id: 'root-canal-prep',
          number: '०१',
          topic: 'एन्डोडोन्टिक्स',
          question: 'रूट क्यानाल (Root Canal) उपचारको लागि कसरी तयारी गर्ने?',
          answer:
            'उपचारभन्दा एक–दुई घण्टा अगाडि हल्का र आरामदायी खाना खानुहोस्, किनकि लोकल एनेस्थेसियाका कारण उपचारपछि केही घण्टा ओठ र गाला सुन्निन सक्छ। चिकित्सकले अन्यथा सल्लाह नदिएसम्म नियमित औषधि नछोड्नुहोस्, पुरानो एक्स-रे भएमा साथमा ल्याउनुहोस् र औषधिको एलर्जी वा उपचारको डर भएमा डा. मोनिका कुमाललाई पहिल्यै जानकारी गराउनुहोस्।',
          relatedReasonKey: 'root_canal',
        },
        {
          id: 'insurance-billing',
          number: '०२',
          topic: 'अपोइन्टमेन्ट र बिलिङ',
          question: 'के क्लिनिकमा स्वास्थ्य बीमा (Insurance) स्वीकार गरिन्छ?',
          answer:
            'बीमा सुविधा तपाईंको स्वास्थ्य वा दन्त बीमा नीति तथा क्लिनिकको हालको व्यवस्थामा निर्भर गर्दछ। आउनुअघि आफ्नो बीमा कम्पनीको विवरणसहित WhatsApp मा सन्देश पठाउनुहोस्, ताकि क्लिनिकले कभरेज, आवश्यक कागजात वा बिल रसिदबारे यकिन जानकारी दिन सकोस्।',
          relatedReasonKey: 'checkup',
        },
        {
          id: 'dental-trauma-steps',
          number: '०३',
          topic: 'दन्त आघात',
          question: 'चोट लागेर दाँत भाँचिएमा वा निस्किएमा के गर्नुपर्छ?',
          answer:
            'निस्किएको दाँतको जरा नछुनुहोस् र ब्रसले नघोट्नुहोस्। भाँचिएको टुक्रा वा दाँतलाई सफा दूध वा नुनपानी (saline) मा भिजाएर सुरक्षित राख्नुहोस्, चोट लागेको भागले नटोक्नुहोस् र तुरुन्त क्लिनिकमा सम्पर्क गर्नुहोस्—समयमै गरिने परीक्षणले दाँत बचाउने सम्भावना बढाउँछ।',
          relatedReasonKey: 'trauma',
        },
        {
          id: 'checkup-frequency',
          number: '०४',
          topic: 'निवारक सेवा',
          question: 'कति समयमा नियमित दन्त जाँच गराउनुपर्छ?',
          answer:
            'सामान्यतया प्रत्येक छ महिनामा एकपटक दन्त परीक्षण गराउँदा दाँतको सुरुवाती किरा, गिजा सुन्निने समस्या वा इनामेल खिइने अवस्था समयमै पत्ता लाग्छ। तपाईंको मुख स्वास्थ्यअनुसार डा. कुमालले उपयुक्त फलो-अप समय सिफारिस गर्न सक्नुहुन्छ।',
          relatedReasonKey: 'checkup',
        },
        {
          id: 'dental-anxiety',
          number: '०५',
          topic: 'बिरामीको सहजता',
          question: 'उपचारसँग डराउने बिरामीहरूलाई कसरी सहज बनाइन्छ?',
          answer:
            'उपचार सुरु गर्नुअघि हतार नगरी हरेक चरणबारे स्पष्ट जानकारी दिइन्छ। कोमल लोकल एनेस्थेसिया, बिरामीको गतिअनुसारको उपचार र आवश्यक परेमा हातको इशाराबाट रोक्न सकिने व्यवस्थाले शान्त र विश्वस्त अनुभव दिलाउँछ।',
          relatedReasonKey: 'checkup',
        },
        {
          id: 'paediatric-first-visit',
          number: '०६',
          topic: 'बाल दन्त सेवा',
          question: 'बालबालिकालाई पहिलो दन्त जाँच कहिले गराउनुपर्छ?',
          answer:
            'बच्चाको पहिलो दाँत आउन थालेपछि वा बाल्यकालको सुरुवातमै गरिने जाँचले उनीहरूलाई दन्त क्लिनिकको वातावरणसँग सहज बनाउँछ र अभिभावकलाई ब्रसिङ, फ्लोराइड तथा दाँत जोगाउने खानपानबारे सही मार्गदर्शन दिन्छ।',
          relatedReasonKey: 'paediatric',
        },
      ],
    },
    appointment: {
      kicker: 'बिरामी अपोइन्टमेन्ट',
      title: 'दन्त जाँचको समय लिनुहोस्',
      subtitle: 'WhatsApp मार्फत सिधै क्लिनिकमा अपोइन्टमेन्ट अनुरोध पठाउन तलको फारम भर्नुहोस्।',
      details: {
        whatsappTitle: 'WhatsApp सोधपुछ',
        whatsappDesc: 'तपाईंको विवरण व्यवस्थित ढाँचामा सिधै +977 9713664352 मा पठाइन्छ।',
        availabilityTitle: 'समय उपलब्धता',
        availabilityDesc: 'WhatsApp मार्फत समीक्षा गरेपछि भेटको समय यकिन गरिनेछ।',
        locationTitle: 'अस्पताल स्थान',
        locationDesc: 'बकुलहर अस्पताल, रत्ननगर — आउनुअघि कृपया ओपीडी समय यकिन गर्नुहोस्।',
      },
      config: {
        activePrefix: 'क्लिनिक WhatsApp सक्रिय छ',
        notConfigured: 'क्लिनिक WhatsApp नम्बर अझै सेट गरिएको छैन',
        configure: 'नम्बर सेट गर्नुहोस्',
        close: 'बन्द गर्नुहोस्',
        inputLabel: 'क्लिनिक WhatsApp नम्बर (देशको कोडसहित अङ्कमा)',
        save: 'नम्बर सुरक्षित गर्नुहोस्',
        cancel: 'रद्द गर्नुहोस्',
        error: 'देशको कोडसहित १० देखि १५ अङ्कको नम्बर लेख्नुहोस् (उदाहरण: 97798XXXXXXXX)।',
      },
      form: {
        heading: 'अपोइन्टमेन्ट अनुरोध',
        nameLabel: 'बिरामीको नाम *',
        namePlaceholder: 'तपाईंको पूरा नाम लेख्नुहोस्',
        nameError: 'कृपया बिरामीको नाम लेख्नुहोस्।',
        phoneLabel: 'फोन नम्बर *',
        phonePlaceholder: '+977',
        phoneError: 'कृपया मान्य सम्पर्क फोन नम्बर लेख्नुहोस्।',
        reasonLabel: 'आउनुको कारण *',
        reasonPlaceholder: 'समस्या छान्नुहोस्',
        reasonError: 'कृपया भेटको कारण छान्नुहोस्।',
        dateLabel: 'चाहिएको मिति',
        datePicker: {
          placeholder: 'चाहिएको मिति छान्नुहोस्',
          clearLabel: 'छानिएको मिति हटाउनुहोस्',
          todayShortcut: 'आज',
          tomorrowShortcut: 'भोलि',
          nextWeekShortcut: 'अर्को हप्ता',
          prevMonthLabel: 'अघिल्लो महिना',
          nextMonthLabel: 'अर्को महिना',
          helperNote: 'यकिन ओपीडी समय WhatsApp मार्फत पक्का गरिनेछ।',
        },
        timeLabel: 'चाहिएको समय',
        messageLabel: 'थप सन्देश',
        messagePlaceholder: 'आफ्नो समस्याबारे छोटकरीमा लेख्नुहोस्',
        submitButton: 'WhatsApp अपोइन्टमेन्ट अनुरोध तयार गर्नुहोस्',
        privacyNotice:
          'यो फारमले WhatsApp का लागि तपाईंको विवरण तयार गर्छ। क्लिनिकको जवाफ नआएसम्म समय पक्का हुँदैन। कृपया संवेदनशील स्वास्थ्य विवरण यहाँ नलेख्नुहोस्।',
        reasons: {
          checkup: 'दन्त जाँच (Dental check-up)',
          toothache: 'दाँत दुखाइ',
          root_canal: 'रूट क्यानाल परामर्श',
          trauma: 'भाँचिएको वा चोट लागेको दाँत',
          paediatric: 'बाल दन्त परामर्श',
          gum: 'गिजासम्बन्धी समस्या',
          other: 'अन्य',
        },
        times: {
          flexible: 'कुनै पनि समय उपयुक्त',
          morning: 'बिहान',
          afternoon: 'दिउँसो',
          evening: 'साँझ',
        },
      },
      confirmation: {
        title: 'अपोइन्टमेन्ट समय सुरक्षित भयो',
        descWithNumber: 'तपाईंको बुकिङ विवरण सुरक्षित भएको छ। ओपीडी समय यकिन गर्न तलको WhatsApp बटन थिच्नुहोस्।',
        descWithoutNumber: 'सिधै WhatsApp खोल्न बायाँतिर क्लिनिक नम्बर सेट गर्नुहोस्, वा तलको बुकिङ पास कपी गर्नुहोस्।',
        sendWhatsApp: 'WhatsApp बाट पक्का गर्नुहोस्',
        setNumber: 'क्लिनिक WhatsApp नम्बर सेट गर्नुहोस्',
        copyText: 'बुकिङ पास कपी गर्नुहोस्',
        copied: 'कपी भयो',
      },
      bookingSystem: {
        tabs: {
          book: 'समय बुक गर्नुहोस्',
          manage: 'बुकिङ व्यवस्थापन',
        },
        visitTypeLabel: 'भेटको प्रकार',
        visitTypes: {
          'new-patient': 'पहिलो भेट',
          'follow-up': 'फलो-अप जाँच',
        },
        slotLabel: 'उपलब्ध ओपीडी समय *',
        slotBookedTag: 'बुक भइसकेको',
        slotAvailableNote: 'सो दिनको खाली समय हेर्न माथि मिति छान्नुहोस्।',
        slotError: 'कृपया उपलब्ध ओपीडी समय छान्नुहोस्।',
        dateRequiredError: 'कृपया आउने मिति छान्नुहोस्।',
        referenceLabel: 'बुकिङ कोड',
        statuses: {
          confirmed: 'बुकिङ अनुरोध पक्का',
          'checked-in': 'चेक-इन भयो',
          completed: 'सम्पन्न भयो',
          cancelled: 'रद्द गरियो',
        },
        filterTabs: {
          all: 'सबै',
          upcoming: 'आगामी',
          completed: 'सम्पन्न',
          cancelled: 'रद्द',
        },
        searchPlaceholder: 'बुकिङ कोड (BK-), बिरामीको नाम वा फोनबाट खोज्नुहोस्...',
        stats: {
          total: 'जम्मा बुकिङ',
          upcoming: 'आगामी भेट',
          completed: 'सम्पन्न जाँच',
        },
        actions: {
          reschedule: 'समय सार्नुहोस्',
          saveSlot: 'नयाँ समय सुरक्षित गर्नुहोस्',
          cancelReschedule: 'रद्द गर्नुहोस्',
          checkIn: 'चेक-इन',
          complete: 'सम्पन्न चिन्ह लगाउनुहोस्',
          cancelBooking: 'बुकिङ रद्द गर्नुहोस्',
          restoreBooking: 'पुनः सक्रिय गर्नुहोस्',
          deleteBooking: 'हटाउनुहोस्',
          sendWhatsApp: 'WhatsApp',
          copyPass: 'पास कपी',
          copiedPass: 'कपी भयो',
          viewInManager: 'बुकिङ व्यवस्थापनमा हेर्नुहोस्',
          bookAnother: 'अर्को समय बुक गर्नुहोस्',
        },
        emptyTitle: 'अहिलेसम्म कुनै बुकिङ दर्ता भएको छैन',
        emptyDesc: 'बुक गरिएका अपोइन्टमेन्ट यहाँ देखिनेछन्, जहाँबाट समय सार्न, स्थिति अद्यावधिक गर्न वा WhatsApp पास पठाउन सकिन्छ।',
        emptyFilteredDesc: 'छानिएको स्थिति वा खोजसँग मिल्ने कुनै बुकिङ भेटिएन।',
        emptyCta: 'पहिलो समय बुक गर्नुहोस्',
        bookedToastTitle: 'अपोइन्टमेन्ट समय सुरक्षित भयो',
        bookedToastDesc: (ref) => `बुकिङ कोड ${ref} सुरक्षित गरिएको छ। तलबाट WhatsApp मा पठाउनुहोस्।`,
        updatedToastTitle: 'बुकिङ विवरण अद्यावधिक भयो',
        updatedToastDesc: (ref) => `बुकिङ कोड ${ref} मा गरिएको परिवर्तन सुरक्षित भयो।`,
      },
    },
    whatsappDrawer: {
      kicker: 'क्लिनिक सोधपुछ',
      title: 'WhatsApp परामर्श डेस्क',
      closeLabel: 'WhatsApp संवाद बन्द गर्नुहोस्',
      descConfiguredPrefix: 'क्लिनिक समय, ठेगाना वा अपोइन्टमेन्टबारे सोधपुछ गर्न',
      descConfiguredSuffix: 'मा सिधै WhatsApp सन्देश पठाउनुहोस्।',
      descUnconfigured: 'क्लिनिक WhatsApp नम्बर अझै सेट गरिएको छैन। अपोइन्टमेन्ट खण्डमा नम्बर राख्न वा तलको सन्देश कपी गर्न सक्नुहुन्छ।',
      enquiryMessage: 'नमस्ते डा. मोनिका कुमाल, म बकुलहर अस्पताल, रत्ननगरमा दन्त अपोइन्टमेन्ट र परामर्श समयबारे सोधपुछ गर्न चाहन्छु।',
      openWhatsApp: 'WhatsApp खोल्नुहोस्',
      goToForm: 'अपोइन्टमेन्ट फारममा जानुहोस्',
      copyMessage: 'सन्देश कपी गर्नुहोस्',
      copied: 'कपी भयो',
    },
    contactFooter: {
      kicker: 'सम्पर्क',
      title: 'तपाईंको मुस्कानको हेरचाह गरौँ।',
      subtitle: 'दन्त सेवाबारे कुनै जिज्ञासा छ? WhatsApp (+977 9713664352) मार्फत सम्पर्क गर्नुहोस् वा माथिको फारमबाट समय लिनुहोस्।',
      cta: 'WhatsApp मा कुरा गर्नुहोस्',
      floatingCta: 'WhatsApp च्याट',
      brandLine: 'डा. मोनिका कुमाल, BDS (स्वर्ण पदक विजेता) · दन्त चिकित्सक · बकुलहर अस्पताल, रत्ननगर',
      disclaimer: 'यो वेबसाइट सामान्य जानकारी र अपोइन्टमेन्ट सोधपुछका लागि मात्र हो, आकस्मिक उपचार वा निदानका लागि होइन।',
      orcidLabel: 'ORCID प्रोफाइल',
      rightsReserved: 'डा. मोनिका कुमाल। सर्वाधिकार सुरक्षित।',
    },
    toasts: {
      numberSavedTitle: 'क्लिनिक WhatsApp नम्बर सुरक्षित भयो',
      numberSavedDesc: 'अब सिधै WhatsApp अपोइन्टमेन्ट लिङ्क प्रयोग गर्न सकिन्छ।',
      requestReadyTitle: 'अपोइन्टमेन्ट अनुरोध तयार भयो',
      requestReadyDescWithNum: (name) =>
        `धन्यवाद, ${name}। अनुरोध पठाउन तलको "WhatsApp बाट पठाउनुहोस्" बटन थिच्नुहोस्।`,
      requestReadyDescNoNum: (name) =>
        `धन्यवाद, ${name}। तपाईंको सन्देश कपी गर्न वा पठाउन तल तयार छ।`,
      languageSwitchedTitle: 'वेबसाइट नेपाली भाषामा बदलियो',
      languageSwitchedDesc: 'सबै जानकारी, सेवा र अपोइन्टमेन्ट फारम नेपालीमा देखाइएको छ।',
    },
  },
};
