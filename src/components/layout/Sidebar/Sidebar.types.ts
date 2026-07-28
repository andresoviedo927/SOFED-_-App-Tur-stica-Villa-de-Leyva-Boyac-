export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
  className?: string;
}
