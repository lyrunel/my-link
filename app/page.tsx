"use client"

import { ProfileLinks } from "@/components/ProfileLinks"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"
import { RiLoader4Line, RiErrorWarningLine, RiEditLine } from "@remixicon/react"
import { LandingPage } from "@/components/LandingPage"
import { useState, useRef, useEffect } from "react"

function EditableField({
  value,
  onSave,
  onValidate,
  isSaving,
  as = "h1",
  className,
  inputClassName,
  placeholder = "",
}: {
  value: string
  onSave: (val: string) => Promise<boolean>
  onValidate?: (val: string) => string | null
  isSaving: boolean
  as?: "h1" | "p"
  className?: string
  inputClassName?: string
  placeholder?: string
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [error, setError] = useState<string | null>(null)
  const [localSaving, setLocalSaving] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      // Move cursor to the end
      const length = inputRef.current.value.length
      if ("setSelectionRange" in inputRef.current) {
        ;(inputRef.current as HTMLInputElement).setSelectionRange(
          length,
          length
        )
      }
    }
  }, [isEditing])

  const handleSave = async () => {
    const trimmedVal = editValue.trim()
    if (trimmedVal === value) {
      setIsEditing(false)
      setError(null)
      return
    }

    if (!trimmedVal) {
      setError("값을 입력해주세요.")
      return
    }

    if (onValidate) {
      const valError = onValidate(trimmedVal)
      if (valError) {
        setError(valError)
        return
      }
    }

    setLocalSaving(true)
    setError(null)
    try {
      const success = await onSave(trimmedVal)
      if (success) {
        setIsEditing(false)
      }
    } catch (e: any) {
      setError(e.message || "저장에 실패했습니다.")
    } finally {
      setLocalSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSave()
    } else if (e.key === "Escape") {
      setEditValue(value)
      setIsEditing(false)
      setError(null)
    }
  }

  if (isEditing) {
    return (
      <div className="relative flex w-full flex-col items-center">
        <div className="relative w-full max-w-[250px]">
          {as === "p" &&
          className?.includes("text-sm") &&
          !className?.includes("font-semibold") ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                setError(null)
              }}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={`w-full resize-none rounded-md border-b-2 border-indigo-500 bg-white/80 px-1 py-0.5 text-center shadow-sm focus:outline-none dark:bg-neutral-800/90 ${inputClassName}`}
              rows={1}
              disabled={localSaving || isSaving}
              placeholder={placeholder}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value)
                setError(null)
              }}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={`w-full rounded-md border-b-2 border-indigo-500 bg-white/80 px-1 py-0.5 text-center shadow-sm focus:outline-none dark:bg-neutral-800/90 ${inputClassName}`}
              disabled={localSaving || isSaving}
              placeholder={placeholder}
            />
          )}
          {(localSaving || isSaving) && (
            <div className="absolute top-1/2 right-2 -translate-y-1/2">
              <RiLoader4Line className="h-4 w-4 animate-spin text-indigo-500" />
            </div>
          )}
        </div>
        {error && (
          <p className="absolute -bottom-5 mt-1 flex items-center text-xs text-red-500">
            <RiErrorWarningLine className="mr-1 h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    )
  }

  const Element = as

  return (
    <Element
      className={`group/field flex cursor-pointer items-center justify-center gap-1.5 transition-opacity hover:opacity-80 ${className}`}
      onClick={() => {
        setEditValue(value)
        setIsEditing(true)
      }}
      title="클릭하여 수정"
    >
      <span className="inline-block h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{value || placeholder}</span>
      <RiEditLine className="h-4 w-4 shrink-0 text-neutral-400 opacity-0 transition-opacity group-hover/field:opacity-100" />
    </Element>
  )
}

export default function Page() {
  const { user, loading: authLoading, loginWithGoogle } = useAuth()
  const { profile, loadingProfile, updateProfileData } = useProfile(user)

  const handleUpdateDisplayName = async (val: string) => {
    updateProfileData({ displayName: val })
    return true
  }

  const handleUpdateBio = async (val: string) => {
    updateProfileData({ bio: val })
    return true
  }

  const loading = authLoading || (user && loadingProfile)

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden font-sans selection:bg-primary/30">
      {/* Dynamic Animated Background Blobs */}
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

      {loading ? (
        <div className="z-10 flex w-full items-center justify-center py-40">
          <RiLoader4Line className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      ) : !user ? (
        <LandingPage loginWithGoogle={loginWithGoogle} />
      ) : (
        <div className="z-10 flex w-full max-w-lg flex-col items-center px-6 py-24 sm:px-12">
          {/* Profile Section */}
          <div className="group relative mb-10 flex w-full flex-col items-center">
            {/* Avatar Ring Animation */}
            <div
              className="absolute top-0 h-28 w-28 animate-spin rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100"
              style={{ animationDuration: "5s" }}
            />

            <div className="relative mb-5 flex h-28 w-28 transform items-center justify-center overflow-hidden rounded-full bg-white shadow-2xl ring-4 ring-white/80 transition-transform duration-500 group-hover:scale-105 dark:bg-neutral-900 dark:ring-neutral-900/80">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt={profile?.displayName || user.displayName || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <svg
                  className="h-14 w-14 text-neutral-300 dark:text-neutral-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="top-container flex w-full flex-col items-center gap-1 rounded-3xl border border-white/50 bg-white/30 px-6 py-4 text-center shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/30">
              {profile && (
                <>
                  <div className="relative mb-1 flex min-h-[36px] w-full flex-col items-center justify-center">
                    <EditableField
                      value={profile.displayName}
                      onSave={handleUpdateDisplayName}
                      isSaving={false}
                      as="h1"
                      className="bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-white dark:to-neutral-300"
                      inputClassName="text-2xl font-extrabold text-neutral-900 dark:text-white"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div className="relative mb-2 flex min-h-[24px] w-full flex-col items-center justify-center">
                    <div className="mb-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      @{profile.username}
                    </div>
                  </div>

                  <div className="relative flex min-h-[24px] w-full flex-col items-center justify-center">
                    <EditableField
                      value={profile.bio}
                      onSave={handleUpdateBio}
                      isSaving={false}
                      as="p"
                      className="max-w-[250px] text-sm font-medium text-neutral-600 dark:text-neutral-400"
                      inputClassName="text-sm font-medium text-neutral-600 dark:text-neutral-400"
                      placeholder="소개글을 입력하세요"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <ProfileLinks uid={user.uid} />
        </div>
      )}
    </main>
  )
}
