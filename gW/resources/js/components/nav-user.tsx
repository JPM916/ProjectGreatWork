import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useState } from 'react';
import { LogOutDialog } from './logout-alert';

export function NavUser() {
  const { auth } = usePage<SharedData>().props;
  const { state } = useSidebar();
  const isMobile = useIsMobile();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false); // Add state for logout dialog

  const handleLogoutClick = () => {
    // Toggle the state to show the dialog
    setShowLogoutDialog(true);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group"
          onClick={handleLogoutClick} // Directly handle click for logout dialog
        >
          <UserInfo user={auth.user} />
          <LogOut
          className="text-neutral-800 hover:text-red-800 bg:red-800 dark:text-red-800 dark:hover:text-red-800"  
          />
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* The LogOutDialog is triggered by the button click */}
      {showLogoutDialog && (
        <LogOutDialog
          open={showLogoutDialog}
          onOpenChange={setShowLogoutDialog} // Handle dialog state
        />
      )}
    </SidebarMenu>
  );
}
