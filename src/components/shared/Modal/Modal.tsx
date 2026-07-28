import React from 'react';
import IconButton from '@/components/ui/IconButton';
import TEXTS from '@/constants/texts';
import { ModalProps } from './Modal.types';
import './Modal.css';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div className={`app-modal-overlay ${className}`} onClick={onClose}>
      <div className="app-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="app-modal-header">
          {title && <h2 className="app-modal-title">{title}</h2>}
          <IconButton
            iconName="fi-rr-close"
            ariaLabel={TEXTS.app.closeLabel}
            onClick={onClose}
            iconColor="var(--color-text-dark)"
          />
        </div>
        <div className="app-modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
