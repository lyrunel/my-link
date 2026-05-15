"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  RiGoogleFill, 
  RiLogoutBoxRLine, 
  RiExternalLinkLine, 
  RiSettings4Line, 
  RiMoonLine, 
  RiSunLine,
  RiBarChartBoxLine
} from "@remixicon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const { profile } = useProfile(user);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-50 flex items-center justify-between px-6 sm:px-12">
      <Link href="/" className="font-extrabold text-xl tracking-tight text-neutral-900 dark:text-white hover:opacity-80 transition-opacity">
        MyLink <span className="text-indigo-600">.</span>
      </Link>

      <div className="flex items-center gap-4">
        {!loading && (
          user ? (
            <>
              {profile?.username && (
                <Link href={`/${profile.username}`} className="hidden sm:inline-flex">
                  <Button className="h-9 px-4 font-semibold text-sm rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border-none">
                    <RiExternalLinkLine className="mr-1.5 h-4 w-4" />
                    내 프로필
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full transition-transform hover:scale-105 active:scale-95">
                {user.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shadow-sm">
                    <span className="text-neutral-500 text-sm font-semibold">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : '?'}
                    </span>
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal py-3 px-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-neutral-900 dark:text-neutral-100">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs leading-none text-neutral-500 dark:text-neutral-400">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <Link href={profile?.username ? `/${profile.username}` : "#"}>
                  <DropdownMenuItem className="cursor-pointer rounded-lg py-2">
                    <RiExternalLinkLine className="mr-2 h-4 w-4" />
                    <span>내 프로필 보기</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/stats">
                  <DropdownMenuItem className="cursor-pointer rounded-lg py-2">
                    <RiBarChartBoxLine className="mr-2 h-4 w-4" />
                    <span>통계 보기</span>
                  </DropdownMenuItem>
                </Link>
                
                {mounted && (
                  <DropdownMenuItem 
                    className="cursor-pointer rounded-lg py-2" 
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? <RiSunLine className="mr-2 h-4 w-4" /> : <RiMoonLine className="mr-2 h-4 w-4" />}
                    <span>{theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}</span>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuItem className="cursor-pointer rounded-lg py-2" disabled>
                  <RiSettings4Line className="mr-2 h-4 w-4" />
                  <span>설정 (준비중)</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer rounded-lg py-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-red-900/30" 
                  onClick={logout}
                >
                  <RiLogoutBoxRLine className="mr-2 h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
            <Button
              onClick={loginWithGoogle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-9 px-4 font-semibold text-sm shadow-sm"
            >
              로그인
            </Button>
          )
        )}
      </div>
    </header>
  );
}
