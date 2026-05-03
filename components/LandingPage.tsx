import { Button } from '@/components/ui/button';
import { RiGoogleFill, RiLinksLine, RiEdit2Line, RiMagicLine, RiRocketLine, RiArrowRightLine } from '@remixicon/react';

export function LandingPage({ loginWithGoogle }: { loginWithGoogle: () => void }) {
  return (
    <div className="w-full flex flex-col items-center z-10 pt-20 pb-32 px-6 sm:px-12">
      
      {/* Hero Section */}
      <section className="w-full max-w-5xl flex flex-col items-center text-center mt-12 sm:mt-20 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">

        
        <h1 className="text-5xl sm:text-7xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
          단 하나의 링크로 <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">당신을 표현하세요</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-medium">
          복잡한 과정 없이 링크 몇 개만 추가하면 멋진 프로필 페이지가 완성됩니다. 크리에이터, 개발자, 포트폴리오 등 어디서나 활용할 수 있는 나만의 공간을 만들어보세요.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            onClick={loginWithGoogle}
            className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_12px_40px_rgb(79,70,229,0.4)] transition-all hover:-translate-y-1"
          >
            <RiGoogleFill className="w-6 h-6 mr-2" />
            구글로 시작하기
          </Button>

        </div>
      </section>

      {/* Floating Mockup / Visual Element */}
      <section className="relative w-full max-w-3xl mt-24 mb-12 perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-neutral-950 dark:via-transparent z-20 h-full w-full pointer-events-none" />
        <div className="w-full aspect-[16/10] bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-t-3xl border-t-2 border-l-2 border-r-2 border-white/60 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 ease-out fill-mode-both" style={{ transform: 'rotateX(5deg) scale(0.95)' }}>
          {/* Mockup Header */}
          <div className="h-12 w-full border-b border-black/5 dark:border-white/10 flex items-center px-6 gap-2 bg-white/50 dark:bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 flex-1 h-6 bg-black/5 dark:bg-white/10 rounded-md max-w-xs flex items-center px-3">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">mylink.com/my-awesome-portfolio</span>
            </div>
          </div>
          {/* Mockup Body */}
          <div className="flex-1 p-8 flex flex-col items-center gap-6 relative">
             <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 shadow-lg border-4 border-white dark:border-neutral-900" />
             <div className="space-y-2 text-center">
               <div className="h-6 w-40 bg-neutral-800 dark:bg-white/90 rounded-md mx-auto" />
               <div className="h-4 w-60 bg-neutral-400 dark:bg-white/50 rounded-md mx-auto" />
             </div>
             
             <div className="w-full max-w-md space-y-4 mt-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className={`h-16 w-full rounded-2xl bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5 flex items-center px-4 gap-4 animate-in fade-in slide-in-from-bottom-4 fill-mode-both`} style={{ animationDelay: `${500 + i * 200}ms` }}>
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/20" />
                    <div className="flex-1 h-4 bg-neutral-200 dark:bg-white/30 rounded-md" />
                    <div className="w-8 h-4" />
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={<RiEdit2Line className="w-8 h-8 text-indigo-500" />}
          title="직관적인 인라인 편집"
          description="복잡한 설정 화면으로 이동할 필요 없이, 보여지는 그대로 클릭하여 바로 수정하세요. 실시간으로 반영됩니다."
          delay="delay-[200ms]"
        />
        <FeatureCard 
          icon={<RiMagicLine className="w-8 h-8 text-purple-500" />}
          title="자동 아이콘 추출"
          description="웹사이트 주소만 입력하세요. 마이링크가 알아서 해당 웹사이트의 고해상도 아이콘을 찾아 멋지게 배치해 드립니다."
          delay="delay-[400ms]"
        />
        <FeatureCard 
          icon={<RiLinksLine className="w-8 h-8 text-pink-500" />}
          title="무제한 링크 공유"
          description="SNS, 블로그, 포트폴리오, 유튜브 채널 등 당신이 공유하고 싶은 모든 것을 하나의 깔끔한 페이지에 담으세요."
          delay="delay-[600ms]"
        />
      </section>
      
      {/* Footer */}
      <footer className="w-full max-w-6xl mt-32 border-t border-black/10 dark:border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 dark:text-neutral-400 text-sm font-medium">
        <p>© {new Date().getFullYear()} MyLink. All rights reserved.</p>

      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <div className={`p-8 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${delay}`}>
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
