import clsx from 'clsx';
import React from 'react';

interface SkeletonProps {
  className?: string;
  lines?: number;
}

const Skeleton = ({ className, lines = 5 }: SkeletonProps) => {
  const skelLines = Array.from({ length: lines }).map((_, i) => i);
  return (
    <div className={clsx(className ?? '', 'mx-auto w-full rounded-md border-blue-300')}>
      <div className='flex animate-pulse space-x-4'>
        <div className='flex-1 space-y-2 py-1'>
          {skelLines.map((_: number, i: number) => (
            <div key={i} className='h-2 rounded bg-slate-700'></div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Skeleton;
