import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export interface MinistryItem {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
}

export const useMinistries = () => {
  const [ministries, setMinistries] = useState<MinistryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMinistries = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.ministries),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        if (isMounted) {
          setMinistries(Array.isArray(result) ? result : []);
        }
      } catch (err: any) {
        console.error("Error fetching ministries:", err);
        if (isMounted) {
          setError(err);
          setMinistries([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMinistries();
    return () => {
      isMounted = false;
    };
  }, []);

  return { ministries, isLoading, error };
};

export default useMinistries;
