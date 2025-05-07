import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  import { router } from "@inertiajs/react";
  
  type LogOutDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm?: () => void;
  };
  
  export function LogOutDialog({ open, onOpenChange, onConfirm }: LogOutDialogProps) {
    const handleLogOut = () => {
      onConfirm?.();
      router.post(route('logout'));
    };
  
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent
          className={`sm:max-w-md fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transform transition-all duration-300 ease-out ${open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will log you out of your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-900 text-white hover:bg-red-800"
              onClick={handleLogOut}
            >
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  