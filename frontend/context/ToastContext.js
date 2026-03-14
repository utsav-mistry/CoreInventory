'use client';
import { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const showSuccess = (msg) => toast.success(msg);
  const showError = (msg) => toast.error(msg);
  const showLoading = (msg) => toast.loading(msg);
  const dismiss = (id) => toast.dismiss(id);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showLoading, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
