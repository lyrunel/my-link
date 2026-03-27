import React from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-yellow-300 font-sans text-black selection:bg-black selection:text-white p-4 sm:p-8 md:p-12 flex flex-col items-center justify-center">
      <main className="w-full max-w-2xl">
        {/* Main Profile Card */}
        <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0_0_#000] relative">
          
          <div className="flex flex-col items-center text-center space-y-6">
            
            {/* Profile Image */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 border-4 border-black overflow-hidden shadow-[4px_4px_0_0_#000] bg-pink-300">
              <Image 
                src="/cat-profile.png" 
                alt="Profile Avatar" 
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Typography */}
            <div className="space-y-4 pt-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
                박준영
              </h1>
              <div className="inline-block bg-blue-400 border-2 border-black px-4 py-2 font-bold transform -rotate-2 text-sm sm:text-base">
                바이브 코딩을 배우고 있는 대학생
              </div>
              <p className="text-base sm:text-lg md:text-xl font-medium mt-4 max-w-md mx-auto leading-relaxed border-t-4 border-black pt-4">
                기술과 디자인의 조화를 탐구합니다. 새로운 것에 도전하고 깨지는 것을 두려워하지 않습니다.
              </p>
            </div>
            
            {/* Links / Interactive Buttons */}
            <div className="w-full space-y-4 pt-6">
              <LinkItem href="#" title="GitHub" subtitle="오픈소스 기여 및 개인 프로젝트" icon="github" color="bg-green-400" />
              <LinkItem href="#" title="블로그" subtitle="개발 지식과 일상 기록" icon="blog" color="bg-orange-400" />
              <LinkItem href="#" title="이력서" subtitle="나의 경험과 기술 스택" icon="document" color="bg-pink-400" />
            </div>

            {/* Footer / Contact */}
            <div className="pt-6 w-full flex justify-center">
              <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 font-bold px-4 py-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors duration-200 shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                <MailIcon />
                <span>contact@example.com</span>
              </a>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}

// Icon Components (Inline)
function LinkItem({ href, title, subtitle, icon, color }: { href: string; title: string; subtitle: string; icon: string; color: string }) {
  return (
    <a
      href={href}
      className={`group flex items-center justify-between border-4 border-black ${color} px-4 py-4 sm:px-6 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all duration-200`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-black bg-white">
          {icon === 'github' && <GithubIcon />}
          {icon === 'blog' && <BlogIcon />}
          {icon === 'document' && <DocumentIcon />}
        </div>
        <div className="text-left">
          <h2 className="text-lg sm:text-xl font-black">{title}</h2>
          <p className="text-xs sm:text-sm font-bold text-gray-900">{subtitle}</p>
        </div>
      </div>

      <div className="text-black group-hover:translate-x-2 transition-transform duration-200">
        <ChevronRightIcon />
      </div>
    </a>
  );
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

