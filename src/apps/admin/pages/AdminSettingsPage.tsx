import React, { useState, useEffect } from 'react';
import {
  Settings,
  Sliders,
  Shield,
  Save,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Database,
  Globe,
  Bell,
  Palette,
  Eye,
  FileText,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Check,
  RefreshCw,
  Search,
  Clock,
  Sparkles,
  HelpCircle,
  Languages,
} from 'lucide-react';
import { FormSection } from '../components/FormSection';
import { useAdminToast } from '../components/AdminToast';
import {
  settingsStore,
  calculateContrastRatio,
  type BrandingSettings,
  type FeatureFlagsSettings,
  type LegalContentSettings,
  type DefaultsSettings,
} from '../../../shared/settings/settingsStore';

export function AdminSettingsPage() {
  const { addToast } = useAdminToast();

  // Active section tab
  const [activeTab, setActiveTab] = useState<
    'branding' | 'flags' | 'maintenance' | 'legal' | 'seo' | 'defaults'
  >('branding');

  // Reactive store state
  const [state, setState] = useState(() => settingsStore.getSettings());

  useEffect(() => {
    return settingsStore.subscribe(() => {
      setState(settingsStore.getSettings());
    });
  }, []);

  // Branding Form State
  const [brandingForm, setBrandingForm] = useState<BrandingSettings>(state.branding);

  // Legal Editor State
  const [legalPageKey, setLegalPageKey] = useState<keyof LegalContentSettings>('about');
  const [legalMarkdown, setLegalMarkdown] = useState(state.legal[legalPageKey]);

  // SEO Form State
  const [seoForm, setSeoForm] = useState(state.seo);

  // Defaults Form State
  const [defaultsForm, setDefaultsForm] = useState<DefaultsSettings>(state.defaults);

  // Sync state on tab change
  useEffect(() => {
    setBrandingForm(state.branding);
    setLegalMarkdown(state.legal[legalPageKey]);
    setSeoForm(state.seo);
    setDefaultsForm(state.defaults);
  }, [state, legalPageKey]);

  // Dynamic Contrast Calculation
  const primaryOnSurfaceContrast = calculateContrastRatio(
    brandingForm.primaryColor,
    brandingForm.surfaceColor
  );
  const mintOnPrimaryContrast = calculateContrastRatio(
    brandingForm.accentColor,
    brandingForm.primaryColor
  );

  // Save Handlers
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    settingsStore.updateBranding(brandingForm);
    addToast({
      type: 'success',
      title: 'Branding Saved',
      message: 'Brand tokens and visual assets updated across the student application.',
    });
  };

  const handleToggleFeature = (key: keyof FeatureFlagsSettings) => {
    const nextVal = !state.features[key];
    settingsStore.updateFeatureFlag(key, nextVal);
    addToast({
      type: nextVal ? 'success' : 'info',
      title: nextVal ? 'Feature Enabled' : 'Feature Disabled',
      message: `Module "${key}" is now ${nextVal ? 'active' : 'hidden'} for students.`,
    });
  };

  const handleToggleMaintenance = () => {
    const nextVal = !state.maintenance.enabled;
    settingsStore.updateMaintenance({ enabled: nextVal });
    addToast({
      type: nextVal ? 'warning' : 'info',
      title: nextVal ? 'Maintenance Mode Activated' : 'Maintenance Mode Deactivated',
      message: nextVal
        ? 'Public student workspaces will display the maintenance overlay.'
        : 'Student workspace returned to normal operational status.',
    });
  };

  const handleSaveMaintenanceMessage = (e: React.FormEvent) => {
    e.preventDefault();
    settingsStore.updateMaintenance({
      message: state.maintenance.message,
      estimatedReturnTime: state.maintenance.estimatedReturnTime,
    });
    addToast({
      type: 'success',
      title: 'Maintenance Message Saved',
      message: 'Student notification banner text updated.',
    });
  };

  const handleSaveLegal = () => {
    settingsStore.updateLegalContent(legalPageKey, legalMarkdown);
    addToast({
      type: 'success',
      title: 'Content Saved',
      message: `Markdown documentation for "/${legalPageKey}" published live.`,
    });
  };

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    settingsStore.updateSeo(seoForm);
    addToast({
      type: 'success',
      title: 'SEO Metadata Saved',
      message: 'Meta tags, OG preview cards, and search indexing updated.',
    });
  };

  const handleSaveDefaults = (e: React.FormEvent) => {
    e.preventDefault();
    const res = settingsStore.updateDefaults(defaultsForm);
    if (!res.success) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: res.error || 'Invalid score table progression.',
      });
      return;
    }
    addToast({
      type: 'success',
      title: 'System Defaults Saved',
      message: 'Default exam timers and band score conversion tables updated.',
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Site Settings &amp; Platform Controls
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#124F40] text-[#5BB78D] rounded-full border border-[#5BB78D]/30">
              Admin Only
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global design tokens, module switches, maintenance broadcasts, legal documentation, and exam default timers.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold shrink-0">
          <Database className="w-4 h-4 text-[#5BB78D]" />
          <span>Synced to Student App (Zero Redeploy)</span>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(
          [
            { id: 'branding', label: 'Branding & Tokens', icon: Palette },
            { id: 'flags', label: 'Feature Flags', icon: Sliders },
            { id: 'maintenance', label: 'Maintenance Mode', icon: AlertTriangle },
            { id: 'legal', label: 'Legal & Info Pages', icon: FileText },
            { id: 'seo', label: 'SEO & Metadata', icon: Globe },
            { id: 'defaults', label: 'Timers & Band Tables', icon: Clock },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#124F40] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: BRANDING & WCAG CONTRAST CHECKER                          */}
      {/* ==================================================================== */}
      {activeTab === 'branding' && (
        <div className="space-y-6">
          <form onSubmit={handleSaveBranding} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-5">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Brand Identity &amp; Typography
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Global app naming, headlines, and official logo assets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Application Name
                  </label>
                  <input
                    type="text"
                    required
                    value={brandingForm.appName}
                    onChange={(e) =>
                      setBrandingForm({ ...brandingForm, appName: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    required
                    value={brandingForm.tagline}
                    onChange={(e) =>
                      setBrandingForm({ ...brandingForm, tagline: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Logo (Light Background SVG/PNG)
                  </label>
                  <input
                    type="text"
                    value={brandingForm.logoLight}
                    onChange={(e) =>
                      setBrandingForm({ ...brandingForm, logoLight: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Logo (Dark / Green Background SVG/PNG)
                  </label>
                  <input
                    type="text"
                    value={brandingForm.logoDark}
                    onChange={(e) =>
                      setBrandingForm({ ...brandingForm, logoDark: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Colors & WCAG 2.1 Contrast Checker */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-5">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Brand Color Tokens &amp; WCAG Accessibility Calibration
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ensure all color pairings meet official accessibility thresholds (WCAG AA &ge; 4.5:1, AAA &ge; 7.0:1).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Deep Green
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandingForm.primaryColor}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, primaryColor: e.target.value })
                      }
                      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandingForm.primaryColor}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, primaryColor: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Accent Mint
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandingForm.accentColor}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, accentColor: e.target.value })
                      }
                      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandingForm.accentColor}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, accentColor: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Surface Off-White
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={brandingForm.surfaceColor}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, surfaceColor: e.target.value })
                      }
                      className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={brandingForm.surfaceColor}
                      onChange={(e) =>
                        setBrandingForm({ ...brandingForm, surfaceColor: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Contrast Checker Results Card */}
              <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#5BB78D]" />
                  <span>Real-Time Contrast Ratios (WCAG 2.1)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Primary on Surface */}
                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        Primary ({brandingForm.primaryColor}) on Surface (
                        {brandingForm.surfaceColor})
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        Ratio: {primaryOnSurfaceContrast.ratioFormatted}
                      </span>
                    </div>

                    <div>
                      {primaryOnSurfaceContrast.normalTextAAA ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          Pass AAA (&ge; 7:1)
                        </span>
                      ) : primaryOnSurfaceContrast.normalTextAA ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          Pass AA (&ge; 4.5:1)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-700 border border-rose-500/30">
                          Fail (&lt; 4.5:1)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Mint on Primary */}
                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        Mint ({brandingForm.accentColor}) on Primary ({brandingForm.primaryColor})
                      </span>
                      <span className="font-mono text-xs text-slate-500">
                        Ratio: {mintOnPrimaryContrast.ratioFormatted}
                      </span>
                    </div>

                    <div>
                      {mintOnPrimaryContrast.normalTextAA ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          Pass AA (&ge; 4.5:1)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-700 border border-amber-500/30">
                          Large Text Only
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#5BB78D]" />
                  <span>Save Branding Tokens</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 2: FEATURE FLAGS                                             */}
      {/* ==================================================================== */}
      {activeTab === 'flags' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Student Application Feature Switches
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instantly enable or hide skill modules and preparation features across candidate views without code redeploy.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {(
              [
                {
                  key: 'listening' as const,
                  name: 'Listening Audio Test Module',
                  desc: 'Full 4-section listening mock tests with interactive audio player and timed questions.',
                },
                {
                  key: 'speaking' as const,
                  name: 'Speaking Interview & Recording Module',
                  desc: 'Part 1, Part 2 cue cards, and Part 3 discussion prompts with audio recording and speech AI scoring.',
                },
                {
                  key: 'gamification' as const,
                  name: 'Gamification System (Streaks, XP & Badges)',
                  desc: 'Daily streak counters, weekly freeze shields, experience level bars, and 30 academic badges.',
                },
                {
                  key: 'ai_feedback' as const,
                  name: 'Automated AI Essay & Speech Evaluation',
                  desc: 'Instant LLM band scoring with verbatim quote citations. When disabled, defaults to model answers.',
                },
                {
                  key: 'urdu_hints' as const,
                  name: 'Urdu Vocabulary Hints & Bilingual Support',
                  desc: 'Display Urdu translations, collocations, and contextual hints in vocabulary and flashcards.',
                },
                {
                  key: 'signup' as const,
                  name: 'Public Candidate Self-Registration',
                  desc: 'Allow new students to create free accounts via /signup. When disabled, registration is closed.',
                },
                {
                  key: 'english_course_enabled' as const,
                  name: 'General English Course Track',
                  desc: 'Enable the complete English language learning track alongside IELTS (A1 to C1 levels).',
                },
                {
                  key: 'dictionary_enabled' as const,
                  name: 'English Offline Dictionary & Word Lookup',
                  desc: 'Enable the fast offline dictionary, phonetics, audio pronunciations, and vocabulary bookmarks.',
                },
              ] as const
            ).map((flag) => {
              const enabled = state.features[flag.key];
              return (
                <div key={flag.key} className="py-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5 max-w-xl">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      {flag.name}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{flag.desc}</p>
                  </div>

                  <button
                    onClick={() => handleToggleFeature(flag.key)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      enabled ? 'bg-[#124F40]' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 3: MAINTENANCE MODE                                          */}
      {/* ==================================================================== */}
      {activeTab === 'maintenance' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Emergency Maintenance Broadcast
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Display a full-viewport maintenance notice across the student application during server migrations.
              </p>
            </div>

            <button
              onClick={handleToggleMaintenance}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                state.maintenance.enabled
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-[#124F40] hover:bg-[#0E3D32] text-white'
              }`}
            >
              {state.maintenance.enabled
                ? 'Deactivate Maintenance'
                : 'Activate Maintenance Mode'}
            </button>
          </div>

          <form onSubmit={handleSaveMaintenanceMessage} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Custom Broadcast Notice
              </label>
              <textarea
                rows={3}
                value={state.maintenance.message}
                onChange={(e) =>
                  settingsStore.updateMaintenance({ message: e.target.value })
                }
                className="w-full text-xs p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5BB78D]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Resolution Window
              </label>
              <input
                type="text"
                value={state.maintenance.estimatedReturnTime || ''}
                onChange={(e) =>
                  settingsStore.updateMaintenance({ estimatedReturnTime: e.target.value })
                }
                placeholder="e.g. Back online by 12:00 UTC"
                className="w-full sm:w-80 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            {/* Live Student Banner Preview */}
            <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-50/70 dark:bg-amber-950/20 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Student Notification Preview
              </span>
              <div className="flex items-start gap-2.5 text-xs text-amber-950 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Notice:</strong> {state.maintenance.message}{' '}
                  {state.maintenance.estimatedReturnTime && (
                    <span>({state.maintenance.estimatedReturnTime})</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Save Notice
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 4: LEGAL & INFO PAGES MARKDOWN EDITOR                        */}
      {/* ==================================================================== */}
      {activeTab === 'legal' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Legal &amp; Candidate Information Pages Editor
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edit public documentation rendered at /about, /privacy, /terms, /faq, and /contact using Markdown.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(
                [
                  { key: 'about', label: 'About' },
                  { key: 'privacy', label: 'Privacy' },
                  { key: 'terms', label: 'Terms' },
                  { key: 'faq', label: 'FAQ' },
                  { key: 'contact', label: 'Contact' },
                ] as const
              ).map((p) => (
                <button
                  key={p.key}
                  onClick={() => setLegalPageKey(p.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    legalPageKey === p.key
                      ? 'bg-[#124F40] text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {/* Editor Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Markdown Source (/{legalPageKey})
              </label>
              <textarea
                rows={16}
                value={legalMarkdown}
                onChange={(e) => setLegalMarkdown(e.target.value)}
                className="w-full font-mono text-xs p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] leading-relaxed resize-y"
              />
            </div>

            {/* Live Formatted Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Live Rendered Preview
              </label>
              <div className="h-[345px] overflow-y-auto p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 space-y-2 prose dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-xs">{legalMarkdown}</pre>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              onClick={handleSaveLegal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#5BB78D]" />
              <span>Publish /{legalPageKey} Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 5: SEO METADATA & OPEN GRAPH                                 */}
      {/* ==================================================================== */}
      {activeTab === 'seo' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Search Engine Optimization (SEO) &amp; Social Previews
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure meta tags, title prefixes, and Open Graph cards for WhatsApp, Twitter, and LinkedIn shares.
            </p>
          </div>

          <form onSubmit={handleSaveSeo} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Global Title Tag
              </label>
              <input
                type="text"
                required
                value={seoForm.metaTitle}
                onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Meta Description (Max 160 characters recommended)
              </label>
              <textarea
                rows={3}
                required
                value={seoForm.metaDescription}
                onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Open Graph Social Share Image URL (1200x630 px)
              </label>
              <input
                type="text"
                value={seoForm.ogImageUrl}
                onChange={(e) => setSeoForm({ ...seoForm, ogImageUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white"
              />
            </div>

            {/* Social Share Card Preview */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 space-y-2 max-w-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Social Link Card Preview
              </span>
              <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
                <div className="h-28 bg-[#124F40] flex items-center justify-center text-[#5BB78D] font-bold text-sm">
                  Zarii IELTS Prep • 100% Free
                </div>
                <div className="p-3 space-y-1">
                  <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                    {seoForm.metaTitle}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {seoForm.metaDescription}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">zarii.app</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Save SEO Metadata
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 6: TIMERS & BAND CONVERSION TABLES                           */}
      {/* ==================================================================== */}
      {activeTab === 'defaults' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Default Exam Timers &amp; Academic Conversion Matrices
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Exam duration parameters and monotonic raw-to-band score conversion mappings.
            </p>
          </div>

          <form onSubmit={handleSaveDefaults} className="space-y-6">
            {/* Timers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Reading Timer (Min)
                </label>
                <input
                  type="number"
                  min={10}
                  max={120}
                  value={defaultsForm.readingTimerMinutes}
                  onChange={(e) =>
                    setDefaultsForm({
                      ...defaultsForm,
                      readingTimerMinutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Listening Timer (Min)
                </label>
                <input
                  type="number"
                  min={10}
                  max={60}
                  value={defaultsForm.listeningTimerMinutes}
                  onChange={(e) =>
                    setDefaultsForm({
                      ...defaultsForm,
                      listeningTimerMinutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Writing Task 1 (Min)
                </label>
                <input
                  type="number"
                  min={5}
                  max={60}
                  value={defaultsForm.writingTask1Minutes}
                  onChange={(e) =>
                    setDefaultsForm({
                      ...defaultsForm,
                      writingTask1Minutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Writing Task 2 (Min)
                </label>
                <input
                  type="number"
                  min={10}
                  max={90}
                  value={defaultsForm.writingTask2Minutes}
                  onChange={(e) =>
                    setDefaultsForm({
                      ...defaultsForm,
                      writingTask2Minutes: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>
            </div>

            {/* Score Conversion Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Reading Score Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Academic Reading Raw Score &rarr; Band
                  </span>
                  <span className="text-[10px] text-slate-400">Cambridge Scale (N = 40)</span>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-64 overflow-y-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-400">
                      <tr>
                        <th className="py-2 px-3">Band</th>
                        <th className="py-2 px-3">Min Raw</th>
                        <th className="py-2 px-3">Max Raw</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {defaultsForm.readingScoreTable.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-3 font-bold text-[#124F40] dark:text-[#5BB78D]">
                            Band {row.band.toFixed(1)}
                          </td>
                          <td className="py-1.5 px-3 font-mono">{row.minRaw}</td>
                          <td className="py-1.5 px-3 font-mono">{row.maxRaw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Listening Score Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Listening Raw Score &rarr; Band
                  </span>
                  <span className="text-[10px] text-slate-400">Cambridge Scale (N = 40)</span>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden max-h-64 overflow-y-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-400">
                      <tr>
                        <th className="py-2 px-3">Band</th>
                        <th className="py-2 px-3">Min Raw</th>
                        <th className="py-2 px-3">Max Raw</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {defaultsForm.listeningScoreTable.map((row, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-3 font-bold text-[#124F40] dark:text-[#5BB78D]">
                            Band {row.band.toFixed(1)}
                          </td>
                          <td className="py-1.5 px-3 font-mono">{row.minRaw}</td>
                          <td className="py-1.5 px-3 font-mono">{row.maxRaw}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Save Default Parameters
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
