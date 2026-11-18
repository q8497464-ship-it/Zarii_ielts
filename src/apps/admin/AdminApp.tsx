import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminLoginPage } from './AdminLoginPage';
import { AdminMfaSetupPage } from './pages/auth/AdminMfaSetupPage';
import { AdminMfaChallengePage } from './pages/auth/AdminMfaChallengePage';
import { AdminForgotPasswordPage } from './pages/auth/AdminForgotPasswordPage';
import { AdminResetPasswordPage } from './pages/auth/AdminResetPasswordPage';
import { AdminAcceptInvitePage } from './pages/auth/AdminAcceptInvitePage';
import { AdminForbiddenPage } from './pages/auth/AdminForbiddenPage';
import { AdminGuard } from './AdminGuard';
import { AdminLayout } from './AdminLayout';
import { AdminOverviewPage } from './pages/AdminOverviewPage';
import { AdminContentPage } from './pages/AdminContentPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { AdminAIPage } from './pages/AdminAIPage';
import { AdminCommunicationPage } from './pages/AdminCommunicationPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { AdminSystemPage } from './pages/AdminSystemPage';

export function AdminApp() {
  return (
    <Routes>
      {/* 1. Admin Authentication Routes (Full-window centered layout) */}
      <Route path="login" element={<AdminLoginPage />} />
      <Route path="setup-2fa" element={<AdminMfaSetupPage />} />
      <Route path="verify-2fa" element={<AdminMfaChallengePage />} />
      <Route path="forgot-password" element={<AdminForgotPasswordPage />} />
      <Route path="reset-password" element={<AdminResetPasswordPage />} />
      <Route path="accept-invite" element={<AdminAcceptInvitePage />} />
      <Route path="forbidden" element={<AdminForbiddenPage />} />

      {/* 2. Overview - Admin Only */}
      <Route
        path=""
        element={
          <AdminGuard allowedRoles={['admin']}>
            <AdminLayout>
              <AdminOverviewPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 3. Content Management - Admin & Editor */}
      <Route
        path="content/*"
        element={
          <AdminGuard allowedRoles={['admin', 'editor']}>
            <AdminLayout>
              <AdminContentPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 4. Users - Admin Only */}
      <Route
        path="users/*"
        element={
          <AdminGuard allowedRoles={['admin']}>
            <AdminLayout>
              <AdminUsersPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 5. Analytics - Admin Only */}
      <Route
        path="analytics/*"
        element={
          <AdminGuard allowedRoles={['admin']}>
            <AdminLayout>
              <AdminAnalyticsPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 6. AI & Evaluation - Admin Only */}
      <Route
        path="ai/*"
        element={
          <AdminGuard allowedRoles={['admin']}>
            <AdminLayout>
              <AdminAIPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 7. Communication - Admin & Editor */}
      <Route
        path="communication/*"
        element={
          <AdminGuard allowedRoles={['admin', 'editor']}>
            <AdminLayout>
              <AdminCommunicationPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 8. Settings - Admin Only */}
      <Route
        path="settings/*"
        element={
          <AdminGuard allowedRoles={['admin']}>
            <AdminLayout>
              <AdminSettingsPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* 9. System - Admin Only */}
      <Route
        path="system/*"
        element={
          <AdminGuard allowedRoles={['admin']}>
            <AdminLayout>
              <AdminSystemPage />
            </AdminLayout>
          </AdminGuard>
        }
      />

      {/* Catch-all redirect to /admin */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default AdminApp;
