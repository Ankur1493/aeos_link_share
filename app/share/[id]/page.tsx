"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Lock, Play } from "lucide-react"
import { AccessForm } from "@/components/access-form"
import { formatDate } from "@/lib/utils"
import { getSharedLinkById, getVideoById } from "@/lib/constants"

export default function SharedVideoPage({ params }: { params: { id: string } }) {
  const [hasAccess, setHasAccess] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sharedLink, setSharedLink] = useState<any>(null)
  const [video, setVideo] = useState<any>(null)

  useEffect(() => {
    // Get the shared link
    const link = getSharedLinkById(params.id)
    setSharedLink(link)

    if (link) {
      // Get the associated video
      const videoData = getVideoById(link.videoId)
      setVideo(videoData)

      // Check if the link is expired
      setIsExpired(link.isExpired)

      if (link.isExpired) {
        setHasAccess(false) // Ensure no access if expired
        return
      }

      // Set access based on visibility
      setHasAccess(link.visibility === "PUBLIC")

      // Record view if access is granted
      if (link.visibility === "PUBLIC") {
        console.log(`Recording view for video ${link.videoId} at ${new Date().toISOString()}`)
      }
    }
  }, [params.id])

  // If link not found
  if (!sharedLink || !video) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Link Not Found</h2>
              <p className="text-muted-foreground mb-4">This shared link does not exist or has been removed.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If link is expired
  if (isExpired) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full rounded-xl border-none shadow-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Link Expired</h2>
              <p className="text-muted-foreground mb-4">This shared link has expired and is no longer available.</p>
              <p className="text-sm text-muted-foreground">Expired on: {formatDate(sharedLink.expires)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If private and no access
  if (!hasAccess && sharedLink.visibility === "PRIVATE") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md w-full rounded-xl border-none shadow-md">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Private Video</h2>
              <p className="text-muted-foreground">This video requires access permission from the owner.</p>
            </div>
            <AccessForm
              onSubmit={(email) => {
                // Check if email is in allowed list
                if (sharedLink.allowedEmails && sharedLink.allowedEmails.includes(email)) {
                  setHasAccess(true)
                  console.log(`Recording view for video ${sharedLink.videoId} at ${new Date().toISOString()}`)
                } else {
                  alert("Email not authorized to access this video.")
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  // If has access, show the video
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">VideoVault</h1>
          </div>
          <Badge variant="outline" className="rounded-full">
            Shared Video
          </Badge>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{video.title}</h2>
              <p className="text-muted-foreground">Shared by {video.owner}</p>
            </div>

            <Card className="mb-6 overflow-hidden border-none shadow-lg rounded-xl">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  {isPlaying ? (
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <p className="text-white">Video player would be here in a real implementation</p>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button
                          size="lg"
                          className="rounded-full h-16 w-16 flex items-center justify-center"
                          onClick={() => setIsPlaying(true)}
                        >
                          <Play className="h-8 w-8" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{video.description}</p>
              </div>
              <div className="md:w-64">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{video.duration}</p>
                  </div>
                  {sharedLink.expires && (
                    <div>
                      <p className="text-sm text-muted-foreground">Link expires</p>
                      <p className="font-medium">{formatDate(sharedLink.expires)}</p>
                    </div>
                  )}
                  <Button className="w-full rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Video
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
