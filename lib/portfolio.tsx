// lib/portfolio.ts
import { db, auth } from "./firebase"
import { doc, setDoc, getDoc } from "firebase/firestore"

export async function savePortfolio(formData: any) {
  const user = auth.currentUser
  if (!user) throw new Error("User not logged in")

  // Save portfolio under user → "portfolios/{uid}"
  const portfolioRef = doc(db, "portfolios", user.uid)
  await setDoc(portfolioRef, { ...formData, updatedAt: new Date() })
}

export async function getPortfolio() {
  const user = auth.currentUser
  if (!user) throw new Error("User not logged in")

  const portfolioRef = doc(db, "portfolios", user.uid)
  const snap = await getDoc(portfolioRef)
  if (snap.exists()) {
    return snap.data()
  } else {
    return null // user has no saved portfolio
  }
}
