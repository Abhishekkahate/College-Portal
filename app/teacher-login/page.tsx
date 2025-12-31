"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GraduationCap, Lock, School } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { toast } from "sonner";

export default function TeacherLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate login
        setTimeout(() => {
            // Simplified validation for demo
            if (formData.email.includes("teacher")) {
                localStorage.setItem("user", JSON.stringify({
                    id: "teacher-1",
                    name: "Prof. Johnson",
                    email: formData.email,
                    role: "teacher",
                    department: "Computer Science",
                    avatar: "",
                }));
                toast.success("Welcome, Professor!");
                router.push("/dashboard");
            } else {
                toast.error("Invalid Teacher credentials");
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <School className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-slate-900">Teacher Portal</span>
                </div>

                <Card className="bg-white border-gray-200 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Teacher Login</CardTitle>
                        <CardDescription className="text-center">Faculty Access Only</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                type="email"
                                label="Email Address"
                                placeholder="professor@college.edu"
                                icon={<GraduationCap className="w-5 h-5" />}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />

                            <Input
                                type="password"
                                label="Password"
                                placeholder="••••••••"
                                icon={<Lock className="w-5 h-5" />}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />

                            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                                Login as Teacher
                            </Button>

                            <div className="text-center mt-4">
                                <Link href="/login" className="text-sm text-gray-500 hover:text-primary transition-colors font-medium">
                                    Return to Student Login
                                </Link>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({ email: "teacher@college.edu", password: "password" });
                                }}
                                className="w-full text-xs text-gray-400 hover:text-gray-300 transition-colors mt-2"
                            >
                                Use Demo Credentials
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
