"use client"

import type React from "react"
// remember what the user type
import { useState } from "react"
// move to another page after login
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// 🔥 Firebase imports
import { signInWithEmailAndPassword } from "firebase/auth"
// So after login, we can look inside Firestore to see that user’s profile (like their name, portfolio, etc.).
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export function LoginForm() {
  const router = useRouter()
  // formData → keeps what user types (email, password, rememberMe).
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  // ✅ Validation
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✅ Handle Login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
// if login info is not valid, stop here
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // 1️⃣ Login with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      const user = userCredential.user
      console.log("Logged in:", user.email)

      // Fetch profile from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))
      let profile = null
      if (userDoc.exists()) {
        profile = userDoc.data()
        console.log("User profile:", profile)
      }

      // 3️⃣ Save user locally (temporary - later you can use Context)
      // localStorage.setItem("isAuthenticated", "true")
      // localStorage.setItem("userEmail", user.email || "")
      // if (profile?.name) {
      //   localStorage.setItem("userName", profile.name)
      // }

      // 4️⃣ Redirect
      router.push("/")
    } catch (error: any) {
      console.error("Login failed:", error.message)
      setErrors({ email: "Invalid email or password" })
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked as boolean })
            }
          />
          <Label htmlFor="rememberMe" className="text-sm">
            Remember me
          </Label>
        </div>
        <Button variant="link" className="p-0 h-auto text-sm">
          Forgot password?
        </Button>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      {/* Social logins (disabled for now) */}
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled className="bg-transparent">
          Google
        </Button>
        <Button variant="outline" type="button" disabled className="bg-transparent">
          Facebook
        </Button>
      </div>
    </form>
  )
}


