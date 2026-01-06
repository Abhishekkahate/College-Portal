import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "Student Portal - Manage & Share Notes",
    description: "A modern student portal for uploading, managing, and accessing study notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
            <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
                <AuthProvider>
                    {children}
                    <Toaster position="top-right" toastOptions={{
                        style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                    }} />
                </AuthProvider>
            </body>
        </html>
    );
}
