"use client";

import { motion } from "framer-motion";
import { BookOpen, Download, FileText, TrendingUp, ArrowUpRight } from "lucide-react";

const stats = [
    {
        label: "Total Notes",
        value: "248",
        change: "+12%",
        icon: FileText,
        color: "from-purple-500 to-pink-500",
        shadow: "shadow-purple-500/30",
    },
    {
        label: "Downloads",
        value: "1,429",
        change: "+23%",
        icon: Download,
        color: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/30",
    },
    {
        label: "Subjects",
        value: "6",
        change: "+2",
        icon: BookOpen,
        color: "from-green-500 to-emerald-500",
        shadow: "shadow-green-500/30",
    },
    {
        label: "This Week",
        value: "45",
        change: "+8%",
        icon: TrendingUp,
        color: "from-yellow-500 to-orange-500",
        shadow: "shadow-yellow-500/30",
    },
];

export default function DashboardStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <div className="card-premium p-6 group cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded-lg text-xs font-bold">
                                    {stat.change}
                                    <ArrowUpRight className="w-3 h-3" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-3xl font-black mb-1 text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
