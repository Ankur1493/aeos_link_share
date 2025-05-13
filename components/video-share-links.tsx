"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Trash2, Plus, Edit2 } from "lucide-react"
import { formatExpiryDate } from "@/lib/utils"
import { ShareDialog } from "@/components/share-dialog"
import { EditShareLinkDialog } from "@/components/edit-share-link-dialog"
import { ExpiredLinkModal } from "@/components/expired-link-modal"
import { getVideoShareLinks } from "@/lib/constants"

interface VideoShareLinksProps {
  videoId: string
  videoTitle: string
}

export function VideoShareLinks({ videoId, videoTitle }: VideoShareLinksProps) {
  const [shareLinks, setShareLinks] = useState(getVideoShareLinks(videoId))
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentLink, setCurrentLink] = useState<any>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false)
  const [expiredLink, setExpiredLink] = useState<any>(null)

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDeleteLink = (id: string) => {
    setShareLinks(shareLinks.filter((link) => link.id !== id))
  }

  const handleEditLink = (link: any) => {
    setCurrentLink(link)
    setIsEditOpen(true)
  }

  const handleOpenLink = (link: any) => {
    if (link.isExpired) {
      setExpiredLink(link)
      setIsExpiredModalOpen(true)
    }
  }

  const handleUpdateLink = (id: string, updatedData: any) => {
    setShareLinks(
      shareLinks.map((link) => {
        if (link.id === id) {
          return {
            ...link,
            visibility: updatedData.visibility,
            expires: updatedData.expiryDate,
            allowedEmails:
              updatedData.visibility === "PRIVATE" && updatedData.emails
                ? updatedData.emails.split(",").map((e: string) => e.trim())
                : undefined,
          }
        }
        return link
      }),
    )
  }

  const handleCreateLink = (newLink: any) => {
    // In a real app, this would add the new link from the API response
    const mockNewLink = {
      id: `link-${Date.now()}`,
      videoId: videoId,
      videoTitle: videoTitle,
      url: `https://videovault.example/share/link-${Date.now()}`,
      visibility: newLink.visibility,
      expires: newLink.expiry === "never" ? null : new Date(Date.now() + getExpiryTime(newLink.expiry)),
      createdAt: new Date(),
      lastViewed: null,
      views: 0,
      allowedEmails: newLink.visibility === "PRIVATE" ? newLink.emails.split(",").map((e: string) => e.trim()) : [],
      isExpired: false,
    }

    setShareLinks([mockNewLink, ...shareLinks])
  }

  return (
    <Card className="border-none shadow-md rounded-xl">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle>Share Links</CardTitle>
          <CardDescription>Manage the share links for this video.</CardDescription>
        </div>
        <Button onClick={() => setIsShareOpen(true)} className="rounded-full w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create New Link
        </Button>
      </CardHeader>
      <CardContent>
        {shareLinks.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">No share links created yet.</p>
            <Button onClick={() => setIsShareOpen(true)} className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Share Link
            </Button>
          </div>
        ) : (
          <div className="rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Link</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shareLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium truncate max-w-[200px]">{link.url}</TableCell>
                    <TableCell>
                      <Badge
                        variant={link.visibility === "PUBLIC" ? "default" : "outline"}
                        className="rounded-full px-3"
                      >
                        {link.visibility}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {link.isExpired ? (
                        <span className="text-destructive">Expired</span>
                      ) : link.expires ? (
                        formatExpiryDate(link.expires)
                      ) : (
                        "Never"
                      )}
                    </TableCell>
                    <TableCell>{link.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyLink(link.id, link.url)}
                          title={copied === link.id ? "Copied!" : "Copy Link"}
                          className="rounded-full"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditLink(link)}
                          title="Edit Link"
                          className="rounded-full"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        {link.isExpired ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenLink(link)}
                            title="Open Link"
                            className="rounded-full"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" asChild title="Open Link" className="rounded-full">
                            <a href={`/share/${link.id}`} target="_blank" rel="noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteLink(link.id)}
                          title="Delete Link"
                          className="text-destructive hover:text-destructive rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <ShareDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        videoId={videoId}
        videoTitle={videoTitle}
        onCreateLink={handleCreateLink}
      />

      {currentLink && (
        <EditShareLinkDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          link={currentLink}
          onUpdateLink={handleUpdateLink}
        />
      )}

      {expiredLink && (
        <ExpiredLinkModal open={isExpiredModalOpen} onOpenChange={setIsExpiredModalOpen} link={expiredLink} />
      )}
    </Card>
  )
}

// Helper function to convert expiry string to milliseconds
function getExpiryTime(expiry: string): number {
  switch (expiry) {
    case "1h":
      return 60 * 60 * 1000
    case "12h":
      return 12 * 60 * 60 * 1000
    case "1d":
      return 24 * 60 * 60 * 1000
    case "30d":
      return 30 * 24 * 60 * 60 * 1000
    default:
      return 0
  }
}
