import React from 'react';
import TEXTS from '@/constants/texts';
import { LoaderProps } from './Loader.types';
import './Loader.css';

export const Loader: React.FC<LoaderProps> = ({
  message = TEXTS.app.loadingText,
  className = '',
}) => {
  return (
    <div className={`app-loader ${className}`}>
      <div className="app-loader-spinner" />
      {message && <span className="app-loader-text">{message}</span>}
    </div>
  );
};

export default Loader;
