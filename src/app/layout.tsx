import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";

// const inter = Inter({ subsets: ["latin"] });
const font = DM_Sans({ subsets: ['latin']})

export const metadata: Metadata = {
  title: "Saoji Builder",
  description: "All in one SASS Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        
        <body className={font.className}>
        <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
        >
          {children}
          </ThemeProvider>
        </body>
        
    </html>
    
    
  );
}
