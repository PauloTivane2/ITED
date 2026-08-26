import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export interface GalleryItemData {
  _id?: string;
  id?: string;
  type: 'image' | 'video' | 'youtube';
  title?: string;
  imageUrl?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  category?: string;
  featured?: boolean;
  albumTitle?: string;
}

export const useGalleryItems = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchGallery = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.galleryItems),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        if (isMounted) {
          if (result && result.length > 0) {
            const flattenedItems = result.flatMap((album: any) => 
              (album.items || []).map((item: any) => ({
                ...item,
                _id: item.id || Math.random().toString(), 
                featured: item.featured || album.featured,
                albumTitle: album.title,
                title: item.title || album.title
              }))
            );
            setGalleryItems(flattenedItems);
          } else {
            setGalleryItems([]);
          }
        }
      } catch (err: any) {
        console.error("Error fetching gallery items:", err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  return { galleryItems, isLoading, error };
};

export default useGalleryItems;
