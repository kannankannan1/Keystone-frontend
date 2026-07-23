import { FiSearch } from 'react-icons/fi';
import { cn } from '@/utils';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBox({ value, onChange, placeholder = 'Search...', className }: SearchBoxProps) {
  return (
    <div className={cn('relative', className)}>
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-blue-400"
      />
    </div>
  );
}
