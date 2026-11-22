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
  Languages,
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
import type { TestType, EnglishProficiencyLevel, LearningTrack, EnglishCEFRLevel } from '../../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onFinish?: () => void;
}

export function OnboardingModal({ isOpen, onFinish }: OnboardingModalProps) {
  const { profile, updateProfile, addToast, setCurrentTrack } = useAppStore();

  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [trackChoice, setTrackChoice] = useState<'english' | 'ielts' | 'both'>('both');
  const [urduHints, setUrduHints] = useState<boolean>(true);
  const [englishLevel, setEnglishLevel] = useState<EnglishCEFRLevel>('A1');
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

  const cefrOptions: { id: EnglishCEFRLevel; label: string; desc: string }[] = [
    { id: 'A1', label: 'A1 - Beginner Foundations', desc: 'Starting from zero or basic greetings and simple words.' },
    { id: 'A2', label: 'A2 - Elementary English', desc: 'Basic routine conversations, simple past & present questions.' },
    { id: 'B1', label: 'B1 - Intermediate', desc: 'Can express opinions, understand main points of work and travel.' },
    { id: 'B2', label: 'B2 - Upper Intermediate', desc: 'Fluent communication, complex ideas, and academic readiness.' },
    { id: 'C1', label: 'C1 - Advanced Fluency', desc: 'Near-native articulation, nuanced expressions, professional mastery.' },
  ];

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

      const goals: LearningTrack[] = trackChoice === 'english'
        ? ['english']
        : trackChoice === 'ielts'
        ? ['ielts']
        : ['ielts', 'english'];

      const primaryTrack: LearningTrack = trackChoice === 'english' ? 'english' : 'ielts';

      await updateProfile({
        goals,
        primaryTrack,
        englishLevel,
        urduHints,
        testType,
        targetBand,
        currentLevel,
        dailyStudyMinutes,
        isExamBooked,
        examDate: isExamBooked ? examDate : '',
        displayName: finalName,
        onboardingCompleted: true,
      });

      setCurrentTrack(primaryTrack);

      addToast({
        type: 'success',
        title: 'Profile Saved!',
        message: `Your learning plan is configured for ${primaryTrack === 'english' ? 'General English Course' : `IELTS Band ${targetBand}`}.`,
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
              {step === 4 ? 'Complete' : step === 0 ? 'Getting Started' : `Step ${step} of 3`}
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
            style={{ width: `${((step + 1) / 5) * 100}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* STEP 0: Track Selection */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="text-center max-w-md mx-auto mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                  What do you want to do?
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed">
                  Choose your learning goal. You can always access both tracks anytime.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Option 1: English Course */}
                <Card
                  onClick={() => setTrackChoice('english')}
                  className={cn(
                    'p-5 cursor-pointer transition-all border-2 flex flex-col justify-between hover:shadow-md text-left',
                    trackChoice === 'english'
                      ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                      : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                  )}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center mb-3">
                      <GraduationCap className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text">
                      Learn English from basics
                    </h3>
                    <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                      Structured A1 to C1 curriculum, grammar rules, dialogues, and pronunciation.
                    </p>
                  </div>
                  {trackChoice === 'english' && (
                    <div className="mt-3 flex items-center gap-1 text-2xs font-bold text-emerald-700 dark:text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}
                </Card>

                {/* Option 2: IELTS Prep */}
                <Card
                  onClick={() => setTrackChoice('ielts')}
                  className={cn(
                    'p-5 cursor-pointer transition-all border-2 flex flex-col justify-between hover:shadow-md text-left',
                    trackChoice === 'ielts'
                      ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                      : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                  )}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 flex items-center justify-center mb-3">
                      <Target className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text">
                      Prepare for IELTS
                    </h3>
                    <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                      Full mock exams, Reading, Listening, AI Writing & Speaking grading.
                    </p>
                  </div>
                  {trackChoice === 'ielts' && (
                    <div className="mt-3 flex items-center gap-1 text-2xs font-bold text-teal-700 dark:text-teal-400">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}
                </Card>

                {/* Option 3: Both */}
                <Card
                  onClick={() => setTrackChoice('both')}
                  className={cn(
                    'p-5 cursor-pointer transition-all border-2 flex flex-col justify-between hover:shadow-md text-left',
                    trackChoice === 'both'
                      ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                      : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                  )}
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5 stroke-[2]" />
                    </div>
                    <h3 className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text">
                      Both (Recommended)
                    </h3>
                    <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-1 leading-relaxed">
                      Build solid English foundations while training for high IELTS band scores.
                    </p>
                  </div>
                  {trackChoice === 'both' && (
                    <div className="mt-3 flex items-center gap-1 text-2xs font-bold text-amber-700 dark:text-amber-400">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </div>
                  )}
                </Card>
              </div>

              {/* Urdu Hints Preference */}
              <div className="p-4 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                    <Languages className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">
                      Show Urdu Hints &amp; Translations (اردو وضاحت)
                    </div>
                    <div className="text-2xs text-gray-500 dark:text-gray-400">
                      Displays bilingual vocabulary translations and grammar hints where helpful.
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={urduHints}
                  onChange={(e) => setUrduHints(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setStep(1)}
                  className="gap-2 bg-[#124F40] hover:bg-[#0d3b30] text-white"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Top Encouragement Headings (Steps 1 to 3) */}
          {step >= 1 && step < 4 && (
            <div className="text-center max-w-md mx-auto mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                {step === 1 && (trackChoice === 'english' ? 'Tell us your starting point' : copy.onboarding.step1Title)}
                {step === 2 && (trackChoice === 'english' ? 'Select your target English level' : copy.onboarding.step2Title)}
                {step === 3 && copy.onboarding.step3Title}
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted leading-relaxed">
                {step === 1 && (trackChoice === 'english' ? 'Personalize your English learning path.' : copy.onboarding.step1Subtitle)}
                {step === 2 && (trackChoice === 'english' ? 'Choose where you want to reach with Zarii.' : copy.onboarding.step2Subtitle)}
                {step === 3 && copy.onboarding.step3Subtitle}
              </p>
            </div>
          )}

          {/* STEP 1: Exam Type & Candidate Name */}
          {step === 1 && (
            <div className="space-y-6">
              {trackChoice !== 'english' ? (
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
              ) : (
                <div className="space-y-3">
                  <Label>Current CEFR English Level</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cefrOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setEnglishLevel(opt.id)}
                        className={cn(
                          'p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3',
                          englishLevel === opt.id
                            ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                            : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                        )}
                      >
                        <div
                          className={cn(
                            'w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center',
                            englishLevel === opt.id
                              ? 'border-brand-700 bg-brand-700 text-white dark:border-brand-400 dark:bg-brand-400 dark:text-brand-950'
                              : 'border-brand-neutral-muted'
                          )}
                        >
                          {englishLevel === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                        </div>
                        <div className="flex-1">
                          <span className="font-bold text-xs text-brand-neutral-main dark:text-brand-dark-text">
                            {opt.label}
                          </span>
                          <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
              {trackChoice !== 'english' ? (
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
              ) : (
                <div>
                  <Label>Target English Goal</Label>
                  <p className="text-xs text-gray-500 mb-3">Which level of fluency do you want to attain?</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cefrOptions.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setEnglishLevel(opt.id)}
                        className={cn(
                          'p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3',
                          englishLevel === opt.id
                            ? 'border-brand-700 bg-brand-50/60 dark:bg-brand-900/30 dark:border-brand-400'
                            : 'border-brand-neutral-border dark:border-brand-dark-border hover:border-brand-300'
                        )}
                      >
                        <div className="flex-1">
                          <span className="font-bold text-xs text-brand-neutral-main dark:text-brand-dark-text">
                            {opt.label}
                          </span>
                          <p className="text-2xs text-brand-neutral-muted dark:text-brand-dark-muted mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {trackChoice !== 'english' && (
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
              )}
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

              {trackChoice !== 'english' && (
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
              )}
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
                <h3 className="text-2xl font-bold tracking-tight text-brand-neutral-main dark:text-brand-dark-text">
                  Welcome to Zarii, {displayName || 'Candidate'}!
                </h3>
                <p className="text-xs sm:text-sm text-brand-neutral-muted dark:text-brand-dark-muted max-w-sm mx-auto mt-2 leading-relaxed">
                  Your personalized study dashboard is ready. All practice materials, mock exams, and dictionary are completely free.
                </p>
              </div>

              <div className="max-w-md mx-auto grid grid-cols-2 gap-3 p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-dark-border text-left">
                <div>
                  <span className="text-2xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase">
                    Primary Goal
                  </span>
                  <div className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text">
                    {trackChoice === 'english' ? 'English Course' : `IELTS Band ${targetBand}`}
                  </div>
                </div>
                <div>
                  <span className="text-2xs font-semibold text-brand-neutral-muted dark:text-brand-dark-muted uppercase">
                    Daily Goal
                  </span>
                  <div className="font-bold text-sm text-brand-neutral-main dark:text-brand-dark-text">
                    {dailyStudyMinutes} mins / day
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={onFinish}
                  size="lg"
                  className="w-full sm:w-auto px-8 gap-2 bg-[#124F40] hover:bg-[#0d3b30] text-white shadow-lg"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Modal Bottom Actions (Steps 1 to 3) */}
          {step >= 1 && step < 4 && (
            <div className="mt-8 pt-5 border-t border-brand-neutral-border/60 dark:border-brand-dark-border/60 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="gap-2 text-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              <div className="flex items-center gap-2">
                {step < 3 ? (
                  <Button
                    onClick={() => setStep((s) => (s + 1) as any)}
                    className="gap-2 bg-[#124F40] hover:bg-[#0d3b30] text-white text-xs"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSaveAndShowCelebration}
                    disabled={isSubmitting}
                    className="gap-2 bg-[#124F40] hover:bg-[#0d3b30] text-white text-xs font-semibold"
                  >
                    {isSubmitting ? (
                      <span>Saving Profile...</span>
                    ) : (
                      <>
                        <span>Finish &amp; Launch Dashboard</span>
                        <Zap className="w-4 h-4 fill-current" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
