import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { User } from "firebase/auth"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export interface UserProfile {
  displayName: string
  username: string
  bio: string
  photoURL?: string | null
}

export function useProfile(user: User | null) {
  const queryClient = useQueryClient()

  const queryKey = ["profile", user?.uid]

  const fetchOrCreateProfile = async (): Promise<UserProfile | null> => {
    if (!user) return null

    const docRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfile
      // 기존 유저의 경우 photoURL이 없거나 변경되었을 수 있으므로 동기화
      if (user.photoURL && data.photoURL !== user.photoURL) {
        updateDoc(docRef, { photoURL: user.photoURL }).catch(console.error)
        data.photoURL = user.photoURL
      }
      return data
    } else {
      let baseUsername = user.email
        ? user.email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9.]/g, "")
        : `user${Math.floor(Math.random() * 10000)}`
      if (!baseUsername)
        baseUsername = `user${Math.floor(Math.random() * 10000)}`

      let username = baseUsername
      let isUnique = false
      let counter = 0
      while (!isUnique) {
        const q = query(
          collection(db, "users"),
          where("username", "==", username)
        )
        const querySnapshot = await getDocs(q)
        if (querySnapshot.empty) {
          isUnique = true
        } else {
          counter++
          username = `${baseUsername}${counter}`
        }
      }

      const newProfile: UserProfile = {
        displayName: user.displayName || "User",
        username,
        bio: "크리에이터 & 포트폴리오 스페이스 ✨",
        photoURL: user.photoURL,
      }

      await setDoc(docRef, newProfile)
      return newProfile
    }
  }

  const { data: profile = null, isLoading } = useQuery({
    queryKey,
    queryFn: fetchOrCreateProfile,
    enabled: !!user,
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<UserProfile>) => {
      if (!user) throw new Error("No user")
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, updates)
      return updates
    },
    onMutate: async (newProfileUpdates) => {
      // 낙관적 업데이트 로직 (저장이 완료되기 전에 UI 먼저 업데이트)
      await queryClient.cancelQueries({ queryKey })

      const previousProfile = queryClient.getQueryData<UserProfile>(queryKey)

      if (previousProfile) {
        queryClient.setQueryData<UserProfile>(queryKey, {
          ...previousProfile,
          ...newProfileUpdates,
        })
      }

      return { previousProfile }
    },
    onError: (err, newProfileUpdates, context) => {
      // 에러 발생 시 롤백
      if (context?.previousProfile) {
        queryClient.setQueryData(queryKey, context.previousProfile)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const checkUsernameDuplicate = async (username: string): Promise<boolean> => {
    if (!user) return false
    const q = query(collection(db, "users"), where("username", "==", username))
    const querySnapshot = await getDocs(q)

    let isDuplicate = false
    querySnapshot.forEach((doc) => {
      if (doc.id !== user.uid) {
        isDuplicate = true
      }
    })
    return isDuplicate
  }

  const updateProfileData = (updates: Partial<UserProfile>) => {
    updateProfileMutation.mutate(updates)
  }

  return {
    profile,
    loadingProfile: isLoading,
    updateProfileData,
    checkUsernameDuplicate,
  }
}
