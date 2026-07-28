import React from 'react';
import AppIcon from '../AppIcon';
import { InputProps } from './Input.types';
import './Input.css';

export const Input: React.FC<InputProps> = ({
  variant = 'text',
  label,
  error,
  iconLeft,
  iconRight,
  options = [],
  className = '',
  type,
  ...restProps
}) => {
  const defaultIcon = variant === 'search' ? ('fi-rr-search' as const) : iconLeft;
  const inputType = type || (variant === 'search' ? 'search' : variant === 'date' ? 'date' : variant === 'time' ? 'time' : 'text');

  return (
    <div className={`app-input-container ${className}`}>
      {label && <label className="app-input-label">{label}</label>}
      <div className="app-input-wrapper">
        {defaultIcon && <AppIcon name={defaultIcon} size={18} color="var(--color-text-muted)" />}
        
        {variant === 'select' ? (
          <select className="app-input app-select" {...(restProps as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input type={inputType} className="app-input" {...restProps} />
        )}

        {iconRight && <AppIcon name={iconRight} size={18} color="var(--color-text-muted)" />}
      </div>
      {error && <span className="app-input-error">{error}</span>}
    </div>
  );
};

export default Input;
