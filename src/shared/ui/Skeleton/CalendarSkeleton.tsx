import React from 'react';
import { Skeleton } from './Skeleton';

export const CalendarSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Calendar Month Grid Skeleton */}
      <div className="lg:col-span-8 rounded-3xl bg-[#0B101D] border border-white/[0.08] p-6 sm:p-8 shadow-dark-card">
        {/* Month Header Nav */}
        <div className="flex items-center justify-between mb-8">
          <Skeleton variant="text" className="w-40 h-7" />
          <div className="flex gap-2">
            <Skeleton variant="rectangular" className="w-10 h-10 rounded-xl" />
            <Skeleton variant="rectangular" className="w-10 h-10 rounded-xl" />
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} variant="text" className="w-full h-4" />
          ))}
        </div>

        {/* Calendar Days Matrix (35 cells) */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} variant="rectangular" className="w-full h-12 sm:h-16 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Right: Selected Day Events List Skeleton */}
      <div className="lg:col-span-4 rounded-3xl bg-[#0B101D] border border-white/[0.08] p-6 sm:p-8 shadow-dark-card flex flex-col gap-4">
        <Skeleton variant="text" className="w-1/2 h-6 mb-2" />
        <Skeleton variant="rectangular" className="w-full h-24 rounded-2xl" />
        <Skeleton variant="rectangular" className="w-full h-24 rounded-2xl" />
      </div>
    </div>
  );
};

export default CalendarSkeleton;
