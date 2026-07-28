export type MapCategoryState = 'default' | 'selected' | 'disabled';

export interface MapDirectoryCategory {
  id: string;
  label: string;
  shortLabel?: string;
  accessibilityLabel: string;
  icon: string;
}

export interface MapDirectoryPoint {
  id: string;
  categoryId: string;
  name: string;
  shortDescription?: string;
  mapPosition: {
    xPercent: number;
    yPercent: number;
  };
  pinAsset: string;
  isMock: boolean;
}
