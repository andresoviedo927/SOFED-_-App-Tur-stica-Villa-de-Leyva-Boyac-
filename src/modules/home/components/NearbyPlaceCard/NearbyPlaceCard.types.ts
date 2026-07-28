export interface NearbyPlaceCardProps {
  id: string;
  name: string;
  category?: string;
  distance?: string;
  imageUrl?: string;
  rating?: number;
  onClick?: () => void;
  className?: string;
}
