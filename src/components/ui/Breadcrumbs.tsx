import React from 'react';
import { cn } from '../../lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-slate-500 dark:text-slate-400', className)}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {showHome && (
          <li className="flex items-center">
            <Link
              to="/"
              className="flex items-center hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-1 rounded-md"
              aria-label="Home"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
        )}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
              {isLast || !item.href ? (
                <span
                  className={cn(
                    'font-medium truncate max-w-[200px]',
                    isLast ? 'text-slate-900 dark:text-slate-100 font-semibold' : 'text-slate-500 dark:text-slate-400'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon && <span className="mr-1.5 inline-block">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium flex items-center gap-1"
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
