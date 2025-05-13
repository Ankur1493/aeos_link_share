"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Please enter your email address")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold">VideoVault</h1>
            <p className="text-muted-foreground mt-2">Reset your password</p>
          </div>
        </div>

        <Card>
          {!isSubmitted ? (
            <>
              <CardHeader>
                <CardTitle>Forgot your password?</CardTitle>
                <CardDescription>
                  Enter your email address and we&apos;ll send you a link to reset your password.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send reset link"}
                  </Button>
                </CardFooter>
              </form>
            </>
          ) : (
            <CardContent className="pt-6 pb-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <div>
                  <h3 className="text-lg font-medium">Check your email</h3>
                  <p className="text-muted-foreground mt-1">
                    We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>
                  </p>
                </div>
                <div className="text-sm text-muted-foreground mt-4">
                  <p>Didn&apos;t receive the email?</p>
                  <Button variant="link" className="p-0 h-auto" onClick={() => setIsSubmitted(false)}>
                    Click here to try again
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
