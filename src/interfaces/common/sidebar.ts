export interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

export interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface SidebarHeaderProps {
  userName: string;
  userRole: string;
  companyName: string;
} 