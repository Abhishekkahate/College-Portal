"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, UserX, UserCheck, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User, AttendanceRecord } from "@/lib/types";
import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";

export default function AttendancePage() {
    const { user, role } = useAuth();
    const [selectedDate, setSelectedDate] = useState(new Date());

    if (!user) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <CalendarCheck className="w-6 h-6 text-primary" />
                        Attendance
                    </h1>
                    <p className="text-muted-foreground">
                        {role === "Teacher"
                            ? "Manage and mark student attendance"
                            : "View your attendance record"
                        }
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-card border border-white/10 p-1 rounded-lg">
                    <Button variant="ghost" size="icon" onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setSelectedDate(newDate);
                    }}>
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="px-4 font-medium min-w-[120px] text-center">
                        {selectedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setSelectedDate(newDate);
                    }}>
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {role === "Teacher" ? <TeacherView date={selectedDate} /> : <StudentView date={selectedDate} />}
        </div>
    );
}

function TeacherView({ date }: { date: Date }) {
    // Mock students - In real app, fetch from Firestore 'users' where role is 'student'
    const [students, setStudents] = useState<any[]>([]);

    useEffect(() => {
        // Fetch students list (simplified for now as we don't have full user list in state)
        // Ideally: const unsubscribe = onSnapshot(collection(db, "students"), ...);
        // For demonstration, we keep the mock state init but wrapped.
        setStudents([
            { id: "1", name: "Alice Smith", roll: "21CSE001", status: "present" },
            { id: "2", name: "Bob Johnson", roll: "21CSE002", status: "absent" },
            { id: "3", name: "Charlie Brown", roll: "21CSE003", status: "present" },
            { id: "4", name: "Diana Prince", roll: "21CSE004", status: "present" },
            { id: "5", name: "Ethan Hunt", roll: "21CSE005", status: "medical" },
        ]);
    }, []);

    const handleMark = (id: string, status: string) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
        toast.success("Attendance updated");
    };

    return (
        <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Class List - CSE Section A</CardTitle>
                <div className="relative w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search student..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {students.map((student: any) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white">
                                    {student.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold">{student.name}</h3>
                                    <p className="text-xs text-muted-foreground">{student.roll}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={student.status === "present" ? "primary" : "outline"}
                                    onClick={() => handleMark(student.id, "present")}
                                    className={student.status === "present" ? "bg-green-600 hover:bg-green-700" : ""}
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-1" /> Present
                                </Button>
                                <Button
                                    size="sm"
                                    variant={student.status === "absent" ? "primary" : "outline"}
                                    onClick={() => handleMark(student.id, "absent")}
                                    className={student.status === "absent" ? "bg-red-600 hover:bg-red-700" : ""}
                                >
                                    <UserX className="w-4 h-4 mr-1" /> Absent
                                </Button>
                                <Button
                                    size="sm"
                                    variant={student.status === "medical" ? "primary" : "outline"}
                                    onClick={() => handleMark(student.id, "medical")}
                                    className={student.status === "medical" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                                >
                                    Medical
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <Button size="lg" className="w-full md:w-auto">Save Attendance</Button>
                </div>
            </CardContent>
        </Card>
    );
}

function StudentView({ date }: { date: Date }) {
    // Mock data
    const subjects = [
        { name: "Data Structures", total: 45, attended: 40, color: "text-blue-500", bg: "bg-blue-500/20" },
        { name: "Database Management", total: 42, attended: 35, color: "text-green-500", bg: "bg-green-500/20" },
        { name: "Computer Networks", total: 40, attended: 28, color: "text-red-500", bg: "bg-red-500/20" },
        { name: "Operating Systems", total: 45, attended: 42, color: "text-purple-500", bg: "bg-purple-500/20" },
        { name: "Software Engineering", total: 38, attended: 38, color: "text-yellow-500", bg: "bg-yellow-500/20" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/10 md:col-span-2">
                <CardHeader>
                    <CardTitle>Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {subjects.map((sub) => {
                            const percentage = Math.round((sub.attended / sub.total) * 100);
                            return (
                                <div key={sub.name} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                                    <div className={`w-16 h-16 rounded-full ${sub.bg} ${sub.color} flex items-center justify-center text-xl font-bold mb-3`}>
                                        {percentage}%
                                    </div>
                                    <h3 className="font-semibold text-sm h-10 flex items-center">{sub.name}</h3>
                                    <div className="text-xs text-muted-foreground mt-2">
                                        {sub.attended}/{sub.total} Classes
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle>Recent History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-12 rounded-full ${i === 3 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    <div>
                                        <p className="font-medium">Dec {31 - i}, 2025</p>
                                        <p className="text-xs text-muted-foreground">5 lectures scheduled</p>
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold ${i === 3 ? 'text-red-500' : 'text-green-500'}`}>
                                    {i === 3 ? 'Absent' : 'Present'}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle>Low Attendance Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                        <div className="flex items-start gap-3">
                            <UserX className="w-5 h-5 text-red-500 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-red-500">Computer Networks</h3>
                                <p className="text-sm text-red-400/80 mt-1">
                                    Your attendance is 70%. You need to attend the next 5 classes to reach 75%.
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Minimum 75% attendance is required to appear for exams.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
