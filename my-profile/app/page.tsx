export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
      <main className="flex flex-col items-center gap-8 max-w-2xl text-center">
        {/* Profile Image / Initials Placeholder */}
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
          박
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            박준영
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
          </p>
        </div>

        <div className="pt-4">
          <button className="px-6 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-colors dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200">
            더 알아보기
          </button>
        </div>
      </main>
    </div>
  );
}
