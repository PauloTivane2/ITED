import React from 'react';
import { Skeleton } from './Skeleton';

export const MinistryCardSkeleton: React.FC = () => {
  return (
    <div className="relative aspect-[3/4] min-h-[440px] rounded-3xl overflow-hidden bg-[#0B101D] border border-white/[0.08] shadow-dark-card p-7 lg:p-8 flex flex-col justify-between">
      {/* Top Icon Badge */}
      <div className="flex items-center justify-between">
        <Skeleton variant="rectangular" className="w-12 h-12 rounded-2xl" />
      </div>

      {/* Bottom Content Area */}
      <div className="mt-auto">
        <Skeleton variant="pill" className="w-10 h-1 mb-3.5" />
        <Skeleton variant="text" className="w-2/3 h-6 mb-3" />
        <Skeleton variant="text" className="w-full h-4 mb-2" />
        <Skeleton variant="text" className="w-5/6 h-4 mb-5" />
        
        {/* Bottom Sub-Action */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <Skeleton variant="text" className="w-24 h-3" />
          <Skeleton variant="text" className="w-16 h-3" />
        </div>
      </div>
    </div>
  );
};

export default MinistryCardSkeleton;
