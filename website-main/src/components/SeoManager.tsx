import { useEffect } from 'react';
import type { Language } from '../data/translations';

interface SeoManagerProps {
  language: Language;
}

const SEO_META: Record<Language, { title: string; description: string }> = {
  en: {
    title: 'Dr. Monika Kumal, BDS | Gold Medalist Dental Surgeon',
    description:
      'Book dental consultations with Gold Medalist Dr. Monika Kumal, BDS at Bakulahar Hospital, Ratnanagar. Endodontics, restorative, trauma & paediatric care.',
  },
  ne: {
    title: 'डा. मोनिका कुमाल, BDS | स्वर्ण पदक विजेता दन्त चिकित्सक',
    description:
      'बकुलहर अस्पताल, रत्ननगरमा कार्यरत स्वर्ण पदक विजेता दन्त चिकित्सक डा. मोनिका कुमालसँग दन्त परामर्श, रूट क्यानाल र बाल दन्त सेवाको समय लिनुहोस्।',
  },
};

function upsertMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function SeoManager({ language }: SeoManagerProps) {
  useEffect(() => {
    const meta = SEO_META[language];
    document.title = meta.title;

    upsertMetaTag('name', 'description', meta.description);
    upsertMetaTag('property', 'og:title', meta.title);
    upsertMetaTag('property', 'og:description', meta.description);
    upsertMetaTag('name', 'twitter:title', meta.title);
    upsertMetaTag('name', 'twitter:description', meta.description);

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    upsertMetaTag('property', 'og:url', canonicalUrl);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [language]);

  return null;
}
