import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type AccountingItems} from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavAccount({ items = [] }: { items: AccountingItems[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-2 p-t2">
            <SidebarGroupLabel>ACCOUNTING</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton  
                            asChild isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                            className="text-neutral-800 hover:text-red-800 bg:red-800 dark:text-red-800 dark:hover:text-red-800" 
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
