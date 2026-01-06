"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    BookOpen,
    ArrowRight,
    GraduationCap,
    Bell,
    Search
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Navigation - High Contrast */}
            <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">TechUniversity</h1>
                            <p className="text-xs text-slate-500 font-bold tracking-wider uppercase">Excellence in Education</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative mr-2 hidden lg:block">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 transition-all"
                            />
                        </div>
                        <Link href="/login">
                            <button className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all shadow-md hover:shadow-lg active:scale-95">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Clean Blue */}
            <section className="relative overflow-hidden bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 pb-16 md:pb-28 grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                            Admissions Open for Batch 2025
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                            Shape Your Future with <span className="text-blue-600">Innovation</span>
                        </h1>
                        <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed font-medium">
                            Join over 10,000 students in a journey of academic excellence, research, and holistic development.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/login">
                                <button className="px-8 py-3.5 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                                    Access Portal <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Graphic - Simple & Professional */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 bg-blue-600/5 rounded-[2rem] transform rotate-3 z-0"></div>
                        <div className="relative z-10 bg-slate-900 rounded-2xl shadow-2xl p-1 overflow-hidden">
                            <div className="h-[400px] w-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
                                {/* Abstract Background for Hero */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

                                <GraduationCap className="w-20 h-20 text-blue-400 mb-6" />
                                <h2 className="text-3xl font-bold text-white mb-2">World-Class Education</h2>
                                <p className="text-slate-300 max-w-xs">Empowering students with knowledge, skills, and values.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats Strip */}
            <div className="bg-blue-600 py-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    {[
                        { label: "Students", value: "12,000+" },
                        { label: "Faculty", value: "850+" },
                        { label: "Companies", value: "500+" },
                        { label: "Awards", value: "120+" }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-3xl md:text-4xl font-extrabold mb-1">{stat.value}</div>
                            <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <section className="py-24 px-6 max-w-7xl mx-auto bg-gray-50 flex-grow">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Latest Updates & Notices</h2>
                    <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Notice Board Card */}
                    <div className="md:col-span-2 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-amber-500" />
                                <h3 className="font-bold text-lg text-slate-900">Campus Notices</h3>
                            </div>
                            <button className="text-sm font-semibold text-blue-600 hover:underline">View Archive</button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[
                                { date: "Dec 30", title: "Winter Semester Registration Deadline Extended", tag: "Academic" },
                                { date: "Dec 28", title: "Guest Lecture Series: Future of AI by Tech Giants", tag: "Event" },
                                { date: "Dec 25", title: "Campus Maintenance Schedule for Holidays", tag: "Admin" },
                                { date: "Dec 22", title: "Scholarship Applications Open for 2025", tag: "Financial" }
                            ].map((notice, i) => (
                                <div key={i} className="p-5 hover:bg-gray-50 transition-colors flex items-start gap-4 cursor-pointer group">
                                    <div className="flex-shrink-0 w-16 text-center">
                                        <div className="text-xs font-bold text-gray-500 uppercase">{notice.date.split(" ")[0]}</div>
                                        <div className="text-xl font-bold text-slate-900">{notice.date.split(" ")[1]}</div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">{notice.title}</h4>
                                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded">{notice.tag}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-blue-600" /> Academics
                            </h3>
                            <ul className="space-y-3">
                                {["Academic Calendar", "Exam Schedule", "Course Catalog", "Research Portal"].map((item, i) => (
                                    <li key={i}>
                                        <Link href="#" className="flex items-center justify-between text-slate-600 hover:text-blue-600 font-medium transition-colors group p-2 hover:bg-blue-50 rounded-lg">
                                            {item} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-slate-900 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Student Portal App</h3>
                                <p className="text-slate-300 text-sm mb-4">Get quick access to attendance, marks, and notes on the go.</p>
                                <button className="w-full py-2 bg-white text-slate-900 font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors">
                                    Download Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer - Minimal */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2 text-white justify-center md:justify-start">
                            <GraduationCap className="w-6 h-6" />
                            <span className="text-xl font-bold">TechUniversity</span>
                        </div>
                        <p className="text-sm">Empowering the next generation of leaders.</p>
                    </div>
                    <div className="flex gap-6 text-sm font-medium">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact Support</Link>
                    </div>
                    <div className="text-sm">
                        © 2024 TechUniversity.
                    </div>
                </div>
            </footer>
        </div>
    );
}
