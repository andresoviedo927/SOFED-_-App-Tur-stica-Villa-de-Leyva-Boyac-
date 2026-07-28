export interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}
