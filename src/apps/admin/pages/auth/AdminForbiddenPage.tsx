import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogOut } from 'lucide-react';
import { authApi } from '../../../../shared/api';
import { AdminAuthLayout } from '../../AdminAuthLayout';

export function AdminForbiddenPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Access denied | Zarii';
  }, []);

  const handleSignOut = async () => {
    await authApi.signOut();
    sessionStorage.removeItem('zarii_admin_session');
    sessionStorage.removeItem('zarii_admin_last_activity');
    localStorage.removeItem('zarii_admin_auth');
    navigate('/admin/login', { replace: true });
  };

  return (
    <AdminAuthLayout title="Access denied" subtitle="Administrative clearance required">
      <div className="space-y-5 text-center">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            Your current account credentials do not have administrator or editor permissions to access the Zarii management portal.
          </p>
          <p className="text-2xs opacity-80">
            If you believe this is a mistake, please contact the platform administrator to update your account role.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-2.5 px-4 bg-[#124F40] hover:bg-[#0E3D32] text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5BB78D] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Student Workspace</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-500" />
            <span>Sign out and switch account</span>
          </button>
        </div>
      </div>
    </AdminAuthLayout>
  );
}
