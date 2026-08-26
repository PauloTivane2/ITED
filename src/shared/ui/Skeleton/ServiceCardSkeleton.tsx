import React from 'react';
import { Skeleton } from './Skeleton';

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="relative rounded-3xl p-7 sm:p-8 bg-[#0B101D] border border-white/[0.08] flex flex-col justify-between min-h-[380px] shadow-dark-card overflow-hidden">
      <div>
        {/* Top Tag & Pulsing Dot */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Skeleton variant="pill" className="w-28 h-6" />
          <Skeleton variant="circular" className="w-2.5 h-2.5" />
        </div>

        {/* Title */}
        <Skeleton variant="text" className="w-3/4 h-7 mb-3" />
        
        {/* Description Lines */}
        <Skeleton variant="text" className="w-full h-4 mb-2" />
        <Skeleton variant="text" className="w-5/6 h-4 mb-6" />

        {/* Time Capsule */}
        <div className="rounded-2xl p-4 bg-[#060911]/80 border border-white/[0.06] mb-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <Skeleton variant="text" className="w-20 h-3" />
            <Skeleton variant="pill" className="w-16 h-4" />
          </div>
          <Skeleton variant="text" className="w-32 h-6" />
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <Skeleton variant="text" className="w-24 h-4" />
        <Skeleton variant="text" className="w-16 h-4" />
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;
