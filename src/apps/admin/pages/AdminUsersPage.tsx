import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Mail,
  GraduationCap,
  Calendar,
  AlertTriangle,
  UserPlus,
  Download,
  Trash2,
  Bell,
  Eye,
  X,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Award,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { DataTable, type ColumnDef } from '../components/DataTable';
import { FilterBar, type FilterGroup } from '../components/FilterBar';
import { StatusBadge } from '../components/StatusBadge';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { useAdminToast } from '../components/AdminToast';
import { userStore, type DetailedUser } from '../../../shared/users/userStore';
import type { UserRole } from '../../../shared/types/database';

export function AdminUsersPage() {
  const { addToast } = useAdminToast();
  const [users, setUsers] = useState<DetailedUser[]>(() => userStore.getUsers());

  // Filters & Search
  const [searchValue, setSearchValue] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Drawer & Modal State
  const [selectedUser, setSelectedUser] = useState<DetailedUser | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'editor'>('editor');

  // Notification Modal State
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  const [notifyTitle, setNotifyTitle] = useState('');
  const [notifyMessage, setNotifyMessage] = useState('');

  // Delete User Confirmation State
  const [deleteTarget, setDeleteTarget] = useState<DetailedUser | null>(null);

  useEffect(() => {
    return userStore.subscribe(() => {
      setUsers(userStore.getUsers());
      // Refresh selected user if open
      if (selectedUser) {
        const fresh = userStore.getUserById(selectedUser.id);
        setSelectedUser(fresh || null);
      }
    });
  }, [selectedUser]);

  const filterGroups: FilterGroup[] = [
    {
      id: 'role',
      label: 'Role Clearance',
      selectedValue: roleFilter,
      options: [
        { label: 'All Roles', value: 'all' },
        { label: 'Students', value: 'student' },
        { label: 'Editors', value: 'editor' },
        { label: 'Administrators', value: 'admin' },
      ],
    },
    {
      id: 'status',
      label: 'Account Status',
      selectedValue: statusFilter,
      options: [
        { label: 'All Statuses', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
      ],
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;
      if (searchValue.trim()) {
        const q = searchValue.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [users, roleFilter, statusFilter, searchValue]);

  // Actions
  const handleToggleSuspend = (user: DetailedUser) => {
    const res = userStore.toggleSuspendUser(user.id);
    if (!res.success) {
      addToast({
        type: 'error',
        title: 'Action Prevented',
        message: res.error || 'Cannot alter status.',
      });
    } else {
      addToast({
        type: res.newStatus === 'active' ? 'success' : 'warning',
        title: res.newStatus === 'active' ? 'Account Activated' : 'Account Suspended',
        message: `${user.name} is now ${res.newStatus}.`,
      });
    }
  };

  const handleChangeRole = (userId: string, newRole: UserRole) => {
    const res = userStore.changeUserRole(userId, newRole);
    if (!res.success) {
      addToast({
        type: 'error',
        title: 'Role Update Blocked',
        message: res.error || 'Failed to modify role clearance.',
      });
    } else {
      addToast({
        type: 'success',
        title: 'Role Updated',
        message: `Clearance level changed to "${newRole}".`,
      });
    }
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !notifyTitle.trim() || !notifyMessage.trim()) return;

    userStore.sendNotification(selectedUser.id, notifyTitle, notifyMessage);
    addToast({
      type: 'success',
      title: 'Notification Dispatched',
      message: `Direct notice sent to ${selectedUser.name}.`,
    });
    setIsNotifyModalOpen(false);
    setNotifyTitle('');
    setNotifyMessage('');
  };

  const handleExportUserData = (user: DetailedUser) => {
    const json = userStore.exportSingleUserData(user.id);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zarii-user-${user.id}-export.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'User Data Exported',
      message: `GDPR-compliant export downloaded for ${user.email}. (Zero passwords exposed)`,
    });
  };

  const handleExportDirectoryCsv = () => {
    const csv = userStore.exportUsersCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zarii-users-directory-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: 'success',
      title: 'Directory Exported',
      message: `${users.length} user records exported to CSV.`,
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const res = userStore.deleteUserData(deleteTarget.id);
    if (!res.success) {
      addToast({
        type: 'error',
        title: 'Deletion Prevented',
        message: res.error || 'Cannot delete user.',
      });
    } else {
      addToast({
        type: 'warning',
        title: 'User Permanently Removed',
        message: `${deleteTarget.name} (${deleteTarget.email}) removed from platform records.`,
      });
      setSelectedUser(null);
    }
    setDeleteTarget(null);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    userStore.inviteStaff(inviteName, inviteEmail, inviteRole);
    addToast({
      type: 'success',
      title: 'Invitation Dispatched',
      message: `Credentials invite for ${inviteRole.toUpperCase()} sent to ${inviteEmail}.`,
    });
    setIsInviteModalOpen(false);
    setInviteEmail('');
    setInviteName('');
  };

  const columns: ColumnDef<DetailedUser>[] = [
    {
      id: 'name',
      header: 'Name & Candidate ID',
      accessorKey: 'name',
      sortable: true,
      cell: (u) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#124F40]/15 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] font-bold text-xs flex items-center justify-center shrink-0">
            {u.name.charAt(0)}
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white block">{u.name}</span>
            <span className="text-[11px] text-slate-400 font-mono">ID: {u.id}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'email',
      header: 'Email Address',
      accessorKey: 'email',
      sortable: true,
      cell: (u) => <span className="font-mono text-xs text-slate-600 dark:text-slate-300">{u.email}</span>,
    },
    {
      id: 'role',
      header: 'Role',
      accessorKey: 'role',
      sortable: true,
      cell: (u) => {
        const roleColors =
          u.role === 'admin'
            ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200'
            : u.role === 'editor'
            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200'
            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200';
        return (
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${roleColors}`}>
            {u.role}
          </span>
        );
      },
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status',
      sortable: true,
      cell: (u) => <StatusBadge status={u.status === 'active' ? 'active' : 'suspended'} />,
    },
    {
      id: 'joined',
      header: 'Joined',
      accessorKey: 'joined',
      sortable: true,
      cell: (u) => <span className="text-xs text-slate-500 font-mono">{u.joined}</span>,
    },
    {
      id: 'lastActive',
      header: 'Last Active',
      accessorKey: 'lastActive',
      sortable: true,
      cell: (u) => <span className="text-xs text-slate-500">{u.lastActive}</span>,
    },
    {
      id: 'attemptsCount',
      header: 'Attempts',
      accessorKey: 'attemptsCount',
      sortable: true,
      cell: (u) => <span className="text-xs font-mono font-bold">{u.attemptsCount} tests</span>,
    },
    {
      id: 'avgBand',
      header: 'Avg Band',
      accessorKey: 'avgBand',
      sortable: true,
      cell: (u) => (
        <span className="text-xs font-mono font-bold text-[#124F40] dark:text-[#5BB78D]">
          Band {u.avgBand}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Inspect',
      cell: (u) => (
        <button
          onClick={() => setSelectedUser(u)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5 text-[#5BB78D]" />
          <span>Details</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#112019] border border-slate-200/90 dark:border-[#24392F] shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            User Directory &amp; Access Controls
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student candidate cohorts, inspect performance trajectories, and invite staff.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportDirectoryCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Directory CSV</span>
          </button>

          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#5BB78D]" />
            <span>Invite Staff Member</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <FilterBar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search candidates by name, email, or user ID..."
        filters={filterGroups}
        onFilterChange={(filterId, val) => {
          if (filterId === 'role') setRoleFilter(val);
          if (filterId === 'status') setStatusFilter(val);
        }}
        onResetFilters={() => {
          setSearchValue('');
          setRoleFilter('all');
          setStatusFilter('all');
        }}
      />

      {/* 3. User Table */}
      <DataTable
        data={filteredUsers}
        columns={columns}
        keyExtractor={(u) => u.id}
        title="REGISTERED ACCOUNTS"
        bulkActions={[
          {
            label: 'Activate Selected',
            icon: UserCheck,
            onClick: (sel) => {
              userStore.bulkUpdateStatus(sel.map((s) => s.id), 'active');
              addToast({ type: 'success', title: 'Accounts Activated', message: `${sel.length} accounts reactivated.` });
            },
          },
          {
            label: 'Suspend Selected',
            icon: UserX,
            onClick: (sel) => {
              userStore.bulkUpdateStatus(sel.map((s) => s.id), 'suspended');
              addToast({ type: 'warning', title: 'Accounts Suspended', message: `${sel.length} accounts suspended.` });
            },
            isDestructive: true,
          },
        ]}
      />

      {/* 4. User Detail Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-2xs">
          <div className="w-full max-w-xl h-full bg-white dark:bg-[#112019] border-l border-slate-200 dark:border-[#24392F] p-6 space-y-6 shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#124F40]/15 dark:bg-[#5BB78D]/20 text-[#124F40] dark:text-[#5BB78D] font-bold text-lg flex items-center justify-center">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {selectedUser.name}
                    <StatusBadge status={selectedUser.status === 'active' ? 'active' : 'suspended'} />
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Avg Band</span>
                <span className="text-base font-bold font-mono text-[#124F40] dark:text-[#5BB78D]">
                  Band {selectedUser.avgBand}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Target Band</span>
                <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400">
                  Band {selectedUser.targetBand}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Attempts</span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  {selectedUser.attemptsCount}
                </span>
              </div>
            </div>

            {/* Skill Band Distribution Mini-Chart */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Skill Score Breakdown
              </h3>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { skill: 'Reading', band: selectedUser.skillBands.reading },
                      { skill: 'Listening', band: selectedUser.skillBands.listening },
                      { skill: 'Writing', band: selectedUser.skillBands.writing },
                      { skill: 'Speaking', band: selectedUser.skillBands.speaking },
                    ]}
                    margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  >
                    <XAxis dataKey="skill" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 9]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="band" fill="#124F40" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Action Bar (Role Change, Suspend, Notification, Export, Delete) */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Administrative Controls
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                {/* Role Change Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-500">Role:</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => handleChangeRole(selectedUser.id, e.target.value as UserRole)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
                  >
                    <option value="student">Student</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                {/* Suspend / Reactivate */}
                <button
                  type="button"
                  onClick={() => handleToggleSuspend(selectedUser)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {selectedUser.status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
                </button>

                {/* Send Notification */}
                <button
                  type="button"
                  onClick={() => setIsNotifyModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  <span>Notify</span>
                </button>

                {/* Export Data */}
                <button
                  type="button"
                  onClick={() => handleExportUserData(selectedUser)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                {/* Delete Account */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(selectedUser)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="pt-2 text-[10px] text-slate-400">
                🔒 Security Compliance: Passwords and authentication tokens are strictly protected by Supabase Auth and never shown or transmitted.
              </div>
            </div>

            {/* Recent Attempts History */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Recent Exam Attempts ({selectedUser.recentAttempts.length})</span>
              </h3>

              {selectedUser.recentAttempts.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-center text-xs text-slate-400">
                  No recorded test attempts yet.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedUser.recentAttempts.map((att) => (
                    <div
                      key={att.id}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{att.testTitle}</span>
                        <span className="text-[10px] text-slate-400">
                          {att.completedAt} • {att.durationMinutes} min
                        </span>
                      </div>
                      <div className="text-right font-mono font-bold text-[#124F40] dark:text-[#5BB78D]">
                        Band {att.band} ({att.rawScore}/{att.totalQuestions})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submitted Feedback History */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Candidate Feedback &amp; Tickets ({selectedUser.feedbackSent.length})</span>
              </h3>

              {selectedUser.feedbackSent.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-center text-xs text-slate-400">
                  No feedback tickets submitted by candidate.
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedUser.feedbackSent.map((fb) => (
                    <div
                      key={fb.id}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{fb.category}</span>
                        <span className="text-[10px] font-mono text-slate-400">{fb.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{fb.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. Invite Admin / Editor Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-2xs">
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#5BB78D]" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Invite Admin or Editor</h2>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Staff Member Name
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Professor David Miller"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="name@university.edu or user@zarii.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clearance Level
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as 'admin' | 'editor')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white font-bold"
                >
                  <option value="editor">Editor (Content &amp; Communication Only)</option>
                  <option value="admin">Administrator (Full System &amp; User Access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#124F40] hover:bg-[#0E3D32] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Send Notification Modal */}
      {isNotifyModalOpen && selectedUser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-2xs">
          <div className="bg-white dark:bg-[#112019] border border-slate-200 dark:border-[#24392F] rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Notify Candidate: {selectedUser.name}
              </h3>
              <button onClick={() => setIsNotifyModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSendNotification} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={notifyTitle}
                  onChange={(e) => setNotifyTitle(e.target.value)}
                  placeholder="e.g. Cambridge Academic 19 Reading Review Ready"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Notification Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={notifyMessage}
                  onChange={(e) => setNotifyMessage(e.target.value)}
                  placeholder="Enter message visible in candidate workspace..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNotifyModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#124F40] text-white text-xs font-bold"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Delete User Confirm Dialog (Type DELETE to verify) */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Permanently Delete Candidate Data?"
        message={`Are you certain you want to purge all attempt history and account records for ${deleteTarget?.name} (${deleteTarget?.email})? Type DELETE to confirm.`}
        confirmMatchText="DELETE"
        confirmLabel="Purge User Data"
      />
    </div>
  );
}
