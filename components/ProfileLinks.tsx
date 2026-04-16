"use client";

import { useState, useEffect } from "react";
import { LinkItem } from "@/data/links";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RiAddLine } from "@remixicon/react";

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

  useEffect(() => {
    const q = query(
      collection(db, "users/anonymous/links"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLinks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LinkItem[];
      setLinks(fetchedLinks);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching links:", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
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

      await addDoc(collection(db, "users/anonymous/links"), newLinkData);
      
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
        <DialogTrigger 
          render={
            <Button 
              className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-[0_8px_30px_rgb(79,70,229,0.25)] hover:shadow-[0_12px_40px_rgb(79,70,229,0.4)] border-none hover:-translate-y-1 font-semibold text-base transition-all duration-300 ease-out group"
            />
          }
        >
          <RiAddLine className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          새 링크 추가
        </DialogTrigger>
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
              <DialogClose render={<Button type="button" variant="outline" className="w-full sm:w-auto" />}>
                취소
              </DialogClose>
              <Button type="submit" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white" disabled={isSubmitting}>
                {isSubmitting ? "추가 중..." : "추가하기"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Links List */}
      <div className="flex flex-col gap-4 mt-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-10 text-sm text-neutral-500 dark:text-neutral-400">
            아직 추가된 링크가 없습니다.
          </div>
        ) : (
          links.map((link) => (
            <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl block group"
          >
            <Card className="relative overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out border-b-2 hover:border-b-indigo-500/50 dark:hover:border-b-indigo-400/50 rounded-2xl">
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              
              <CardContent className="p-4 sm:p-5 flex items-center relative min-h-[72px]">
                
                {link.icon && (
                  <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center bg-white/80 dark:bg-black/40 shadow-sm border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-500 z-10 p-[4px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={link.icon}
                      alt={link.title}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                )}
                
                <span className="w-full text-center font-semibold text-[15px] sm:text-base text-neutral-700 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 z-10 pl-10 pr-4 sm:pl-12">
                  {link.title}
                </span>
                
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

              </CardContent>
            </Card>
          </a>
          ))
        )}
      </div>
    </div>
  );
}
