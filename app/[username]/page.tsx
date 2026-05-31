"use client"

import { usePublicProfile } from "@/hooks/usePublicProfile"
import { useProfileLinks } from "@/hooks/useProfileLinks"
import { notFound, useParams } from "next/navigation"
import { RiLoader4Line } from "@remixicon/react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"
import { LinkItem } from "@/data/links"
import { doc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase"

function PublicLinkItemCard({ link, uid }: { link: LinkItem; uid: string }) {
  const handleClick = () => {
    if (!uid || !link.id) return
    try {
      const linkRef = doc(db, `users/${uid}/links`, link.id)
      updateDoc(linkRef, {
        clickCount: increment(1),
      }).catch((error) =>
        console.error("Failed to increment click count:", error)
      )
    } catch (error) {
      console.error("Error setting up click count increment:", error)
    }
  }

  return (
    <div className="group relative block w-full">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block w-full rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50"
      >
        <Card className="relative overflow-hidden rounded-2xl border border-b-2 border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-b-indigo-500/50 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] dark:hover:border-b-indigo-400/50 dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)]">
          <div className="absolute inset-0 -translate-x-[100%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%] dark:via-white/5" />

          <CardContent className="relative flex min-h-[68px] items-center px-6 py-3 sm:px-8 sm:py-4">
            {link.icon && (
              <div className="absolute top-1/2 left-5 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center transition-transform duration-500 sm:left-6 sm:h-10 sm:w-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={link.icon}
                  alt={link.title}
                  className="h-full w-full rounded-md object-contain"
                />
              </div>
            )}

            <span className="z-10 w-full px-14 text-center text-[15px] font-semibold text-neutral-700 transition-colors duration-300 sm:px-16 sm:text-base dark:text-neutral-200">
              {link.title}
            </span>
          </CardContent>
        </Card>
      </a>
    </div>
  )
}

export default function PublicProfilePage() {
  const params = useParams()
  const username = params.username as string

  const { profile, isLoading: isProfileLoading } = usePublicProfile(username)
  const { links, isLoading: isLinksLoading } = useProfileLinks(
    profile?.uid || ""
  )

  useEffect(() => {
    if (!isProfileLoading && profile === null) {
      notFound()
    }
  }, [isProfileLoading, profile])

  if (isProfileLoading || !profile) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center font-sans">
        <RiLoader4Line className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden font-sans selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 transition-colors duration-500 dark:bg-neutral-950/80">
        <div
          className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-indigo-400/30 mix-blend-multiply blur-[120px] dark:bg-indigo-600/20 dark:mix-blend-lighten"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] animate-pulse rounded-full bg-purple-400/30 mix-blend-multiply blur-[100px] dark:bg-purple-600/20 dark:mix-blend-lighten"
          style={{ animationDuration: "10s" }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] h-[600px] w-[600px] animate-pulse rounded-full bg-cyan-300/30 mix-blend-multiply blur-[120px] dark:bg-cyan-900/20 dark:mix-blend-lighten"
          style={{ animationDuration: "12s" }}
        />
      </div>

      <div className="z-10 flex w-full max-w-lg flex-col items-center px-6 py-24 sm:px-12">
        <div className="group relative mb-10 flex w-full flex-col items-center">
          <div
            className="absolute top-0 h-28 w-28 animate-spin rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100"
            style={{ animationDuration: "5s" }}
          />

          <div className="relative mb-5 flex h-28 w-28 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-white/80 transition-transform duration-500 group-hover:scale-105 dark:bg-neutral-900 dark:ring-neutral-900/80">
            {profile.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photoURL}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-4xl font-bold text-neutral-500 uppercase dark:bg-neutral-800">
                {profile.displayName ? profile.displayName.charAt(0) : "?"}
              </div>
            )}
          </div>

          <div className="flex w-full flex-col items-center gap-1 rounded-3xl border border-white/50 bg-white/30 px-6 py-4 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/30">
            <h1 className="mb-1 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-white dark:to-neutral-300">
              {profile.displayName}
            </h1>
            <p className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              @{profile.username}
            </p>
            {profile.bio && (
              <p className="mx-auto max-w-[250px] text-sm font-medium break-words whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          {isLinksLoading ? (
            <div className="flex items-center justify-center py-10">
              <RiLoader4Line className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
            </div>
          ) : links.length === 0 ? (
            <div className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
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
  )
}
