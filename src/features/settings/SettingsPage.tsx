import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  User,
  SlidersHorizontal,
  ShieldCheck,
  HardDrive,
  HelpCircle,
  Download,
  Upload,
  Trash2,
  Save,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Bell,
  Eye,
  Type,
  AlignLeft,
  LifeBuoy,
  LogOut,
  Volume2,
  Clock,
  BookOpen,
  KeyRound,
  FileQuestion,
  ExternalLink,
  Shield,
  Languages,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAppStore } from '../../store/useAppStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ReportProblemModal } from '../../components/ui/ReportProblemModal';
import { exportDatabaseBackup, importDatabaseBackup, clearAllUserData } from '../../lib/db';
import {
  isNotificationSupported,
  requestNotificationPermission,
  sendTestNotification,
} from '../../lib/notifications';
import type { TestType, EnglishProficiencyLevel } from '../../types';

export type SettingsTab = 'profile' | 'preferences' | 'account' | 'data' | 'help';

export function SettingsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    profile,
    updateProfile,
    theme,
    setTheme,
    textSize,
    setTextSize,
    fontFamily,
    setFontFamily,
    lineSpacing,
    setLineSpacing,
    setTourOpen,
    settings,
    updateSettings,
    addToast,
  } = useAppStore();

  const activeTab = (searchParams.get('tab') as SettingsTab) || 'profile';
  const setActiveTab = (tab: SettingsTab) => {
    setSearchParams({ tab });
  };

  // --------------------------------------------------------------------------
  // TAB 1: PROFILE STATE
  // --------------------------------------------------------------------------
  const [displayName, setDisplayName] = useState<string>('Candidate');
  const [testType, setTestType] = useState<TestType>('academic');
  const [targetBand, setTargetBand] = useState<number>(7.5);
  const [currentLevel, setCurrentLevel] = useState<EnglishProficiencyLevel>('intermediate');
  const [dailyStudyMinutes, setDailyStudyMinutes] = useState<number>(45);
  const [isExamBooked, setIsExamBooked] = useState<boolean>(false);
  const [examDate, setExamDate] = useState<string>('');
  const [isSavingProfile, setIsSavingProfile] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // TAB 2: PREFERENCES STATE
  // --------------------------------------------------------------------------
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [urduHintsEnabled, setUrduHintsEnabled] = useState<boolean>(true);
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [timerWarningEnabled, setTimerWarningEnabled] = useState<boolean>(true);
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState<boolean>(false);
  const [dailyReminderTime, setDailyReminderTime] = useState<string>('19:00');

  // --------------------------------------------------------------------------
  // TAB 3: ACCOUNT & AUTH STATE
  // --------------------------------------------------------------------------
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // TAB 4 & 5: DATA, PRIVACY & HELP
  // --------------------------------------------------------------------------
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);

  // Synchronize profile data
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || 'Candidate');
      setTestType(profile.testType || 'academic');
      setTargetBand(profile.targetBand || 7.5);
      setCurrentLevel(profile.currentLevel || 'intermediate');
      setDailyStudyMinutes(profile.dailyStudyMinutes || 45);
      setIsExamBooked(Boolean(profile.isExamBooked));
      setExamDate(profile.examDate || '');
    }
  }, [profile]);

  // Synchronize settings preferences
  useEffect(() => {
    if (settings) {
      setSoundEnabled(settings.soundEnabled !== false);
      setUrduHintsEnabled(settings.urduHintsEnabled !== false);
      setShowTimer(settings.showTimer !== false);
      setTimerWarningEnabled(settings.timerWarningEnabled !== false);
      setDailyReminderEnabled(Boolean(settings.dailyReminderEnabled));
      setDailyReminderTime(settings.dailyReminderTime || '19:00');
    }
  }, [settings]);

  // Check auth user status
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.email) {
        setCurrentUserEmail(data.user.email);
        setIsGuestMode(false);
      } else {
        const guest = localStorage.getItem('zarii_guest_mode') === 'true';
        setIsGuestMode(guest);
        setCurrentUserEmail(guest ? 'Offline Guest (Device Storage)' : 'Candidate (Local)');
      }
    });
  }, []);

  // --------------------------------------------------------------------------
  // ACTION HANDLERS
  // --------------------------------------------------------------------------
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await updateProfile({
        displayName: displayName.trim() || 'Candidate',
        testType,
        targetBand,
        currentLevel,
        dailyStudyMinutes,
        isExamBooked,
        examDate: isExamBooked ? examDate : undefined,
      });

      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your candidate details and target band have been saved.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not save profile changes.',
      });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleToggleSound = async (val: boolean) => {
    setSoundEnabled(val);
    await updateSettings({ soundEnabled: val });
    addToast({
      type: 'info',
      title: val ? 'Sound Effects Enabled' : 'Sound Effects Muted',
      message: val ? 'Audio chimes will play on test submission.' : 'Audio effects turned off.',
    });
  };

  const handleToggleUrduHints = async (val: boolean) => {
    setUrduHintsEnabled(val);
    await updateSettings({ urduHintsEnabled: val });
    addToast({
      type: 'info',
      title: val ? 'Urdu Translations Active' : 'Urdu Translations Hidden',
      message: val
        ? 'Vocabulary flashcards and idioms will include Urdu meanings.'
        : 'Vocabulary displayed in English only.',
    });
  };

  const handleToggleTimerDisplay = async (val: boolean) => {
    setShowTimer(val);
    await updateSettings({ showTimer: val });
    addToast({
      type: 'info',
      title: val ? 'Timer Visible' : 'Timer Hidden',
      message: val ? 'Exam countdown timer will be displayed.' : 'Timer display hidden in test runner.',
    });
  };

  const handleToggleTimerWarning = async (val: boolean) => {
    setTimerWarningEnabled(val);
    await updateSettings({ timerWarningEnabled: val });
    addToast({
      type: 'info',
      title: val ? '5-Minute Alert Active' : '5-Minute Alert Disabled',
      message: val ? 'You will be alerted when 5 minutes remain in test mode.' : 'Warning alert turned off.',
    });
  };

  const handleToggleReminder = async (val: boolean) => {
    if (val && isNotificationSupported()) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        addToast({
          type: 'warning',
          title: 'Permission Denied',
          message: 'Please allow browser notification permission to receive daily practice reminders.',
        });
        setDailyReminderEnabled(false);
        await updateSettings({ dailyReminderEnabled: false });
        return;
      }
    }
    setDailyReminderEnabled(val);
    await updateSettings({ dailyReminderEnabled: val });
    addToast({
      type: 'success',
      title: val ? 'Daily Reminder Set' : 'Reminders Disabled',
      message: val
        ? `A gentle daily notification will remind you to practice at ${dailyReminderTime}.`
        : 'Daily reminder notifications turned off.',
    });
  };

  const handleSaveReminderTime = async () => {
    await updateSettings({
      dailyReminderTime,
      dailyReminderEnabled,
    });
    addToast({
      type: 'success',
      title: 'Schedule Saved',
      message: `Daily reminder set for ${dailyReminderTime}.`,
    });
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      addToast({
        type: 'warning',
        title: 'Password Too Short',
        message: 'New password must be at least 6 characters.',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast({
        type: 'warning',
        title: 'Passwords Do Not Match',
        message: 'Please re-enter your password to match.',
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setNewPassword('');
      setConfirmPassword('');
      addToast({
        type: 'success',
        title: 'Password Changed',
        message: 'Your account password has been successfully updated.',
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Password Update Failed',
        message: err?.message || 'Could not update password.',
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSignOut = async () => {
    localStorage.removeItem('zarii_guest_mode');
    await supabase.auth.signOut();
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been logged out',
    });
    navigate('/', { replace: true });
  };

  const handleExportData = async () => {
    try {
      const jsonString = await exportDatabaseBackup();
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `zarii-ielts-student-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addToast({
        type: 'success',
        title: 'Export Complete',
        message: 'All your practice history, vocabulary cards, and test attempts were downloaded.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Export Failed',
        message: 'Could not export your data.',
      });
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const success = await importDatabaseBackup(text);
      if (success) {
        addToast({
          type: 'success',
          title: 'Data Imported',
          message: 'Your previous practice records and scores have been restored.',
        });
        setTimeout(() => window.location.reload(), 1000);
      } else {
        throw new Error('Invalid backup file format');
      }
    } catch {
      addToast({
        type: 'error',
        title: 'Import Failed',
        message: 'The selected file is not a valid Zarii backup JSON file.',
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleClearData = async () => {
    setIsResetting(true);
    try {
      await clearAllUserData();
      setIsResetModalOpen(false);
      addToast({
        type: 'info',
        title: 'Data Cleared',
        message: 'All local practice history and cached attempts have been reset.',
      });
      window.location.reload();
    } catch {
      addToast({
        type: 'error',
        title: 'Reset Failed',
        message: 'Could not reset local database.',
      });
    } finally {
      setIsResetting(false);
    }
  };

  // Tab definitions
  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User, desc: 'Target band, exam date & track' },
    { id: 'preferences' as const, label: 'Preferences', icon: SlidersHorizontal, desc: 'Theme, text size, Urdu hints & sounds' },
    { id: 'account' as const, label: 'Account', icon: ShieldCheck, desc: 'Email, password & cloud sync' },
    { id: 'data' as const, label: 'Data & Privacy', icon: HardDrive, desc: 'Export, import & wipe data' },
    { id: 'help' as const, label: 'Help & Support', icon: HelpCircle, desc: 'Tutorial, FAQs & feedback' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header (Consistent Zarii Header Pattern) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-[#24392F] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Profile &amp; Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Personalize your IELTS study track, reading accessibility, account security, and study reminders.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTourOpen(true)}
            leftIcon={<Sparkles className="w-4 h-4 text-[#5BB78D]" />}
          >
            Launch Tour
          </Button>
        </div>
      </div>

      {/* 5 Clean Student Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#112019] border border-slate-200/80 dark:border-[#24392F] overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#124F40] text-white shadow-xs dark:bg-[#5BB78D] dark:text-slate-950'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* TAB 1: PROFILE */}
      {/* ================================================================== */}
      {activeTab === 'profile' && (
        <Card className="animate-in fade-in duration-150">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />
              <CardTitle>IELTS Candidate Profile</CardTitle>
            </div>
            <CardDescription>
              Your target band score and exam type determine how diagnostic mock tests evaluate your responses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prefDisplayName">Candidate Name</Label>
                  <Input
                    id="prefDisplayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Candidate Name"
                  />
                </div>

                <div>
                  <Label htmlFor="prefTestType">IELTS Exam Track</Label>
                  <Select
                    id="prefTestType"
                    value={testType}
                    onChange={(e) => setTestType(e.target.value as TestType)}
                  >
                    <option value="academic">Academic (University &amp; Professional Licensure)</option>
                    <option value="general">General Training (Migration &amp; Work Visa)</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prefTargetBand">Target Overall Band Score</Label>
                  <Select
                    id="prefTargetBand"
                    value={targetBand.toString()}
                    onChange={(e) => setTargetBand(parseFloat(e.target.value))}
                  >
                    {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((b) => (
                      <option key={b} value={b.toString()}>
                        Band {b.toFixed(1)} {b >= 8.0 ? '— Very Good / Expert' : b >= 7.0 ? '— Good User' : ''}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prefCurrentLevel">Current Starting Proficiency</Label>
                  <Select
                    id="prefCurrentLevel"
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(e.target.value as EnglishProficiencyLevel)}
                  >
                    <option value="beginner">Beginner (~Band 4.5)</option>
                    <option value="intermediate">Intermediate (~Band 5.5)</option>
                    <option value="upper_intermediate">Upper Intermediate (~Band 6.5)</option>
                    <option value="advanced">Advanced (~Band 7.5+)</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prefDailyMinutes">Daily Study Commitment</Label>
                  <Select
                    id="prefDailyMinutes"
                    value={dailyStudyMinutes.toString()}
                    onChange={(e) => setDailyStudyMinutes(parseInt(e.target.value, 10))}
                  >
                    <option value="15">15 minutes / day (Bite-sized Review)</option>
                    <option value="30">30 minutes / day (Focused Practice)</option>
                    <option value="45">45 minutes / day (Standard Prep)</option>
                    <option value="60">60 minutes / day (Intensive Practice)</option>
                    <option value="90">90 minutes / day (Full Exam Sprint)</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="prefExamDate">Official IELTS Exam Date</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="prefExamDate"
                      type="date"
                      disabled={!isExamBooked}
                      value={examDate}
                      onChange={(e) => setExamDate(e.target.value)}
                    />
                    <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 whitespace-nowrap cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isExamBooked}
                        onChange={(e) => setIsExamBooked(e.target.checked)}
                        className="rounded text-[#124F40] focus:ring-[#5BB78D]"
                      />
                      <span>Exam Booked</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSavingProfile}
                  leftIcon={<Save className="w-4 h-4 text-[#5BB78D]" />}
                >
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* ================================================================== */}
      {/* TAB 2: PREFERENCES */}
      {/* ================================================================== */}
      {activeTab === 'preferences' && (
        <Card className="animate-in fade-in duration-150 space-y-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />
              <CardTitle>Interface &amp; Study Preferences</CardTitle>
            </div>
            <CardDescription>
              Tailor color themes, reading typography, language translations, audio feedback, and exam timers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color Theme */}
            <div>
              <Label>Color Theme (WCAG AA &amp; AAA)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mt-1.5">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'system', label: 'System', icon: Monitor },
                  { id: 'high-contrast', label: 'High Contrast', icon: Eye },
                ].map((th) => {
                  const Icon = th.icon;
                  const isCur = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => setTheme(th.id as any)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        isCur
                          ? 'border-[#124F40] bg-[#124F40]/10 text-[#124F40] dark:border-[#5BB78D] dark:bg-[#5BB78D]/20 dark:text-[#5BB78D] ring-2 ring-[#5BB78D]/30'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{th.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Typography */}
            <div>
              <Label>Reading Font &amp; Dyslexia Support</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mt-1.5">
                {[
                  { id: 'inter', title: 'Inter (Default)', sub: 'Modern clean sans-serif' },
                  { id: 'dyslexic', title: 'Dyslexia-Friendly', sub: 'Wider kerning & distinct shapes' },
                  { id: 'serif', title: 'Academic Serif', sub: 'Book-style editorial text' },
                ].map((f) => {
                  const isCur = fontFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontFamily(f.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isCur
                          ? 'border-[#124F40] bg-[#124F40]/10 text-[#124F40] dark:border-[#5BB78D] dark:bg-[#5BB78D]/20 dark:text-[#5BB78D] ring-2 ring-[#5BB78D]/30 font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{f.title}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{f.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Size & Spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              <div>
                <Label>Text Reading Size</Label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {(['normal', 'medium', 'large'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setTextSize(s)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize cursor-pointer ${
                        textSize === s
                          ? 'border-[#124F40] bg-[#124F40]/10 text-[#124F40] dark:border-[#5BB78D] dark:bg-[#5BB78D]/20 dark:text-[#5BB78D] font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Line Spacing</Label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {(['normal', 'relaxed', 'loose'] as const).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => setLineSpacing(sp)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize cursor-pointer ${
                        lineSpacing === sp
                          ? 'border-[#124F40] bg-[#124F40]/10 text-[#124F40] dark:border-[#5BB78D] dark:bg-[#5BB78D]/20 dark:text-[#5BB78D] font-bold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Urdu Translations, Sound & Timers */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-[#24392F] space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Study Tool Controls
              </h4>

              <div className="space-y-3 max-w-xl">
                {/* Urdu Hints Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                      <Languages className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Urdu Hints &amp; Translations</div>
                      <div className="text-[11px] text-slate-500">Display Urdu meanings on vocabulary and idiom flashcards</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={urduHintsEnabled}
                    onChange={(e) => handleToggleUrduHints(e.target.checked)}
                    className="w-4 h-4 rounded text-[#124F40] focus:ring-[#5BB78D] cursor-pointer"
                  />
                </div>

                {/* Sound Effects Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Auditory Sound Effects</div>
                      <div className="text-[11px] text-slate-500">Gentle sound cues on test submission and timer alerts</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => handleToggleSound(e.target.checked)}
                    className="w-4 h-4 rounded text-[#124F40] focus:ring-[#5BB78D] cursor-pointer"
                  />
                </div>

                {/* Show Timer Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#124F40]/10 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Countdown Exam Timer</div>
                      <div className="text-[11px] text-slate-500">Show elapsed countdown during Reading and Listening tests</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showTimer}
                    onChange={(e) => handleToggleTimerDisplay(e.target.checked)}
                    className="w-4 h-4 rounded text-[#124F40] focus:ring-[#5BB78D] cursor-pointer"
                  />
                </div>

                {/* 5-Min Timer Warning Alert */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">5-Minute Remaining Alert</div>
                      <div className="text-[11px] text-slate-500">Toast notification when 5 minutes remain in timed tests</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={timerWarningEnabled}
                    onChange={(e) => handleToggleTimerWarning(e.target.checked)}
                    className="w-4 h-4 rounded text-[#124F40] focus:ring-[#5BB78D] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Daily Practice Reminders */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-[#24392F]">
              <div className="flex items-center justify-between max-w-xl">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Daily Study Reminder</div>
                  <div className="text-[11px] text-slate-500">Browser push notifications to protect your preparation habit</div>
                </div>
                <input
                  type="checkbox"
                  checked={dailyReminderEnabled}
                  onChange={(e) => handleToggleReminder(e.target.checked)}
                  className="w-4 h-4 rounded text-[#124F40] focus:ring-[#5BB78D] cursor-pointer"
                />
              </div>

              {dailyReminderEnabled && (
                <div className="mt-3 flex items-center gap-3 max-w-sm">
                  <Input
                    type="time"
                    value={dailyReminderTime}
                    onChange={(e) => setDailyReminderTime(e.target.value)}
                    className="w-36 text-xs"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleSaveReminderTime}
                    leftIcon={<Clock className="w-3.5 h-3.5" />}
                  >
                    Save Time
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================================================================== */}
      {/* TAB 3: ACCOUNT & AUTHENTICATION */}
      {/* ================================================================== */}
      {activeTab === 'account' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Active Session Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />
                <CardTitle>Account Credentials &amp; Cloud Sync</CardTitle>
              </div>
              <CardDescription>
                View your active login identity or link an account to synchronize scores across devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/60 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentUserEmail}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {isGuestMode
                      ? 'Local device storage active. Answers and attempts are preserved in your browser IndexedDB.'
                      : 'Authenticated with Supabase. Progress can be safely synced to cloud storage.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isGuestMode ? (
                    <Link to="/login">
                      <Button size="sm" variant="primary">
                        Connect Login to Sync
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={handleSignOut}
                      leftIcon={<LogOut className="w-3.5 h-3.5" />}
                    >
                      Sign Out
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Change Password Form (Only for Authenticated Users) */}
          {!isGuestMode && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />
                  <CardTitle>Change Password</CardTitle>
                </div>
                <CardDescription>
                  Update your security credentials. Minimum 6 characters required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                  <div>
                    <Label htmlFor="accNewPassword">New Password</Label>
                    <Input
                      id="accNewPassword"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="accConfirmPassword">Confirm New Password</Label>
                    <Input
                      id="accConfirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isUpdatingPassword}
                    leftIcon={<Save className="w-4 h-4 text-[#5BB78D]" />}
                  >
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 4: DATA & PRIVACY */}
      {/* ================================================================== */}
      {activeTab === 'data' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />
                <CardTitle>Data Ownership &amp; Export</CardTitle>
              </div>
              <CardDescription>
                You own 100% of your IELTS preparation history. Export a full copy or restore a previously saved backup file.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Data */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#124F40] dark:text-[#5BB78D]" />
                      Export Practice Data
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Download all test attempts, diagnostic band benchmarks, essay drafts, and spaced repetition cards as a structured JSON file.
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportData}
                    className="w-full justify-center"
                  >
                    Download Data JSON
                  </Button>
                </div>

                {/* Import Data */}
                <div className="p-4 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#124F40] dark:text-[#5BB78D]" />
                      Import Saved Backup
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Restore your previous attempts and vocabulary flashcard mastery from a previously saved Zarii backup JSON file.
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    isLoading={isImporting}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full justify-center"
                  >
                    Select Backup JSON
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone: Delete All Data */}
          <Card className="border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200 dark:border-rose-900">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-rose-700 dark:text-rose-300">
                      Danger Zone: Delete All Local Data
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                      Permanently erase all test attempts, diagnostic mock scores, vocabulary decks, and habit streaks from this browser. This action is irreversible.
                    </p>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setIsResetModalOpen(true)}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  className="shrink-0 self-start sm:self-center"
                >
                  Delete All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ================================================================== */}
      {/* TAB 5: HELP & POLICIES */}
      {/* ================================================================== */}
      {activeTab === 'help' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D]" />
                <CardTitle>Support &amp; Candidate Assistance</CardTitle>
              </div>
              <CardDescription>
                Guided walkthroughs, frequently asked questions, bug reports, and legal commitments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setTourOpen(true)}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50 text-left hover:border-[#124F40] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-[#124F40] dark:text-[#5BB78D] mb-2" />
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Product Tour</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Restart the interactive student orientation walkthrough.</div>
                </button>

                <Link
                  to="/faq"
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50 text-left hover:border-[#124F40] transition-colors"
                >
                  <FileQuestion className="w-5 h-5 text-teal-600 mb-2" />
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Frequently Asked Questions</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Band conversions, timer rules, and scoring guidelines.</div>
                </Link>

                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-[#24392F] bg-slate-50/50 dark:bg-slate-900/50 text-left hover:border-[#124F40] transition-colors cursor-pointer"
                >
                  <LifeBuoy className="w-5 h-5 text-amber-500 mb-2" />
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Contact &amp; Feedback</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Submit problem tickets directly to the academic staff.</div>
                </button>
              </div>

              {/* Legal Transparency Links */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-[#24392F] flex flex-wrap items-center gap-4 text-xs font-medium">
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-[#124F40] dark:hover:text-[#5BB78D] flex items-center gap-1">
                  <span>About Zarii</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-[#124F40] dark:hover:text-[#5BB78D] flex items-center gap-1">
                  <span>Privacy Policy</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-[#124F40] dark:hover:text-[#5BB78D] flex items-center gap-1">
                  <span>Terms of Service</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Report Problem Modal */}
      <ReportProblemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Delete All Practice Data?"
        description="This action cannot be undone."
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              isLoading={isResetting}
              onClick={handleClearData}
              leftIcon={<Trash2 className="w-4 h-4" />}
            >
              Confirm Wipe
            </Button>
          </div>
        }
      >
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-rose-800 dark:text-rose-200 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <p>
              This will erase all test attempts, mock scores, essay submissions, voice notes, and spaced repetition vocabulary progress from your browser IndexedDB.
            </p>
          </div>
          <p className="text-xs">
            If you want to keep your data, please click <strong>Export Practice Data</strong> first before proceeding.
          </p>
        </div>
      </Modal>
    </div>
  );
}
