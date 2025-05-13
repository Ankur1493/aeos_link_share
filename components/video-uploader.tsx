"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function VideoUploader() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    handleFile(droppedFile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      setErrorMessage("Please upload a video file.")
      setUploadStatus("error")
      return
    }

    // Check file size (500MB max)
    if (file.size > 500 * 1024 * 1024) {
      setErrorMessage("File size exceeds 500MB limit.")
      setUploadStatus("error")
      return
    }

    setFile(file)
    setErrorMessage("")
    setUploadStatus("idle")
  }

  const startUpload = () => {
    if (!file) return

    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("processing")

          // Simulate processing time
          setTimeout(() => {
            // Redirect to a mock video page after "processing"
            router.push("/videos/new-video-123")
          }, 2000)

          return 100
        }
        return prev + 5
      })
    }, 300)
  }

  const resetUpload = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
    setErrorMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {!file && (
        <Card>
          <CardContent className="p-0">
            <div
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors",
                isDragging ? "border-primary bg-primary/5" : "border-border",
                uploadStatus === "error" ? "border-destructive bg-destructive/5" : "",
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                {uploadStatus === "error" ? (
                  <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                ) : (
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                )}

                <h3 className="text-lg font-medium mb-2">
                  {uploadStatus === "error" ? "Upload Failed" : "Upload your video"}
                </h3>

                {uploadStatus === "error" ? (
                  <p className="text-sm text-destructive mb-4">{errorMessage}</p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your video file here, or click to browse
                    <br />
                    <span className="text-xs">MP4, WebM, MOV up to 500MB</span>
                  </p>
                )}

                <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />

                <Button
                  type="button"
                  variant={uploadStatus === "error" ? "outline" : "default"}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {file && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 mr-4">
                <h3 className="font-medium truncate">{file.name}</h3>
                <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>

              {uploadStatus === "idle" && (
                <Button variant="ghost" size="icon" onClick={resetUpload}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {uploadStatus !== "idle" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{uploadStatus === "uploading" ? "Uploading..." : "Processing..."}</span>
                  {uploadStatus === "uploading" && <span>{uploadProgress}%</span>}
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {uploadStatus === "idle" && (
              <div className="mt-4">
                <Button onClick={startUpload} className="w-full">
                  Upload Video
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
