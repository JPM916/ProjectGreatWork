import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Greatwork">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* 💥 Full-screen background image container */}
            <div className="relative h-screen w-full overflow-hidden">
                {/* Background image */}
                <img
                    src="/images/Untitled design.png"
                    alt="Welcome"
                    className="absolute inset-0 h-full w-full object-cover object-center z-0"
                />

                {/* 💥 Foreground content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-white p-6 lg:p-8">
                    {/* Header navigation (buttons) in the top-right corner */}
                    <header className="absolute top-6 right-6 z-10">
                        <nav className="flex gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-white/20 px-5 py-2 text-sm text-white hover:border-white/40"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-white font-semibold px-5 py-2 text-sm text-white hover:bg-white hover:text-red-900 transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border bg-red-900 px-5 py-2 text-sm text-white font-semibold hover:bg-transparent hover:text-red-900 transition"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Optional main text area */}
                    <div className="flex w-full items-center justify-center opacity-100">
                        {/* You can add welcome text or CTA here */}
                    </div>

                    {/* Bottom SVG */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                        <svg
                            className="relative block w-[140%] h-[535px]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1100 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                                className="fill-[#7B1A18]"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
