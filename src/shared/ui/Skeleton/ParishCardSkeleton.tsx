import React from 'react';
import { Skeleton } from './Skeleton';

export const ParishCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl bg-[#0B101D] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] shadow-dark-card">
      <div>
        {/* Photo Container */}
        <Skeleton variant="rectangular" className="w-full h-48 rounded-2xl mb-6" />
        
        {/* Name & Leader */}
        <Skeleton variant="text" className="w-1/2 h-6 mb-2" />
        <Skeleton variant="text" className="w-1/3 h-4 mb-4" />
        <Skeleton variant="text" className="w-full h-4 mb-2" />
        <Skeleton variant="text" className="w-4/5 h-4" />
      </div>

      {/* Action Line */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
        <Skeleton variant="text" className="w-28 h-4" />
        <Skeleton variant="circular" className="w-8 h-8" />
      </div>
    </div>
  );
};

export default ParishCardSkeleton;
