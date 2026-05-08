"use client";

import { ProfileLinks } from '@/components/ProfileLinks';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { RiLoader4Line, RiErrorWarningLine, RiEditLine } from '@remixicon/react';
import { LandingPage } from '@/components/LandingPage';
import { useState, useRef, useEffect } from 'react';

function EditableField({ 
  value, 
  onSave, 
  onValidate,
  isSaving,
  as = "h1",
  className,
  inputClassName,
  placeholder = ""
}: { 
  value: string;
  onSave: (val: string) => Promise<boolean>;
  onValidate?: (val: string) => string | null;
  isSaving: boolean;
  as?: "h1" | "p";
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [localSaving, setLocalSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to the end
      const length = inputRef.current.value.length;
      if ('setSelectionRange' in inputRef.current) {
        (inputRef.current as HTMLInputElement).setSelectionRange(length, length);
      }
    }
  }, [isEditing]);

  const handleSave = async () => {
    const trimmedVal = editValue.trim();
    if (trimmedVal === value) {
      setIsEditing(false);
      setError(null);
      return;
    }

    if (!trimmedVal) {
      setError("값을 입력해주세요.");
      return;
    }

    if (onValidate) {
      const valError = onValidate(trimmedVal);
      if (valError) {
        setError(valError);
        return;
      }
    }

    setLocalSaving(true);
    setError(null);
    try {
      const success = await onSave(trimmedVal);
      if (success) {
        setIsEditing(false);
      }
    } catch (e: any) {
      setError(e.message || "저장에 실패했습니다.");
    } finally {
      setLocalSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
      setError(null);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col items-center w-full relative">
        <div className="relative w-full max-w-[250px]">
          {as === "p" && className?.includes("text-sm") && !className?.includes("font-semibold") ? (
             <textarea
               ref={inputRef as React.RefObject<HTMLTextAreaElement>}
               value={editValue}
               onChange={(e) => {
                 setEditValue(e.target.value);
                 setError(null);
               }}
               onBlur={handleSave}
               onKeyDown={handleKeyDown}
               className={`w-full bg-white/80 dark:bg-neutral-800/90 text-center border-b-2 border-indigo-500 focus:outline-none resize-none py-0.5 px-1 rounded-md shadow-sm ${inputClassName}`}
               rows={1}
               disabled={localSaving || isSaving}
               placeholder={placeholder}
             />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
                setError(null);
              }}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={`w-full bg-white/80 dark:bg-neutral-800/90 text-center border-b-2 border-indigo-500 focus:outline-none py-0.5 px-1 rounded-md shadow-sm ${inputClassName}`}
              disabled={localSaving || isSaving}
              placeholder={placeholder}
            />
          )}
          {(localSaving || isSaving) && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <RiLoader4Line className="w-4 h-4 animate-spin text-indigo-500" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1 flex items-center absolute -bottom-5">
            <RiErrorWarningLine className="w-3 h-3 mr-1" />
            {error}
          </p>
        )}
      </div>
    );
  }

  const Element = as;

  return (
    <Element 
      className={`cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center gap-1.5 group/field ${className}`}
      onClick={() => {
        setEditValue(value);
        setIsEditing(true);
      }}
      title="클릭하여 수정"
    >
      <span>{value || placeholder}</span>
      <RiEditLine className="w-4 h-4 text-neutral-400 opacity-50 group-hover/field:opacity-100 transition-opacity shrink-0" />
    </Element>
  );
}

export default function Page() {
  const { user, loading: authLoading, loginWithGoogle } = useAuth();
  const { profile, loadingProfile, updateProfileData, checkUsernameDuplicate } = useProfile(user);

  const validateUsername = (val: string) => {
    // lowercase letters, numbers, periods
    const regex = /^[a-z0-9.]+$/;
    if (!regex.test(val)) {
      return "소문자, 숫자, 마침표(.)만 사용 가능합니다.";
    }
    if (val.length < 3 || val.length > 30) {
      return "3자 이상 30자 이하로 입력해주세요.";
    }
    return null;
  };

  const handleUpdateDisplayName = async (val: string) => {
    await updateProfileData({ displayName: val });
    return true;
  };

  const handleUpdateUsername = async (val: string) => {
    if (val === profile?.username) return true;
    
    const isDup = await checkUsernameDuplicate(val);
    if (isDup) {
      throw new Error("이미 사용 중인 유저네임입니다.");
    }
    await updateProfileData({ username: val });
    return true;
  };

  const handleUpdateBio = async (val: string) => {
    await updateProfileData({ bio: val });
    return true;
  };

  const loading = authLoading || (user && loadingProfile);

  return (
    <main className="relative min-h-screen flex flex-col items-center selection:bg-primary/30 overflow-hidden font-sans">
      
      {/* Dynamic Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-neutral-950/80 transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-300/30 dark:bg-cyan-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-40 z-10">
          <RiLoader4Line className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
        </div>
      ) : !user ? (
        <LandingPage loginWithGoogle={loginWithGoogle} />
      ) : (
        <div className="w-full max-w-md flex flex-col items-center z-10 py-24 px-6 sm:px-12">
          {/* Profile Section */}
          <div className="group relative flex flex-col items-center mb-10 w-full">
            {/* Avatar Ring Animation */}
            <div className="absolute top-0 w-28 h-28 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-spin blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '5s' }} />
            
            <div className="relative w-28 h-28 rounded-full bg-white dark:bg-neutral-900 mb-5 overflow-hidden ring-4 ring-white/80 dark:ring-neutral-900/80 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.photoURL} alt={profile?.displayName || user.displayName || "Profile"} className="w-full h-full object-cover" />
              ) : (
                <svg className="w-14 h-14 text-neutral-300 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            
            {/* Info */}
            <div className="text-center bg-white/30 dark:bg-black/30 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm w-full top-container flex flex-col items-center gap-1">
              
              {profile && (
                <>
                  <div className="mb-1 w-full relative flex flex-col items-center justify-center min-h-[36px]">
                    <EditableField
                      value={profile.displayName}
                      onSave={handleUpdateDisplayName}
                      isSaving={false}
                      as="h1"
                      className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300"
                      inputClassName="text-2xl font-extrabold text-neutral-900 dark:text-white"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div className="mb-2 w-full relative flex flex-col items-center justify-center min-h-[24px]">
                    <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      <span className="mr-[1px]">@</span>
                      <EditableField
                        value={profile.username}
                        onSave={handleUpdateUsername}
                        onValidate={validateUsername}
                        isSaving={false}
                        as="p"
                        className=""
                        inputClassName="text-sm font-semibold text-indigo-600 dark:text-indigo-400 max-w-[150px]"
                        placeholder="username"
                      />
                    </div>
                  </div>

                  <div className="w-full relative flex flex-col items-center justify-center min-h-[24px]">
                    <EditableField
                      value={profile.bio}
                      onSave={handleUpdateBio}
                      isSaving={false}
                      as="p"
                      className="text-sm font-medium text-neutral-600 dark:text-neutral-400 max-w-[250px]"
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
  );
}
