import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'pill';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'pill':
        return 'rounded-full';
      case 'text':
        return 'rounded-md h-4 my-1';
      case 'card':
        return 'rounded-3xl border border-white/[0.06]';
      case 'rectangular':
      default:
        return 'rounded-2xl';
    }
  };

  const customStyle: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    ...style,
  };

  return (
    <div
      className={`animate-shimmer relative overflow-hidden bg-white/[0.04] ${getVariantStyles()} ${className}`}
      style={customStyle}
      aria-hidden="true"
      {...props}
    />
  );
};

export default Skeleton;
