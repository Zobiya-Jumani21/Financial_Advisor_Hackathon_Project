import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-foreground">Financial Advisor</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {/* <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/results" className="text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link> */}
            <p className="text-center font-bold text-lg">
  <strong>Sign Up Now And Save Your's Money</strong>
</p>
            <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
             
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            {/* <Button variant="outline" asChild className="hidden sm:inline-flex bg-transparent">
              <Link href="/login">Sign In</Link>
            </Button> */}
            
          </div>
        </div>
      </div>
    </header>
  )
}
