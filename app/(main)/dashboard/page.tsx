"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Calendar, Bell, Search, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const schedule = [
        { time: "09:00 AM", subject: "Engineering Chemistry", type: "Lecture", room: "LH-101" },
        { time: "10:00 AM", subject: "Basic Calculus", type: "Lecture", room: "LH-101" },
        { time: "11:00 AM", subject: "BEEE Lab", type: "Lab", room: "Lab-2" },
        { time: "02:00 PM", subject: "PPS", type: "Lecture", room: "LH-101" },
    ];

    const notifications = [
        { id: 1, title: "Exam Schedule Released", time: "2 hours ago", type: "urgent" },
        { id: 2, title: "Holiday on Monday", time: "1 day ago", type: "info" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
            {/* Welcome & Student Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2"
                >
                    <h1 className="text-2xl md:text-4xl font-black mb-2 text-slate-900">
                        Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        You have <span className="font-bold text-blue-600">4 classes</span> scheduled for today.
                    </p>

                    {/* Student Info Card */}
                    <div className="card-base p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-gray-200">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Roll Number</p>
                            <p className="font-semibold text-slate-800">{user?.rollNumber || "Loading..."}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Branch</p>
                            <p className="font-semibold text-slate-800">{user?.branch || "CSE"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Section</p>
                            <p className="font-semibold text-slate-800">{user?.section || "A"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Year</p>
                            <p className="font-semibold text-slate-800">{user?.year || "1st"}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions / Time */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="h-full bg-blue-600 text-white border-none shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                            <Clock className="w-12 h-12 text-blue-200 mb-4" />
                            <h2 className="text-3xl font-bold mb-1">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </h2>
                            <p className="text-blue-100 font-medium">
                                {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-primary" />
                            Today&apos;s Schedule
                        </h2>
                        <Link href="/schedule">
                            <Button variant="ghost" size="sm">View Full Schedule →</Button>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {schedule.map((item, index) => (
                            <div key={index} className="card-base p-4 flex items-center gap-4 group hover:border-blue-300 transition-colors bg-white border border-gray-200">
                                <div className="w-16 text-center">
                                    <p className="font-bold text-lg text-slate-900">{item.time.split(' ')[0]}</p>
                                    <p className="text-xs text-gray-500">{item.time.split(' ')[1]}</p>
                                </div>
                                <div className="w-1 h-12 rounded-full bg-blue-600 opacity-20 group-hover:opacity-100 transition-opacity" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-slate-900">{item.subject}</h3>
                                    <p className="text-sm text-gray-500">{item.type}</p>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                                    <MapPin className="w-4 h-4" />
                                    {item.room}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Sidebar Widgets */}
                <div className="space-y-8">
                    {/* Notifications */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="card-base">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Bell className="w-5 h-5 text-amber-500" />
                                    Notifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {notifications.map((notif) => (
                                    <div key={notif.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer">
                                        <h4 className="font-semibold text-sm mb-1 text-slate-900">{notif.title}</h4>
                                        <p className="text-xs text-gray-500">{notif.time}</p>
                                    </div>
                                ))}
                                <Link href="/notifications" className="block">
                                    <Button variant="ghost" size="sm" className="w-full text-xs text-blue-600 hover:text-blue-700">View All</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Lost & Found Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card className="card-base">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Search className="w-5 h-5 text-blue-500" />
                                    Lost & Found
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-4">
                                    <p className="text-sm text-gray-500 mb-3">Lost something? Found something?</p>
                                    <Link href="/lost-found">
                                        <Button variant="secondary" size="sm" className="w-full border border-gray-200">Check Items</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
