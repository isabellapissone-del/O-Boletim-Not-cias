import React from 'react';
import { cn } from '../lib/utils';

interface AdSlotProps {
  type: 'header' | 'home_top' | 'sidebar' | 'in_article' | 'footer';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ type, className }) => {
  const label = {
    header: '728x90 Billboard',
    home_top: 'Full Width Hero Ad',
    sidebar: '300x600 Half Page',
    in_article: 'Content Inline Ad',
    footer: '970x250 Super Leaderboard'
  }[type];

  const heights = {
    header: 'h-[90px]',
    home_top: 'h-[120px]',
    sidebar: 'h-[600px]',
    in_article: 'h-[250px]',
    footer: 'h-[250px]'
  }[type];

  return (
    <div className={cn(
      "bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center text-neutral-400 my-8 overflow-hidden",
      heights,
      className
    )}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Publicidade</span>
      <div className="border border-dashed border-neutral-300 px-6 py-2 rounded text-xs font-mono">
        {label}
      </div>
    </div>
  );
};
