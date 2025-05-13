import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { UploadHistory } from "@/components/upload-history"
import { Plus } from "lucide-react"

// Hardcoded user data
const user = {
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/abstract-geometric-shapes.png",
}

export default function UploadsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">VideoVault</h1>
          <div className="flex-1 flex justify-center">
            <MainNav />
          </div>
          <UserNav user={user} />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Upload History</h2>
              <p className="text-muted-foreground mt-1">View and manage your previous uploads</p>
            </div>
            <Button asChild className="rounded-full">
              <Link href="/upload">
                <Plus className="mr-2 h-4 w-4" />
                New Upload
              </Link>
            </Button>
          </div>
          <UploadHistory />
        </div>
      </main>
    </div>
  )
}
