import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import LoadingProvider from "./context/LoadingProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
   title: "Auth Tutorial",
   description: "Generated by create next app",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth();

   return (
      <SessionProvider session={session}>
         <html lang="en">
            {/* <link rel="icon" href="/avator.svg" sizes="any" /> */}
            <body className={poppins.className}>
               <LoadingProvider>
                  {children}
                  <SpeedInsights />
                  <Toaster />
               </LoadingProvider>
            </body>
         </html>
      </SessionProvider>
   );
}
