import React from 'react';
import AppIcon from '@/components/ui/AppIcon';
import IconButton from '@/components/ui/IconButton';
import TEXTS from '@/constants/texts';
import ROUTES from '@/constants/routes';
import { SidebarProps } from './Sidebar.types';
import './Sidebar.css';

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onNavigate,
  className = '',
}) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: TEXTS.home.title, route: ROUTES.HOME, icon: 'fi-rr-touch' as const },
    { label: TEXTS.home.navLinks.interactive, route: ROUTES.INTERACTIVE, icon: 'fi-rr-touch' as const },
    { label: TEXTS.home.navLinks.services, route: ROUTES.SERVICES, icon: 'fi-rr-services' as const },
    { label: TEXTS.home.navLinks.lodging, route: ROUTES.LODGING, icon: 'fi-rr-lodging' as const },
    { label: TEXTS.home.navLinks.events, route: ROUTES.EVENTS, icon: 'fi-rr-events' as const },
    { label: TEXTS.settings.title, route: ROUTES.SETTINGS, icon: 'fi-rr-settings-sliders' as const },
  ];

  return (
    <div className={`app-sidebar-overlay ${className}`} onClick={onClose}>
      <div className="app-sidebar-content" onClick={(e) => e.stopPropagation()}>
        <div className="app-sidebar-header">
          <h2 className="app-sidebar-title">{TEXTS.app.title}</h2>
          <IconButton
            iconName="fi-rr-close"
            ariaLabel={TEXTS.app.closeLabel}
            onClick={onClose}
            iconColor="var(--color-text-dark)"
          />
        </div>

        <nav className="app-sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.route}
              type="button"
              className="app-sidebar-item"
              onClick={() => {
                onNavigate(item.route);
                onClose();
              }}
            >
              <AppIcon name={item.icon} size={20} color="var(--color-primary-orange-end)" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
