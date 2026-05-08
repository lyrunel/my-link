import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "./useProfile";
import { useQuery } from "@tanstack/react-query";

export interface PublicProfile extends UserProfile {
  uid: string;
}

export function usePublicProfile(username: string) {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["publicProfile", username],
    queryFn: async () => {
      if (!username) return null;
      
      const q = query(
        collection(db, "users"),
        where("username", "==", username),
        limit(1)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        uid: doc.id,
        ...doc.data()
      } as PublicProfile;
    },
    enabled: !!username,
    retry: false, // 만약 없는 유저면 바로 실패 또는 null 반환
  });

  return { profile, isLoading, error };
}
