export type ArtworkCategory = 'anime' | 'sketch' | 'character' | 'commission';

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  description: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  blurDataURL: string;
  timeTaken: string;
  price?: string;
  featured?: boolean;
  createdAt: string;
}
