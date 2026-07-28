export interface FeaturedExperienceCardProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  onClick?: () => void;
  className?: string;
}
