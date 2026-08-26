import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export interface EventItem {
  _id?: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  tag?: string;
  tagColor?: string;
  description?: string;
  featured?: boolean;
}

export const useFeaturedEvents = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEvents = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.featuredEvents),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        if (isMounted) {
          setEvents(Array.isArray(result) ? result : []);
        }
      } catch (err: any) {
        console.error("Error fetching featured events:", err);
        if (isMounted) {
          setError(err);
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  return { events, isLoading, error };
};

export default useFeaturedEvents;
