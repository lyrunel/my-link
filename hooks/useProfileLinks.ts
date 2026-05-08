import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LinkItem } from "@/data/links";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useProfileLinks(uid: string) {
  const queryClient = useQueryClient();
  const queryKey = ["links", uid];

  const { data: links = [], isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (!uid) return [];
      const q = query(
        collection(db, `users/${uid}/links`),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LinkItem[];
    },
    enabled: !!uid,
  });

  const addLinkMutation = useMutation({
    mutationFn: async (newLinkData: any) => {
      const dataToSave = {
        ...newLinkData,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, `users/${uid}/links`), dataToSave);
      return { id: docRef.id, ...dataToSave };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const updateLinkMutation = useMutation({
    mutationFn: async ({ id, updatedData }: { id: string, updatedData: any }) => {
      await updateDoc(doc(db, `users/${uid}/links`, id), {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, `users/${uid}/links`, id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    }
  });

  return {
    links,
    isLoading,
    addLink: addLinkMutation.mutateAsync,
    isAdding: addLinkMutation.isPending,
    updateLink: updateLinkMutation.mutateAsync,
    isUpdating: updateLinkMutation.isPending,
    deleteLink: deleteLinkMutation.mutateAsync,
    isDeleting: deleteLinkMutation.isPending,
  };
}
