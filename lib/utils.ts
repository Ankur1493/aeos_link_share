import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, isAfter } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  // Format date to relative time (e.g., "2 days ago")
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return "Today"
  } else if (diffInDays === 1) {
    return "Yesterday"
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`
  } else {
    return format(date, "MMM d, yyyy")
  }
}

// Format expiry date for display in tables
export function formatExpiryDate(date: Date): string {
  const now = new Date()

  // If the date is in the future
  if (isAfter(date, now)) {
    // For future dates, show the actual date for dates more than 30 days away
    const diffInMs = date.getTime() - now.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays > 30) {
      return format(date, "MMM d, yyyy")
    } else {
      // For closer dates, show "in X days"
      return `Expires in ${diffInDays} ${diffInDays === 1 ? "day" : "days"}`
    }
  } else {
    // For past dates, show "Expired"
    return "Expired"
  }
}

// Helper function to convert expiry string to milliseconds
export function getExpiryTime(expiry: string): number {
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

// Helper function to format expiry date to option value
export function formatExpiryToOption(expiryDate: Date | null): string {
  if (!expiryDate) return "never"

  const now = new Date()
  const diffInMs = expiryDate.getTime() - now.getTime()
  const diffInHours = diffInMs / (1000 * 60 * 60)

  if (diffInHours <= 1) return "1h"
  if (diffInHours <= 12) return "12h"
  if (diffInHours <= 24) return "1d"
  if (diffInHours <= 30 * 24) return "30d"
  return "never"
}
