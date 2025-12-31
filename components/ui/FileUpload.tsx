"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X } from "lucide-react";
import { formatFileSize } from "@/lib/utils";

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    maxSize?: number;
    accept?: Record<string, string[]>;
    multiple?: boolean;
    files?: File[];
    onRemoveFile?: (index: number) => void;
}

export default function FileUpload({
    onFilesSelected,
    maxSize = 10 * 1024 * 1024, // 10MB
    accept = {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        "application/vnd.ms-powerpoint": [".ppt"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
        "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple = false,
    files = [],
    onRemoveFile,
}: FileUploadProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onFilesSelected(acceptedFiles);
        },
        [onFilesSelected]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        maxSize,
        accept,
        multiple,
    });

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`
          relative rounded-xl border-2 border-dashed p-12 transition-all cursor-pointer
          ${isDragActive && !isDragReject ? "border-purple-500 bg-purple-500/10" : ""}
          ${isDragReject ? "border-red-500 bg-red-500/10" : ""}
          ${!isDragActive && !isDragReject ? "border-gray-300 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-500/5" : ""}
        `}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-white" />
                    </div>

                    {isDragActive && !isDragReject && (
                        <p className="text-lg font-semibold text-purple-500">Drop your files here</p>
                    )}

                    {isDragReject && (
                        <p className="text-lg font-semibold text-red-500">Some files will be rejected</p>
                    )}

                    {!isDragActive && (
                        <>
                            <p className="text-lg font-semibold mb-2">
                                Drag & drop your files here
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                or click to browse
                            </p>
                            <p className="text-xs text-gray-500">
                                Supported: PDF, DOC, DOCX, PPT, PPTX, Images (Max {formatFileSize(maxSize)})
                            </p>
                        </>
                    )}
                </div>
            </div>

            {/* Uploaded files list */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Selected Files:</h4>
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg glass border border-white/10"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <File className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            {onRemoveFile && (
                                <button
                                    onClick={() => onRemoveFile(index)}
                                    className="ml-2 w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
