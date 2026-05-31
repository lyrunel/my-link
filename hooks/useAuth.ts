"use client"

import { useState, useEffect } from "react"
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("로그인 팝업이 닫혔습니다.")
        return
      }
      console.error("Error logging in with Google: ", error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error logging out: ", error)
    }
  }

  return { user, loading, loginWithGoogle, logout }
}
