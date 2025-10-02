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


// // "use client" //tells Next.js This code runs in the browser, not on the server.

// // import type React from "react"
// // //useState → a React tool to remember things like what the user types.
// // //useRouter → a tool to move the user to another page after login.
// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Checkbox } from "@/components/ui/checkbox"

// // export function LoginForm() {
// //   const router = useRouter()
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     rememberMe: false,
// //   })
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

// //   const validateForm = (): boolean => {
// //     const newErrors: { email?: string; password?: string } = {}

// //     if (!formData.email) {
// //       newErrors.email = "Email is required"
// //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
// //       newErrors.email = "Please enter a valid email address"
// //     }

// //     if (!formData.password) {
// //       newErrors.password = "Password is required"
// //     } else if (formData.password.length < 6) {
// //       newErrors.password = "Password must be at least 6 characters"
// //     }

// //     setErrors(newErrors)
// //     return Object.keys(newErrors).length === 0
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     if (!validateForm()) {
// //       return
// //     }

// //     setIsLoading(true) //shows the spinning loader.

// //     // Simulate API call
// //     await new Promise((resolve) => setTimeout(resolve, 1500))

// //     // TODO: Replace with real authentication logic
// //     console.log("Login attempt:", formData)

// //     // For demo purposes, always "succeed"
// //     localStorage.setItem("isAuthenticated", "true")
// //     localStorage.setItem("userEmail", formData.email)

// //     // Redirect to home page
// //     router.push("/")
// //   }
// // //Updating the form while typing
// //   const handleInputChange = (field: string, value: string) => {
// //     setFormData({ ...formData, [field]: value })
// //     if (errors[field as keyof typeof errors]) {
// //       setErrors({ ...errors, [field]: undefined })
// //     }
// //   }

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       <div className="space-y-2">
// //         <Label htmlFor="email">Email Address</Label>
// //         <Input
// //           id="email"
// //           type="email"
// //           placeholder="Enter your email"
// //           value={formData.email}
// //           onChange={(e) => handleInputChange("email", e.target.value)}
// //           className={errors.email ? "border-destructive" : ""}
// //         />
// //         {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
// //       </div>

// //       <div className="space-y-2">
// //         <Label htmlFor="password">Password</Label>
// //         <Input
// //           id="password"
// //           type="password"
// //           placeholder="Enter your password"
// //           value={formData.password}
// //           onChange={(e) => handleInputChange("password", e.target.value)}
// //           className={errors.password ? "border-destructive" : ""}
// //         />
// //         {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
// //       </div>

// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center space-x-2">
// //           <Checkbox
// //             id="rememberMe"
// //             checked={formData.rememberMe}
// //             onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
// //           />
// //           <Label htmlFor="rememberMe" className="text-sm">
// //             Remember me
// //           </Label>
// //         </div>
// //         <Button variant="link" className="p-0 h-auto text-sm">
// //           Forgot password?
// //         </Button>
// //       </div>

// //       <Button type="submit" className="w-full" disabled={isLoading}>
// //         {isLoading ? (
// //           <div className="flex items-center space-x-2">
// //             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //             <span>Signing in...</span>
// //           </div>
// //         ) : (
// //           "Sign In"
// //         )}
// //       </Button>

// //       <div className="relative">
// //         <div className="absolute inset-0 flex items-center">
// //           <span className="w-full border-t" />
// //         </div>
// //         <div className="relative flex justify-center text-xs uppercase">
// //           <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-2 gap-4">
// //         <Button variant="outline" type="button" disabled className="bg-transparent">
// //           <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
// //             <path
// //               fill="currentColor"
// //               d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
// //             />
// //             <path
// //               fill="currentColor"
// //               d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
// //             />
// //             <path
// //               fill="currentColor"
// //               d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
// //             />
// //             <path
// //               fill="currentColor"
// //               d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
// //             />
// //           </svg>
// //           Google
// //         </Button>
// //         <Button variant="outline" type="button" disabled className="bg-transparent">
// //           <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
// //             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
// //           </svg>
// //           Facebook
// //         </Button>
// //       </div>
// //     </form>
// //   )
// // }
// "use client" // This runs in the browser

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"

// // 🔥 Firebase imports
// import { signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from "@/lib/firebase"

// export function LoginForm() {
//   const router = useRouter()
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   })
//   const [isLoading, setIsLoading] = useState(false)
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

//   const validateForm = (): boolean => {
//     const newErrors: { email?: string; password?: string } = {}

//     if (!formData.email) {
//       newErrors.email = "Email is required"
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address"
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required"
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setIsLoading(true)
//     setErrors({})

//     try {
//       // ✅ Firebase login
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       )

//       const user = userCredential.user
//       console.log("Logged in:", user.email)

//       // Optional: save locally
//       localStorage.setItem("isAuthenticated", "true")
//       localStorage.setItem("userEmail", user.email || "")

//       // Redirect to home page
//       router.push("/")
//     } catch (error: any) {
//       console.error("Login failed:", error.message)
//       setErrors({ email: "Invalid email or password" })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({ ...formData, [field]: value })
//     if (errors[field as keyof typeof errors]) {
//       setErrors({ ...errors, [field]: undefined })
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-2">
//         <Label htmlFor="email">Email Address</Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={(e) => handleInputChange("email", e.target.value)}
//           className={errors.email ? "border-destructive" : ""}
//         />
//         {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <Input
//           id="password"
//           type="password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={(e) => handleInputChange("password", e.target.value)}
//           className={errors.password ? "border-destructive" : ""}
//         />
//         {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Checkbox
//             id="rememberMe"
//             checked={formData.rememberMe}
//             onCheckedChange={(checked) =>
//               setFormData({ ...formData, rememberMe: checked as boolean })
//             }
//           />
//           <Label htmlFor="rememberMe" className="text-sm">
//             Remember me
//           </Label>
//         </div>
//         <Button variant="link" className="p-0 h-auto text-sm">
//           Forgot password?
//         </Button>
//       </div>

//       <Button type="submit" className="w-full" disabled={isLoading}>
//         {isLoading ? (
//           <div className="flex items-center space-x-2">
//             <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             <span>Signing in...</span>
//           </div>
//         ) : (
//           "Sign In"
//         )}
//       </Button>

//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
//         </div>
//       </div>

//       {/* Social logins (disabled for now) */}
//       <div className="grid grid-cols-2 gap-4">
//         <Button variant="outline" type="button" disabled className="bg-transparent">
//           Google
//         </Button>
//         <Button variant="outline" type="button" disabled className="bg-transparent">
//           Facebook
//         </Button>
//       </div>
//     </form>
//   )
// }
