import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export interface ParishItem {
  _id?: string;
  name: string;
  leader?: string;
  location?: string;
  phone?: string;
  image?: string;
  description?: string;
}

export const useParishes = () => {
  const [parishes, setParishes] = useState<ParishItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchParishes = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.parishes),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        if (isMounted) {
          setParishes(Array.isArray(result) ? result : []);
        }
      } catch (err: any) {
        console.error("Error fetching parishes:", err);
        if (isMounted) {
          setError(err);
          setParishes([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchParishes();
    return () => {
      isMounted = false;
    };
  }, []);

  return { parishes, isLoading, error };
};

export default useParishes;
