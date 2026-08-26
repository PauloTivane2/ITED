import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export const useAboutData = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchAboutData = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.about),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        if (isMounted && result) {
          setAboutData(result);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAboutData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { aboutData, isLoading };
};

export default useAboutData;
