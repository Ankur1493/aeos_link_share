"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AccessFormProps {
  onSubmit: (email: string) => void
}

export function AccessForm({ onSubmit }: AccessFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit(email)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive" className="rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="pl-10 rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p className="text-xs text-muted-foreground">Enter the email address that was granted access to this video</p>
      </div>

      <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
        {isSubmitting ? "Verifying..." : "Request Access"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <p>For demo purposes, use: guest@example.com</p>
      </div>
    </form>
  )
}
