import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type User } from '@/types';

import { LogOut } from 'lucide-react';
import { useState } from 'react';


interface UserMenuContentProps {
  user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  return (
    <>
      <div className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo user={user} showEmail={true} />
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <button
        type="button"
        className="flex w-full items-center py-2 px-4 hover:bg-gray-100"
        onClick={() => setShowLogoutDialog(true)}
      >
        <LogOut className="mr-2" />
        Log out
      </button>
    </>
  );
}
