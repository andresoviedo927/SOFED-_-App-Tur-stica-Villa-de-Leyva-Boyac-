import React from 'react';
import TEXTS from '@/constants/texts';
import { FooterProps } from './Footer.types';
import './Footer.css';

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`app-footer ${className}`}>
      <span>{TEXTS.app.title} &copy; {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
