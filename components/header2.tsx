'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user profile from Firestore
          const docRef = doc(db, "users", firebaseUser.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            setUser({
              name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
            })
          } else {
            setUser({ name: firebaseUser.email || "User" })
          }
        } catch (err) {
          console.error("Error fetching user profile:", err)
          setUser({ name: firebaseUser.email || "User" })
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-foreground">FinSmart</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>

            <Link href="/results" className="text-muted-foreground hover:text-foreground transition-colors">
              Portfolio
            </Link>

            <Link href="/Investment-info" className="text-muted-foreground hover:text-foreground transition-colors">
              About Investments 
            </Link>

            {user ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 rounded-md hover:bg-muted px-3 py-1 transition"
                >
                  <span className="text-sm text-foreground font-medium">{user.name}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-4 mt-12 w-40 bg-card border border-border rounded shadow-lg animate-fade-in z-50">
                    <Link
                      href="/results"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition"
                    >
                      Portfolio
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/20 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
