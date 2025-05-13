"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, ArrowUpDown, Trash2, ExternalLink, FileVideo, Loader2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

// Mock upload history data
const uploadHistory = [
  {
    id: "upload-1",
    videoId: "video-1",
    fileName: "product-demo-final-v2.mp4",
    fileSize: "125.4 MB",
    uploadedAt: new Date("2023-05-15T14:30:00"),
    status: "READY",
    thumbnail: "/product-demo-presentation.png",
    duration: "2:45",
  },
  {
    id: "upload-2",
    videoId: "video-2",
    fileName: "team-meeting-may-18.mp4",
    fileSize: "345.7 MB",
    uploadedAt: new Date("2023-05-18T10:15:00"),
    status: "PROCESSING",
    thumbnail: "/business-meeting.png",
    duration: "45:12",
    progress: 80,
  },
  {
    id: "upload-3",
    videoId: "video-3",
    fileName: "marketing-campaign-2023.mp4",
    fileSize: "78.2 MB",
    uploadedAt: new Date("2023-05-20T09:45:00"),
    status: "UPLOADING",
    thumbnail: "/marketing-strategy-meeting.png",
    duration: "1:30",
    progress: 45,
  },
  {
    id: "upload-4",
    videoId: "video-4",
    fileName: "platform-tutorial.mp4",
    fileSize: "156.8 MB",
    uploadedAt: new Date("2023-05-10T16:20:00"),
    status: "READY",
    thumbnail: "/tutorial-concept.png",
    duration: "12:20",
  },
  {
    id: "upload-5",
    videoId: "video-5",
    fileName: "customer-testimonial-john.mp4",
    fileSize: "42.3 MB",
    uploadedAt: new Date("2023-05-05T11:30:00"),
    status: "READY",
    thumbnail: "/testimonial-card.png",
    duration: "3:45",
  },
  {
    id: "upload-6",
    videoId: null,
    fileName: "quarterly-report-presentation.mp4",
    fileSize: "98.1 MB",
    uploadedAt: new Date("2023-05-22T08:15:00"),
    status: "FAILED",
    error: "File format not supported",
  },
]

export function UploadHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Filter uploads based on search query and status filter
  const filteredUploads = uploadHistory.filter((upload) => {
    const matchesSearch = upload.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter ? upload.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  // Sort uploads based on upload date
  const sortedUploads = [...filteredUploads].sort((a, b) => {
    const dateA = new Date(a.uploadedAt).getTime()
    const dateB = new Date(b.uploadedAt).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  // Group uploads by status for tabs
  const readyUploads = sortedUploads.filter((upload) => upload.status === "READY")
  const processingUploads = sortedUploads.filter(
    (upload) => upload.status === "PROCESSING" || upload.status === "UPLOADING",
  )
  const failedUploads = sortedUploads.filter((upload) => upload.status === "FAILED")

  const renderUploadCard = (upload: any) => (
    <Card key={upload.id} className="overflow-hidden border-none shadow-md rounded-xl">
      <div className="relative aspect-video">
        {upload.status === "READY" ? (
          <Image src={upload.thumbnail || "/placeholder.svg"} alt={upload.fileName} fill className="object-cover" />
        ) : upload.status === "FAILED" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
            <FileVideo className="h-10 w-10 text-destructive mb-2" />
            <span className="text-sm font-medium text-destructive">Upload failed</span>
          </div>
        ) : upload.status === "PROCESSING" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
            <span className="text-sm font-medium">Processing video...</span>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
            <FileVideo className="h-10 w-10 text-primary mb-2" />
            <span className="text-sm font-medium">Uploading video...</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge
            variant={upload.status === "READY" ? "default" : upload.status === "FAILED" ? "destructive" : "outline"}
            className="bg-background/80 backdrop-blur-sm rounded-full"
          >
            {upload.status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium line-clamp-1">{upload.fileName}</h3>
              <p className="text-sm text-muted-foreground">
                {upload.fileSize} • {formatDistanceToNow(new Date(upload.uploadedAt), { addSuffix: true })}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <span className="sr-only">Open menu</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                  >
                    <path
                      d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl">
                {upload.videoId && (
                  <DropdownMenuItem asChild>
                    <Link href={`/videos/${upload.videoId}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Video
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {(upload.status === "UPLOADING" || upload.status === "PROCESSING") && (
            <div className="space-y-1">
              <Progress value={upload.progress} className="h-2 rounded-full" />
              <p className="text-xs text-muted-foreground text-right">{upload.progress}%</p>
            </div>
          )}

          {upload.status === "FAILED" && <p className="text-sm text-destructive">{upload.error || "Upload failed"}</p>}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search uploads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 rounded-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("READY")}>Ready</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("PROCESSING")}>Processing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("UPLOADING")}>Uploading</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("FAILED")}>Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-full"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            {sortOrder === "asc" ? "Oldest first" : "Newest first"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-full p-1">
          <TabsTrigger value="all" className="rounded-full">
            All ({sortedUploads.length})
          </TabsTrigger>
          <TabsTrigger value="ready" className="rounded-full">
            Ready ({readyUploads.length})
          </TabsTrigger>
          <TabsTrigger value="processing" className="rounded-full">
            Processing ({processingUploads.length})
          </TabsTrigger>
          <TabsTrigger value="failed" className="rounded-full">
            Failed ({failedUploads.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          {sortedUploads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No uploads found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{sortedUploads.map(renderUploadCard)}</div>
          )}
        </TabsContent>
        <TabsContent value="ready" className="mt-6">
          {readyUploads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No ready uploads found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{readyUploads.map(renderUploadCard)}</div>
          )}
        </TabsContent>
        <TabsContent value="processing" className="mt-6">
          {processingUploads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No processing uploads found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{processingUploads.map(renderUploadCard)}</div>
          )}
        </TabsContent>
        <TabsContent value="failed" className="mt-6">
          {failedUploads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No failed uploads found</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{failedUploads.map(renderUploadCard)}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
