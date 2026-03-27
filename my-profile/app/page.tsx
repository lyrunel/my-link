import React from 'react';

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 selection:bg-indigo-500/30">
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 -z-10 bg-zinc-950">
        <div className="absolute top-0 -left-1/4 w-full h-full bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 -right-1/4 w-full h-full bg-fuchsia-500/10 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="w-full max-w-xl group">
        {/* Glassmorphism Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-indigo-500/10">

          {/* Subtle top reflection */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="flex flex-col items-center text-center space-y-8">

            {/* Avatar Section with Glow */}
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500 hover:duration-200"></div>
              {/* Avatar container */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-white/10 bg-zinc-900 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-fuchsia-400 text-4xl font-bold shadow-xl">
                박
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
                박준영
              </h1>
              <p className="text-base sm:text-lg font-medium text-zinc-400 max-w-sm mx-auto leading-relaxed">
                바이브 코딩을 배우고 있는 대학생입니다. <br />기술과 디자인의 조화를 탐구합니다.
              </p>
            </div>

            {/* Links / Interactive Buttons */}
            <div className="w-full space-y-4 pt-4">
              <LinkItem href="#" title="GitHub" subtitle="오픈소스 기여 및 개인 프로젝트" icon="github" />
              <LinkItem href="#" title="블로그" subtitle="개발 지식과 일상 기록" icon="blog" />
              <LinkItem href="#" title="이력서" subtitle="나의 경험과 기술 스택" icon="document" />
            </div>

            {/* Footer / Contact */}
            <div className="pt-8 border-t border-white/10 w-full flex justify-center">
              <a href="mailto:contact@example.com" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
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
function LinkItem({ href, title, subtitle, icon }: { href: string; title: string; subtitle: string; icon: string }) {
  return (
    <a
      href={href}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/5 px-6 py-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
          {icon === 'github' && <GithubIcon />}
          {icon === 'blog' && <BlogIcon />}
          {icon === 'document' && <DocumentIcon />}
        </div>
        <div className="text-left">
          <h2 className="text-sm font-semibold text-zinc-100 sm:text-base">{title}</h2>
          <p className="text-xs text-zinc-400 sm:text-sm">{subtitle}</p>
        </div>
      </div>

      <div className="text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-300">
        <ChevronRightIcon />
      </div>
    </a>
  );
}

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);

