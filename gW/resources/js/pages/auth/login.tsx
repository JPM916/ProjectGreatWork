import { Head } from '@inertiajs/react';
import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Panel: Form */}
      <div className="relative flex flex-col items-center justify-center p-6 md:p-10 bg-white lg:px-16 overflow-hidden">
        
        {/* Top-left SVG */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -rotate-180 pointer-events-none">
          <svg
            className="relative block w-[calc(199%+1.3px)] h-[400px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
              className="fill-[#454545]"
            />
          </svg>
        </div>

        {/* Logo */}
        <div className="mb-8 flex items-center gap-2 md:justify-start justify-center z-10">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img src="images/GWlogo.svg" alt="Logo" />
          </a>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md z-10">
          <Head title="Log in" />
          <LoginForm canResetPassword={true} showAlternativeLogin={true} />
        </div>
      </div>

      {/* Right Panel: Image */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src="images/Greatwork2Lobby.png"
          alt="Login"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3] dark:grayscale"
        />

        {/* Bottom-right SVG for desktop */}
        <div className="absolute bottom-0 right-0 w-full overflow-hidden leading-[0] pointer-events-none">
          <svg
            className="relative block w-[200%] h-[450px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
              className="fill-red-950"
            />
          </svg>
        </div>
      </div>

      {/* ✅ Bottom-right SVG for mobile screens */}
      <div className="absolute bottom-0 right-0 w-full overflow-hidden leading-[0] pointer-events-none lg:hidden">
        <svg
          className="relative block w-[200%] h-[450px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
            className="fill-red-900"
          />
        </svg>
      </div>
    </div>
  );
}
