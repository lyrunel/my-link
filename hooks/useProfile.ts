import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";

export interface UserProfile {
  displayName: string;
  username: string;
  bio: string;
}

export function useProfile(user: User | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchOrCreateProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          // Create initial profile
          // Google email constraint: only lowercase letters, numbers, and periods
          let baseUsername = user.email ? user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9.]/g, '') : `user${Math.floor(Math.random() * 10000)}`;
          if (!baseUsername) baseUsername = `user${Math.floor(Math.random() * 10000)}`;
          
          let username = baseUsername;
          
          // Check for uniqueness
          let isUnique = false;
          let counter = 0;
          while (!isUnique) {
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              isUnique = true;
            } else {
              counter++;
              username = `${baseUsername}${counter}`;
            }
          }

          const newProfile: UserProfile = {
            displayName: user.displayName || "User",
            username,
            bio: "크리에이터 & 포트폴리오 스페이스 ✨",
          };

          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } catch (error) {
        console.error("Error fetching/creating profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [user]);

  const checkUsernameDuplicate = async (username: string): Promise<boolean> => {
    if (!user) return false;
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    
    // Check if another user has this username
    let isDuplicate = false;
    querySnapshot.forEach((doc) => {
      if (doc.id !== user.uid) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

  const updateProfileData = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, updates);
      setProfile((prev) => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return { profile, loadingProfile: loading, updateProfileData, checkUsernameDuplicate };
}
