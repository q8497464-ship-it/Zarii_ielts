import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MessageSquare,
  Bell,
  CheckCircle,
  Clock,
  Plus,
  Send,
  Trash2,
  AlertCircle,
  ThumbsUp,
  Tag,
  Star,
  ExternalLink,
  Filter,
  Eye,
  Edit,
  X,
  FileText,
  AlertTriangle,
  Sparkles,
  Calendar,
  Users,
  Copy,
} from 'lucide-react';
import { useAdminToast } from '../components/AdminToast';
import { ConfirmDialog } from '../components/ConfirmDialog';
import {
  communicationStore,
  CANNED_FEEDBACK_REPLIES,
  type AnnouncementItem,
  type AnnouncementFormat,
  type AnnouncementAudience,
  type FeedbackTicket,
  type FeedbackCategory,
  type NotificationTemplate,
} from '../../../shared/communication/communicationStore';
import type { AnnouncementType, FeedbackStatus } from '../../../shared/types';

type CommunicationTab = 'announcements' | 'feedback' | 'templates';

export function AdminCommunicationPage() {
  const { addToast } = useAdminToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active top-level tab
  const activeTab = (searchParams.get('tab') as 'announcements' | 'feedback' | 'templates') || 'announcements';
  const setTab = (tab: 'announcements' | 'feedback' | 'templates') => {
    setSearchParams({ tab });
  };

  // Reactive store state
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() =>
    communicationStore.getAnnouncements()
  );
  const [feedbackList, setFeedbackList] = useState<FeedbackTicket[]>(() =>
    communicationStore.getFeedback()
  );
  const [templates, setTemplates] = useState<NotificationTemplate[]>(() =>
    communicationStore.getTemplates()
  );

  useEffect(() => {
    return communicationStore.subscribe(() => {
      setAnnouncements(communicationStore.getAnnouncements());
      setFeedbackList(communicationStore.getFeedback());
      setTemplates(communicationStore.getTemplates());
    });
  }, []);

  // ------------------------------------------------------------------------
  // ANNOUNCEMENTS STATE & MODALS
  // ------------------------------------------------------------------------
  const [isAnnModalOpen, setIsAnnModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<AnnouncementItem | null>(null);
  const [annTitle, setAnnTitle] = useState('');
  const [annMessage, setAnnMessage] = useState('');
  const [annType, setAnnType] = useState<AnnouncementType>('info');
  const [annFormat, setAnnFormat] = useState<AnnouncementFormat>('banner');
  const [annAudience, setAnnAudience] = useState<AnnouncementAudience>('all');
  const [annTrack, setAnnTrack] = useState<'all' | 'ielts' | 'english'>('all');
  const [annStartsAt, setAnnStartsAt] = useState(new Date().toISOString().slice(0, 10));
  const [annExpiresAt, setAnnExpiresAt] = useState('');
  const [annIsActive, setAnnIsActive] = useState(true);

  // Announcement Visual Preview Modal
  const [previewingAnn, setPreviewingAnn] = useState<AnnouncementItem | null>(null);

  // Delete Announcement Confirm
  const [deleteAnnTarget, setDeleteAnnTarget] = useState<AnnouncementItem | null>(null);

  // ------------------------------------------------------------------------
  // FEEDBACK INBOX STATE & FILTERS
  // ------------------------------------------------------------------------
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState<string>('all');
  const [feedbackCategoryFilter, setFeedbackCategoryFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<FeedbackTicket | null>(null);
  const [newTagInput, setNewTagInput] = useState('');

  // Auto-select feedback ticket from query param if provided
  useEffect(() => {
    const feedbackId = searchParams.get('feedbackId');
    if (feedbackId) {
      const target = feedbackList.find((f) => f.id === feedbackId);
      if (target) {
        setSelectedTicket(target);
      }
    }
  }, [searchParams, feedbackList]);

  // ------------------------------------------------------------------------
  // TEMPLATES STATE
  // ------------------------------------------------------------------------
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate>(templates[0]);
  const [tplSubject, setTplSubject] = useState(templates[0]?.subject || '');
  const [tplBody, setTplBody] = useState(templates[0]?.body || '');

  useEffect(() => {
    if (selectedTemplate) {
      setTplSubject(selectedTemplate.subject);
      setTplBody(selectedTemplate.body);
    }
  }, [selectedTemplate]);

  // ========================================================================
  // ANNOUNCEMENT HANDLERS
  // ========================================================================
  const handleOpenAddAnnouncement = () => {
    setEditingAnn(null);
    setAnnTitle('');
    setAnnMessage('');
    setAnnType('info');
    setAnnFormat('banner');
    setAnnAudience('all');
    setAnnTrack('all');
    setAnnStartsAt(new Date().toISOString().slice(0, 10));
    setAnnExpiresAt('');
    setAnnIsActive(true);
    setIsAnnModalOpen(true);
  };

  const handleOpenEditAnnouncement = (ann: AnnouncementItem) => {
    setEditingAnn(ann);
    setAnnTitle(ann.title);
    setAnnMessage(ann.message);
    setAnnType(ann.type);
    setAnnFormat(ann.format);
    setAnnAudience(ann.audience);
    setAnnTrack(ann.target_track || 'all');
    setAnnStartsAt(ann.starts_at || new Date().toISOString().slice(0, 10));
    setAnnExpiresAt(ann.expires_at || '');
    setAnnIsActive(ann.is_active);
    setIsAnnModalOpen(true);
  };

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) {
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please provide both an announcement headline and body.',
      });
      return;
    }

    communicationStore.saveAnnouncement({
      id: editingAnn?.id,
      title: annTitle.trim(),
      message: annMessage.trim(),
      type: annType,
      format: annFormat,
      audience: annAudience,
      target_track: annTrack,
      starts_at: annStartsAt,
      expires_at: annExpiresAt || undefined,
      is_active: annIsActive,
    });

    setIsAnnModalOpen(false);
    addToast({
      type: 'success',
      title: 'Announcement Saved',
      message: `Announcement "${annTitle}" is now scheduled and live for ${annAudience} candidates.`,
    });
  };

  const handleDeleteAnnouncement = () => {
    if (!deleteAnnTarget) return;
    communicationStore.deleteAnnouncement(deleteAnnTarget.id);
    setDeleteAnnTarget(null);
    addToast({
      type: 'info',
      title: 'Announcement Deleted',
      message: 'Announcement removed from active registry.',
    });
  };

  // ========================================================================
  // FEEDBACK HANDLERS
  // ========================================================================
  const filteredFeedback = feedbackList.filter((f) => {
    if (feedbackStatusFilter !== 'all' && f.status !== feedbackStatusFilter) return false;
    if (feedbackCategoryFilter !== 'all' && f.category !== feedbackCategoryFilter) return false;
    return true;
  });

  const handleSaveTicketDetails = () => {
    if (!selectedTicket) return;
    communicationStore.updateFeedbackTicket(selectedTicket.id, {
      status: selectedTicket.status,
      assignee: selectedTicket.assignee,
      internal_notes: selectedTicket.internal_notes,
      reply_draft: selectedTicket.reply_draft,
      tags: selectedTicket.tags,
    });
    addToast({
      type: 'success',
      title: 'Feedback Ticket Updated',
      message: `Ticket #${selectedTicket.id} changes recorded in audit log.`,
    });
  };

  const handleAddTag = () => {
    if (!selectedTicket || !newTagInput.trim()) return;
    const tag = newTagInput.trim();
    if (!selectedTicket.tags.includes(tag)) {
      const updatedTags = [...selectedTicket.tags, tag];
      setSelectedTicket({ ...selectedTicket, tags: updatedTags });
      communicationStore.updateFeedbackTicket(selectedTicket.id, { tags: updatedTags });
    }
    setNewTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    if (!selectedTicket) return;
    const updatedTags = selectedTicket.tags.filter((t) => t !== tag);
    setSelectedTicket({ ...selectedTicket, tags: updatedTags });
    communicationStore.updateFeedbackTicket(selectedTicket.id, { tags: updatedTags });
  };

  const handleApplyCannedReply = (text: string) => {
    if (!selectedTicket) return;
    setSelectedTicket({ ...selectedTicket, reply_draft: text });
  };

  const handleNavigateToTestEditor = (testId: string) => {
    navigate(`/admin/content?tab=tests&testId=${encodeURIComponent(testId)}`);
  };

  // ========================================================================
  // TEMPLATE HANDLERS
  // ========================================================================
  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;
    communicationStore.updateTemplate(selectedTemplate.id, {
      subject: tplSubject,
      body: tplBody,
    });
    addToast({
      type: 'success',
      title: 'Template Updated',
      message: `Notification template "${selectedTemplate.name}" updated.`,
    });
  };

  const renderedPreview = selectedTemplate
    ? communicationStore.renderTemplatePreview(
        { ...selectedTemplate, subject: tplSubject, body: tplBody },
        {
          student_name: 'Aisha Al-Mansoor',
          streak_days: '14',
          target_band: '8.0',
          test_title: 'Cambridge Academic 19 Reading Test 1',
          overall_band: '8.5',
          exam_date: '2026-11-28',
        }
      )
    : { renderedSubject: '', renderedBody: '' };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Communication &amp; Feedback Hub
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#124F40] text-[#5BB78D] rounded-full border border-[#5BB78D]/30">
              Student Inbox
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Broadcast student announcements, resolve candidate feedback tickets with direct test editor links, and manage notification templates.
          </p>
        </div>

        {activeTab === 'announcements' && (
          <button
            onClick={handleOpenAddAnnouncement}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#5BB78D]" />
            <span>New Announcement</span>
          </button>
        )}
      </div>

      {/* 2. Top-Level Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(
          [
            { id: 'announcements', label: 'Announcements & Banners', icon: Bell, count: announcements.filter((a) => a.is_active).length },
            { id: 'feedback', label: 'Feedback & Bug Inbox', icon: MessageSquare, count: feedbackList.filter((f) => f.status === 'new').length },
            { id: 'templates', label: 'Notification & Reminder Templates', icon: FileText, count: undefined },
          ] as Array<{ id: CommunicationTab; label: string; icon: any; count?: number }>
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-[#124F40] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: ANNOUNCEMENTS MANAGER                                     */}
      {/* ==================================================================== */}
      {activeTab === 'announcements' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Candidate Announcements &amp; Scheduled Broadcasts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Broadcast announcements render as subtle top banners or modal dialogs. Student dismissals are remembered automatically.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Title &amp; Format</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Audience</th>
                  <th className="py-3 px-3">Schedule Window</th>
                  <th className="py-3 px-3">Reads / Impress.</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white max-w-sm truncate">
                        {ann.title}
                      </div>
                      <span className="text-[10px] font-mono uppercase text-slate-400">
                        {ann.format} Display
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          ann.type === 'urgent'
                            ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                            : ann.type === 'warning'
                            ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                            : ann.type === 'success'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {ann.type}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="space-y-0.5">
                        <span className="capitalize font-semibold text-slate-700 dark:text-slate-300 block">
                          {ann.audience} Candidates
                        </span>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {ann.target_track === 'english'
                            ? 'English Track'
                            : ann.target_track === 'ielts'
                            ? 'IELTS Track'
                            : 'All Tracks'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {ann.starts_at} {ann.expires_at ? `to ${ann.expires_at}` : '(Ongoing)'}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700 dark:text-slate-300">
                      {ann.readsCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => communicationStore.toggleAnnouncementActive(ann.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                          ann.is_active
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {ann.is_active ? 'Active' : 'Archived'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setPreviewingAnn(ann)}
                          title="Preview as student"
                          className="p-1 rounded-lg text-slate-500 hover:text-[#124F40] dark:hover:text-[#5BB78D] hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenEditAnnouncement(ann)}
                          title="Edit announcement"
                          className="p-1 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteAnnTarget(ann)}
                          title="Delete announcement"
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 2: FEEDBACK & BUG INBOX                                      */}
      {/* ==================================================================== */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Inbox List (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Candidate Feedback Inbox
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {filteredFeedback.length} tickets matching filters.
                </p>
              </div>

              {/* Status & Category Filters */}
              <div className="flex items-center gap-2">
                <select
                  value={feedbackStatusFilter}
                  onChange={(e) => setFeedbackStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New (Unreviewed)</option>
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={feedbackCategoryFilter}
                  onChange={(e) => setFeedbackCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium"
                >
                  <option value="all">All Categories</option>
                  <option value="Content Issue">Content Issues</option>
                  <option value="Audio Problem">Audio Problems</option>
                  <option value="Feature Suggestion">Feature Suggestions</option>
                  <option value="Bug Report">Bug Reports</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredFeedback.map((ticket) => {
                const isSelected = selectedTicket?.id === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`py-3.5 px-3 rounded-xl transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-[#5BB78D]/10 dark:bg-[#5BB78D]/15 border border-[#5BB78D]/30'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            ticket.status === 'new'
                              ? 'bg-amber-500 animate-pulse'
                              : ticket.status === 'in_review'
                              ? 'bg-blue-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {ticket.user_name}
                        </span>
                        <span className="text-[10px] text-slate-400">({ticket.user_email})</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < ticket.rating ? 'fill-current' : 'text-slate-300 dark:text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{ticket.createdAt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                      {ticket.message}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                          {ticket.category}
                        </span>
                        {ticket.testId && (
                          <span className="px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-[#124F40] dark:text-[#5BB78D] font-mono font-bold">
                            {ticket.testId} {ticket.questionNumber ? `#${ticket.questionNumber}` : ''}
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider ${
                          ticket.status === 'new'
                            ? 'text-amber-600 dark:text-amber-400'
                            : ticket.status === 'in_review'
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Detail & Action Drawer (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-5">
            {selectedTicket ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Ticket #{selectedTicket.id}
                    </h3>
                    <p className="text-xs text-slate-400">Received from {selectedTicket.user_name}</p>
                  </div>

                  {/* Direct Test Editor Link Button if testId exists */}
                  {selectedTicket.testId && (
                    <button
                      onClick={() => handleNavigateToTestEditor(selectedTicket.testId!)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <span>Open in Editor</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#5BB78D]" />
                    </button>
                  )}
                </div>

                {/* Candidate Message Quote */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Candidate Report</div>
                  <p className="leading-relaxed">"{selectedTicket.message}"</p>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Submitted from page: <span className="font-mono">{selectedTicket.page}</span>
                  </div>
                </div>

                {/* Status & Assignee Controls */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) =>
                        setSelectedTicket({
                          ...selectedTicket,
                          status: e.target.value as FeedbackStatus,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold"
                    >
                      <option value="new">New</option>
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Staff Assignee
                    </label>
                    <select
                      value={selectedTicket.assignee || ''}
                      onChange={(e) =>
                        setSelectedTicket({
                          ...selectedTicket,
                          assignee: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    >
                      <option value="Qamar Raza">Qamar Raza (Admin)</option>
                      <option value="David Chen">David Chen (Editor)</option>
                      <option value="Unassigned">Unassigned</option>
                    </select>
                  </div>
                </div>

                {/* Tags Editor */}
                <div className="space-y-1.5 text-xs">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Tags
                  </label>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                    {selectedTicket.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-rose-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add tag (e.g. Cambridge 19)..."
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Internal Notes */}
                <div className="space-y-1 text-xs">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Internal Staff Notes (Private)
                  </label>
                  <textarea
                    rows={2}
                    value={selectedTicket.internal_notes || ''}
                    onChange={(e) =>
                      setSelectedTicket({ ...selectedTicket, internal_notes: e.target.value })
                    }
                    placeholder="Notes for editorial team..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                {/* Reply Draft & Canned Responses */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700 dark:text-slate-300">
                      Reply Template / Response
                    </label>
                  </div>

                  {/* Canned Reply Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {CANNED_FEEDBACK_REPLIES.map((rep) => (
                      <button
                        key={rep.title}
                        type="button"
                        onClick={() => handleApplyCannedReply(rep.text)}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        + {rep.title}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={3}
                    value={selectedTicket.reply_draft || ''}
                    onChange={(e) =>
                      setSelectedTicket({ ...selectedTicket, reply_draft: e.target.value })
                    }
                    placeholder="Candidate response message..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveTicketDetails}
                    className="px-5 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Save Ticket Updates
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-xs text-slate-400 space-y-2">
                <MessageSquare className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                <p>Select a feedback ticket from the inbox to inspect details, notes, and responses.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SECTION 3: NOTIFICATION & REMINDER TEMPLATES                         */}
      {/* ==================================================================== */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Template Selector (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Message Templates
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pre-configured triggers dispatched across student channels.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {templates.map((tpl) => {
                const isSelected = selectedTemplate?.id === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#124F40] text-white border-[#124F40] font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div>{tpl.name}</div>
                    <div className="text-[10px] opacity-75 mt-0.5 uppercase tracking-wider font-mono">
                      {tpl.channel.replace('_', ' ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Template Editor & Live Rendered Preview (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Edit Template: {selectedTemplate.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Available dynamic placeholders:{' '}
                {selectedTemplate.variables.map((v) => (
                  <code
                    key={v}
                    className="mx-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-[#124F40] dark:text-[#5BB78D]"
                  >
                    {`{{${v}}}`}
                  </code>
                ))}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject / Headline
                </label>
                <input
                  type="text"
                  value={tplSubject}
                  onChange={(e) => setTplSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Body
                </label>
                <textarea
                  rows={4}
                  value={tplBody}
                  onChange={(e) => setTplBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              {/* Rendered Mock Preview Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Live Candidate Message Preview (Interpolated)
                </span>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    {renderedPreview.renderedSubject}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {renderedPreview.renderedBody}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveTemplate}
                  className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODALS & DIALOGS                                                     */}
      {/* ==================================================================== */}

      {/* Create / Edit Announcement Modal */}
      {isAnnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#112019] rounded-2xl border border-slate-200 dark:border-[#24392F] shadow-xl p-6 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              {editingAnn ? 'Edit Announcement' : 'Create Student Announcement'}
            </h3>

            <form onSubmit={handleSaveAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cambridge 19 Listening Audio Now Live"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message Body
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Announcement description..."
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Display Type
                  </label>
                  <select
                    value={annType}
                    onChange={(e) => setAnnType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="info">Info (Blue)</option>
                    <option value="success">Success (Mint)</option>
                    <option value="warning">Warning (Amber)</option>
                    <option value="urgent">Urgent (Rose)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Format
                  </label>
                  <select
                    value={annFormat}
                    onChange={(e) => setAnnFormat(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="banner">Top Banner</option>
                    <option value="modal">Modal Dialog</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={annAudience}
                    onChange={(e) => setAnnAudience(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="all">All Students</option>
                    <option value="new">New Signups</option>
                    <option value="active">Active Learners</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Learning Track
                  </label>
                  <select
                    value={annTrack}
                    onChange={(e) => setAnnTrack(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="all">Both Tracks (Global)</option>
                    <option value="ielts">IELTS Candidates Only</option>
                    <option value="english">English Course Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={annStartsAt}
                    onChange={(e) => setAnnStartsAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Expiration Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={annExpiresAt}
                    onChange={(e) => setAnnExpiresAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="annActiveCheck"
                  checked={annIsActive}
                  onChange={(e) => setAnnIsActive(e.target.checked)}
                  className="rounded text-[#124F40] focus:ring-[#5BB78D]"
                />
                <label htmlFor="annActiveCheck" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Activate Announcement Immediately
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAnnModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Save &amp; Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visual Student Preview Modal */}
      {previewingAnn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#112019] rounded-2xl border border-slate-200 dark:border-[#24392F] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Student Viewport Preview ({previewingAnn.format})
              </span>
              <button
                onClick={() => setPreviewingAnn(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {previewingAnn.format === 'modal' ? (
              <div className="space-y-3 pt-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {previewingAnn.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {previewingAnn.message}
                </p>
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={() => setPreviewingAnn(null)}
                    className="px-4 py-2 rounded-xl bg-[#124F40] text-white text-xs font-bold"
                  >
                    Got It (Dismiss)
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <strong>{previewingAnn.title}:</strong> {previewingAnn.message}
                </div>
                <button
                  onClick={() => setPreviewingAnn(null)}
                  className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteAnnTarget !== null}
        title="Delete Announcement?"
        message={`Are you sure you want to permanently delete "${deleteAnnTarget?.title}"?`}
        confirmLabel="Delete Announcement"
        onConfirm={handleDeleteAnnouncement}
        onClose={() => setDeleteAnnTarget(null)}
      />
    </div>
  );
}
