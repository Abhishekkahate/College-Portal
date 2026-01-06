"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User as FirebaseUser,
    signOut as firebaseSignOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: FirebaseUser | null;
    role: "Student" | "CR" | "Teacher" | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [role, setRole] = useState<"Student" | "CR" | "Teacher" | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Fetch role from Firestore
                // Assuming we store user roles in a 'users' collection with document ID as uid
                try {
                    // If the email domain mapping is used, we can also infer role from email
                    // But looking up the DB is safer for additional profile data
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setRole(userData.role);
                    } else {
                        // Fallback inference based on email domain if DB doc doesn't exist yet
                        // This facilitates initial testing before DB is seeded
                        const email = currentUser.email || "";
                        if (email.endsWith("@teacher.studypce.com")) {
                            setRole("Teacher");
                        } else if (email.endsWith("@student.studypce.com")) {
                            // CRs are also students, so we need to know if they are CRs.
                            // For now, default to Student. CR status MUST be in DB to be secure.
                            setRole("Student");
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
