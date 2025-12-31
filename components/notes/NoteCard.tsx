"use client";

import { motion } from "framer-motion";
import { Download, Eye, Heart, Share2, Calendar, FileText } from "lucide-react";
import { Card, CardContent } from "../ui/Card";
import Button from "../ui/Button";
import { Note } from "@/lib/types";
import { formatDate, formatFileSize } from "@/lib/utils";

interface NoteCardProps {
    note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return '📄';
        if (['doc', 'docx'].includes(ext || '')) return '📝';
        if (['ppt', 'pptx'].includes(ext || '')) return '📊';
        if (['jpg', 'jpeg', 'png'].includes(ext || '')) return '🖼️';
        return '📎';
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="group"
        >
            <Card glass hover>
                <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl flex-shrink-0">
                            {getFileIcon(note.fileName)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-1 truncate group-hover:text-purple-500 transition-colors">
                                {note.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                                    {note.subject}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {formatFileSize(note.fileSize)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {note.description}
                    </p>

                    {/* Tags */}
                    {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {note.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 rounded-md bg-white/10 text-gray-600 dark:text-gray-400"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" />
                            <span>{note.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            <span>{note.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(note.uploadedAt)}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />} className="flex-1">
                            Download
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                            View
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>

                        </Button>
                    </div>

                    {/* Uploader */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                            {note.uploadedBy.name[0]}
                        </div>
                        <span>Uploaded by {note.uploadedBy.name}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
