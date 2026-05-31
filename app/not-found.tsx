import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RiHome4Line, RiGhostLine } from "@remixicon/react"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-50 font-sans dark:bg-neutral-950">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div
          className="absolute top-[20%] left-[20%] h-[400px] w-[400px] animate-pulse rounded-full bg-indigo-400/20 mix-blend-multiply blur-[100px] dark:bg-indigo-600/10 dark:mix-blend-lighten"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="absolute right-[20%] bottom-[20%] h-[400px] w-[400px] animate-pulse rounded-full bg-purple-400/20 mix-blend-multiply blur-[100px] dark:bg-purple-600/10 dark:mix-blend-lighten"
          style={{ animationDuration: "8s" }}
        />
      </div>

      <div className="z-10 flex flex-col items-center px-6 text-center">
        <div className="relative mb-8">
          <RiGhostLine
            className="h-32 w-32 animate-bounce text-indigo-600/80 drop-shadow-xl dark:text-indigo-400/80"
            style={{ animationDuration: "3s" }}
          />
          <div className="absolute -bottom-4 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-black/10 blur-md dark:bg-white/10" />
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-7xl dark:from-white dark:to-neutral-400">
          404
        </h1>

        <p className="mb-2 text-lg font-semibold text-neutral-600 sm:text-xl dark:text-neutral-300">
          찾으시는 페이지가 없습니다.
        </p>

        <p className="mb-10 max-w-sm text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경/삭제되었습니다.
        </p>

        <Link href="/">
          <Button className="h-12 rounded-2xl border-none bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl">
            <RiHome4Line className="mr-2 h-5 w-5" />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </main>
  )
}
