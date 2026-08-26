import React from 'react';
import { Skeleton } from './Skeleton';

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-7xl">
        <div className="max-w-3xl flex flex-col gap-6 sm:gap-8">
          {/* Badge */}
          <Skeleton variant="pill" className="w-56 h-8" />

          {/* Title */}
          <div className="space-y-3">
            <Skeleton variant="text" className="w-4/5 h-12 sm:h-16" />
            <Skeleton variant="text" className="w-3/5 h-12 sm:h-16" />
          </div>

          {/* Subtitle */}
          <div className="space-y-2 max-w-xl">
            <Skeleton variant="text" className="w-full h-5" />
            <Skeleton variant="text" className="w-4/5 h-5" />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Skeleton variant="rectangular" className="w-44 h-14 rounded-2xl" />
            <Skeleton variant="rectangular" className="w-44 h-14 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
