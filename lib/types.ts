export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: "student" | "admin" | "CR" | "teacher";
    department?: string;
    semester?: string;
    createdAt: Date;
}

export interface Message {
    id: string;
    content: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    userRole: User["role"];
    createdAt: Date;
}

export interface AttendanceRecord {
    id: string;
    studentId: string;
    subjectId: string;
    date: string; // YYYY-MM-DD
    status: "present" | "absent" | "medical";
    markedBy: string; // Teacher ID
}

export interface Note {
    id: string;
    title: string;
    description: string;
    subject: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    uploadedBy: User;
    uploadedAt: Date;
    downloads: number;
    likes: number;
    tags: string[];
}

export interface Subject {
    id: string;
    name: string;
    code: string;
    color: string;
    icon: string;
}

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    read: boolean;
    createdAt: Date;
}

export interface SearchFilters {
    query: string;
    subject?: string;
    tags?: string[];
    dateFrom?: Date;
    dateTo?: Date;
    sortBy?: "latest" | "popular" | "alphabetical";
}

export interface DashboardStats {
    totalNotes: number;
    totalDownloads: number;
    totalSubjects: number;
    recentActivity: number;
}
