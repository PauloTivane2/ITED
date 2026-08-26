import React from 'react';
import { Skeleton } from './Skeleton';

export const GalleryCardSkeleton: React.FC<{ aspect?: 'square' | 'video' | 'portrait' }> = ({
  aspect = 'square'
}) => {
  const aspectClass = aspect === 'video' ? 'aspect-video' : aspect === 'portrait' ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-[#0B101D] border border-white/[0.08] shadow-dark-card ${aspectClass}`}>
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-4 left-4 right-4">
        <Skeleton variant="text" className="w-2/3 h-4 mb-1" />
        <Skeleton variant="text" className="w-1/3 h-3" />
      </div>
    </div>
  );
};

export default GalleryCardSkeleton;
