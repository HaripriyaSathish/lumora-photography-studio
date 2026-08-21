import React from 'react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border bg-white shadow-2xl transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'border-[#FF5A36]/40 text-[#101828] shadow-[#FF5A36]/10'
              : toast.type === 'error'
              ? 'border-red-500/40 text-[#101828] shadow-red-500/10'
              : 'border-[#2563EB]/40 text-[#101828] shadow-blue-500/10'
          }`}
        >
          {toast.type === 'success' && (
            <div className="p-1.5 rounded-lg bg-[#FF5A36]/10 text-[#FF5A36] shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          )}
          {toast.type === 'error' && (
            <div className="p-1.5 rounded-lg bg-red-50 text-red-600 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="p-1.5 rounded-lg bg-blue-50 text-[#2563EB] shrink-0 mt-0.5">
              <Info className="w-5 h-5" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#101828] tracking-tight">{toast.title}</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{toast.message}</p>
          </div>

          <button
            id={`btn-dismiss-toast-${toast.id}`}
            onClick={() => onDismiss(toast.id)}
            className="text-slate-400 hover:text-slate-700 p-1 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
