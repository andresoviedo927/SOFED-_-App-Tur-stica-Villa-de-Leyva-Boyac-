import type { FC } from 'react';
import styles from './Button.module.css';
import type { ButtonProps } from './Button.types';

export const Button: FC<ButtonProps> = ({
  children,
  kind = 'solid',
  size = 'medium',
  leftIcon,
  rightIcon,
  fullWidth = false,
  ariaLabel,
  loading = false,
  className = '',
  type = 'button',
  disabled = false,
  ...buttonProps
}) => {
  const buttonClassName = [
    styles.button,
    styles[kind],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClassName}
      disabled={disabled || loading}
      aria-label={ariaLabel ?? buttonProps['aria-label']}
      aria-busy={loading}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : leftIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      <span className={styles.label}>{children}</span>

      {!loading && rightIcon ? (
        <span className={styles.icon} aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
};

export default Button;
