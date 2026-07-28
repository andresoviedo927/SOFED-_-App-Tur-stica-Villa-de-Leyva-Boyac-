import { useState } from 'react';
import { getHomeNavLinks } from '../services/homeService';
import { HomeNavLink } from '../types';

export const useHome = () => {
  const [navLinks] = useState<HomeNavLink[]>(getHomeNavLinks());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  return {
    navLinks,
    isSettingsOpen,
    toggleSettings,
  };
};

export default useHome;
