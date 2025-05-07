import { useSidebar } from "@/components/ui/sidebar";

export default function AppLogo2() {
  const { open } = useSidebar();

  return (
    <div className="w-full flex justify-center">
  <div className="relative w-full">
    <div className="flex flex-col items-center justify-center rounded-md">
      {open ? (
        <img
          src="/images/GWlogo.svg"
          alt="Sidebar Logo"
          className="w-[220px] h-[230px]"
        />
      ) : (
        <img
          src="/images/logo.svg"
          alt="Sidebar Icon"
          className="w-[44px] h-[40px]" // matches breadcrumb icon size
        />
      )}
    </div>

    {/* horizontal line */}
  </div>
</div>

  );
}
