import React from 'react';
import { Skeleton } from './Skeleton';

export const EventCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl bg-[#0B101D] border border-white/[0.08] p-5 sm:p-6 flex gap-4 sm:gap-6 items-center shadow-dark-card">
      {/* Metallic Date Badge Skeleton */}
      <Skeleton 
        variant="rectangular" 
        className="w-16 h-16 min-w-[64px] sm:w-20 sm:h-20 sm:min-w-[80px] rounded-2xl shrink-0" 
      />

      {/* Details Skeleton */}
      <div className="flex-1 min-w-0">
        <Skeleton variant="pill" className="w-20 h-4 mb-2" />
        <Skeleton variant="text" className="w-3/4 h-5 mb-3" />
        
        <div className="flex items-center gap-3">
          <Skeleton variant="rectangular" className="w-24 h-5 rounded-xl" />
          <Skeleton variant="rectangular" className="w-36 h-5 rounded-xl hidden sm:block" />
        </div>
      </div>

      {/* Arrow Indicator */}
      <Skeleton variant="circular" className="w-9 h-9 shrink-0" />
    </div>
  );
};

export default EventCardSkeleton;
