import clsx from 'clsx';
import React, { ReactNode, forwardRef } from 'react';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  children: ReactNode;
  className?: string;
}
const Tooltip = forwardRef(({ message, children, className }: TooltipProps, ref) => {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={clsx('group relative flex')}>
      {children}
      <span className={clsx('absolute top-10 scale-0 truncate rounded p-2 text-xs transition-all group-hover:scale-100', className ?? 'bg-gray-600 text-white')}>{message}</span>
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
export default Tooltip;
