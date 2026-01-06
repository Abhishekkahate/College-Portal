"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Phone, Calendar, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { User } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { LostFoundItem } from "@/lib/types";

// Hardcoded items removed.

export default function LostFoundPage() {
    const { user, role } = useAuth();
    const [items, setItems] = useState<LostFoundItem[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "lostFound"), (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LostFoundItem));
            setItems(data);
        });
        return () => unsubscribe();
    }, []);

    const handleReport = () => {
        // Mock handler
        alert("Report Item modal would open here");
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-black mb-2 gradient-text">Lost & Found</h1>
                    <p className="text-gray-600 dark:text-gray-400">Report lost items or find what you&apos;ve missing.</p>
                </motion.div>
                <div onClick={handleReport}>
                    <Button variant="primary" icon={<Search className="w-4 h-4" />}>Report Item</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="glass overflow-hidden h-full flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
                            <div className={`h-1.5 w-full ${item.type === 'Lost' ? 'bg-red-500' : 'bg-green-500'}`} />
                            <CardContent className="p-6 flex-1 flex flex-col relative">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Search className="w-24 h-24" />
                                </div>

                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.type === 'Lost' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                                        }`}>
                                        {item.type}
                                    </span>
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${item.status === 'Open' ? 'border-blue-500/20 text-blue-500 bg-blue-500/5' : 'border-gray-500/20 text-gray-500 bg-gray-500/5'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                                {(role === "CR" || role === "Teacher") && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <Button variant="ghost" size="sm" icon={<Edit className="w-3 h-3" />}>Edit</Button>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors relative z-10">{item.item}</h3>

                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 relative z-10">
                                    <Calendar className="w-3 h-3" />
                                    {item.date}
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 flex-1 relative z-10 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="space-y-3 pt-4 border-t border-white/10 text-sm relative z-10 bg-white/5 -mx-6 -mb-6 p-6 mt-auto backdrop-blur-sm">
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium uppercase text-gray-400">Location</span>
                                            <span className="text-foreground font-medium">{item.location}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-medium uppercase text-gray-400">Contact</span>
                                            <span className="text-foreground font-medium">{item.contact}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
