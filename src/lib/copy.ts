/**
 * Central Brand Copy File for Zarii IELTS
 *
 * Brand voice: Clear, supportive, professional, never childish. Short sentences.
 */

export const copy = {
  // App metadata & tagline
  brand: {
    name: 'Zarii',
    fullName: 'Zarii IELTS Preparation',
    tagline: 'IELTS preparation, made clear.',
    subTagline: 'Authentic exam practice. Instant diagnostic feedback. 100% free and private.',
    shortAbout:
      'Zarii provides clear, focused IELTS preparation with realistic practice tests and instant diagnostics. All your data stays private and stored directly on your device.',
  },

  // Onboarding copy
  onboarding: {
    step1Title: 'Choose your IELTS path.',
    step1Subtitle:
      'Select Academic for university admission and professional licensing, or General Training for immigration and work visas.',
    step2Title: "Let's set your target band.",
    step2Subtitle:
      'We will calibrate your practice tests, timing drills, and milestones to this target.',
    step3Title: 'Build your daily practice habit.',
    step3Subtitle:
      'Set a daily study goal. Short, consistent sessions build strong test habits.',
    step4Title: (name: string) => `Welcome to Zarii, ${name}.`,
    step4Subtitle:
      'Your personalized IELTS workspace is ready. Every mock test, timing tool, and vocabulary review is now calibrated to your target.',
    academicTitle: 'IELTS Academic',
    academicDesc:
      'For undergraduate and postgraduate admissions or professional registration (medicine, nursing, engineering).',
    generalTitle: 'IELTS General Training',
    generalDesc:
      'For immigration (Express Entry, UK, Australia, Canada, NZ), secondary education, and work visas.',
    nextStepDiagnostic: 'Next step: Take the 25-minute diagnostic test to establish your baseline.',
  },

  // Empty states across skills and features
  emptyStates: {
    reading: {
      title: 'No attempts yet.',
      description: 'Start your first Reading test.',
      cta: 'Start Reading Test',
    },
    listening: {
      title: 'No attempts yet.',
      description: 'Start your first Listening test.',
      cta: 'Start Listening Test',
    },
    writing: {
      title: 'No essays written yet.',
      description: 'Choose a Task 1 report or Task 2 prompt to start.',
      cta: 'Write an Essay',
    },
    speaking: {
      title: 'No speaking sessions yet.',
      description: 'Practice Part 1 questions or start a full interview simulation.',
      cta: 'Start Speaking Practice',
    },
    vocab: {
      title: 'No words saved yet.',
      description: 'Add words from your practice tests to build your personal vocabulary bank.',
      cta: 'Explore Academic Words',
    },
    mistakes: {
      title: 'No mistakes recorded.',
      description: 'Questions you miss during practice tests will appear here for focused review.',
      cta: 'Start Practice Test',
    },
    mistakesFiltered: {
      title: 'No matching mistakes.',
      description: 'Try adjusting your skill filter or search terms.',
      cta: 'Clear Filter',
    },
    analytics: {
      title: 'No attempts yet.',
      description: 'Complete your first practice test to see question analytics.',
      cta: 'Start Reading Practice',
    },
    mockExams: {
      title: 'No mock exams taken yet.',
      description: 'Take a timed four-skill test under official exam conditions.',
      cta: 'Start Full Mock Exam',
    },
    studyPlan: {
      title: 'No study plan active.',
      description: 'Set your exam date and target band to generate a focused weekly plan.',
      cta: 'Create Study Plan',
    },
    recentActivity: {
      title: 'No attempts recorded yet.',
      description: 'Start your first test today to begin your practice streak.',
      cta: 'Start Practicing',
    },
  },

  // Success messages
  success: {
    saved: 'Saved.',
    savedStreak: (days: number) => `Saved. You're on a ${days}-day streak.`,
    testCompleted: 'Test completed. Your score has been calculated.',
    profileUpdated: 'Profile updated.',
    goalAchieved: 'Daily study goal reached. Great work today.',
    dataExported: 'Data exported successfully.',
    dataImported: 'Data imported. Your workspace has been restored.',
    settingsSaved: 'Settings saved.',
    mistakeResolved: 'Marked as reviewed.',
    wordLearned: 'Word added to review schedule.',
  },

  // Error messages
  errors: {
    generic: 'Something went wrong. Your answers are safe. Try again.',
    saveFailed: 'Could not save your progress. Your answers remain on screen.',
    loadFailed: 'Could not load test content. Please refresh the page.',
    networkOffline: 'You are offline. Downloaded tests and offline practice remain available.',
    databaseError: 'Local storage issue detected. Your saved data is safe.',
    audioRecordingFailed: 'Microphone access failed. Please check browser permissions and try again.',
    wordCountLow: 'Please write at least 20 words so your grammar and vocabulary can be evaluated.',
    evaluationFailed: 'Something went wrong during evaluation. Your text is safe. Try again.',
  },

  // AI unavailable & fallback states
  aiFallback: {
    banner: 'AI feedback is busy right now. Showing instant checks instead.',
    ruleBasedNotice:
      'Evaluated with offline heuristic checks. Add a free Google Gemini or Groq API key in Settings for detailed criterion comments.',
    offlineMode: 'Offline evaluation active. Instant grammar, vocabulary, and structure analysis are ready.',
    busyNotice: 'AI examiner is temporarily busy. Instant checks are ready below.',
  },

  // Standard Button Labels
  buttons: {
    startTest: 'Start Test',
    continueTest: 'Continue',
    submitTest: 'Submit Test',
    submitEssay: 'Evaluate Essay',
    saveDraft: 'Save Draft',
    nextQuestion: 'Next',
    prevQuestion: 'Previous',
    flagQuestion: 'Flag Question',
    unflagQuestion: 'Unflag',
    retakeTest: 'Retake Test',
    reviewAnswers: 'Review Answers',
    viewReport: 'View Report',
    exportData: 'Export Data',
    importData: 'Import Data',
    tryAgain: 'Try Again',
    reloadPage: 'Reload Page',
    goHome: 'Return Home',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close',
    back: 'Back',
    saveSettings: 'Save Settings',
  },

  // Tooltips
  tooltips: {
    timer: 'Exam countdown timer. Alerts you at 10 and 5 minutes remaining.',
    flag: 'Flag question to review before submitting.',
    reviewNav: 'Jump directly to any question. Shaded circles indicate answered questions.',
    fontSize: 'Adjust reading passage text size.',
    scratchpad: 'Take notes or outline points during your exam.',
    streak: 'Consecutive days with completed practice sessions.',
    dailyGoal: 'Minutes of practice completed toward today’s target.',
    accuracy: 'Percentage of questions answered correctly on the first attempt.',
    salvageBackup: 'Download an emergency JSON copy of all saved attempts and notes.',
  },

  // Email and browser notification text for study reminders
  notifications: {
    dailyReminderTitle: 'Time for your daily IELTS practice.',
    dailyReminderBody: (remainingMinutes: number, targetMinutes: number) =>
      `You have ${remainingMinutes} minute${remainingMinutes === 1 ? '' : 's'} remaining to complete today's ${targetMinutes}-minute study goal. Keep your streak alive!`,
    streakWarningTitle: "Don't lose your practice streak.",
    streakWarningBody: (streakDays: number) =>
      `Complete one practice drill today to keep your ${streakDays}-day streak active.`,
    weeklyReviewTitle: 'Your weekly progress summary is ready.',
    weeklyReviewBody: 'Review your completed tests and focus areas for the upcoming week.',
    testNotificationTitle: 'Notifications active.',
    testNotificationBody: 'Daily study goal reminders and streak alerts are set.',
  },

  // Disclaimers & About texts
  disclaimers: {
    scoresEstimate: 'Generated by Zarii. Scores are estimates, not official IELTS results.',
    originalContent: 'All test questions, audio scripts, and reading passages are original practice materials.',
    offlinePrivacy: 'Your data stays on your device. Responses and notes are saved locally.',
  },
} as const;

export type BrandCopy = typeof copy;
