import { useState } from 'react';
import { Stethoscope } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle = 'Dr. Monika Kumal · BDS',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#edf5f1] via-[#e2eee8] to-[#d6e7df] text-[#123f43] p-8 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-full border border-[#123f43]/15 bg-white/80 flex items-center justify-center mb-4">
          <Stethoscope className="w-5 h-5 text-[#287873]" aria-hidden="true" />
        </div>
        <p className="font-serif text-lg font-medium text-[#123f43]">{fallbackTitle}</p>
        <p className="text-xs text-[#516866] mt-1">{fallbackSubtitle}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
