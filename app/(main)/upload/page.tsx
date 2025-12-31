"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Upload as UploadIcon, CheckCircle } from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SUBJECTS } from "@/lib/constants";
import { toast } from "sonner";
import { User } from "@/lib/types";

export default function UploadPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        subject: "",
        tags: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            if (parsedUser.role !== "CR") {
                toast.error("Only Class Representatives can upload notes");
                router.push("/dashboard");
            }
        } else {
            router.push("/login");
        }
    }, [router]);

    if (!user || user.role !== "CR") {
        return null; // Or a loading spinner/access denied message
    }


    const handleFilesSelected = (newFiles: File[]) => {
        setFiles([...files, ...newFiles]);
    };

    const handleRemoveFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (files.length === 0) {
            alert("Please select at least one file");
            return;
        }

        setLoading(true);

        // Simulate upload
        setTimeout(() => {
            setLoading(false);

            // Reset form
            setFiles([]);
            setFormData({
                title: "",
                description: "",
                subject: "",
                tags: "",
            });

            // Show success message
            toast.success("Notes uploaded successfully!");

            // Redirect to notes page
            router.push("/notes");
        }, 2000);
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-black mb-2">Upload Notes</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Share your notes with the community and help others learn
                    </p>
                </motion.div>

                {/* Upload Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card glass>
                        <CardHeader>
                            <CardTitle>Note Details</CardTitle>
                            <CardDescription>Provide information about the notes you&apos;re uploading</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* File Upload */}
                                <FileUpload
                                    onFilesSelected={handleFilesSelected}
                                    files={files}
                                    onRemoveFile={handleRemoveFile}
                                    multiple={true}
                                />

                                {/* Title */}
                                <Input
                                    type="text"
                                    label="Title"
                                    placeholder="e.g., Calculus - Integration Techniques"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Describe what these notes cover..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none"
                                        required
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                        Subject
                                    </label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg glass border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                        required
                                    >
                                        <option value="">Select a subject</option>
                                        {SUBJECTS.map((subject) => (
                                            <option key={subject.id} value={subject.name}>
                                                {subject.icon} {subject.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tags */}
                                <Input
                                    type="text"
                                    label="Tags"
                                    placeholder="e.g., calculus, integration, math (comma-separated)"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    helperText="Separate tags with commas to help others find your notes"
                                />

                                {/* Submit Button */}
                                <div className="flex gap-4">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        className="flex-1"
                                        loading={loading}
                                        icon={loading ? undefined : <UploadIcon className="w-5 h-5" />}
                                    >
                                        {loading ? "Uploading..." : "Upload Notes"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="lg"
                                        onClick={() => router.push("/notes")}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Guidelines */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card glass>
                        <CardHeader>
                            <CardTitle className="text-lg">Upload Guidelines</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Ensure your notes are clear, accurate, and well-organized</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Use descriptive titles and tags to help others find your content</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Only upload content you have the right to share</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span>Maximum file size: 10MB per file</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
