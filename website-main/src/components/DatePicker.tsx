import { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Language, LocalizedContent } from '../data/translations';

interface DatePickerProps {
  id: string;
  value: string;
  minDate: string;
  onChange: (nextDate: string) => void;
  language: Language;
  copy: LocalizedContent['appointment']['form']['datePicker'];
}

function parseIsoDate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  return new Date(year, month, day);
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function DatePicker({
  id,
  value,
  minDate,
  onChange,
  language,
  copy,
}: DatePickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const minDateObj = useMemo(() => parseIsoDate(minDate) ?? new Date(), [minDate]);
  const selectedDateObj = useMemo(() => parseIsoDate(value), [value]);

  const [isOpen, setIsOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>(() => {
    const initial = selectedDateObj ?? minDateObj;
    return { year: initial.getFullYear(), month: initial.getMonth() };
  });

  // Sync viewed month when opening if a date is already chosen
  useEffect(() => {
    if (isOpen) {
      const target = selectedDateObj ?? minDateObj;
      setViewMonth({ year: target.getFullYear(), month: target.getMonth() });
    }
  }, [isOpen, selectedDateObj, minDateObj]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    function handleMouseDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen]);

  const localeTag = language === 'ne' ? 'ne-NP' : 'en-US';

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(localeTag, { weekday: 'short' });
    // Jan 4, 2026 is a Sunday
    return Array.from({ length: 7 }, (_, index) =>
      formatter.format(new Date(2026, 0, 4 + index))
    );
  }, [localeTag]);

  const monthHeaderLabel = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(localeTag, {
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(new Date(viewMonth.year, viewMonth.month, 1));
  }, [localeTag, viewMonth]);

  const formattedDisplayValue = useMemo(() => {
    if (!selectedDateObj) return '';
    const formatter = new Intl.DateTimeFormat(localeTag, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formatter.format(selectedDateObj);
  }, [localeTag, selectedDateObj]);

  const canGoPrevMonth =
    viewMonth.year > minDateObj.getFullYear() ||
    (viewMonth.year === minDateObj.getFullYear() &&
      viewMonth.month > minDateObj.getMonth());

  const calendarCells = useMemo(() => {
    const firstOfMonth = new Date(viewMonth.year, viewMonth.month, 1);
    const startWeekday = firstOfMonth.getDay();
    const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i += 1) {
      cells.push(null);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push(new Date(viewMonth.year, viewMonth.month, day));
    }
    return cells;
  }, [viewMonth]);

  const todayIso = toIsoDate(minDateObj);
  const tomorrowIso = toIsoDate(addDays(minDateObj, 1));
  const nextWeekIso = toIsoDate(addDays(minDateObj, 7));

  function handleSelectIso(nextIso: string) {
    onChange(nextIso);
    setIsOpen(false);
  }

  function handleStepMonth(delta: -1 | 1) {
    if (delta === -1 && !canGoPrevMonth) return;
    setViewMonth((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`w-full flex items-center gap-2.5 pl-3.5 py-3 text-left text-sm border rounded-md bg-[#fcfdfb] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#287873] ${
            value ? 'pr-10 border-[#287873]/50 text-[#123f43]' : 'pr-3.5 border-[#d5e0db] text-[#7b8e8a]'
          }`}
        >
          <Calendar className="w-4 h-4 text-[#287873] shrink-0" aria-hidden="true" />
          <span className="truncate font-medium tabular-nums">
            {formattedDisplayValue || copy.placeholder}
          </span>
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={copy.clearLabel}
            className="absolute right-2 inline-flex items-center justify-center w-8 h-8 rounded-md text-[#607774] hover:text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#287873]"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label={copy.placeholder}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 2 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full mt-2 z-30 w-full sm:w-[320px] bg-white border border-[#cddbd4] rounded-lg shadow-xl p-4"
          >
            {/* Quick date suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pb-3 border-b border-[#e8efeb]">
              {[
                { label: copy.todayShortcut, iso: todayIso },
                { label: copy.tomorrowShortcut, iso: tomorrowIso },
                { label: copy.nextWeekShortcut, iso: nextWeekIso },
              ].map((shortcut) => {
                const isSelected = value === shortcut.iso;
                return (
                  <button
                    key={shortcut.iso}
                    type="button"
                    onClick={() => handleSelectIso(shortcut.iso)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#123f43] text-white border-[#123f43]'
                        : 'bg-[#f6faf8] text-[#123f43] border-[#dce7e1] hover:bg-[#edf5f1]'
                    }`}
                  >
                    {shortcut.label}
                  </button>
                );
              })}
            </div>

            {/* Month switcher */}
            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleStepMonth(-1)}
                disabled={!canGoPrevMonth}
                aria-label={copy.prevMonthLabel}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-[#123f43] hover:bg-[#edf5f1] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <p className="text-sm font-semibold text-[#123f43]">{monthHeaderLabel}</p>

              <button
                type="button"
                onClick={() => handleStepMonth(1)}
                aria-label={copy.nextMonthLabel}
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-[#123f43] hover:bg-[#edf5f1] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Weekday header */}
            <div className="mt-3 grid grid-cols-7 gap-1 text-center">
              {weekdayLabels.map((dayLabel, idx) => (
                <span
                  key={`${dayLabel}-${idx}`}
                  className="text-[11px] font-medium text-[#607774] py-1"
                >
                  {dayLabel}
                </span>
              ))}
            </div>

            {/* Calendar days */}
            <div className="mt-1 grid grid-cols-7 gap-1">
              {calendarCells.map((cellDate, idx) => {
                if (!cellDate) {
                  return <div key={`empty-${idx}`} aria-hidden="true" className="h-9" />;
                }

                const cellIso = toIsoDate(cellDate);
                const isPast = cellIso < minDate;
                const isSelected = value === cellIso;
                const isToday = cellIso === todayIso;

                return (
                  <button
                    key={cellIso}
                    type="button"
                    disabled={isPast}
                    onClick={() => handleSelectIso(cellIso)}
                    aria-pressed={isSelected}
                    className={`h-9 w-full rounded-md text-xs font-medium tabular-nums transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#287873] ${
                      isPast
                        ? 'text-[#b8c6c2] cursor-not-allowed'
                        : isSelected
                          ? 'bg-[#123f43] text-white font-semibold'
                          : isToday
                            ? 'border border-[#287873] text-[#123f43] hover:bg-[#edf5f1] font-semibold'
                            : 'text-[#263f40] hover:bg-[#edf5f1] hover:text-[#123f43]'
                    }`}
                  >
                    {cellDate.getDate()}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 pt-2.5 border-t border-[#eef3f0] text-[11px] text-[#607774] leading-snug">
              {copy.helperNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
