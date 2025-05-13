"use client"

import { useState, useEffect } from "react"
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
import { formatExpiryToOption, getExpiryTime } from "@/lib/utils"

interface EditShareLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  link: {
    id: string
    url: string
    visibility: string
    expires: Date | null
    allowedEmails?: string[]
  }
  onUpdateLink: (id: string, updatedData: any) => void
}

export function EditShareLinkDialog({ open, onOpenChange, link, onUpdateLink }: EditShareLinkDialogProps) {
  const [visibility, setVisibility] = useState(link.visibility)
  const [expiry, setExpiry] = useState("30d")
  const [emails, setEmails] = useState("")
  const [copied, setCopied] = useState(false)

  // Set initial values when the dialog opens or link changes
  useEffect(() => {
    if (open && link) {
      setVisibility(link.visibility)
      setExpiry(formatExpiryToOption(link.expires))
      setEmails(link.allowedEmails ? link.allowedEmails.join(", ") : "")
    }
  }, [open, link])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUpdateLink = () => {
    // Prepare the updated link data
    const updatedData = {
      visibility,
      expiry,
      emails: visibility === "PRIVATE" ? emails : "",
      // Calculate new expiry date based on selected option
      expiryDate: expiry === "never" ? null : new Date(Date.now() + getExpiryTime(expiry)),
    }

    // Call the update function
    onUpdateLink(link.id, updatedData)

    // Close the dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Share Link</DialogTitle>
          <DialogDescription>Modify the settings for this shared link</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="link">Share Link</Label>
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Input id="link" value={link.url} readOnly className="flex-1 rounded-full" />
              <Button size="icon" variant="outline" onClick={handleCopyLink} className="shrink-0 rounded-full">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Visibility</Label>
            <RadioGroup value={visibility} onValueChange={setVisibility} className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PUBLIC" id="edit-public" />
                <Label htmlFor="edit-public" className="font-normal">
                  Public - Anyone with the link can access
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PRIVATE" id="edit-private" />
                <Label htmlFor="edit-private" className="font-normal">
                  Private - Only specific email addresses can access
                </Label>
              </div>
            </RadioGroup>
          </div>

          {visibility === "PRIVATE" && (
            <div className="grid gap-2">
              <Label htmlFor="edit-emails">Allowed Email Addresses</Label>
              <Textarea
                id="edit-emails"
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
            <Label htmlFor="edit-expiry">Link Expiry</Label>
            <Select value={expiry} onValueChange={setExpiry}>
              <SelectTrigger id="edit-expiry" className="rounded-full">
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
          <Button type="button" onClick={handleUpdateLink} className="rounded-full w-full sm:w-auto">
            Update Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
