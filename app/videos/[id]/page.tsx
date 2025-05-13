"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { ShareDialog } from "@/components/share-dialog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share2, Calendar, HardDrive, Film, Loader2, FileVideo } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { VideoShareLinks } from "@/components/video-share-links"
import { getVideoById, USER } from "@/lib/constants"

export default function VideoPage({ params }: { params: { id: string } }) {
  const video = getVideoById(params.id)
  const [isShareOpen, setIsShareOpen] = useState(false)

  // If video not found, show error
  if (!video) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <h1 className="text-xl font-bold">VideoVault</h1>
            <div className="flex-1 flex justify-center">
              <MainNav />
            </div>
            <UserNav user={USER} />
          </div>
        </header>
        <main className="flex-1 container py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Video Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The video you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">VideoVault</h1>
          <div className="flex-1 flex justify-center">
            <MainNav />
          </div>
          <UserNav user={USER} />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          {/* Video title and actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{video.title}</h2>
            <div className="flex gap-2">
              {video.status === "READY" && (
                <Button variant="outline" className="rounded-full flex-1 sm:flex-none">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
              <Button className="rounded-full flex-1 sm:flex-none" onClick={() => setIsShareOpen(true)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left column - Video */}
            <div className="lg:col-span-7">
              <Card className="overflow-hidden border-none shadow-lg rounded-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    {video.status === "READY" ? (
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                    ) : video.status === "PROCESSING" ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                        <span className="text-base font-medium">Processing video...</span>
                        <p className="text-sm text-muted-foreground mt-2">This may take a few minutes</p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                        <FileVideo className="h-12 w-12 text-primary mb-4" />
                        <span className="text-base font-medium">Uploading video...</span>
                        <p className="text-sm text-muted-foreground mt-2">Please wait while your video uploads</p>
                      </div>
                    )}
                    {video.status !== "READY" && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-background/80 px-3 py-1 rounded-full">
                          {video.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Video description */}
              <Card className="mt-4 border-none shadow-md rounded-xl">
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground">{video.description || "No description provided."}</p>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Details and Stats */}
            <div className="lg:col-span-5">
              <Card className="mb-4 border-none shadow-md rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Video Details</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <dl className="space-y-4">
                    <div className="flex items-center">
                      <dt className="flex items-center text-sm font-medium text-muted-foreground w-24">
                        <Badge variant={video.status === "READY" ? "default" : "outline"} className="mr-2 rounded-full">
                          {video.status}
                        </Badge>
                        Status
                      </dt>
                    </div>

                    <div className="flex items-center">
                      <dt className="flex items-center text-sm font-medium text-muted-foreground w-24">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        Uploaded
                      </dt>
                      <dd className="text-sm">{formatDate(video.uploadedAt)}</dd>
                    </div>

                    <div className="flex items-center">
                      <dt className="flex items-center text-sm font-medium text-muted-foreground w-24">
                        <HardDrive className="mr-2 h-4 w-4 text-muted-foreground" />
                        Size
                      </dt>
                      <dd className="text-sm">{video.size}</dd>
                    </div>

                    <div className="flex items-center">
                      <dt className="flex items-center text-sm font-medium text-muted-foreground w-24">
                        <Film className="mr-2 h-4 w-4 text-muted-foreground" />
                        Duration
                      </dt>
                      <dd className="text-sm">{video.duration}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Sharing Statistics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <dl className="space-y-4">
                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-muted-foreground w-32">Total Views</dt>
                      <dd className="text-sm font-medium">{video.views}</dd>
                    </div>

                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-muted-foreground w-32">Last Viewed</dt>
                      <dd className="text-sm">{video.lastViewed ? formatDate(video.lastViewed) : "Never viewed"}</dd>
                    </div>

                    <div className="flex items-center">
                      <dt className="text-sm font-medium text-muted-foreground w-32">Active Links</dt>
                      <dd className="text-sm">2</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Share links section */}
          <VideoShareLinks videoId={video.id} videoTitle={video.title} />
        </div>
      </main>

      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        videoId={video.id}
        videoTitle={video.title}
        onCreateLink={(linkData) => console.log("Link created:", linkData)}
      />
    </div>
  )
}
