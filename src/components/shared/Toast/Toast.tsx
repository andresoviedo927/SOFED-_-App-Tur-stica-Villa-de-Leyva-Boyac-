import React, { useEffect } from 'react';
import AppIcon from '@/components/ui/AppIcon';
import { ToastProps } from './Toast.types';
import './Toast.css';

export const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  onClose,
  className = '',
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`app-toast ${className}`}>
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Cerrar notificación">
        <AppIcon name="fi-rr-close" size={16} color="#FFFFFF" />
      </button>
    </div>
  );
};

export default Toast;
