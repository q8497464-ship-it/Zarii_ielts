import { useState } from 'react';
import {
  Briefcase,
  Target,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  GraduationCap,
  Award,
  Zap,
  X,
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Input, Label } from '../../components/ui/Input';
import { ZariiLogo } from '../../components/ui/ZariiLogo';
import { copy } from '../../lib/copy';
import { cn } from '../../lib/utils';
import { extractCandidateName, isPlaceholderName } from '../../shared/utils/candidateUtils';
import type { TestType, EnglishProficiencyLevel } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onFinish?: () => void;
}

export function OnboardingModal({ isOpen, onFinish }: OnboardingModalProps) {
  const { profile, updateProfile, addToast } = useAppStore();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [testType, setTestType] = useState<TestType>('academic');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [currentLevel, setCurrentLevel] = useState<EnglishProficiencyLevel>('intermediate');
  const [dailyStudyMinutes, setDailyStudyMinutes] = useState<number>(45);
  const [isExamBooked, setIsExamBooked] = useState<boolean>(false);
  const [examDate, setExamDate] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>(() => {
    return extractCandidateName(null, profile?.displayName) || '';
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const bandOptions = [5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];

  const levelOptions: { id: EnglishProficiencyLevel; label: string; desc: string; bandEst: string }[] = [
    {
      id: 'beginner',
      label: 'Beginner / Foundation',
      desc: 'Can understand basic everyday phrases, struggle with complex academic reading/listening.',
      bandEst: '~Band 4.5',
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      desc: 'Can grasp general meaning, but make frequent grammar and vocabulary slips.',
      bandEst: '~Band 5.5',
    },
    {
      id: 'upper_intermediate',
      label: 'Upper Intermediate',
      desc: 'Comfortable speaking and reading, aiming for high precision, nuance, and fluency.',
      bandEst: '~Band 6.5',
    },
    {
      id: 'advanced',
      label: 'Advanced',
      desc: 'High fluency, looking to secure top marks (Band 8.0+) with exam-specific strategy.',
      bandEst: '~Band 7.5+',
    },
  ];

  const studyTimeOptions = [15, 30, 45, 60, 90];

  const handleSaveAndShowCelebration = async () => {
    setIsSubmitting(true);
    try {
      const clean = displayName.trim();
      const finalName = clean && !isPlaceholderName(clean)
        ? clean
        : (extractCandidateName(null, profile?.displayName) || 'Candidate');

      if (clean && !isPlaceholderName(clean)) {
        localStorage.setItem('zarii_candidate_name', clean);
      }

      await updateProfile({
        testType,
        targetBand,
        currentLevel,
        dailyStudyMinutes,
        isExamBooked,
        examDate: isExamBooked ? examDate : '',
        displayName: finalName,
        onboardingCompleted: true,
      });

      addToast({
        type: 'success',
        title: 'Profile Saved!',
        message: `Your study plan is configured for ${testType.toUpperCase()} Band ${targetBand}.`,
      });

      // Advance to Step 4: Celebration Screen
      setStep(4);
    } catch (err) {
      console.error(err);
      addToast({
        type: 'error',
        title: 'Error saving profile',
        message: 'Could not save profile to local database.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border shadow-2xl overflow-hidden my-6">
        {/* Brand Header */}
        <div className="bg-gradient-to-r from-[#124F40] to-[#0E3D32] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <ZariiLogo variant="mark-wordmark" size="sm" theme="dark" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xs font-mono font-bold uppercase tracking-wider text-[#B6E3CD] bg-[#0A2E25]/60 px-2.5 py-1 rounded-full border border-[#5BB78D]/30">
              {step === 4 ? 'Complete' : `Step ${step} of 3`}
            </span>
            <button
              onClick={onFinish}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Skip onboarding"
              title="Skip for now"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress in Mint */}
        <div className="h-1.5 w-full bg-brand-100 dark:bg-brand-900/40">
          <div
            className="h-full bg-brand-400 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* Top Encouragement Headings (Steps 1 to 3) */}
          {step < 4 && (
            <div className="text-center max-w-md mx-auto mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                {step === 1 && copy.onboarding.step1Title}
                {step === 2 && copy.onboarding.step2Title}
                {step === 3 && copy.onboarding.step3Title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed">
                {step === 1 && copy.onboarding.step1Subtitle}
                {step === 2 && copy.onboarding.step2Subtitle}
                {step === 3 && copy.onboarding.step3Subtitle}
              </p>
            </div>
          )}

          {/* STEP 1: Exam Type & Candidate Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card
                  onClick={() => setTestType('academic')}
                  className={cn(
                    'p-5 cursor-pointer transition-all border-2 flex flex-col justify-between hover:shadow-md',
                    testType === 'academic'
                      ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                      : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 stroke-[2]" />
                      </div>
                      {testType === 'academic' && (
                        <div className="w-6 h-6 rounded-full bg-brand-700 dark:bg-brand-400 text-white dark:text-brand-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-brand-neutral-main dark:text-brand-dark-text">
                      {copy.onboarding.academicTitle}
                    </h3>
                    <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                      {copy.onboarding.academicDesc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-neutral-border/60 dark:border-brand-dark-border/60 text-2xs font-semibold text-brand-700 dark:text-brand-300">
                    Includes Academic Reading &amp; Task 1 Charts
                  </div>
                </Card>

                <Card
                  onClick={() => setTestType('general')}
                  className={cn(
                    'p-5 cursor-pointer transition-all border-2 flex flex-col justify-between hover:shadow-md',
                    testType === 'general'
                      ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                      : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/60 text-brand-800 dark:text-brand-300 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 stroke-[2]" />
                      </div>
                      {testType === 'general' && (
                        <div className="w-6 h-6 rounded-full bg-brand-700 dark:bg-brand-400 text-white dark:text-brand-950 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-base text-brand-neutral-main dark:text-brand-dark-text">
                      {copy.onboarding.generalTitle}
                    </h3>
                    <p className="text-xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                      {copy.onboarding.generalDesc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-neutral-border/60 dark:border-brand-dark-border/60 text-2xs font-semibold text-brand-700 dark:text-brand-300">
                    Includes Workplace Texts &amp; Task 1 Letters
                  </div>
                </Card>
              </div>

              <div>
                <Label htmlFor="displayName">Your Preferred Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Alex"
                  leftIcon={<User className="w-4 h-4" />}
                  helperText="Displayed on your Test Report Forms and personal progress cards."
                />
              </div>
            </div>
          )}

          {/* STEP 2: Target Band & Current Level */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Target Overall Band Score</Label>
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-brand-100 dark:bg-brand-900 text-brand-800 dark:text-brand-300">
                    Target: Band {targetBand.toFixed(1)}
                  </span>
                </div>
                <div className="grid grid-cols-9 gap-1.5 sm:gap-2">
                  {bandOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setTargetBand(b)}
                      className={cn(
                        'h-11 sm:h-12 rounded-xl font-bold font-mono text-xs sm:text-sm flex flex-col items-center justify-center transition-all',
                        targetBand === b
                          ? 'bg-brand-800 text-white dark:bg-brand-400 dark:text-brand-950 shadow-md scale-105'
                          : 'bg-brand-neutral-bg dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border text-brand-neutral-main dark:text-brand-dark-text hover:border-brand-300'
                      )}
                    >
                      {b.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Estimated Current English Level</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {levelOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setCurrentLevel(opt.id)}
                      className={cn(
                        'p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3',
                        currentLevel === opt.id
                          ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                          : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center',
                          currentLevel === opt.id
                            ? 'border-brand-700 bg-brand-700 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-brand-950'
                            : 'border-brand-neutral-muted'
                        )}
                      >
                        {currentLevel === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-brand-neutral-main dark:text-brand-dark-text">
                            {opt.label}
                          </span>
                          <span className="text-2xs font-mono text-brand-neutral-muted dark:text-brand-dark-muted">
                            {opt.bandEst}
                          </span>
                        </div>
                        <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Study Time & Exam Booking */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label>Daily Practice Commitment</Label>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {studyTimeOptions.map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setDailyStudyMinutes(mins)}
                      className={cn(
                        'py-3 rounded-xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center transition-all',
                        dailyStudyMinutes === mins
                          ? 'bg-brand-800 text-white dark:bg-brand-400 dark:text-brand-950 shadow-md'
                          : 'bg-brand-neutral-bg dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border text-brand-neutral-main dark:text-brand-dark-text hover:border-brand-300'
                      )}
                    >
                      <span>{mins}</span>
                      <span className="text-2xs font-normal opacity-80">mins/day</span>
                    </button>
                  ))}
                </div>
                <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-2">
                  We recommend at least 45 minutes daily to reinforce vocabulary retention and exam pacing.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-brand-neutral-border dark:border-brand-dark-border bg-brand-neutral-bg dark:bg-brand-dark-surface space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-brand-neutral-main dark:text-brand-dark-text">
                      Have you already booked your official exam date?
                    </span>
                    <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted">
                      Setting your exam date activates your study plan countdown and milestones.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isExamBooked}
                    onChange={(e) => setIsExamBooked(e.target.checked)}
                    className="w-5 h-5 rounded border-brand-neutral-border text-brand-700 focus:ring-brand-300"
                  />
                </div>

                {isExamBooked && (
                  <div className="pt-2 animate-in fade-in duration-200">
                    <Label htmlFor="examDate">Official Exam Date</Label>
                    <Input
                      id="examDate"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                      leftIcon={<Calendar className="w-4 h-4" />}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Final Celebration Screen ("Welcome to Zarii") */}
          {step === 4 && (
            <div className="text-center space-y-6 py-2 animate-in fade-in zoom-in-95 duration-300">
              {/* Glowing Mark Avatar */}
              <div className="relative inline-flex items-center justify-center p-4 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-dark-border shadow-inner">
                <div className="absolute inset-0 rounded-full bg-brand-400 opacity-20 blur-md pointer-events-none" />
                <ZariiLogo variant="mark" size="xl" />
              </div>

              <div>
                <Badge variant="primary" dot className="mb-2">
                  Profile Activated
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                  {copy.onboarding.step4Title(displayName)}
                </h2>
                <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted max-w-md mx-auto mt-1.5 leading-relaxed">
                  {copy.onboarding.step4Subtitle}
                </p>
              </div>

              {/* Profile Summary Pills */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-brand-neutral-bg dark:bg-brand-dark-surface border border-brand-neutral-border dark:border-brand-dark-border text-center">
                <div className="space-y-0.5">
                  <div className="text-2xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase">Target Band</div>
                  <div className="text-lg sm:text-xl font-bold font-mono text-brand-800 dark:text-brand-400">
                    {targetBand.toFixed(1)}
                  </div>
                </div>
                <div className="space-y-0.5 border-x border-brand-neutral-border dark:border-brand-dark-border">
                  <div className="text-2xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase">Track</div>
                  <div className="text-xs sm:text-sm font-bold text-brand-neutral-main dark:text-brand-dark-text capitalize">
                    {testType}
                  </div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase">Daily Goal</div>
                  <div className="text-xs sm:text-sm font-bold text-brand-neutral-main dark:text-brand-dark-text">
                    {dailyStudyMinutes} mins
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-dark-border text-xs text-brand-800 dark:text-brand-300 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{copy.onboarding.nextStepDiagnostic}</span>
              </div>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-neutral-border dark:border-brand-dark-border">
            {step > 1 && step < 4 ? (
              <Button
                variant="outline"
                size="md"
                onClick={() => setStep((s) => (s - 1) as any)}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep((s) => (s + 1) as any)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            )}

            {step === 3 && (
              <Button
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                onClick={handleSaveAndShowCelebration}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Finish Setup
              </Button>
            )}

            {step === 4 && (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => onFinish?.()}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="bg-brand-800 hover:bg-brand-700 text-white dark:bg-brand-400 dark:text-brand-950 font-bold"
              >
                Start IELTS Preparation
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
