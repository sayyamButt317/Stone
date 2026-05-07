import React from 'react';
import { LayoutGrid } from 'lucide-react';

export interface SidebarChildLink {
  label: string;
  route: string;
}

export interface SidebarGroupLink {
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  children: SidebarChildLink[];
}


export const adminSidebarLinks: SidebarGroupLink[] = [
  {
    label: 'Stone',
    icon: React.createElement(LayoutGrid, { size: 15 }),
    iconBg: 'bg-primaryButton/10',
    iconColor: 'text-primarytext',
    children: [
      { label: 'Dashboard', route: '/dashboard' },
      { label: 'Projects', route: '/dashboard/projects' },
      { label: 'Account Details', route: '/dashboard/account-details' },
      { label: 'Reorders', route: '/dashboard/reorders' },
      { label: 'Gallery', route: '/dashboard/gallery' },
      { label: 'Vault', route: '/dashboard/vault' },
      { label: 'Store', route: '/dashboard/store' },
    ],
  },
];
