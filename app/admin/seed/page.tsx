"use client";

import { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { Shield, User, GraduationCap } from "lucide-react";

export default function SeedPage() {
    const { user, role } = useAuth();
    const [loading, setLoading] = useState(false);

    const updateRole = async (newRole: "Student" | "CR" | "Teacher") => {
        if (!user) {
            toast.error("You must be logged in.");
            return;
        }

        setLoading(true);
        try {
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                role: newRole,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            toast.success(`Role updated to ${newRole}! Please refresh the page.`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update role.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="p-8 text-center text-red-500">Please login first.</div>;
    }

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black gradient-text">Role Management (Debug)</h1>
                <p className="text-muted-foreground">Current Role: <span className="font-bold text-foreground">{role || "None"}</span></p>
                <p className="text-xs text-yellow-500">Use this page to self-assign roles for testing. In production, this should be disabled.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => updateRole("Student")} className="cursor-pointer">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex flex-col items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            <User className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold">Student</h3>
                    </div>
                </div>

                <div onClick={() => updateRole("CR")} className="cursor-pointer">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple/50 transition-all flex flex-col items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold">CR (Class Rep)</h3>
                    </div>
                </div>

                <div onClick={() => updateRole("Teacher")} className="cursor-pointer">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-yellow/50 transition-all flex flex-col items-center gap-4 group">
                        <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold">Teacher</h3>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" onClick={() => window.location.reload()}>Refresh Page</Button>
            </div>
        </div>
    );
}
