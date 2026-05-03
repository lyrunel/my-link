"use client";

import { ProfileLinks } from '@/components/ProfileLinks';
import { useAuth } from '@/hooks/useAuth';
import { RiGoogleFill, RiLoader4Line } from '@remixicon/react';
import { Button } from '@/components/ui/button';

export default function Page() {
  const { user, loading, loginWithGoogle } = useAuth();

  return (
    <main className="relative min-h-screen flex flex-col items-center py-24 px-6 sm:px-12 selection:bg-primary/30 overflow-hidden font-sans">
      
      {/* Dynamic Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-neutral-950/80 transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-300/30 dark:bg-cyan-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="w-full max-w-md flex flex-col items-center z-10">
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RiLoader4Line className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : !user ? (
          <div className="flex flex-col items-center text-center mt-20 space-y-6">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              나만의 마이링크 만들기
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm">
              여러 개의 링크를 하나의 페이지에 모아서 관리하고 사람들과 공유해보세요.
            </p>
            <Button
              onClick={loginWithGoogle}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-8 font-semibold text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <RiGoogleFill className="w-5 h-5 mr-2" />
              구글로 시작하기
            </Button>
          </div>
        ) : (
          <>
            {/* Profile Section */}
            <div className="group relative flex flex-col items-center mb-10 w-full">
              {/* Avatar Ring Animation */}
              <div className="absolute top-0 w-28 h-28 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-spin blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '5s' }} />
              
              <div className="relative w-28 h-28 rounded-full bg-white dark:bg-neutral-900 mb-5 overflow-hidden ring-4 ring-white/80 dark:ring-neutral-900/80 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.photoURL} alt={user.displayName || "Profile"} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-14 h-14 text-neutral-300 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              
              {/* Info */}
              <div className="text-center bg-white/30 dark:bg-black/30 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm w-full top-container">
                <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 mb-1">
                  {user.displayName ? user.displayName : 'User'}
                </h1>
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  @{user.email ? user.email.split('@')[0] : 'username'}
                </p>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  크리에이터 & 포트폴리오 스페이스 ✨
                </p>
              </div>
            </div>
            
            <ProfileLinks uid={user.uid} />
          </>
        )}
      </div>
    </main>
  );
}
