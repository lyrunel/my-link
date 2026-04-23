"use client";

import { useState, useEffect } from "react";
import { LinkItem } from "@/data/links";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiLoader4Line } from "@remixicon/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const linkSchema = z.object({
  title: z.string().min(1, "링크 제목을 입력해주세요."),
  url: z.string().min(1, "URL을 입력해주세요.").superRefine((val, ctx) => {
    const finalUrl = val.startsWith('http') ? val : `https://${val}`;
    try {
      const parsedUrl = new URL(finalUrl);
      if (!parsedUrl.hostname.includes('.') || parsedUrl.hostname.length < 3) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "유효한 웹사이트 주소가 아닙니다. (예: example.com)" });
      }
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "올바른 URL 형식을 입력해주세요." });
    }
  })
});

type LinkFormValues = z.infer<typeof linkSchema>;

function LinkItemCard({ 
  link, 
  onUpdateSuccess, 
  onDeleteSuccess 
}: { 
  link: LinkItem;
  onUpdateSuccess: (id: string, updatedData: Partial<LinkItem>) => void;
  onDeleteSuccess: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  const onSubmit = async (data: LinkFormValues) => {
    if (data.title === link.title && data.url === link.url) {
      setIsEditing(false);
      return;
    }
    setIsSubmitting(true);
    try {
      const finalUrl = data.url.startsWith('http') ? data.url : `https://${data.url}`;
      let domain = data.url;
      try {
        const parsedUrl = new URL(finalUrl);
        domain = parsedUrl.hostname;
      } catch {
        // ignore
      }

      const updatedData = {
        title: data.title.trim(),
        url: finalUrl,
        icon: `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=256`,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(doc(db, "users/anonymous/links", link.id), updatedData);
      onUpdateSuccess(link.id, { ...updatedData, updatedAt: new Date() });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating link: ", error);
      alert("링크 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, "users/anonymous/links", link.id));
      onDeleteSuccess(link.id);
    } catch (error) {
      console.error("Error deleting link: ", error);
      alert("링크 삭제 중 오류가 발생했습니다.");
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="relative overflow-visible bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border-2 border-indigo-500/50 rounded-2xl shadow-lg transition-all">
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 p-4 sm:p-5 w-full"
        >
          <div className="space-y-1">
            <Label className="text-xs text-neutral-500 font-semibold mb-1 block">링크 제목</Label>
            <Input 
              autoFocus
              placeholder="예: 내 포트폴리오"
              {...form.register("title")}
              className="bg-white/80 dark:bg-black/40 h-11 transition-shadow focus-visible:ring-indigo-500"
            />
            {form.formState.errors.title && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400 pl-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-neutral-500 font-semibold mb-1 block">URL 입력</Label>
            <Input 
              placeholder="예: https://myportfolio.com"
              {...form.register("url")}
              className="bg-white/80 dark:bg-black/40 h-11 transition-shadow focus-visible:ring-indigo-500"
            />
            {form.formState.errors.url && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400 pl-1">
                {form.formState.errors.url.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                setIsEditing(false);
              }}
              className="h-9 px-4 text-xs font-semibold rounded-xl"
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              className="h-9 px-4 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <RiLoader4Line className="w-4 h-4 mr-1 animate-spin" />
                  저장 중...
                </>
              ) : "확인"}
            </Button>
          </div>
        </form>
      </Card>
    );
  }

  return (
    <div className="relative group w-full block">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl block"
      >
        <Card className="relative overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out border-b-2 hover:border-b-indigo-500/50 dark:hover:border-b-indigo-400/50 rounded-2xl">
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          
          <CardContent className="p-4 sm:p-5 flex items-center relative min-h-[72px]">
            {link.icon && (
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center bg-white/80 dark:bg-black/40 shadow-sm border border-black/5 dark:border-white/5 transition-transform duration-500 z-10 p-[4px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={link.icon}
                  alt={link.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            )}
            
            <span className="w-full text-center font-semibold text-[15px] sm:text-base text-neutral-700 dark:text-neutral-200 transition-colors duration-300 z-10 pl-12 pr-16">
              {link.title}
            </span>
            
          </CardContent>
        </Card>
      </a>

      {/* 우측 조작 버튼 영역: hover 없이 항상 표시, z-index를 올려서 a 태그 클릭 방해 회피 */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // 수정 시 현재 값으로 초기화 (다른 곳에서 편집하다가 왔을 수 있으므로)
            form.reset({ title: link.title, url: link.url });
            setIsEditing(true);
          }}
          className="h-9 w-9 rounded-full text-neutral-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30"
          aria-label="링크 수정"
        >
          <RiEditLine className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger render={
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.stopPropagation(); }}
              className="h-9 w-9 rounded-full text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/30"
              aria-label="링크 삭제"
            >
              <RiDeleteBinLine className="w-4 h-4" />
            </Button>
          } />
          <AlertDialogContent className="rounded-2xl sm:max-w-[400px]">
            <AlertDialogHeader>
              <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
              <AlertDialogDescription className="text-base text-neutral-900 dark:text-neutral-100 mt-2 font-medium">
                [{link.title}] 링크
              </AlertDialogDescription>
              <AlertDialogDescription className="text-red-500 dark:text-red-400 font-medium mt-1">
                이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-2">
              <AlertDialogCancel disabled={isDeleting} className="w-full sm:w-auto h-11 rounded-xl">취소</AlertDialogCancel>
              <AlertDialogAction 
                onClick={(e) => {
                  e.preventDefault(); // Don't allow it to self-close by typical action means, wait until onDeleteSuccess
                  handleDelete();
                }}
                disabled={isDeleting}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white h-11 rounded-xl"
              >
                {isDeleting ? (
                  <>
                    <RiLoader4Line className="w-4 h-4 mr-1 animate-spin" />
                    삭제 중...
                  </>
                ) : "삭제"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export function ProfileLinks() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const fetchLinks = async () => {
    try {
      const q = query(
        collection(db, "users/anonymous/links"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const fetchedLinks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LinkItem[];
      setLinks(fetchedLinks);
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const onSubmit = async (data: LinkFormValues) => {
    setIsSubmitting(true);
    try {
      const finalUrl = data.url.startsWith('http') ? data.url : `https://${data.url}`;
      let domain = data.url;
      try {
        const parsedUrl = new URL(finalUrl);
        domain = parsedUrl.hostname;
      } catch {
        // ignore
      }

      const newLinkData = {
        title: data.title.trim(),
        url: finalUrl,
        icon: `https://s2.googleusercontent.com/s2/favicons?domain=${domain}&sz=256`,
        order_index: links.length,
        is_active: true,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "users/anonymous/links"), newLinkData);
      
      // Update local state manually
      setLinks([{ id: docRef.id, ...newLinkData } as LinkItem, ...links]);
      
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding link: ", error);
      alert("링크 추가 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Add Link Button */}
      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) { 
          form.reset();
        }
      }}>
        <DialogTrigger render={
          <Button 
            className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-[0_8px_30px_rgb(79,70,229,0.25)] hover:shadow-[0_12px_40px_rgb(79,70,229,0.4)] border-none hover:-translate-y-1 font-semibold text-base transition-all duration-300 ease-out group"
          >
            <RiAddLine className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
            새 링크 추가
          </Button>
        } />
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">새 링크 추가</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">링크 제목</Label>
              <Input 
                id="title" 
                type="text"
                placeholder="예: 내 포트폴리오" 
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input 
                id="url" 
                type="text"
                placeholder="예: https://myportfolio.com" 
                {...form.register("url")}
              />
              {form.formState.errors.url && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {form.formState.errors.url.message}
                </p>
              )}
            </div>
            <DialogFooter className="pt-4 flex !justify-between sm:!justify-end gap-2">
              <DialogClose render={
                <Button type="button" variant="outline" className="w-full sm:w-auto rounded-xl h-11" disabled={isSubmitting}>
                  취소
                </Button>
              } />
              <Button type="submit" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <RiLoader4Line className="w-4 h-4 mr-1 animate-spin" />
                    추가 중...
                  </>
                ) : "추가하기"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Links List */}
      <div className="flex flex-col gap-4 mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <RiLoader4Line className="animate-spin w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-10 text-sm text-neutral-500 dark:text-neutral-400">
            아직 추가된 링크가 없습니다.
          </div>
        ) : (
          links.map((link) => (
            <LinkItemCard 
              key={link.id} 
              link={link} 
              onUpdateSuccess={(id, updatedData) => {
                setLinks(prev => prev.map(l => l.id === id ? { ...l, ...updatedData } as LinkItem : l))
              }}
              onDeleteSuccess={(id) => {
                setLinks(prev => prev.filter(l => l.id !== id))
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
