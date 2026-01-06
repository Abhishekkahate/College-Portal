"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button"; // Import Button
import { Plus } from "lucide-react"; // Import Plus icon
import { useEffect } from "react"; // Import useEffect
import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { User, NotificationItem } from "@/lib/types";

// Hardcoded notifications removed.

export default function NotificationsPage() {
    return (
        <NotificationList />
    );
}

function NotificationList() {
    const [filter, setFilter] = useState("all");
    const { user, role } = useAuth();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NotificationItem));
            setNotifications(data);
            setLoading(false);
        });
        return () => unsubscribe();
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

                    {(role === "CR" || role === "Teacher") && (
                        <div className="mt-4">
                            <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={() => {
                                // TODO: Open Modal to add notification
                                // For now, we can use a prompt for simplicity or better yet, create a component
                                const title = prompt("Enter Notification Title:");
                                if (title) {
                                    const message = prompt("Enter Notification Message:");
                                    // Add to Firestore
                                    if (message) {
                                        addDoc(collection(db, "notifications"), {
                                            title,
                                            message,
                                            date: new Date().toLocaleDateString(),
                                            type: "info", // Default
                                            icon: "Info",
                                            color: "text-blue-500",
                                            bg: "bg-blue-500/10"
                                        });
                                    }
                                }
                            }}>Add Notification</Button>
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
                    // Map icon string to component if needed, or simple icon map
                    const Icon = Info; // Default fallback
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
