import { clsx } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs) { return clsx(inputs); }

export const formatDate = (date) => {
  if (!date) return '—';
  return format(new Date(date), 'dd MMM yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '—';
  return format(new Date(date), 'dd MMM yyyy, HH:mm');
};

export const timeAgo = (date) => {
  if (!date) return '—';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const getStatusColor = (status) => {
  const map = {
    draft: 'bg-gray-500/15 text-gray-400 border-gray-500/20',
    waiting: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    ready: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    done: 'bg-green-500/15 text-green-400 border-green-500/20',
    canceled: 'bg-red-500/15 text-red-400 border-red-500/20',
  };
  return map[status] || map.draft;
};

export const getMovementColor = (type) => {
  const map = {
    IN: 'text-green-400',
    OUT: 'text-red-400',
    TRANSFER_IN: 'text-blue-400',
    TRANSFER_OUT: 'text-orange-400',
    ADJUSTMENT: 'text-purple-400',
  };
  return map[type] || 'text-gray-400';
};

export const formatQuantity = (qty, uom = '') => {
  return `${Number(qty).toLocaleString()} ${uom}`.trim();
};

export const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
