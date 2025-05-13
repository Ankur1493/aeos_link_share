"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  videoId: string
  videoTitle: string
  onCreateLink?: (linkData: any) => void
}

export function ShareDialog({ open, onOpenChange, videoId, videoTitle, onCreateLink }: ShareDialogProps) {
  const [visibility, setVisibility] = useState("PUBLIC")
  const [expiry, setExpiry] = useState("30d")
  const [emails, setEmails] = useState("")
  const [copied, setCopied] = useState(false)

  // Generate a mock share link
  const shareLink = `https://videovault.example/share/${videoId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCreateLink = () => {
    // In a real app, this would create the link with the selected options
    const linkData = {
      visibility,
      expiry,
      emails: visibility === "PRIVATE" ? emails : "",
    }

    console.log("Creating link with:", linkData)

    // Call the onCreateLink callback if provided
    if (onCreateLink) {
      onCreateLink(linkData)
    }

    // Close the dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share Video</DialogTitle>
          <DialogDescription>Create a shareable link for "{videoTitle}"</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="link">Share Link</Label>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Input id="link" value={shareLink} readOnly className="flex-1 rounded-full" />
              <Button size="icon" variant="outline" onClick={handleCopyLink} className="shrink-0 rounded-full">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Visibility</Label>
            <RadioGroup
              defaultValue="PUBLIC"
              value={visibility}
              onValueChange={setVisibility}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PUBLIC" id="public" />
                <Label htmlFor="public" className="font-normal">
                  Public - Anyone with the link can access
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PRIVATE" id="private" />
                <Label htmlFor="private" className="font-normal">
                  Private - Only specific email addresses can access
                </Label>
              </div>
            </RadioGroup>
          </div>

          {visibility === "PRIVATE" && (
            <div className="grid gap-2">
              <Label htmlFor="emails">Allowed Email Addresses</Label>
              <Textarea
                id="emails"
                placeholder="Enter email addresses separated by commas"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="resize-none rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                These email addresses will be required to access the video
              </p>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="expiry">Link Expiry</Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger id="expiry" className="rounded-full">
                <SelectValue placeholder="Select expiry time" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="12h">12 hours</SelectItem>
                <SelectItem value="1d">1 day</SelectItem>
                <SelectItem value="30d">30 days</SelectItem>
                <SelectItem value="never">Never expires</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-full w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleCreateLink} className="rounded-full w-full sm:w-auto">
            Create Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
