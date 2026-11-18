import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, BookOpen, Layers, FileSpreadsheet } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The study page or test module you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2 text-left">
          <span className="text-[11px] font-bold uppercase text-slate-400 block px-1">Quick Destinations</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              to="/"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700 font-semibold flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-teal-600" />
              <span>Home</span>
            </Link>
            <Link
              to="/practice"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700 font-semibold flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Practice</span>
            </Link>
            <Link
              to="/vocab"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700 font-semibold flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-brand-700 dark:text-brand-400" />
              <span>Vocabulary</span>
            </Link>
            <Link
              to="/mock"
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-slate-700 font-semibold flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-amber-600" />
              <span>Mock Tests</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
