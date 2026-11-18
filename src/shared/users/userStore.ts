import type { UserRole } from '../types/database';

export interface UserAttemptSummary {
  id: string;
  testId: string;
  testTitle: string;
  skill: 'reading' | 'listening' | 'writing' | 'speaking';
  rawScore: number;
  totalQuestions: number;
  band: number;
  durationMinutes: number;
  completedAt: string;
}

export interface UserFeedbackSummary {
  id: string;
  category: string;
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  sentAt: string;
}

export interface DetailedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended';
  joined: string;
  lastActive: string;
  attemptsCount: number;
  avgBand: number;
  targetBand: number;
  skillBands: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
  recentAttempts: UserAttemptSummary[];
  feedbackSent: UserFeedbackSummary[];
  notifications: UserNotification[];
}

const STORAGE_KEY = 'zarii_admin_users_v1';

const INITIAL_USERS: DetailedUser[] = [
  {
    id: 'u-101',
    name: 'Qamar Raza',
    email: 'q8497464@gmail.com',
    role: 'admin',
    status: 'active',
    joined: '2026-10-12',
    lastActive: '2026-11-18 09:15',
    attemptsCount: 28,
    avgBand: 8.2,
    targetBand: 8.5,
    skillBands: { reading: 8.5, listening: 8.5, writing: 7.5, speaking: 8.0 },
    recentAttempts: [
      {
        id: 'att-1',
        testId: 'acad-reading-01',
        testTitle: 'Cambridge Academic 19 Reading Test 1',
        skill: 'reading',
        rawScore: 38,
        totalQuestions: 40,
        band: 8.5,
        durationMinutes: 52,
        completedAt: '2026-11-17 19:30',
      },
      {
        id: 'att-2',
        testId: 'list-test-01',
        testTitle: 'Listening Practice Test 1',
        skill: 'listening',
        rawScore: 36,
        totalQuestions: 40,
        band: 8.5,
        durationMinutes: 34,
        completedAt: '2026-11-16 11:20',
      },
    ],
    feedbackSent: [],
    notifications: [],
  },
  {
    id: 'u-102',
    name: 'Aisha Al-Mansoor',
    email: 'aisha.m@example.com',
    role: 'student',
    status: 'active',
    joined: '2026-11-01',
    lastActive: '2026-11-18 08:30',
    attemptsCount: 14,
    avgBand: 7.4,
    targetBand: 7.5,
    skillBands: { reading: 7.5, listening: 8.0, writing: 6.5, speaking: 7.0 },
    recentAttempts: [
      {
        id: 'att-3',
        testId: 'acad-reading-01',
        testTitle: 'Cambridge Academic 19 Reading Test 1',
        skill: 'reading',
        rawScore: 33,
        totalQuestions: 40,
        band: 7.5,
        durationMinutes: 58,
        completedAt: '2026-11-17 21:05',
      },
    ],
    feedbackSent: [
      {
        id: 'fb-1',
        category: 'Content Issue',
        message: 'Question 14 in Academic 19 Reading Test 1 had a small typo.',
        status: 'reviewed',
        createdAt: '2026-11-17',
      },
    ],
    notifications: [],
  },
  {
    id: 'u-103',
    name: 'David Chen',
    email: 'david.chen@cambridge.edu',
    role: 'editor',
    status: 'active',
    joined: '2026-10-18',
    lastActive: '2026-11-17 16:45',
    attemptsCount: 5,
    avgBand: 8.0,
    targetBand: 8.0,
    skillBands: { reading: 8.5, listening: 8.0, writing: 8.0, speaking: 7.5 },
    recentAttempts: [],
    feedbackSent: [],
    notifications: [],
  },
  {
    id: 'u-104',
    name: 'Elena Rostova',
    email: 'elena.rostova@testmail.com',
    role: 'student',
    status: 'active',
    joined: '2026-11-08',
    lastActive: '2026-11-17 14:10',
    attemptsCount: 9,
    avgBand: 6.8,
    targetBand: 7.0,
    skillBands: { reading: 7.0, listening: 7.0, writing: 6.0, speaking: 6.5 },
    recentAttempts: [
      {
        id: 'att-4',
        testId: 'list-test-01',
        testTitle: 'Listening Practice Test 1',
        skill: 'listening',
        rawScore: 28,
        totalQuestions: 40,
        band: 6.5,
        durationMinutes: 38,
        completedAt: '2026-11-16 17:40',
      },
    ],
    feedbackSent: [
      {
        id: 'fb-2',
        category: 'Audio Problem',
        message: 'Listening Section 3 audio experienced brief stutter on mobile.',
        status: 'resolved',
        createdAt: '2026-11-14',
      },
    ],
    notifications: [],
  },
  {
    id: 'u-105',
    name: 'Hassan Tariq',
    email: 'hassan.t@example.org',
    role: 'student',
    status: 'suspended',
    joined: '2026-11-10',
    lastActive: '2026-11-12 10:05',
    attemptsCount: 2,
    avgBand: 6.2,
    targetBand: 6.5,
    skillBands: { reading: 6.5, listening: 6.0, writing: 6.0, speaking: 6.0 },
    recentAttempts: [],
    feedbackSent: [],
    notifications: [],
  },
  {
    id: 'u-106',
    name: 'Sarah Jenkins',
    email: 's.jenkins@oxfordcurriculum.org',
    role: 'editor',
    status: 'active',
    joined: '2026-10-25',
    lastActive: '2026-11-16 09:20',
    attemptsCount: 19,
    avgBand: 8.4,
    targetBand: 8.5,
    skillBands: { reading: 8.5, listening: 8.5, writing: 8.5, speaking: 8.0 },
    recentAttempts: [],
    feedbackSent: [],
    notifications: [],
  },
  {
    id: 'u-107',
    name: 'Vikram Patel',
    email: 'vikram.p99@gmail.com',
    role: 'student',
    status: 'active',
    joined: '2026-10-14',
    lastActive: '2026-11-18 07:45',
    attemptsCount: 31,
    avgBand: 7.6,
    targetBand: 7.5,
    skillBands: { reading: 8.0, listening: 7.5, writing: 7.0, speaking: 7.5 },
    recentAttempts: [
      {
        id: 'att-5',
        testId: 'acad-reading-02',
        testTitle: 'Academic Reading Practice Test 2',
        skill: 'reading',
        rawScore: 35,
        totalQuestions: 40,
        band: 8.0,
        durationMinutes: 55,
        completedAt: '2026-11-17 08:30',
      },
    ],
    feedbackSent: [
      {
        id: 'fb-3',
        category: 'Feature Suggestion',
        message: 'Dark mode passage reader greatly reduced eye strain.',
        status: 'reviewed',
        createdAt: '2026-11-16',
      },
    ],
    notifications: [],
  },
];

class UserStore {
  private users: DetailedUser[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.load();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.save();
    this.listeners.forEach((l) => l());
  }

  private load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.users = JSON.parse(raw);
          return;
        }
      }
    } catch {}
    this.users = [...INITIAL_USERS];
  }

  private save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users));
      }
    } catch {}
  }

  public getUsers(): DetailedUser[] {
    return [...this.users];
  }

  public getUserById(id: string): DetailedUser | undefined {
    return this.users.find((u) => u.id === id);
  }

  public getAdminsCount(): number {
    return this.users.filter((u) => u.role === 'admin' && u.status === 'active').length;
  }

  /**
   * Role change: Admin Only.
   * Safety rule: Prevent removing or demoting the last active administrator.
   */
  public changeUserRole(userId: string, newRole: UserRole): { success: boolean; error?: string } {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, error: 'User not found.' };

    if (user.role === 'admin' && newRole !== 'admin') {
      const remainingAdmins = this.getAdminsCount();
      if (remainingAdmins <= 1) {
        return {
          success: false,
          error: 'Action Blocked: Cannot revoke the last administrator account. Assign another admin first.',
        };
      }
    }

    user.role = newRole;
    this.notify();
    return { success: true };
  }

  public toggleSuspendUser(userId: string): { success: boolean; error?: string; newStatus?: 'active' | 'suspended' } {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, error: 'User not found.' };

    if (user.role === 'admin' && user.status === 'active') {
      const remainingAdmins = this.getAdminsCount();
      if (remainingAdmins <= 1) {
        return {
          success: false,
          error: 'Action Blocked: Cannot suspend the last remaining administrator account.',
        };
      }
    }

    user.status = user.status === 'active' ? 'suspended' : 'active';
    this.notify();
    return { success: true, newStatus: user.status };
  }

  /**
   * Invite new Admin or Editor staff member by email
   */
  public inviteStaff(name: string, email: string, role: 'admin' | 'editor'): DetailedUser {
    const newUser: DetailedUser = {
      id: `u-${Date.now().toString().slice(-4)}`,
      name: name.trim() || email.split('@')[0],
      email: email.trim().toLowerCase(),
      role,
      status: 'active',
      joined: new Date().toISOString().slice(0, 10),
      lastActive: 'Just invited',
      attemptsCount: 0,
      avgBand: 8.0,
      targetBand: 8.5,
      skillBands: { reading: 8.0, listening: 8.0, writing: 8.0, speaking: 8.0 },
      recentAttempts: [],
      feedbackSent: [],
      notifications: [],
    };

    this.users.unshift(newUser);
    this.notify();
    return newUser;
  }

  /**
   * Revoke access for an admin/editor
   */
  public revokeStaffAccess(userId: string): { success: boolean; error?: string } {
    return this.changeUserRole(userId, 'student');
  }

  /**
   * Send direct notification to candidate
   */
  public sendNotification(userId: string, title: string, message: string): boolean {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return false;

    user.notifications.unshift({
      id: `notif-${Date.now()}`,
      title,
      message,
      sentAt: new Date().toISOString(),
    });
    this.notify();
    return true;
  }

  /**
   * Delete User Data permanently (never expose passwords or secrets)
   */
  public deleteUserData(userId: string): { success: boolean; error?: string } {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return { success: false, error: 'User not found.' };

    if (user.role === 'admin') {
      const remainingAdmins = this.getAdminsCount();
      if (remainingAdmins <= 1) {
        return {
          success: false,
          error: 'Action Blocked: Cannot delete the last remaining administrator account.',
        };
      }
    }

    this.users = this.users.filter((u) => u.id !== userId);
    this.notify();
    return { success: true };
  }

  /**
   * Export single user data bundle (GDPR / Privacy friendly, zero secrets)
   */
  public exportSingleUserData(userId: string): string {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return '{}';

    const safeExport = {
      userProfile: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        joinedDate: user.joined,
        lastActive: user.lastActive,
        targetBand: user.targetBand,
        averageBand: user.avgBand,
        skillBands: user.skillBands,
      },
      attemptHistory: user.recentAttempts,
      feedbackSubmitted: user.feedbackSent,
      notificationsReceived: user.notifications,
      exportedAt: new Date().toISOString(),
      privacyCompliance: 'No passwords or authentication secrets stored or exported.',
    };

    return JSON.stringify(safeExport, null, 2);
  }

  /**
   * Bulk CSV Export of User Directory
   */
  public exportUsersCsv(): string {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Joined', 'Last Active', 'Attempts', 'Avg Band', 'Target Band'];
    const rows = this.users.map((u) => [
      `"${u.name.replace(/"/g, '""')}"`,
      u.email,
      u.role,
      u.status,
      u.joined,
      `"${u.lastActive}"`,
      u.attemptsCount,
      u.avgBand,
      u.targetBand,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }

  public bulkUpdateStatus(userIds: string[], status: 'active' | 'suspended'): void {
    userIds.forEach((id) => {
      const user = this.users.find((u) => u.id === id);
      if (user) {
        if (user.role === 'admin' && status === 'suspended') {
          if (this.getAdminsCount() <= 1) return;
        }
        user.status = status;
      }
    });
    this.notify();
  }

  public resetToDefault(): void {
    this.users = JSON.parse(JSON.stringify(INITIAL_USERS));
    this.notify();
  }

  public searchUsers(query: string): DetailedUser[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getUsers();
    return this.users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  public filterUsers(filters: { role?: UserRole; status?: 'active' | 'suspended' }): DetailedUser[] {
    return this.users.filter((u) => {
      if (filters.role && u.role !== filters.role) return false;
      if (filters.status && u.status !== filters.status) return false;
      return true;
    });
  }

  public sendUserNotification(userId: string, title: string, message: string): { success: boolean } {
    const res = this.sendNotification(userId, title, message);
    return { success: res };
  }

  public exportUserDataJson(userId: string): string {
    return this.exportSingleUserData(userId);
  }

  public exportUserDataCsv(userId?: string): string {
    return this.exportUsersCsv();
  }
}

export const userStore = new UserStore();
