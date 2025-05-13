import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { SharedLinksTable } from "@/components/shared-links-table"
import { USER } from "@/lib/constants"

export default function SharedLinksPage() {
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
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Shared Links</h2>
            <p className="text-muted-foreground">Manage all your video share links in one place.</p>
            <SharedLinksTable />
          </div>
        </div>
      </main>
    </div>
  )
}
