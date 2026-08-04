import { useState } from 'react';
import { FiDownload, FiTrash2, FiFileText, FiImage, FiVideo, FiMusic, FiFile } from 'react-icons/fi';
import { Button, ConfirmDialog } from './index';
import { formatDate } from '@/utils';
import type { Attachment } from '@/types';

interface FileManagerProps {
  files: Attachment[];
  onDownload: (fileName: string) => void;
  onDelete: (fileId: string) => void;
}

function getFileIcon(fileType?: string) {
  if (!fileType) return FiFile;
  if (fileType.startsWith('image/')) return FiImage;
  if (fileType.startsWith('video/')) return FiVideo;
  if (fileType.startsWith('audio/')) return FiMusic;
  if (fileType.includes('pdf') || fileType.includes('document') || fileType.includes('text')) return FiFileText;
  return FiFile;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function FileManager({ files, onDownload, onDelete }: FileManagerProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (files.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => {
        const Icon = getFileIcon(file.fileType);
        return (
          <div
            key={file.id}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-700/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {file.fileName}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {formatFileSize(file.fileSize)}
                </span>
                <span className="text-xs text-slate-400">
                  {formatDate(file.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<FiDownload size={16} />}
                onClick={() => onDownload(file.fileName)}
                title="Download"
              />
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<FiTrash2 size={16} />}
                onClick={() => setDeleteId(file.id)}
                title="Delete"
                className="text-red-400 hover:text-red-600"
              />
            </div>
          </div>
        );
      })}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) {
            onDelete(deleteId);
            setDeleteId(null);
          }
        }}
        title="Delete File"
        message="Are you sure you want to delete this file? This action cannot be undone."
        type="danger"
        confirmText="Delete"
      />
    </div>
  );
}