import { Subject } from "./types";

export const SUBJECTS: Subject[] = [
    { id: "1", name: "Mathematics", code: "MATH101", color: "#667eea", icon: "📐" },
    { id: "2", name: "Physics", code: "PHY101", color: "#764ba2", icon: "⚛️" },
    { id: "3", name: "Chemistry", code: "CHEM101", color: "#f093fb", icon: "🧪" },
    { id: "4", name: "Computer Science", code: "CS101", color: "#4facfe", icon: "💻" },
    { id: "5", name: "English", code: "ENG101", color: "#43e97b", icon: "📚" },
    { id: "6", name: "History", code: "HIST101", color: "#fa709a", icon: "📜" },
];

export const ALLOWED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "image/png",
    "image/jpeg",
    "image/jpg",
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const NAV_ITEMS = [
    { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    { name: "Notes", href: "/notes", icon: "FileText" },
    { name: "Upload", href: "/upload", icon: "Upload" },
    { name: "Profile", href: "/profile", icon: "User" },
];
