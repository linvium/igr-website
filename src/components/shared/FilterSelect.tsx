'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterOption } from '@/components/shared/FilterPills';

interface FilterSelectProps {
  label?: string;
  options: FilterOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FilterSelect({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  className,
}: FilterSelectProps) {
  return (
    <div className={className}>
      {(label !== undefined && label !== '') && (
        <h3 className="text-sm font-medium mb-2">{label}</h3>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-auto min-w-[180px] max-w-[280px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
