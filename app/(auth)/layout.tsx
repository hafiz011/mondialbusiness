import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/auth_bg.png"
                    alt="Auth Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md p-4">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-white drop-shadow-md">
                        <Image src="/images/logo.png" alt="Mondial.eco" width={40} height={40} className="h-10 w-10" />
                        Mondial.eco
                    </Link>
                </div>

                <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-8 border border-white/20">
                    {children}
                </div>

                <div className="mt-8 text-center text-sm text-gray-300">
                    &copy; {new Date().getFullYear()} Mondial.eco. All rights reserved.
                </div>
            </div>
        </div>
    );
}
