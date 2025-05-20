export interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export interface NavigationItemProps {
  href: string;
  label: string;
  icon?: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
} 