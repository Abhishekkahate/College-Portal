"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Calendar, Clock, Bell, Search, User, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Community", href: "/community", icon: User }, // Users -> User
    { name: "AI Help", href: "/ai-help", icon: User }, // Bot -> User
    { name: "Schedule", href: "/schedule", icon: Calendar },
    { name: "Exams", href: "/exams", icon: Clock },
    { name: "Attendance", href: "/attendance", icon: Calendar }, // CalendarCheck -> Calendar
    { name: "Notes", href: "/notes", icon: FileText },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Lost & Found", href: "/lost-found", icon: Search },
    { name: "Practical", href: "/practical", icon: FileText },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-4 top-4 bottom-4 w-64 bg-white rounded-2xl flex flex-col z-50 overflow-hidden border border-gray-200 shadow-xl">
            {/* Logo */}
            <div className="p-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">NotesHub</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden",
                                isActive
                                    ? "text-white shadow-md bg-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            )}
                        >
                            <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-white" : "group-hover:scale-110 transition-transform duration-300")} />
                            <span className="font-medium relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto space-y-2">
                <button
                    onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all duration-300 group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
