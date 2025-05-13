"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, MoreHorizontal, Trash2, Edit2 } from "lucide-react"
import { formatDate, formatExpiryDate } from "@/lib/utils"
import { EditShareLinkDialog } from "@/components/edit-share-link-dialog"
import { ExpiredLinkModal } from "@/components/expired-link-modal"
import { SHARED_LINKS, getVideoById } from "@/lib/constants"

export function SharedLinksTable() {
  const [links, setLinks] = useState(
    SHARED_LINKS.map((link) => {
      const video = getVideoById(link.videoId)
      return {
        ...link,
        videoTitle: video ? video.title : "Unknown Video",
      }
    }),
  )

  const [copied, setCopied] = useState<string | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentLink, setCurrentLink] = useState<any>(null)
  const [isExpiredModalOpen, setIsExpiredModalOpen] = useState(false)
  const [expiredLink, setExpiredLink] = useState<any>(null)

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
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
    setLinks(
      links.map((link) => {
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

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Video</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Views</TableHead>
            <TableHead className="hidden sm:table-cell">Last Viewed</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No shared links found.
              </TableCell>
            </TableRow>
          ) : (
            links.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <div className="font-medium">
                    <Link href={`/videos/${link.videoId}`} className="hover:underline">
                      {link.videoTitle}
                    </Link>
                  </div>
                  <div className="text-sm text-muted-foreground truncate max-w-[200px]">{link.url}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={link.visibility === "PUBLIC" ? "default" : "outline"} className="rounded-full px-3">
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
                <TableCell className="hidden sm:table-cell">
                  {link.lastViewed ? formatDate(link.lastViewed) : "Never viewed"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem onClick={() => handleCopyLink(link.id, link.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        {copied === link.id ? "Copied!" : "Copy Link"}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditLink(link)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit Link
                      </DropdownMenuItem>
                      {link.isExpired ? (
                        <DropdownMenuItem onClick={() => handleOpenLink(link)}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open Link
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem asChild>
                          <Link href={`/share/${link.id}`} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Link
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleDeleteLink(link.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Link
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

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
    </div>
  )
}
