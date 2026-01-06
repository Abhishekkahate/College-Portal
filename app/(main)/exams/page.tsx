"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button"; // Import Button
import { Edit } from "lucide-react"; // Import Edit icon
import { useState, useEffect } from "react"; // Import hooks
import { User } from "@/lib/types"; // Import User type
import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Exam } from "@/lib/types";

// Hardcoded exams removed.

export default function ExamsPage() {
    const { user, role } = useAuth();
    const [exams, setExams] = useState<Exam[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "exams"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Exam));
            setExams(data);
        });
        return () => unsubscribe();
    }, []);

    const calculateDaysLeft = (dateStr: string) => {
        const examDate = new Date(dateStr);
        const today = new Date();
        const diffTime = examDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="p-8 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-black mb-2 gradient-text">Exam Schedule</h1>
                    <p className="text-gray-600 dark:text-gray-400">Upcoming mid-term and end-term examinations.</p>
                </div>
                {(role === "CR" || role === "Teacher") && (
                    <Button variant="outline" icon={<Edit className="w-4 h-4" />} onClick={() => alert("Feature coming soon: Update Exams")}>Update Exams</Button>
                )}
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
                {exams.map((exam, index) => {
                    const daysLeft = calculateDaysLeft(exam.date);
                    return (
                        <motion.div
                            key={exam.code}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5">
                                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-5">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex flex-col items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform duration-300">
                                                <span className="text-xs font-bold uppercase tracking-wider">{exam.date.split(' ')[0]}</span>
                                                <span className="text-3xl font-black">{exam.date.split(' ')[1].replace(',', '')}</span>
                                            </div>
                                            {daysLeft > 0 && (
                                                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    {daysLeft} days left
                                                </span>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{exam.subject}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs font-bold tracking-wider">
                                                        {exam.code}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                                    <Clock className="w-4 h-4 text-primary" />
                                                    {exam.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-3 pl-24 md:pl-0">
                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            {exam.venue}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 px-4 py-2 rounded-xl border border-white/10 group-hover:border-primary/20 transition-colors">
                                            <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
                                            <span className="font-medium">Syllabus:</span> {exam.syllabus}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
