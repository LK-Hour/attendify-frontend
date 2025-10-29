import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = ({ children, className = '', padding = 'md', hover = false }: CardProps) => {
  const baseStyles = 'rounded-lg bg-white shadow-md dark:bg-slate-800 border border-gray-200 dark:border-slate-700';
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover ? 'transition-shadow duration-200 hover:shadow-lg' : '';

  return (
    <div className={`${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};
