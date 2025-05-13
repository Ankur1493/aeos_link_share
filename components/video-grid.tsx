"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { FileVideo, Loader2 } from "lucide-react"
import { VIDEOS } from "@/lib/constants"

export function VideoGrid() {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredVideos = filter ? VIDEOS.filter((video) => video.status === filter) : VIDEOS

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={filter === null ? "default" : "outline"}
          className="cursor-pointer rounded-full px-3"
          onClick={() => setFilter(null)}
        >
          All
        </Badge>
        <Badge
          variant={filter === "READY" ? "default" : "outline"}
          className="cursor-pointer rounded-full px-3"
          onClick={() => setFilter("READY")}
        >
          Ready
        </Badge>
        <Badge
          variant={filter === "PROCESSING" ? "default" : "outline"}
          className="cursor-pointer rounded-full px-3"
          onClick={() => setFilter("PROCESSING")}
        >
          Processing
        </Badge>
        <Badge
          variant={filter === "UPLOADING" ? "default" : "outline"}
          className="cursor-pointer rounded-full px-3"
          onClick={() => setFilter("UPLOADING")}
        >
          Uploading
        </Badge>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <Link href={`/videos/${video.id}`} key={video.id} className="group">
            <Card className="overflow-hidden h-full transition-all hover:shadow-lg border-none shadow-md rounded-xl">
              <div className="relative aspect-video">
                {video.status === "READY" ? (
                  <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
                    {video.status === "PROCESSING" ? (
                      <>
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-2" />
                        <span className="text-sm font-medium">Processing video...</span>
                      </>
                    ) : (
                      <>
                        <FileVideo className="h-10 w-10 text-primary mb-2" />
                        <span className="text-sm font-medium">Uploading video...</span>
                      </>
                    )}
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge
                    variant={video.status === "READY" ? "default" : "outline"}
                    className="bg-background/80 backdrop-blur-sm rounded-full"
                  >
                    {video.status}
                  </Badge>
                </div>
                {video.status === "READY" && (
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-background/80 rounded-full">
                      {video.duration}
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{video.title}</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                Uploaded {formatDate(video.uploadedAt)}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
