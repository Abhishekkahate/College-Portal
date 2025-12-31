"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button"; // Import Button
import { Plus } from "lucide-react"; // Import Plus icon
import { useEffect } from "react"; // Import useEffect
import { User } from "@/lib/types"; // Import User type

const notifications = [
    {
        id: 1,
        title: "End Semester Exam Schedule Released",
        message: "The final schedule for the End Semester Examinations (Dec 2025) has been released. Please check the Exams section for details.",
        date: "2 hours ago",
        type: "urgent",
        icon: AlertTriangle,
        color: "text-red-500",
        bg: "bg-red-500/10"
    },
    {
        id: 2,
        title: "Holiday Declared on Monday",
        message: "The college will remain closed on Monday due to local elections. Classes will resume on Tuesday.",
        date: "1 day ago",
        type: "info",
        icon: Info,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        id: 3,
        title: "BEEE Lab Rescheduled",
        message: "The BEEE Lab for Section A scheduled for tomorrow has been postponed to Friday, 2:00 PM.",
        date: "2 days ago",
        type: "warning",
        icon: Bell,
        color: "text-yellow-500",
        bg: "bg-yellow-500/10"
    },
    {
        id: 4,
        title: "Notes Uploaded for PPS",
        message: "New notes for Module 3 (Arrays and Strings) have been uploaded by Prof. Sharma.",
        date: "3 days ago",
        type: "success",
        icon: CheckCircle,
        color: "text-green-500",
        bg: "bg-green-500/10"
    }
];

export default function NotificationsPage() {
    return (
        <NotificationList />
    );
}

function NotificationList() {
    const [filter, setFilter] = useState("all");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const filteredNotifications = notifications.filter(n => {
        if (filter === "all") return true;
        return n.type === filter;
    });

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-black mb-2 gradient-text">Notifications</h1>
                    <p className="text-gray-600 dark:text-gray-400">Stay updated with the latest announcements.</p>

                    {user?.role === "CR" && (
                        <div className="mt-4">
                            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>Add Notification</Button>
                        </div>
                    )}
                </motion.div>

                <div className="flex gap-2 p-1 bg-secondary/10 rounded-xl w-fit">
                    {['all', 'urgent', 'info', 'success', 'warning'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === f
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'text-gray-500 hover:text-foreground hover:bg-white/5'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 max-w-4xl">
                {filteredNotifications.map((notif, index) => {
                    const Icon = notif.icon;
                    return (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass hover:bg-white/5 transition-colors group border-l-4" style={{ borderLeftColor: notif.type === 'urgent' ? '#ef4444' : notif.type === 'warning' ? '#eab308' : notif.type === 'success' ? '#22c55e' : '#3b82f6' }}>
                                <CardContent className="p-5 flex gap-5">
                                    <div className={`w-12 h-12 rounded-xl ${notif.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                        <Icon className={`w-6 h-6 ${notif.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{notif.title}</h3>
                                            <span className="text-xs text-gray-500 font-medium bg-secondary/10 px-2 py-1 rounded-lg">{notif.date}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {notif.message}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}

                {filteredNotifications.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No notifications found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
