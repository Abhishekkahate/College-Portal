"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Download, Upload, Clock, MapPin, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { PracticalScheduleItem, PracticalNote } from "@/lib/types";

// Hardcoded data removed.

export default function PracticalPage() {
    const [activeTab, setActiveTab] = useState<'schedule' | 'notes'>('schedule');
    const { user, role } = useAuth();
    const [practicalSchedule, setPracticalSchedule] = useState<PracticalScheduleItem[]>([]);
    const [practicalNotes, setPracticalNotes] = useState<PracticalNote[]>([]);

    useEffect(() => {
        const unsubSchedule = onSnapshot(collection(db, "practicalSchedule"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PracticalScheduleItem));
            setPracticalSchedule(data);
        });
        const unsubNotes = onSnapshot(collection(db, "practicalNotes"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as PracticalNote));
            setPracticalNotes(data);
        });

        return () => {
            unsubSchedule();
            unsubNotes();
        };
    }, []);

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-black mb-2 gradient-text">Practical Section</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your lab schedule and practical records.</p>
                </motion.div>

                <div className="flex bg-secondary/10 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'schedule'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-gray-500 hover:text-foreground'
                            }`}
                    >
                        Schedule
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'notes'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-gray-500 hover:text-foreground'
                            }`}
                    >
                        Notes
                    </button>
                </div>
            </div>

            {activeTab === 'schedule' ? (
                <div className="grid grid-cols-1 gap-6">
                    {(role === "CR" || role === "Teacher") && (
                        <div className="flex justify-end mb-4">
                            <Button variant="outline" icon={<Edit className="w-4 h-4" />}>Update Schedule</Button>
                        </div>
                    )}
                    {practicalSchedule.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass hover:border-primary/30 transition-all duration-300">
                                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                            <Calendar className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{item.subject}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <span className="font-medium text-foreground">{item.day}</span>
                                                <span>•</span>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
                                        <div className="px-3 py-1 rounded-lg bg-secondary/10 text-secondary text-sm font-medium flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {item.lab}
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-sm font-medium">
                                            {item.group}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    {(role === "CR" || role === "Teacher") && (
                        <div className="flex justify-end">
                            <Button variant="primary" icon={<Upload className="w-4 h-4" />}>Upload Practical Note</Button>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {practicalNotes.map((note, index) => (
                            <motion.div
                                key={note.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="glass hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:shadow-primary/5">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <button className="w-8 h-8 rounded-lg hover:bg-secondary/10 flex items-center justify-center text-gray-400 hover:text-foreground transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{note.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{note.subject}</p>

                                        <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-white/10">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {note.date}
                                            </div>
                                            <span>{note.size}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
