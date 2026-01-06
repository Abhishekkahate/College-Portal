"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Lock, GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        rollNumber: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const email = `${formData.rollNumber}@student.studypce.com`;
            const userCredential = await signInWithEmailAndPassword(auth, email, formData.password);

            // Fetch User Data from Firestore
            const { getDoc, doc, getFirestore } = await import("firebase/firestore");
            const db = getFirestore();

            let userData = null;
            try {
                const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
                if (userDoc.exists()) {
                    userData = userDoc.data();
                }
            } catch (err) {
                console.error("Firestore fetch failed, using fallback:", err);
            }

            // Fallback for Demo User if Firestore fails
            if (!userData && email === "2023CS101@student.studypce.com") {
                userData = {
                    name: "Demo Student",
                    rollNumber: "2023CS101",
                    email: email,
                    branch: "CSE",
                    section: "A",
                    year: "2nd Year",
                    role: "student"
                };
                toast.error("Network issue. Loaded Demo Profile.");
            }

            if (userData) {
                localStorage.setItem("user", JSON.stringify(userData));
                toast.success("Login successful!");
                router.push("/dashboard");
            } else {
                toast.error("User profile not found.");
                console.error("No user profile found in Firestore and no fallback available");
            }
        } catch (error: any) {
            console.error("Login Error:", error);
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                toast.error("Invalid Roll Number or Password");
            } else {
                toast.error("Failed to login. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* Left Side - Visuals */}
            <div className="hidden md:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight font-heading">TechUniversity</span>
                </div>

                <div className="relative z-10 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">Welcome to your <br /><span className="text-blue-400">Digital Campus.</span></h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                            Access schedules, notes, and announcements in one seamless experience.
                        </p>
                    </motion.div>
                </div>

                <div className="relative z-10 text-xs text-slate-500 font-medium uppercase tracking-wider">
                    © 2024 TechUniversity Portal
                </div>

                {/* Decorative Gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full mix-blend-screen filter blur-[100px] opacity-30 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 md:p-12 bg-gray-50">
                <div className="w-full max-w-md">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="mb-8 text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Login</h3>
                            <p className="text-gray-500">Please enter your credentials to continue</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type="text"
                                label="Roll Number"
                                placeholder="eg. 2023CS101"
                                icon={<User className="w-5 h-5" />}
                                value={formData.rollNumber}
                                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                                required
                            />

                            <div className="space-y-1">
                                <Input
                                    type="password"
                                    label="Password"
                                    placeholder="••••••••"
                                    icon={<Lock className="w-5 h-5" />}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <div className="flex justify-end">
                                    <Link href="#" className="text-xs font-semibold text-primary hover:text-blue-700">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>

                            <Button type="submit" variant="primary" size="lg" className="w-full font-bold shadow-md hover:shadow-lg transition-all" loading={loading}>
                                Sign In <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>

                            {/* Developer Helper - styled subtly */}
                            <div className="pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({ rollNumber: "2023CS101", password: "password" });
                                    }}
                                    className="w-full text-xs text-center text-gray-400 hover:text-primary transition-colors"
                                >
                                    (Dev: Use Demo Credentials)
                                </button>
                            </div>
                        </form>
                    </motion.div>

                    <div className="text-center mt-8 text-sm text-gray-500 space-y-2">
                        <p>
                            Not a student? <Link href="/teacher-login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">Faculty Login</Link>
                        </p>
                        <p>
                            <Link href="/cr-login" className="font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-all">Class Representative Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
