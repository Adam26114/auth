"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function LoadingProvider({ children }: { children: React.ReactNode }) {
    return (
        <>

            <ProgressBar
                height="4px"
                color="#000"
                options={{ showSpinner: true }}
                shallowRouting
            />
            {children}
        </>
    );
}

export default LoadingProvider;
