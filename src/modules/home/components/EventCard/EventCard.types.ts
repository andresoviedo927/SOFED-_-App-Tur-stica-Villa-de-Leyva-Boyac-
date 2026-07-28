export interface EventCardProps {
  id: string;
  title: string;
  date?: string;
  location?: string;
  category?: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}
