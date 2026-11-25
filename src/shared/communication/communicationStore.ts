import { contentStore } from '../content/contentStore';
import type { AnnouncementType, FeedbackStatus } from '../types';

export type AnnouncementFormat = 'banner' | 'modal';
export type AnnouncementAudience = 'all' | 'new' | 'active';
export type AnnouncementTrack = 'all' | 'ielts' | 'english';

export interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  type: AnnouncementType;
  format: AnnouncementFormat;
  audience: AnnouncementAudience;
  target_track?: AnnouncementTrack;
  starts_at: string;
  expires_at?: string;
  is_active: boolean;
  readsCount: number;
  createdAt: string;
}

export type FeedbackCategory =
  | 'Content Issue'
  | 'Feature Suggestion'
  | 'Audio Problem'
  | 'Bug Report'
  | 'General';

export interface FeedbackTicket {
  id: string;
  user_name: string;
  user_email: string;
  category: FeedbackCategory;
  rating: number; // 1-5
  message: string;
  page: string;
  testId?: string;
  questionNumber?: number;
  status: FeedbackStatus;
  tags: string[];
  assignee?: string;
  internal_notes?: string;
  reply_draft?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface NotificationTemplate {
  id: string;
  key: string;
  name: string;
  channel: 'in_app' | 'browser_push' | 'system';
  subject: string;
  body: string;
  variables: string[]; // e.g. ['student_name', 'target_band', 'streak_days']
  updatedAt: string;
}

const STORAGE_KEY_ANNOUNCEMENTS = 'zarii_admin_announcements_v1';
const STORAGE_KEY_FEEDBACK = 'zarii_admin_feedback_v1';
const STORAGE_KEY_TEMPLATES = 'zarii_admin_templates_v1';
const STORAGE_KEY_DISMISSED = 'zarii_student_dismissed_announcements';

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Cambridge Academic 19 Audio & Full Tests Now Available',
    message: 'Authentic 4-section Cambridge 19 Listening tests with high-fidelity native speaker audio and auto-scoring are now live in the practice library.',
    type: 'success',
    format: 'banner',
    audience: 'all',
    starts_at: '2026-11-15',
    expires_at: '2026-12-01',
    is_active: true,
    readsCount: 428,
    createdAt: '2026-11-15 10:00',
  },
  {
    id: 'ann-2',
    title: 'New Band 8.5+ Lexical Collocation Decks',
    message: 'Explore over 300 topic-clustered vocabulary collocations with Urdu definitions and academic sentence builders in Vocabulary & Grammar.',
    type: 'info',
    format: 'modal',
    audience: 'active',
    starts_at: '2026-11-17',
    expires_at: '2026-12-15',
    is_active: true,
    readsCount: 192,
    createdAt: '2026-11-17 14:30',
  },
  {
    id: 'ann-3',
    title: 'Scheduled Maintenance: Edge Function Migration',
    message: 'Brief 15-minute maintenance window scheduled for Sunday at 02:00 UTC. Offline practice will continue to work seamlessly.',
    type: 'warning',
    format: 'banner',
    audience: 'all',
    starts_at: '2026-11-20',
    expires_at: '2026-11-21',
    is_active: false,
    readsCount: 84,
    createdAt: '2026-11-18 08:00',
  },
];

export const INITIAL_FEEDBACK: FeedbackTicket[] = [
  {
    id: 'fb-101',
    user_name: 'Aisha Al-Mansoor',
    user_email: 'aisha.m@example.com',
    category: 'Content Issue',
    rating: 4,
    message: 'Question 14 in Academic 19 Reading Test 1: Paragraph C heading key seems inverted with Paragraph D.',
    page: '/practice/reading',
    testId: 'acad-reading-01',
    questionNumber: 14,
    status: 'new',
    tags: ['Reading', 'Answer Key', 'Cambridge 19'],
    assignee: 'Qamar Raza',
    internal_notes: 'Checking official Cambridge 19 answer key for Paragraph C heading.',
    reply_draft: 'Thank you Aisha! Our editorial team is verifying Question 14 heading key right now.',
    createdAt: '2026-11-18 08:15',
  },
  {
    id: 'fb-102',
    user_name: 'Vikram Patel',
    user_email: 'vikram.p@example.com',
    category: 'Audio Problem',
    rating: 3,
    message: 'Listening Test 1 Section 3 audio cuts off momentarily at timestamp 04:12 on iOS Safari.',
    page: '/practice/listening',
    testId: 'list-test-01',
    questionNumber: 24,
    status: 'in_review',
    tags: ['Listening', 'Audio Buffering', 'Safari'],
    assignee: 'David Chen',
    internal_notes: 'Inspected audio transcoder; re-encoding MP3 with constant 128kbps bitrate to resolve Safari chunking issue.',
    createdAt: '2026-11-17 19:40',
  },
  {
    id: 'fb-103',
    user_name: 'Elena Rostova',
    user_email: 'elena.s@example.com',
    category: 'Feature Suggestion',
    rating: 5,
    message: 'The new Task 2 idea generator and writing band breakdown are phenomenal! Could you add a timer alert at the 35-minute mark?',
    page: '/practice/writing',
    status: 'resolved',
    tags: ['Writing', 'Timer', 'Praise'],
    assignee: 'Qamar Raza',
    internal_notes: 'Added to roadmap: configurable 5-minute remaining acoustic chime.',
    reply_draft: 'Thanks Elena! We are implementing a subtle acoustic chime for the 5-minute warning in the next release.',
    createdAt: '2026-11-16 11:20',
    resolvedAt: '2026-11-17 09:30',
  },
];

export const INITIAL_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'tpl-1',
    key: 'daily_study_reminder',
    name: 'Daily Study Consistency Reminder',
    channel: 'browser_push',
    subject: 'Time for your daily IELTS practice, {{student_name}}!',
    body: 'Maintain your {{streak_days}}-day practice streak! Complete just 15 minutes of Reading or Vocabulary today to stay on track for Band {{target_band}}.',
    variables: ['student_name', 'streak_days', 'target_band'],
    updatedAt: '2026-11-10 12:00',
  },
  {
    id: 'tpl-2',
    key: 'mock_test_completed',
    name: 'Mock Exam Score Ready',
    channel: 'in_app',
    subject: '{{test_title}} Completed — Overall Band {{overall_band}}!',
    body: 'Great effort, {{student_name}}! You scored Band {{overall_band}} on {{test_title}}. View your examiner criteria breakdown and review missed questions now.',
    variables: ['student_name', 'test_title', 'overall_band'],
    updatedAt: '2026-11-12 15:30',
  },
  {
    id: 'tpl-3',
    key: 'streak_freeze_activated',
    name: 'Weekly Streak Shield Activated',
    channel: 'in_app',
    subject: 'Streak Shield Used: Your {{streak_days}}-day streak is safe!',
    body: 'We noticed you took a rest day yesterday, {{student_name}}. Your free weekly Streak Shield has preserved your {{streak_days}}-day consistency count. Next shield recharges Monday!',
    variables: ['student_name', 'streak_days'],
    updatedAt: '2026-11-14 09:15',
  },
  {
    id: 'tpl-4',
    key: 'exam_countdown_7days',
    name: 'Official Exam 7-Day Countdown',
    channel: 'in_app',
    subject: '7 Days Until Official IELTS Exam!',
    body: 'Your official exam date is in one week. We recommend taking one timed CD-IELTS Mock Exam and reviewing your weakest question types today.',
    variables: ['student_name', 'exam_date', 'target_band'],
    updatedAt: '2026-11-16 18:20',
  },
];

export const CANNED_FEEDBACK_REPLIES = [
  {
    title: 'Answer Key Corrected',
    text: 'Thank you for reporting this issue! Our senior academic team reviewed the question and updated the official answer key. Your test score report has been refreshed.',
  },
  {
    title: 'Audio File Updated',
    text: 'Thank you for your feedback! The audio file for this listening section has been re-encoded with optimized stream buffering to prevent playback cutoffs on mobile devices.',
  },
  {
    title: 'Feature Planned on Roadmap',
    text: 'Thank you for this valuable suggestion! We have prioritized this feature on our product roadmap for an upcoming release.',
  },
  {
    title: 'General Support Resolution',
    text: 'Thank you for reaching out to the Zarii academic team. We have addressed your ticket and confirmed the resolution. Best of luck with your IELTS preparation!',
  },
];

class CommunicationStore {
  private announcements: AnnouncementItem[] = [];
  private feedback: FeedbackTicket[] = [];
  private templates: NotificationTemplate[] = [];
  private dismissedIds: Set<string> = new Set();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
  }

  private load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const rawAnn = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS);
        this.announcements = rawAnn ? JSON.parse(rawAnn) : [...INITIAL_ANNOUNCEMENTS];

        const rawFb = localStorage.getItem(STORAGE_KEY_FEEDBACK);
        this.feedback = rawFb ? JSON.parse(rawFb) : [...INITIAL_FEEDBACK];

        const rawTpl = localStorage.getItem(STORAGE_KEY_TEMPLATES);
        this.templates = rawTpl ? JSON.parse(rawTpl) : [...INITIAL_TEMPLATES];
        return;
      }
    } catch {}
    this.announcements = [...INITIAL_ANNOUNCEMENTS];
    this.feedback = [...INITIAL_FEEDBACK];
    this.templates = [...INITIAL_TEMPLATES];
  }

  private save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(this.announcements));
        localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(this.feedback));
        localStorage.setItem(STORAGE_KEY_TEMPLATES, JSON.stringify(this.templates));
      }
    } catch {}
  }

  private notify() {
    this.save();
    this.listeners.forEach((l) => l());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // ========================================================================
  // ANNOUNCEMENTS
  // ========================================================================
  public getAnnouncements(): AnnouncementItem[] {
    return [...this.announcements];
  }

  public getActiveAnnouncementsForStudent(): AnnouncementItem[] {
    const now = new Date().toISOString().slice(0, 10);
    const dismissed = this.getDismissedAnnouncementIds();

    return this.announcements.filter((ann) => {
      if (!ann.is_active) return false;
      if (dismissed.has(ann.id)) return false;
      if (ann.starts_at && ann.starts_at > now) return false;
      if (ann.expires_at && ann.expires_at < now) return false;
      return true;
    });
  }

  public getDismissedAnnouncementIds(): Set<string> {
    const set = new Set<string>(this.dismissedIds);
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY_DISMISSED);
        if (raw) {
          const arr = JSON.parse(raw);
          arr.forEach((id: string) => set.add(id));
        }
      }
    } catch {}
    return set;
  }

  public dismissAnnouncementForStudent(id: string): void {
    this.dismissedIds.add(id);
    try {
      if (typeof localStorage !== 'undefined') {
        const dismissed = this.getDismissedAnnouncementIds();
        dismissed.add(id);
        localStorage.setItem(STORAGE_KEY_DISMISSED, JSON.stringify(Array.from(dismissed)));
      }
    } catch {}
    this.notify();
  }

  public saveAnnouncement(
    ann: Omit<AnnouncementItem, 'id' | 'createdAt' | 'readsCount'> & { id?: string }
  ): AnnouncementItem {
    const existingIdx = this.announcements.findIndex((a) => a.id === ann.id);
    const item: AnnouncementItem = {
      ...ann,
      id: ann.id || `ann-${Date.now()}`,
      readsCount: existingIdx >= 0 ? this.announcements[existingIdx].readsCount : 0,
      createdAt: existingIdx >= 0 ? this.announcements[existingIdx].createdAt : new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    if (existingIdx >= 0) {
      this.announcements[existingIdx] = item;
    } else {
      this.announcements.unshift(item);
    }

    contentStore.recordAudit(
      existingIdx >= 0 ? 'UPDATE_ANNOUNCEMENT' : 'CREATE_ANNOUNCEMENT',
      'announcement',
      item.id,
      existingIdx >= 0 ? this.announcements[existingIdx] : null,
      item
    );

    this.notify();
    return item;
  }

  public toggleAnnouncementActive(id: string): void {
    const ann = this.announcements.find((a) => a.id === id);
    if (!ann) return;
    ann.is_active = !ann.is_active;

    contentStore.recordAudit(
      'TOGGLE_ANNOUNCEMENT_STATUS',
      'announcement',
      id,
      { is_active: !ann.is_active },
      { is_active: ann.is_active }
    );

    this.notify();
  }

  public deleteAnnouncement(id: string): void {
    const prev = this.announcements.find((a) => a.id === id);
    this.announcements = this.announcements.filter((a) => a.id !== id);

    contentStore.recordAudit('DELETE_ANNOUNCEMENT', 'announcement', id, prev, null);
    this.notify();
  }

  // ========================================================================
  // FEEDBACK INBOX
  // ========================================================================
  public getFeedback(): FeedbackTicket[] {
    return [...this.feedback];
  }

  public getFeedbackById(id: string): FeedbackTicket | undefined {
    return this.feedback.find((f) => f.id === id);
  }

  public submitStudentFeedback(ticket: Omit<FeedbackTicket, 'id' | 'createdAt' | 'status' | 'tags'>): FeedbackTicket {
    const newTicket: FeedbackTicket = {
      ...ticket,
      id: `fb-${Date.now()}`,
      status: 'new',
      tags: [ticket.category],
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    this.feedback.unshift(newTicket);
    this.notify();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zarii:student-feedback-submitted', { detail: newTicket }));
    }
    return newTicket;
  }

  public updateFeedbackStatus(id: string, status: FeedbackStatus): void {
    const ticket = this.feedback.find((f) => f.id === id);
    if (!ticket) return;
    const prevStatus = ticket.status;
    ticket.status = status;
    if (status === 'resolved') {
      ticket.resolvedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);
    }

    contentStore.recordAudit(
      'UPDATE_FEEDBACK_STATUS',
      'feedback_ticket',
      id,
      { status: prevStatus },
      { status }
    );

    this.notify();
  }

  public updateFeedbackTicket(
    id: string,
    updates: Partial<Pick<FeedbackTicket, 'assignee' | 'internal_notes' | 'reply_draft' | 'tags' | 'status'>>
  ): void {
    const ticket = this.feedback.find((f) => f.id === id);
    if (!ticket) return;

    Object.assign(ticket, updates);
    if (updates.status === 'resolved' && !ticket.resolvedAt) {
      ticket.resolvedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);
    }

    contentStore.recordAudit(
      'UPDATE_FEEDBACK_DETAILS',
      'feedback_ticket',
      id,
      null,
      updates
    );

    this.notify();
  }

  // ========================================================================
  // NOTIFICATION & REMINDER TEMPLATES
  // ========================================================================
  public getTemplates(): NotificationTemplate[] {
    return [...this.templates];
  }

  public updateTemplate(id: string, updates: Partial<Pick<NotificationTemplate, 'subject' | 'body'>>): void {
    const tpl = this.templates.find((t) => t.id === id);
    if (!tpl) return;

    const prev = { subject: tpl.subject, body: tpl.body };
    Object.assign(tpl, updates);
    tpl.updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

    contentStore.recordAudit(
      'UPDATE_NOTIFICATION_TEMPLATE',
      'template',
      id,
      prev,
      updates
    );

    this.notify();
  }

  public renderTemplatePreview(template: NotificationTemplate, mockData: Record<string, string>): {
    renderedSubject: string;
    renderedBody: string;
  } {
    let subject = template.subject;
    let body = template.body;

    Object.entries(mockData).forEach(([k, v]) => {
      const reg = new RegExp(`{{${k}}}`, 'g');
      subject = subject.replace(reg, v);
      body = body.replace(reg, v);
    });

    return { renderedSubject: subject, renderedBody: body };
  }

  public resetToDefault(): void {
    this.announcements = JSON.parse(JSON.stringify(INITIAL_ANNOUNCEMENTS));
    this.feedback = JSON.parse(JSON.stringify(INITIAL_FEEDBACK));
    this.templates = JSON.parse(JSON.stringify(INITIAL_TEMPLATES));
    this.dismissedIds.clear();
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY_DISMISSED);
      }
    } catch {}
    this.notify();
  }
}

export const communicationStore = new CommunicationStore();
