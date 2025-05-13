import { redirect } from "next/navigation"
import { VideoGrid } from "@/components/video-grid"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { USER } from "@/lib/constants"

// Mock function to check if user is logged in
function isLoggedIn() {
  // In a real app, this would check for a session or token
  // For demo purposes, we'll hardcode to true
  return true
}

export default function Dashboard() {
  if (!isLoggedIn()) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold md:mr-0">VideoVault</h1>
          </div>
          <div className="flex-1 flex justify-center">
            <MainNav />
          </div>
          <UserNav user={USER} />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Videos</h2>
            <Button asChild className="rounded-full w-full sm:w-auto">
              <a href="/upload">
                <Plus className="mr-2 h-4 w-4" />
                Upload Video
              </a>
            </Button>
          </div>
          <VideoGrid />
        </div>
      </main>
    </div>
  )
}
