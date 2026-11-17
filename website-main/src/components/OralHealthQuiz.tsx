import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { TRANSLATIONS, type AppointmentReasonKey, type Language } from '../data/translations';

type AnswerValue = 'good' | 'fair' | 'needs-care';

interface OralHealthQuizProps {
  language: Language;
  onSelectReason: (reasonKey: AppointmentReasonKey) => void;
}

export function OralHealthQuiz({ language, onSelectReason }: OralHealthQuizProps) {
  const prefersReducedMotion = useReducedMotion();
  const copy = TRANSLATIONS[language].oralHealthQuiz;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const questions = copy.questions;
  const activeQuestion = questions[currentStep];
  const selectedAnswer = answers[activeQuestion.id];

  const answeredCount = questions.filter((q) => Boolean(answers[q.id])).length;
  const allAnswered = answeredCount === questions.length;

  function handleSelectOption(value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: value }));
  }

  function handleNext() {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (allAnswered) {
      setShowResults(true);
    }
  }

  function handleReset() {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setCopied(false);
  }

  // Compute personalized summary and recommended consultation reason
  const needsCareCount = questions.filter((q) => answers[q.id] === 'needs-care').length;
  const fairCount = questions.filter((q) => answers[q.id] === 'fair').length;

  const summaryMessage =
    needsCareCount > 0
      ? copy.resultsSummaryAttention
      : fairCount >= 2
        ? copy.resultsSummaryModerate
        : copy.resultsSummaryStrong;

  const recommendedReason: AppointmentReasonKey =
    answers.symptoms === 'needs-care'
      ? 'toothache'
      : answers.symptoms === 'fair'
        ? 'gum'
        : 'checkup';

  const personalizedTips = questions.map((q) => {
    const val = answers[q.id] ?? 'fair';
    const matched = q.options.find((opt) => opt.value === val) ?? q.options[0];
    return {
      id: q.id,
      number: q.number,
      topic: q.topic,
      tip: matched.tip,
    };
  });

  async function handleCopyTips() {
    const text = [
      copy.resultsHeading,
      summaryMessage,
      '',
      ...personalizedTips.map((item) => `${item.number}. ${item.topic}: ${item.tip}`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="oral-quiz" className="py-16 md:py-24 bg-white border-b border-[#e3ebe6]">
      <div className="max-w-[1180px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left column: quiz intro & step indicator */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#287873]">{copy.kicker}</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-medium text-[#123f43] [text-wrap:balance]">
              {copy.title}
            </h2>
            <p className="mt-4 text-base leading-[1.7] text-[#516866]">{copy.subtitle}</p>

            {/* Interactive step jump index */}
            <div className="mt-8 space-y-2 border-t border-[#e5ede8] pt-6">
              {questions.map((q, idx) => {
                const isDone = Boolean(answers[q.id]);
                const isCurrent = !showResults && currentStep === idx;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setShowResults(false);
                      setCurrentStep(idx);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-md flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-[#edf5f1] text-[#123f43] font-semibold'
                        : 'text-[#516866] hover:bg-[#f7faf8] hover:text-[#123f43]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm min-w-0">
                      <span className="text-xs tabular-nums text-[#287873]">{q.number}</span>
                      <span className="truncate">{q.topic}</span>
                    </span>
                    {isDone && (
                      <CheckCircle2
                        className="w-4 h-4 text-[#168b57] shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-6 text-xs leading-[1.6] text-[#6d7f7c]">{copy.disclaimer}</p>
          </div>

          {/* Right column: interactive question or personalized tips panel */}
          <div className="lg:col-span-7 bg-[#fbfaf7] border border-[#dce6e0] rounded-lg p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={activeQuestion.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center justify-between gap-4 text-xs text-[#607774] tabular-nums">
                    <span>
                      {copy.stepLabel} {currentStep + 1} / {questions.length}
                    </span>
                    <span>{activeQuestion.topic}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-medium text-[#123f43] leading-snug">
                    {activeQuestion.prompt}
                  </h3>

                  <div className="mt-6 space-y-3" role="radiogroup" aria-label={activeQuestion.prompt}>
                    {activeQuestion.options.map((option) => {
                      const isSelected = selectedAnswer === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => handleSelectOption(option.value)}
                          className={`w-full text-left p-4 rounded-md border flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-white border-[#123f43] text-[#123f43] shadow-xs'
                              : 'bg-white border-[#dce6e0] text-[#4e6462] hover:border-[#9eb9b0] hover:text-[#123f43]'
                          }`}
                        >
                          <span className="text-sm font-medium">{option.label}</span>
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#123f43] bg-[#123f43] text-white'
                                : 'border-[#b9cbc3] bg-transparent'
                            }`}
                            aria-hidden="true"
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Step Controls */}
                  <div className="mt-8 pt-5 border-t border-[#e3ebe6] flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={currentStep === 0}
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3 text-sm font-medium text-[#516866] hover:text-[#123f43] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                      <span>{copy.prevButton}</span>
                    </button>

                    {currentStep < questions.length - 1 ? (
                      <button
                        type="button"
                        disabled={!selectedAnswer}
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 min-h-[42px] bg-[#123f43] hover:bg-[#0d3135] disabled:opacity-45 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                      >
                        <span>{copy.nextButton}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={!allAnswered}
                        onClick={() => setShowResults(true)}
                        className="inline-flex items-center gap-2 min-h-[42px] bg-[#168b57] hover:bg-[#127347] disabled:opacity-45 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors cursor-pointer"
                      >
                        <span>{copy.finishButton}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz-results"
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="pb-5 border-b border-[#e3ebe6]">
                    <p className="text-xs font-medium text-[#287873]">{copy.kicker}</p>
                    <h3 className="mt-1 font-serif text-2xl font-medium text-[#123f43]">
                      {copy.resultsHeading}
                    </h3>
                    <p className="mt-2 text-sm leading-[1.65] text-[#4e6462]">{summaryMessage}</p>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {personalizedTips.map((item) => (
                      <li
                        key={item.id}
                        className="p-4 bg-white border border-[#dce6e0] rounded-md"
                      >
                        <p className="text-xs font-semibold text-[#287873] tabular-nums">
                          {item.number} · {item.topic}
                        </p>
                        <p className="mt-1 text-sm leading-[1.65] text-[#263f40]">{item.tip}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-[#e3ebe6] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSelectReason(recommendedReason)}
                        className="inline-flex items-center gap-2 min-h-[42px] bg-[#123f43] hover:bg-[#0d3135] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>{copy.bookCtaLabel}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyTips}
                        className="inline-flex items-center gap-2 min-h-[42px] bg-white hover:bg-[#edf5f1] text-[#123f43] border border-[#cad8d1] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-[#168b57]" aria-hidden="true" />
                            <span>{copy.copiedButton}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" aria-hidden="true" />
                            <span>{copy.copyTipsButton}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-2 text-xs sm:text-sm font-medium text-[#516866] hover:text-[#123f43] cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{copy.retakeButton}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
