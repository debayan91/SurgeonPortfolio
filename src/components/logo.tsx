import { cn } from '@/lib/utils';
import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('h-8 w-8 text-primary', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
        opacity="0.3"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

export default Logo;
