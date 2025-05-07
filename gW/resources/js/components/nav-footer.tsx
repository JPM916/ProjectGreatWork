import { Icon } from '@/components/icon';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type ComponentPropsWithoutRef } from 'react';

export function NavFooter({
  items,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup> & {
  items: NavItem[];
}) {
  return (
    <SidebarGroup {...props} className={`group-data-[collapsible=icon]:p-0 ${className || ''}`}>
      <SidebarGroupContent>
        <SidebarGroupLabel>OTHERS</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild
                tooltip={{ children: item.title, }}
                className="text-neutral-800 hover:text-red-800 bg:red-800 dark:text-red-800 dark:hover:text-red-800" 
              >
                <Link href={item.href} prefetch>
                  {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
