"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Edit, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User } from "@/lib/types";

const scheduleData = [
    {
        day: "Monday", classes: [
            { time: "09:00 - 10:00", subject: "Engineering Chemistry", room: "LH-101", type: "Lecture" },
            { time: "10:00 - 11:00", subject: "Basic Calculus", room: "LH-101", type: "Lecture" },
            { time: "11:00 - 01:00", subject: "BEEE Lab", room: "Lab-2", type: "Lab" },
            { time: "02:00 - 03:00", subject: "PPS", room: "LH-101", type: "Lecture" },
        ]
    },
    {
        day: "Tuesday", classes: [
            { time: "09:00 - 10:00", subject: "PPS", room: "LH-101", type: "Lecture" },
            { time: "10:00 - 11:00", subject: "ITK", room: "LH-101", type: "Lecture" },
            { time: "11:00 - 01:00", subject: "Chemistry Lab", room: "Lab-1", type: "Lab" },
            { time: "02:00 - 04:00", subject: "Workshop", room: "Workshop", type: "Practical" },
        ]
    },
    {
        day: "Wednesday", classes: [
            { time: "09:00 - 10:00", subject: "Basic Calculus", room: "LH-101", type: "Lecture" },
            { time: "10:00 - 11:00", subject: "BEEE", room: "LH-101", type: "Lecture" },
            { time: "11:00 - 12:00", subject: "English", room: "LH-101", type: "Lecture" },
            { time: "02:00 - 04:00", subject: "PPS Lab", room: "Comp Lab", type: "Lab" },
        ]
    },
    {
        day: "Thursday", classes: [
            { time: "09:00 - 10:00", subject: "BEEE", room: "LH-101", type: "Lecture" },
            { time: "10:00 - 11:00", subject: "Engineering Chemistry", room: "LH-101", type: "Lecture" },
            { time: "11:00 - 01:00", subject: "Engineering Drawing", room: "Drawing Hall", type: "Practical" },
        ]
    },
    {
        day: "Friday", classes: [
            { time: "09:00 - 10:00", subject: "ITK", room: "LH-101", type: "Lecture" },
            { time: "10:00 - 11:00", subject: "PPS", room: "LH-101", type: "Lecture" },
            { time: "11:00 - 12:00", subject: "Basic Calculus", room: "LH-101", type: "Lecture" },
            { time: "02:00 - 04:00", subject: "Sports", room: "Ground", type: "Activity" },
        ]
    },
];

export default function SchedulePage() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleUpdateSchedule = () => {
        if (isEditing) {
            toast.success("Schedule updated successfully!");
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }
    };

    return (
        <div className="p-8 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-black mb-2 gradient-text">Weekly Schedule</h1>
                <p className="text-gray-600 dark:text-gray-400">Your academic timetable for the semester.</p>
            </motion.div>

            {user?.role === "CR" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                >
                    <Button
                        variant={isEditing ? "primary" : "outline"}
                        onClick={handleUpdateSchedule}
                        icon={isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    >
                        {isEditing ? "Save Changes" : "Update Schedule"}
                    </Button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 gap-6">
                {scheduleData.map((daySchedule, index) => {
                    const isToday = daySchedule.day === today;
                    return (
                        <motion.div
                            key={daySchedule.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`glass overflow-hidden transition-all duration-300 ${isToday ? 'border-primary shadow-lg shadow-primary/10 ring-1 ring-primary' : 'hover:border-primary/30'}`}>
                                <CardHeader className={`${isToday ? 'bg-primary/10' : 'bg-white/5'} border-b border-white/10 flex flex-row items-center justify-between`}>
                                    <div className="flex items-center gap-3">
                                        <CardTitle className={`text-xl ${isToday ? 'text-primary font-bold' : 'text-foreground'}`}>
                                            {daySchedule.day}
                                        </CardTitle>
                                        {isToday && (
                                            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide">
                                                Today
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 font-medium">
                                        {daySchedule.classes.length} Classes
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-white/10">
                                        {daySchedule.classes.map((cls, idx) => (
                                            <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors gap-4 group">
                                                <div className="flex items-start md:items-center gap-6">
                                                    <div className="w-28 flex flex-col">
                                                        <span className="font-bold text-lg leading-none">{cls.time.split(' - ')[0]}</span>
                                                        <span className="text-xs text-gray-500 mt-1">{cls.time.split(' - ')[1]}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{cls.subject}</h3>
                                                        <div className="flex gap-2">
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${cls.type === 'Lecture' ? 'bg-blue-500/10 text-blue-500' :
                                                                cls.type === 'Lab' ? 'bg-purple-500/10 text-purple-500' :
                                                                    'bg-green-500/10 text-green-500'
                                                                }`}>
                                                                {cls.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 pl-34 md:pl-0">
                                                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-lg border border-secondary/20">
                                                        {cls.room}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
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
