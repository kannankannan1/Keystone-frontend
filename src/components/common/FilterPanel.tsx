import { cn } from '@/utils';

interface FilterPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function FilterPanel({ children, className }: FilterPanelProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800',
        className
      )}
    >
      {children}
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export function FilterSelect({ label, value, onChange, options, className }: FilterSelectProps) {
  return (
    <div className={cn('min-w-[150px]', className)}>
      <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
