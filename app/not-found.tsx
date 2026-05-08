import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiHome4Line, RiGhostLine } from "@remixicon/react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden font-sans bg-slate-50 dark:bg-neutral-950">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-6">
        <div className="relative mb-8">
          <RiGhostLine className="w-32 h-32 text-indigo-600/80 dark:text-indigo-400/80 drop-shadow-xl animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/10 dark:bg-white/10 blur-md rounded-full" />
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 mb-4 tracking-tight">
          404
        </h1>
        
        <p className="text-lg sm:text-xl font-semibold text-neutral-600 dark:text-neutral-300 mb-2">
          찾으시는 페이지가 없습니다.
        </p>
        
        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mb-10 max-w-sm">
          존재하지 않는 주소를 입력하셨거나,<br />
          요청하신 페이지의 주소가 변경/삭제되었습니다.
        </p>

        <Link href="/">
          <Button className="h-12 px-8 font-semibold text-base rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none">
            <RiHome4Line className="mr-2 h-5 w-5" />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </main>
  );
}
