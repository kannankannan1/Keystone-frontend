import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  action?: ReactNode;
}

export function Breadcrumb({ items, action }: BreadcrumbProps) {
  return (
    <div className="flex items-center justify-between">
      <nav className="flex items-center gap-1.5 text-sm">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
            {item.href ? (
              <a
                href={item.href}
                className="text-slate-500 hover:text-blue-600 transition-colors dark:text-slate-400"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-medium text-slate-900 dark:text-white">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
      {action && <div>{action}</div>}
    </div>
  );
}
