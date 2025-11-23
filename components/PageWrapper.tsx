"use client";
import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname?.startsWith("/landing");

    if (isLandingPage) {
        return <>{children}</>;
    }

    return (
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-10">
            {children}
        </div>
    );
}
