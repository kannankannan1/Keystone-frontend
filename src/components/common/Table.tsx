import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface TableProps {
  children: ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className={cn('w-full text-left text-sm', className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className }: TableProps) {
  return (
    <thead className={cn('border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableProps) {
  return <tbody className={cn('divide-y divide-slate-100 dark:divide-slate-700/50', className)}>{children}</tbody>;
}

export function TableRow({ children, className, onClick }: TableProps & { onClick?: () => void }) {
  return (
    <tr
      className={cn(
        'transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className }: TableProps) {
  return <td className={cn('px-4 py-3', className)}>{children}</td>;
}

export function TableHead({ children, className }: TableProps) {
  return (
    <th className={cn('px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400', className)}>
      {children}
    </th>
  );
}
