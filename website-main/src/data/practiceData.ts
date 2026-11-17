import type { AppointmentReasonKey, Language } from './translations';

export const DEFAULT_CLINIC_WHATSAPP = '9779713664352';
export const FORMATTED_CLINIC_WHATSAPP = '+977 9713664352';
export const WHATSAPP_STORAGE_KEY = 'monika_kumal_clinic_whatsapp';
export const BOOKINGS_STORAGE_KEY = 'monika_kumal_clinic_bookings_v1';
export const ORCID_URL = 'https://orcid.org/0000-0002-1019-6890';

export const PRACTICE_IMAGES = {
  portrait: '/assets/aistudio/WhatsApp_Image_2026-11-17_at_8.40.28_AM_603badd6.jpeg',
  clinicalPortrait: '/assets/aistudio/WhatsApp_Image_2026-11-17_at_8.39.49_AM_f20403c8.jpeg',
  clinicalTools: '/src/assets/images/dental_care_tools_1794917577093.jpg',
  clinicInterior: '/src/assets/images/dental_clinic_interior_1794917576448.jpg',
  waitingLounge: '/src/assets/images/clinic_waiting_lounge_1794919144014.jpg',
  imagingSuite: '/src/assets/images/dental_imaging_suite_1794919143567.jpg',
  serviceEndodontics: '/src/assets/images/service_endodontics_1794919986003.jpg',
  serviceRestorative: '/src/assets/images/service_restorative_1794919984953.jpg',
  serviceTrauma: '/src/assets/images/service_trauma_1794919985872.jpg',
  servicePaediatric: '/src/assets/images/service_paediatric_1794919986710.jpg',
  serviceOralEducation: '/src/assets/images/service_oral_education_1794919986306.jpg',
} as const;

export type ResearchCategory = 'all' | 'clinical' | 'patient-tech';

export type BookingStatus = 'confirmed' | 'checked-in' | 'completed' | 'cancelled';

export type VisitTypeKey = 'new-patient' | 'follow-up';

export interface ClinicTimeSlot {
  id: string;
  labelEn: string;
  labelNe: string;
  period: 'morning' | 'afternoon' | 'evening';
}

export const CLINIC_TIME_SLOTS: ClinicTimeSlot[] = [
  { id: '09:30', labelEn: '09:30 AM', labelNe: 'बिहान ०९:३०', period: 'morning' },
  { id: '10:15', labelEn: '10:15 AM', labelNe: 'बिहान १०:१५', period: 'morning' },
  { id: '11:00', labelEn: '11:00 AM', labelNe: 'बिहान ११:००', period: 'morning' },
  { id: '11:45', labelEn: '11:45 AM', labelNe: 'बिहान ११:४५', period: 'morning' },
  { id: '14:00', labelEn: '02:00 PM', labelNe: 'दिउँसो ०२:००', period: 'afternoon' },
  { id: '14:45', labelEn: '02:45 PM', labelNe: 'दिउँसो ०२:४५', period: 'afternoon' },
  { id: '15:30', labelEn: '03:30 PM', labelNe: 'दिउँसो ०३:३०', period: 'afternoon' },
  { id: '16:15', labelEn: '04:15 PM', labelNe: 'साँझ ०४:१५', period: 'evening' },
];

export const REASON_ESTIMATED_MINUTES: Record<AppointmentReasonKey, number> = {
  checkup: 30,
  toothache: 30,
  root_canal: 45,
  trauma: 30,
  paediatric: 30,
  gum: 30,
  other: 30,
};

export interface BookingRecord {
  id: string;
  referenceCode: string;
  patientName: string;
  phone: string;
  reasonKey: AppointmentReasonKey;
  visitType: VisitTypeKey;
  date: string;
  slotId: string;
  message: string;
  status: BookingStatus;
  createdAt: string;
}

export function generateBookingReference(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BK-${num}`;
}

export function getSlotLabel(slotId: string, language: Language): string {
  const found = CLINIC_TIME_SLOTS.find((slot) => slot.id === slotId);
  if (!found) return slotId;
  return language === 'ne' ? found.labelNe : found.labelEn;
}

export function sanitizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function isValidClinicWhatsApp(raw: string): boolean {
  const digits = sanitizePhoneDigits(raw);
  return /^\d{10,15}$/.test(digits) && !raw.includes('X');
}

export function buildWhatsAppUrl(clinicNumber: string, message: string): string | null {
  const digits = sanitizePhoneDigits(clinicNumber);
  if (!isValidClinicWhatsApp(digits)) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function formatAppointmentMessage(
  fields: {
    referenceCode?: string;
    name: string;
    phone: string;
    reasonLabel: string;
    visitTypeLabel?: string;
    date: string;
    timeLabel: string;
    message: string;
  },
  language: Language = 'en'
): string {
  if (language === 'ne') {
    return `नमस्ते डा. मोनिका कुमाल,

म बकुलहर अस्पताल, रत्ननगरमा दन्त परामर्शको लागि समय लिन चाहन्छु।
${fields.referenceCode ? `\nबुकिङ कोड: ${fields.referenceCode}` : ''}
बिरामीको नाम: ${fields.name.trim()}
फोन नम्बर: ${fields.phone.trim()}${fields.visitTypeLabel ? `\nभेटको प्रकार: ${fields.visitTypeLabel}` : ''}
आउनुको कारण: ${fields.reasonLabel}
चाहिएको मिति: ${fields.date || 'कुनै पनि मिति उपयुक्त'}
चाहिएको समय: ${fields.timeLabel}

थप सन्देश:
${fields.message.trim() || 'उल्लेख गरिएको छैन'}

कृपया उपलब्ध समय र परामर्श विवरण जानकारी गराइदिनुहोला।

धन्यवाद।`;
  }

  return `Hello Dr. Monika Kumal,

I would like to request a dental appointment at Bakulahar Hospital, Ratnanagar.
${fields.referenceCode ? `\nBooking Reference: ${fields.referenceCode}` : ''}
Patient name: ${fields.name.trim()}
Phone: ${fields.phone.trim()}${fields.visitTypeLabel ? `\nVisit type: ${fields.visitTypeLabel}` : ''}
Reason for visit: ${fields.reasonLabel}
Preferred date: ${fields.date || 'Flexible'}
Preferred time: ${fields.timeLabel}

Additional message:
${fields.message.trim() || 'Not provided'}

Please let me know the available appointment time and consultation details.

Thank you.`;
}
