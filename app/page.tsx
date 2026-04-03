import { dummyLinks } from '@/data/links';
import { Card, CardContent } from '@/components/ui/card';

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
        
        {/* Links List with Glassmorphism */}
        <div className="w-full flex flex-col gap-4">
          {dummyLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 rounded-2xl block group"
            >
              <Card className="relative overflow-hidden bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_8px_40px_rgb(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out border-b-2 hover:border-b-indigo-500/50 dark:hover:border-b-indigo-400/50 rounded-2xl">
                
                {/* Decorative hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/5 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                
                <CardContent className="p-4 sm:p-5 flex items-center relative min-h-[72px]">
                  
                  {/* Glass Icon Bubble */}
                  {link.icon && (
                    <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center bg-white/80 dark:bg-black/40 shadow-sm border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-500 z-10 p-[2px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={link.icon}
                        alt={link.title}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  )}
                  
                  {/* Animated Text */}
                  <span className="w-full text-center font-semibold text-[15px] sm:text-base text-neutral-700 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 z-10 pl-10 pr-4 sm:pl-12">
                    {link.title}
                  </span>
                  
                  {/* Chevron right indicator */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
