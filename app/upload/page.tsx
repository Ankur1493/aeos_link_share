import Link from "next/link"
import { Button } from "@/components/ui/button"
import { VideoUploader } from "@/components/video-uploader"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { ArrowLeft } from "lucide-react"
import { USER } from "@/lib/constants"

export default function UploadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">VideoVault</h1>
          <div className="flex-1 flex justify-center">
            <MainNav />
          </div>
          <UserNav user={USER} />
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="rounded-full">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Upload Video</h2>
            <VideoUploader />
          </div>
        </div>
      </main>
    </div>
  )
}
