import { ProfileLinks } from '@/components/ProfileLinks';

export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col items-center py-20 px-6 sm:px-12 selection:bg-primary/30 overflow-hidden font-sans">
      
      {/* Dynamic Animated Background Blobs */}
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-neutral-950/80 transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-300/30 dark:bg-cyan-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="w-full max-w-md flex flex-col items-center z-10">
        
        {/* Profile Section */}
        <div className="group relative flex flex-col items-center mb-10 w-full">
          {/* Avatar Ring Animation */}
          <div className="absolute top-0 w-28 h-28 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-spin blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDuration: '5s' }} />
          
          <div className="relative w-28 h-28 rounded-full bg-white dark:bg-neutral-900 mb-5 overflow-hidden ring-4 ring-white/80 dark:ring-neutral-900/80 shadow-2xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
            <svg
              className="w-14 h-14 text-neutral-300 dark:text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          {/* Info */}
          <div className="text-center bg-white/30 dark:bg-black/30 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-sm w-full top-container">
            <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-300 mb-1">
              @my-profile
            </h1>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              크리에이터 & 포트폴리오 스페이스 ✨
            </p>
          </div>
        </div>
        
        <ProfileLinks />
      </div>
    </main>
  );
}
