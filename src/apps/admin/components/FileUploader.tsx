import React, { useState, useRef } from 'react';
import { UploadCloud, File, Image, Music, X, CheckCircle } from 'lucide-react';

import { validateUploadedFile } from '../../../shared/utils';

interface FileUploaderProps {
  accept?: string;
  maxSizeBytes?: number;
  maxSizeMb?: number;
  onFileSelect?: (file: File | null) => void;
  onFileSelected?: (file: File) => void;
  className?: string;
}

export function FileUploader({
  accept = 'image/*,audio/*',
  maxSizeBytes,
  maxSizeMb,
  onFileSelect,
  onFileSelected,
  className = '',
}: FileUploaderProps) {
  const effectiveMaxBytes = maxSizeBytes || (maxSizeMb ? maxSizeMb * 1024 * 1024 : 10 * 1024 * 1024);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = (file: File) => {
    setError(null);

    const allowedTypes = accept
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const validation = validateUploadedFile(file, {
      allowedMimeTypes: allowedTypes.length > 0 ? allowedTypes : undefined,
      maxBytes: effectiveMaxBytes,
    });

    if (!validation.isValid) {
      setError(validation.error || 'Invalid file uploaded.');
      return;
    }

    setSelectedFile(file);
    if (onFileSelect) onFileSelect(file);
    if (onFileSelected) onFileSelected(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else if (file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (onFileSelect) onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => e.target.files?.[0] && handleProcessFile(e.target.files[0])}
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`py-8 px-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-[#5BB78D] bg-[#5BB78D]/10'
              : 'border-slate-300 hover:border-slate-400 dark:border-[#24392F] dark:hover:border-slate-600 bg-white dark:bg-[#112019]'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#172A21] text-[#124F40] dark:text-[#5BB78D] flex items-center justify-center mb-2">
            <UploadCloud className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Click to upload or drag and drop
          </span>
          <span className="text-[11px] text-slate-400 mt-1">
            Accepts audio (MP3, WAV) and images (PNG, JPG, WebP) up to 10MB
          </span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-[#24392F] bg-white dark:bg-[#112019] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                {selectedFile.type.startsWith('image/') ? (
                  <Image className="w-4 h-4" />
                ) : selectedFile.type.startsWith('audio/') ? (
                  <Music className="w-4 h-4" />
                ) : (
                  <File className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {selectedFile.name}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Previews */}
          {previewUrl && selectedFile.type.startsWith('image/') && (
            <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-48 bg-slate-950 flex items-center justify-center">
              <img src={previewUrl} alt="Upload preview" className="max-h-48 object-contain" />
            </div>
          )}

          {previewUrl && selectedFile.type.startsWith('audio/') && (
            <div className="mt-2">
              <audio controls src={previewUrl} className="w-full h-8" />
            </div>
          )}
        </div>
      )}

      {error && (
        <span className="text-[11px] text-rose-500 font-medium block">{error}</span>
      )}
    </div>
  );
}
