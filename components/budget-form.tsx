"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export interface FormData {
  budget: number
  riskTolerance: "conservative" | "moderate" | "aggressive"
  timeHorizon: "short" | "medium" | "long"
}

export function BudgetForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    budget: 0,
    riskTolerance: "moderate",
    timeHorizon: "medium",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = "Please enter a valid budget amount"
    } else if (formData.budget < 100) {
      newErrors.budget = "Minimum investment amount is PKR100"
    }

    if (!formData.riskTolerance) newErrors.riskTolerance = "Please select your risk tolerance"
    if (!formData.timeHorizon) newErrors.timeHorizon = "Please select your time horizon"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const user = auth.currentUser
      if (!user) {
        alert("Please log in first")
        setIsLoading(false)
        return
      }

      // Save portfolio data to Firestore
      const ref = collection(db, "users", user.uid, "portfolios")
      await addDoc(ref, {
        budget: formData.budget,
        riskTolerance: formData.riskTolerance,
        timeHorizon: formData.timeHorizon,
        createdAt: serverTimestamp(),
      })

      // Redirect to results page
      router.push("/results")
    } catch (err) {
      console.error("Error saving portfolio:", err)
      alert("Something went wrong, try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    return numericValue ? Number.parseInt(numericValue).toLocaleString() : ""
  }

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "")
    const numericValue = rawValue ? Number.parseInt(rawValue) : 0
    setFormData({ ...formData, budget: numericValue })
    if (errors.budget) setErrors({ ...errors, budget: undefined })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Budget Input */}
      <div className="space-y-4">
        <Label htmlFor="budget" className="text-base font-semibold">Investment Budget</Label>
        <p className="text-sm text-muted-foreground mt-1">How much would you like to invest? Amount should be greater than 999 Rupees </p>

        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">PK</span>
          <Input
            id="budget"
            type="text"
            placeholder="10,000"
            value={formatCurrency(formData.budget.toString())}
            onChange={handleBudgetChange}
            className={`pl-8 text-lg h-12 ${errors.budget ? "border-destructive" : ""}`}
          />
        </div>
        {errors.budget && <p className="text-sm text-destructive">{errors.budget}</p>}
      </div>

      {/* Risk Tolerance */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Risk Tolerance</Label>
        <p className="text-sm text-muted-foreground mt-1">How comfortable are you with market volatility?</p>
        <RadioGroup
          value={formData.riskTolerance}
          onValueChange={(value: "conservative" | "moderate" | "aggressive") =>
            setFormData({ ...formData, riskTolerance: value })
          }
          className="space-y-3"
        >
          {["conservative", "moderate", "aggressive"].map((level) => (
            <Card key={level} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <RadioGroupItem value={level} id={level} />
                <div className="flex-1 ml-2">
                  <Label htmlFor={level} className="cursor-pointer font-medium capitalize">{level}</Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
        {errors.riskTolerance && <p className="text-sm text-destructive">{errors.riskTolerance}</p>}
      </div>

      {/* Time Horizon */}
      <div className="space-y-4">
        <Label htmlFor="timeHorizon" className="text-base font-semibold">Investment Time Horizon</Label>
        <p className="text-sm text-muted-foreground mt-1">When do you plan to use this money?</p>
        <Select
          value={formData.timeHorizon}
          onValueChange={(value: "short" | "medium" | "long") => setFormData({ ...formData, timeHorizon: value })}
        >
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Select your time horizon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short">Short-term (1-3 years)</SelectItem>
            <SelectItem value="medium">Medium-term (3-10 years)</SelectItem>
            <SelectItem value="long">Long-term (10+ years)</SelectItem>
          </SelectContent>
        </Select>
        {errors.timeHorizon && <p className="text-sm text-destructive">{errors.timeHorizon}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
        {isLoading ? "Analyzing Your Portfolio..." : "Get My Investment Recommendations"}
      </Button>
    </form>
  )
}
