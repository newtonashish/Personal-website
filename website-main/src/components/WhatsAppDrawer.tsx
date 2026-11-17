import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy, X } from 'lucide-react';
import {
  buildWhatsAppUrl,
  isValidClinicWhatsApp,
  sanitizePhoneDigits,
} from '../data/practiceData';
import { TRANSLATIONS, type Language } from '../data/translations';

interface WhatsAppDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  clinicWhatsApp: string;
  onJumpToAppointment: () => void;
}

export function WhatsAppDrawer({
  language,
  isOpen,
  onClose,
  clinicWhatsApp,
  onJumpToAppointment,
}: WhatsAppDrawerProps) {
  const [copied, setCopied] = useState(false);
  const copy = TRANSLATIONS[language].whatsappDrawer;

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const waUrl = buildWhatsAppUrl(clinicWhatsApp, copy.enquiryMessage);
  const isConfigured = isValidClinicWhatsApp(clinicWhatsApp);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copy.enquiryMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-dialog-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#0c3033]/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-[#dce6e0] rounded-lg shadow-xl p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#287873]">{copy.kicker}</p>
            <h3 id="whatsapp-dialog-title" className="mt-1 font-serif text-2xl font-medium text-[#123f43]">
              {copy.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeLabel}
            className="w-10 h-10 inline-flex items-center justify-center rounded-md text-[#516866] hover:text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm leading-[1.6] text-[#516866]">
          {isConfigured
            ? `${copy.descConfiguredPrefix} +${sanitizePhoneDigits(clinicWhatsApp)} ${copy.descConfiguredSuffix}`
            : copy.descUnconfigured}
        </p>

        <div className="p-3.5 bg-[#f5f8f4] border border-[#dce6e0] rounded-md text-xs leading-[1.6] text-[#263f40]">
          {copy.enquiryMessage}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {waUrl ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[42px] bg-[#168b57] hover:bg-[#127347] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors whitespace-nowrap"
            >
              <span>{copy.openWhatsApp}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onJumpToAppointment();
              }}
              className="inline-flex items-center justify-center min-h-[42px] bg-[#123f43] hover:bg-[#0d3135] text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              {copy.goToForm}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 min-h-[42px] bg-white hover:bg-[#edf5f1] text-[#123f43] border border-[#cad8d1] text-sm font-medium px-4 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#168b57]" aria-hidden="true" />
                <span>{copy.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" aria-hidden="true" />
                <span>{copy.copyMessage}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
