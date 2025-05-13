"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },
    {
      href: "/upload",
      label: "Upload",
      active: pathname === "/upload",
    },
    {
      href: "/shared-links",
      label: "Shared Links",
      active: pathname === "/shared-links",
    },
  ]

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="py-4">
              <h2 className="text-lg font-bold mb-4">VideoVault</h2>
              <nav className="flex flex-col space-y-3">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-full text-sm font-medium transition-colors",
                      route.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant={route.active ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-9 px-4 rounded-full",
              route.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
            asChild
          >
            <Link href={route.href}>{route.label}</Link>
          </Button>
        ))}
      </nav>
    </>
  )
}
