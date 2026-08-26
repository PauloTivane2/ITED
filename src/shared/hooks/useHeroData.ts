import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export interface HeroData {
  badge?: string;
  titlePrefix?: string;
  typewriterWords?: string[];
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  bibleReference?: string;
  bibleText?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  stats?: Array<{ number: string; label: string }>;
}

export const useHeroData = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchHeroData = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.hero),
          new Promise(resolve => setTimeout(resolve, 300)) // Guarantee smooth skeleton presentation
        ]);
        if (isMounted && result) {
          setHeroData(result);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHeroData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { heroData, isLoading };
};

export default useHeroData;
