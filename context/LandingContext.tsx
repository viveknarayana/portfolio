"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface LandingContextType {
    isLandingVisible: boolean;
    setIsLandingVisible: (visible: boolean) => void;
}

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export function LandingProvider({ children }: { children: ReactNode }) {
    const [isLandingVisible, setIsLandingVisible] = useState(true);

    return (
        <LandingContext.Provider value={{ isLandingVisible, setIsLandingVisible }}>
            {children}
        </LandingContext.Provider>
    );
}

export function useLanding() {
    const context = useContext(LandingContext);
    if (context === undefined) {
        throw new Error("useLanding must be used within a LandingProvider");
    }
    return context;
}
