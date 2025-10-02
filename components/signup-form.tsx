"use client"
// means you’re only importing React for its type definitions, not for runtime usage
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
//writes user data into Firestore.
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

export function SignupForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    confirmPassword?: string
    agreeToTerms?: string
  }>({})

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      // ✅ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, //creat auth user
        formData.email,
        formData.password
      )

      const user = userCredential.user

      // ✅ Update profile with name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      })

      // ✅ Save user to Firestore we created docunment
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: serverTimestamp(),
      })

      console.log("Signup + Firestore success:", user.email)

      // Save locally (optional)
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", user.email || "")

      // Redirect
      router.push("/")
    } catch (error: any) {
      console.error("Signup failed:", error.message)
      setErrors({ email: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* First & Last name */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Umar"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Jahangir"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="umarjahangir@example.com"
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
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        <p className="text-xs text-muted-foreground">
          Must contain at least 8 characters with uppercase, lowercase, and number
        </p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          className={errors.confirmPassword ? "border-destructive" : ""}
        />
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
      </div>

      {/* Terms Checkbox */}
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
            I agree to the{" "}
            <Button variant="link" className="p-0 h-auto text-sm">Terms of Service</Button> and{" "}
            <Button variant="link" className="p-0 h-auto text-sm">Privacy Policy</Button>
          </Label>
        </div>
        {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms}</p>}
      </div>

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Creating account...</span>
          </div>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  )
}
