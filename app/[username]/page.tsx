"use client";

import { usePublicProfile } from "@/hooks/usePublicProfile";
import { useProfileLinks } from "@/hooks/useProfileLinks";
import { notFound, useParams } from "next/navigation";
import { RiLoader4Line } from "@remixicon/react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { LinkItem } from "@/data/links";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

function PublicLinkItemCard({ link, uid }: { link: LinkItem; uid: string }) {
  const handleClick = () => {
    if (!uid || !link.id) return;
    try {
      const linkRef = doc(db, `users/${uid}/links`, link.id);
      updateDoc(linkRef, {
        clickCount: increment(1)
      }).catch((error) => console.error("Failed to increment click count:", error));
    } catch (error) {
      console.error("Error setting up click count increment:", error);
    }
  };

  return (
    <div className="relative group w-full block">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl block"
      >
        <Card className="relative overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out border-b-2 hover:border-b-indigo-500/50 dark:hover:border-b-indigo-400/50 rounded-2xl">
          
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          
          <CardContent className="py-3 px-6 sm:py-4 sm:px-8 flex items-center relative min-h-[68px]">
            {link.icon && (
              <div className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-500 z-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={link.icon}
                  alt={link.title}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            )}
            
            <span className="w-full text-center font-semibold text-[15px] sm:text-base text-neutral-700 dark:text-neutral-200 transition-colors duration-300 z-10 px-14 sm:px-16">
              {link.title}
            </span>
            
          </CardContent>
        </Card>
      </a>
    </div>
  );
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const { profile, isLoading: isProfileLoading } = usePublicProfile(username);
  const { links, isLoading: isLinksLoading } = useProfileLinks(profile?.uid || "");

  useEffect(() => {
    if (!isProfileLoading && profile === null) {
      notFound();
    }
  }, [isProfileLoading, profile]);

  if (isProfileLoading || !profile) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center font-sans">
        <RiLoader4Line className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center selection:bg-primary/30 overflow-hidden font-sans">
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-neutral-950/80 transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-300/30 dark:bg-cyan-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="w-full max-w-lg flex flex-col items-center z-10 py-24 px-6 sm:px-12">
        <div className="group relative flex flex-col items-center mb-10 w-full">
          <div className="absolute top-0 w-28 h-28 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-spin blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '5s' }} />
          
          <div className="relative w-28 h-28 rounded-full bg-white dark:bg-neutral-900 mb-5 overflow-hidden ring-4 ring-white/80 dark:ring-neutral-900/80 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
            {profile.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-4xl text-neutral-500 font-bold uppercase">
                {profile.displayName ? profile.displayName.charAt(0) : "?"}
              </div>
            )}
          </div>
          
          <div className="text-center bg-white/30 dark:bg-black/30 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm w-full flex flex-col items-center gap-1">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 mb-1">
              {profile.displayName}
            </h1>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              @{profile.username}
            </p>
            {profile.bio && (
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 max-w-[250px] mx-auto break-words whitespace-pre-wrap">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          {isLinksLoading ? (
            <div className="flex justify-center items-center py-10">
              <RiLoader4Line className="animate-spin w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
          ) : links.length === 0 ? (
            <div className="text-center py-10 text-sm text-neutral-500 dark:text-neutral-400">
              추가된 링크가 없습니다.
            </div>
          ) : (
            links.map((link) => (
              <PublicLinkItemCard key={link.id} link={link} uid={profile.uid} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
