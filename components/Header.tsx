"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { RiGoogleFill, RiLogoutBoxRLine } from "@remixicon/react";

export function Header() {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50 flex items-center justify-between px-6 sm:px-12">
      <div className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white">
        MyLink <span className="text-indigo-600">.</span>
      </div>

      <div className="flex items-center gap-4">
        {!loading && (
          user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user.photoURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800"
                  />
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-xl"
              >
                <RiLogoutBoxRLine className="w-4 h-4 mr-1.5" />
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              onClick={loginWithGoogle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-9 px-4 font-semibold text-sm shadow-sm"
            >
              <RiGoogleFill className="w-4 h-4 mr-2" />
              구글로 시작하기
            </Button>
          )
        )}
      </div>
    </header>
  );
}
