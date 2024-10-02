import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Trash2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {FC, useRef, useState} from "react";

interface FileUploadProps {
    onFileSelect: (file: File | null) => void
    initialPreview?: string
}

export const FileUpload: FC<FileUploadProps> = ({ onFileSelect, initialPreview }: FileUploadProps) => {
    const [preview, setPreview] = useState<string | null>(initialPreview || null)
    const [error, setError] = useState<string | null>(null)
    const [fileType, setFileType] = useState<'image' | 'video' | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
                onFileSelect(file)
                setError(null)
                setFileType(file.type.startsWith('image/') ? 'image' : 'video')
            } else {
                setError('Please select an image or video file.')
                setPreview(null)
                onFileSelect(null)
                setFileType(null)
            }
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const file = event.dataTransfer.files?.[0]
        if (file) {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                const reader = new FileReader()
                reader.onloadend = () => {
                    setPreview(reader.result as string)
                }
                reader.readAsDataURL(file)
                onFileSelect(file)
                setError(null)
                setFileType(file.type.startsWith('image/') ? 'image' : 'video')
            } else {
                setError('Please drop an image or video file.')
                setPreview(null)
                onFileSelect(null)
                setFileType(null)
            }
        }
    }

    const handleDelete = () => {
        setPreview(null)
        setError(null)
        onFileSelect(null)
        setFileType(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div>
            <Label htmlFor="event-media">Event Media (Image or Video)</Label>
            <div
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="text-center">
                    {preview ? (
                        <div className="mb-4">
                            <div className="relative inline-block">
                                {fileType === 'image' ? (
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        width={200}
                                        height={200}
                                        className="mx-auto"
                                    />
                                ) : (
                                    <video
                                        src={preview}
                                        controls
                                        className="mx-auto w-full max-w-[200px]"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                            <div className="mt-2">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleDelete}
                                    className="mx-auto"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete {fileType}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                            <AlertCircle className="h-6 w-6 text-secondary-foreground" aria-hidden="true" />
                        </div>
                    )}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark"
                        >
                            <span>Upload a file</span>
                            <Input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*,video/*"
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF, MP4, WebM up to 10MB</p>
                </div>
            </div>
            {error && (
                <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    )
}