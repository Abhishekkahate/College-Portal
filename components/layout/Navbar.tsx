"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface NavbarProps {
    onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Get user from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <header className="h-20 bg-white border border-gray-200 rounded-2xl px-6 flex items-center justify-between z-40 sticky top-4 shadow-sm">
            {/* Search */}
            <div className="flex-1 max-w-md flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <div className="relative group w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm text-slate-900"
                    />
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all relative text-gray-500 hover:text-blue-600">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* User profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-900">{user?.name || "Loading..."}</div>
                        <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-100 p-[2px] shadow-sm">
                        <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center border border-blue-200">
                            <span className="font-bold text-blue-700">{user ? getInitials(user.name) : "U"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
