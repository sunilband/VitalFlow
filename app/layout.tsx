import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/Providers/theme-provider";
import { Toaster, toast } from "sonner";
import { DonorProvider } from "@/contexts/donorContext";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Vital~Flow",
  description:
    "The next generation blood donation , monitoring and management system for the people of India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* context for Donor */}
          <DonorProvider>
            <Navbar />
            {children}
            <Toaster />
          </DonorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
