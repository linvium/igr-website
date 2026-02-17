'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterPillsProps {
  options: FilterOption[];
  selected?: string[];
  onSelect?: (value: string) => void;
  className?: string;
}

export function FilterPills({
  options,
  selected = [],
  onSelect,
  className,
}: FilterPillsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <Badge
            key={option.value}
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer transition-colors',
              isSelected && 'bg-primary text-primary-foreground',
              onSelect && 'hover:bg-primary hover:text-white',
            )}
            onClick={() => onSelect?.(option.value)}
          >
            {option.label}
          </Badge>
        );
      })}
    </div>
  );
}
