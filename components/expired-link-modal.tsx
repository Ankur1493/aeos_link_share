"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib/utils"
import { AlertCircle } from "lucide-react"
import { getVideoById } from "@/lib/constants"

interface ExpiredLinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  link: {
    id: string
    url: string
    videoId: string
    videoTitle?: string
    expires: Date | null
  }
}

export function ExpiredLinkModal({ open, onOpenChange, link }: ExpiredLinkModalProps) {
  // Get video title if not provided
  const videoTitle = link.videoTitle || getVideoById(link.videoId)?.title || "Unknown Video"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <DialogTitle>Link Expired</DialogTitle>
          </div>
          <DialogDescription>
            This shared link for "{videoTitle}" has expired and is no longer available.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium mb-1">Link Details</p>
            <p className="text-xs text-muted-foreground mb-2 break-all">{link.url}</p>
            <p className="text-xs text-destructive">
              Expired on: {link.expires ? formatDate(link.expires) : "Unknown date"}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full rounded-full">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
