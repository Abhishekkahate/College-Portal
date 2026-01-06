"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Book, Code, Zap, Calculator, PenTool, ArrowRight, Upload as UploadIcon } from "lucide-react"; // Import UploadIcon
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button"; // Import Button
import { useState, useEffect } from "react"; // Import hooks
import { useAuth } from "@/components/providers/AuthProvider";
import { User } from "@/lib/types";

const subjects = [
    {
        id: "pps",
        name: "Programming for Problem Solving",
        code: "PPS",
        icon: Code,
        color: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/20",
        notesCount: 12,
        description: "C Programming, Algorithms, and Flowcharts"
    },
    {
        id: "ec",
        name: "Engineering Chemistry",
        code: "EC",
        icon: Zap, // Using Zap as placeholder for chemistry/energy
        color: "from-green-500 to-emerald-500",
        shadow: "shadow-green-500/20",
        notesCount: 8,
        description: "Molecular Structure, Thermodynamics, and Fuels"
    },
    {
        id: "bcde",
        name: "Basic Calculus & Diff. Equations",
        code: "BCDE",
        icon: Calculator,
        color: "from-purple-500 to-pink-500",
        shadow: "shadow-purple-500/20",
        notesCount: 15,
        description: "Limits, Derivatives, Integrals, and Differential Equations"
    },
    {
        id: "beee",
        name: "Basics of Electrical & Electronics",
        code: "BEEE",
        icon: Zap,
        color: "from-yellow-500 to-orange-500",
        shadow: "shadow-yellow-500/20",
        notesCount: 10,
        description: "Circuits, Transformers, and Semiconductor Devices"
    },
    {
        id: "itk",
        name: "Indian Traditional Knowledge",
        code: "ITK",
        icon: Book,
        color: "from-red-500 to-rose-500",
        shadow: "shadow-red-500/20",
        notesCount: 5,
        description: "Ancient Indian Science, Culture, and Philosophy"
    }
];

export default function NotesPage() {
    const router = useRouter();
    const { user, role } = useAuth();

    return (
        <div className="p-8 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-black mb-2 gradient-text">Study Notes</h1>
                <p className="text-gray-600 dark:text-gray-400">Select a subject to view or upload notes.</p>
            </motion.div>

            {(role === "CR" || role === "Teacher") && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                >
                    <Button
                        variant="primary"
                        icon={<UploadIcon className="w-4 h-4" />}
                        onClick={() => router.push("/upload")}
                    >
                        Upload Notes
                    </Button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => {
                    const Icon = subject.icon;
                    return (
                        <motion.div
                            key={subject.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/notes/${subject.id}`}>
                                <div className="card-premium p-6 group cursor-pointer h-full flex flex-col">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-lg ${subject.shadow} group-hover:scale-110 transition-transform duration-300`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <span className="text-xs font-bold px-2 py-1 rounded-lg bg-secondary/10 text-secondary">
                                            {subject.code}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                        {subject.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">
                                        {subject.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            {subject.notesCount} Files
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
