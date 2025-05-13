export interface DateRangeFilterProps {
  onChange: (range: { from: Date; to: Date }) => void;
  defaultValue?: { from: Date; to: Date };
}

export interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export interface FilterBarProps {
  onFiltersChange: (filters: ComplaintFilters) => void;
  defaultFilters?: Partial<ComplaintFilters>;
} 