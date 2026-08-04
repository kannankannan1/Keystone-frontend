import { useState, useCallback, type ChangeEvent } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import { Button } from './Button';
import { cn } from '@/utils';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onUpload,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      if (file.size > maxSize) {
        setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
        return;
      }
      await onUpload(file);
    },
    [maxSize, onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  return (
    <div className={cn('space-y-2', className)}>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !disabled && document.getElementById('file-input')?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 transition-colors',
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
            : 'border-slate-300 bg-slate-50 hover:border-blue-400 dark:border-slate-600 dark:bg-slate-700/50',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <FiUpload size={32} className="text-slate-400" />
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-medium text-blue-600 dark:text-blue-400">Click to upload</span>
          {' or drag and drop'}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Max file size: {maxSize / 1024 / 1024}MB
        </p>
        <input
          id="file-input"
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}