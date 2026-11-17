import { useEffect, useRef } from 'react';
import type { Language } from '../data/translations';

interface GoogleAdSlotProps {
  slotId?: string;
  language: Language;
  format?: 'auto' | 'horizontal' | 'rectangle';
}

const ADSENSE_SCRIPT_ID = 'google-adsense-script';

function ensureAdSenseInitialized(clientId: string) {
  if (!clientId || !clientId.startsWith('ca-pub-')) return;

  // Add Google AdSense account verification meta tag
  let metaTag = document.head.querySelector<HTMLMetaElement>('meta[name="google-adsense-account"]');
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.name = 'google-adsense-account';
    document.head.appendChild(metaTag);
  }
  metaTag.content = clientId;

  // Load Google AdSense script once
  if (!document.getElementById(ADSENSE_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
    document.head.appendChild(script);
  }
}

export function GoogleAdSlot({ slotId, language, format = 'auto' }: GoogleAdSlotProps) {
  const clientId = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT?.trim() || '';
  const resolvedSlot = slotId?.trim() || '';
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  const isClientConfigured = /^ca-pub-\d{10,20}$/.test(clientId);

  useEffect(() => {
    if (!isClientConfigured) return;
    ensureAdSenseInitialized(clientId);

    if (!resolvedSlot || pushedRef.current || !adRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      // AdSense script may be blocked by browser extensions
    }
  }, [clientId, isClientConfigured, resolvedSlot]);

  // Only render visible ad container when a real AdSense publisher ID and ad slot ID are configured
  if (!isClientConfigured || !resolvedSlot) {
    return null;
  }

  return (
    <aside
      aria-label={language === 'ne' ? 'प्रायोजित विज्ञापन' : 'Advertisement'}
      className="py-6 bg-[#fbfaf7] border-b border-[#e3ebe6]"
    >
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <p className="text-[11px] text-[#758985] mb-2">
          {language === 'ne' ? 'प्रायोजित जानकारी' : 'Advertisement'}
        </p>
        <div className="bg-white border border-[#e3ebe6] rounded-md p-2 min-h-[100px] overflow-hidden">
          <ins
            ref={adRef}
            className="adsbygoogle block w-full"
            data-ad-client={clientId}
            data-ad-slot={resolvedSlot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </aside>
  );
}
