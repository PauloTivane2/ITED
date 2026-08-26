import { useState, useEffect } from 'react';
import { sanityClient, queries } from '@/cms/sanity/client';

export interface ServiceItem {
  _id?: string;
  name: string;
  day: string;
  time: string;
  description: string;
  modality?: string;
  location?: string;
  active?: boolean;
}

export const useServices = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const [result] = await Promise.all([
          sanityClient.fetch(queries.serviceTimes),
          new Promise(resolve => setTimeout(resolve, 300))
        ]);
        if (isMounted) {
          setServices(Array.isArray(result) ? result : []);
        }
      } catch (err: any) {
        console.error("Error fetching services:", err);
        if (isMounted) {
          setError(err);
          setServices([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  return { services, isLoading, error };
};

export default useServices;
