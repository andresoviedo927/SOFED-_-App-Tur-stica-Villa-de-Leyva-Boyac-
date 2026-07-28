export interface EventMediaActionButtonProps {
  type: 'photos' | 'drone';
  icon: string;
  label: string;
  disabled?: boolean;
  unavailableMessage?: string;
  onClick: () => void;
}
