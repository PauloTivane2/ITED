import React from 'react';
import { Skeleton } from './Skeleton';

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-12">
      {/* Left content */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <Skeleton variant="pill" className="w-44 h-7" />
        <Skeleton variant="text" className="w-3/4 h-10 sm:h-12" />
        <Skeleton variant="text" className="w-1/2 h-10 sm:h-12 mb-4" />
        <Skeleton variant="text" className="w-full h-5" />
        <Skeleton variant="text" className="w-5/6 h-5" />
        <Skeleton variant="text" className="w-4/5 h-5 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Skeleton variant="rectangular" className="w-full h-24 rounded-2xl" />
          <Skeleton variant="rectangular" className="w-full h-24 rounded-2xl" />
          <Skeleton variant="rectangular" className="w-full h-24 rounded-2xl" />
        </div>
      </div>

      {/* Right media */}
      <div className="lg:col-span-5 relative">
        <Skeleton variant="rectangular" className="w-full aspect-[4/5] rounded-3xl" />
      </div>
    </div>
  );
};

export default AboutSkeleton;
