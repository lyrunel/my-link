"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  RiGoogleFill, 
  RiLinksLine, 
  RiEdit2Line, 
  RiMagicLine, 
  RiRocketLine, 
  RiArrowRightLine,
  RiGithubFill,
  RiYoutubeFill,
  RiInstagramLine,
  RiGlobalLine,
  RiCheckLine,
  RiUser3Line,
  RiSmartphoneLine,
  RiCursorLine,
  RiPaletteLine,
  RiContrastLine
} from '@remixicon/react';

// 테마 프리셋 스타일 정의
type ThemeKey = 'indigo' | 'sunset' | 'neon' | 'emerald';

interface ThemePreset {
  bg: string;
  cardBg: string;
  text: string;
  subText: string;
  linkBg: string;
  linkBorder: string;
  linkText: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  name: string;
}

const themes: Record<ThemeKey, ThemePreset> = {
  indigo: {
    bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    cardBg: 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10',
    text: 'text-neutral-900 dark:text-white',
    subText: 'text-neutral-500 dark:text-neutral-400',
    linkBg: 'bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15',
    linkBorder: 'border border-black/5 dark:border-white/5',
    linkText: 'text-neutral-800 dark:text-neutral-200',
    accent: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
    badgeText: 'text-indigo-600 dark:text-indigo-400',
    name: '인디고 브리즈 (기본)'
  },
  sunset: {
    bg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600',
    cardBg: 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10',
    text: 'text-neutral-900 dark:text-white',
    subText: 'text-neutral-500 dark:text-neutral-400',
    linkBg: 'bg-orange-500/10 dark:bg-white/10 hover:bg-orange-500/20 dark:hover:bg-white/15',
    linkBorder: 'border border-orange-500/20 dark:border-white/5',
    linkText: 'text-orange-950 dark:text-orange-100',
    accent: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/50',
    badgeText: 'text-orange-600 dark:text-orange-400',
    name: '선셋 글로우'
  },
  neon: {
    bg: 'bg-gradient-to-br from-neutral-950 via-slate-900 to-zinc-950',
    cardBg: 'bg-black/60 backdrop-blur-xl border border-emerald-500/30',
    text: 'text-emerald-400',
    subText: 'text-zinc-400',
    linkBg: 'bg-emerald-500/10 hover:bg-emerald-500/25',
    linkBorder: 'border border-emerald-500/40',
    linkText: 'text-emerald-300',
    accent: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/40 border border-emerald-500/20',
    badgeText: 'text-emerald-400',
    name: '네온 사이버펑크'
  },
  emerald: {
    bg: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
    cardBg: 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-white/40 dark:border-white/10',
    text: 'text-neutral-900 dark:text-white',
    subText: 'text-neutral-500 dark:text-neutral-400',
    linkBg: 'bg-teal-500/10 dark:bg-white/10 hover:bg-teal-500/20 dark:hover:bg-white/15',
    linkBorder: 'border border-teal-500/20 dark:border-white/5',
    linkText: 'text-teal-950 dark:text-teal-100',
    accent: 'text-teal-600 dark:text-teal-400',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
    badgeText: 'text-teal-600 dark:text-teal-400',
    name: '에메랄드 포레스트'
  }
};

// 직군별 템플릿 프리셋 정의
type PresetKey = 'developer' | 'creator' | 'designer' | 'business';

interface PresetData {
  username: string;
  displayName: string;
  bio: string;
  theme: ThemeKey;
  links: Record<string, boolean>;
}

const presets: Record<PresetKey, PresetData> = {
  developer: {
    username: 'dev_jeong',
    displayName: '정개발 (Full-Stack Developer)',
    bio: '💻 코드로 생각하고 자동화를 사랑하는 개발자입니다. 신기술 학습과 오픈소스 기여를 즐깁니다.',
    theme: 'neon',
    links: { github: true, youtube: false, blog: true, instagram: false }
  },
  creator: {
    username: 'travel_log',
    displayName: '크리에이터 지니',
    bio: '✈️ 세상을 누비는 여행 유튜버. 매주 목요일 오후 8시에 힐링 가득한 세계 여행 영상으로 만나요!',
    theme: 'sunset',
    links: { github: false, youtube: true, blog: false, instagram: true }
  },
  designer: {
    username: 'pixel_art',
    displayName: '소피아 (UI/UX Designer)',
    bio: '🎨 픽셀 단위의 완벽함을 넘어서, 사용자의 시선과 마음을 사로잡는 아름답고 유용한 경험을 디자인합니다.',
    theme: 'emerald',
    links: { github: false, youtube: false, blog: true, instagram: true }
  },
  business: {
    username: 'mylink_official',
    displayName: '마이링크 (MyLink)',
    bio: '✨ 복잡하고 흩어져 있는 SNS와 포트폴리오를 단 하나의 깔끔한 프로필 링크로 묶어 전달해 보세요!',
    theme: 'indigo',
    links: { github: true, youtube: true, blog: true, instagram: true }
  }
};

export function LandingPage({ loginWithGoogle }: { loginWithGoogle: () => void }) {
  // 상태 관리
  const [username, setUsername] = useState('my-awesome-link');
  const [displayName, setDisplayName] = useState('홍길동 (Creator)');
  const [bio, setBio] = useState('여기에 한 줄 소개를 적어보세요. 아래의 미니 플레이그라운드에서 실시간으로 수정할 수 있습니다!');
  const [themePreset, setThemePreset] = useState<ThemeKey>('indigo');
  const [enabledLinks, setEnabledLinks] = useState<Record<string, boolean>>({
    github: true,
    youtube: true,
    blog: true,
    instagram: false
  });
  const [activeTab, setActiveTab] = useState<PresetKey>('business');

  // 3D 틸트 관련 상태
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const mockupRef = useRef<HTMLDivElement>(null);

  // 직군별 프리셋 선택 핸들러
  const handlePresetSelect = (key: PresetKey) => {
    setActiveTab(key);
    const preset = presets[key];
    setUsername(preset.username);
    setDisplayName(preset.displayName);
    setBio(preset.bio);
    setThemePreset(preset.theme);
    setEnabledLinks(preset.links);
  };

  // 3D 틸트 호버 모션 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return;
    const card = mockupRef.current;
    const box = card.getBoundingClientRect();
    
    // 마우스가 카드 중앙에서 얼마나 멀어졌는지 계산 (-0.5 ~ 0.5)
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    
    // 회전각도 설정 (최대 12도 정도로 부드럽게)
    setRotate({
      x: -y * 12,
      y: x * 12
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // 링크 토글 함수
  const toggleLink = (key: string) => {
    setEnabledLinks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 구글 연동 회원가입 시뮬레이션
  const handleGetStarted = () => {
    loginWithGoogle();
  };

  const activeTheme = themes[themePreset];

  return (
    <div className="w-full flex flex-col items-center z-10 pt-16 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* 1. 히어로 섹션 (Hero Section) */}
      <section className="w-full max-w-5xl flex flex-col items-center text-center mt-12 sm:mt-16 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {/* 화사한 태그 뱃지 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm animate-pulse">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
          ✨ 무료로 1초 만에 만드는 나만의 프로필 페이지
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.15]">
          단 하나의 링크로 <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">당신을 다채롭게 표현하세요</span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl font-medium px-4 leading-relaxed">
          복잡한 과정 없이 링크 몇 개만 추가하면 화려한 포트폴리오 프로필이 완성됩니다.
          보이는 그대로 클릭하여 편집하는 <strong>인라인 세이브</strong>와 <strong>자동 파비콘 추출</strong>로 개성 넘치는 나만의 페이지를 배포하세요.
        </p>
        
        {/* 즉석 닉네임 입력 폼 */}
        <div className="w-full max-w-md px-4 pt-2">
          <div className="p-2 rounded-2xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-[0_10px_35px_-10px_rgba(79,70,229,0.15)] focus-within:shadow-[0_12px_40px_-10px_rgba(79,70,229,0.25)] dark:focus-within:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center gap-1.5 focus-within:border-indigo-500/50 dark:focus-within:border-indigo-500/40">
            <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 pl-3 select-none">mylink.com/</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ''))}
              placeholder="your-name"
              className="flex-1 bg-transparent text-sm sm:text-base font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none min-w-0"
              maxLength={20}
            />
            <Button
              onClick={handleGetStarted}
              className="h-10 sm:h-12 px-5 sm:px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              시작하기
            </Button>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-2 text-center">
            지금 원하는 닉네임을 입력해 아래 목업의 변화를 실시간으로 확인해 보세요!
          </p>
        </div>
      </section>

      {/* 2. 인터랙티브 플레이그라운드 & 3D 목업 */}
      <section className="w-full max-w-6xl mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* 왼쪽: 커스터마이징 컨트롤러 (5열) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8 order-2 lg:order-1">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sm:space-y-8">
            
            {/* 플레이그라운드 헤더 */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                <RiPaletteLine className="w-3.5 h-3.5" />
                실시간 체험존
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                어떻게 보일까요?
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                아래 옵션을 수정하면 오른쪽의 디바이스 뷰가 마법처럼 실시간으로 변경됩니다.
              </p>
            </div>

            {/* 직군 프리셋 탭 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                추천 테마 프리셋
              </label>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {(Object.keys(presets) as PresetKey[]).map((key) => {
                  const isActive = activeTab === key;
                  const label = 
                    key === 'developer' ? '💻 개발자' :
                    key === 'creator' ? '🎥 크리에이터' :
                    key === 'designer' ? '🎨 디자이너' : '✨ 기본 비즈니스';
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handlePresetSelect(key)}
                      className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10'
                          : 'bg-white/60 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 인풋 폼 조작 */}
            <div className="space-y-4 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                  프로필 이름
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                    <RiUser3Line className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/80 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 text-sm font-semibold rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                    placeholder="이름이나 닉네임을 적어보세요"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                  소개글
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/80 dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800 text-sm font-medium rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none h-20 leading-relaxed"
                  placeholder="짧고 강렬한 소개 멘트를 적어보세요"
                  maxLength={100}
                />
              </div>
            </div>

            {/* 테마 프리셋 토글 */}
            <div className="space-y-2 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                배경 및 무드 테마
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(themes) as ThemeKey[]).map((tKey) => {
                  const activePreset = themes[tKey];
                  const isThemeActive = themePreset === tKey;
                  return (
                    <button
                      key={tKey}
                      onClick={() => setThemePreset(tKey)}
                      className={`relative aspect-video rounded-xl overflow-hidden transition-all ${activePreset.bg} ${
                        isThemeActive ? 'ring-4 ring-indigo-500 scale-[1.03] shadow-lg' : 'opacity-80 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                      title={activePreset.name}
                    >
                      <span className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        {isThemeActive && <RiCheckLine className="w-5 h-5 text-white" />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="text-[11px] text-neutral-400 dark:text-neutral-500 flex justify-between">
                <span>현재 테마: <strong>{activeTheme.name}</strong></span>
              </div>
            </div>

            {/* 링크 온/오프 토글 */}
            <div className="space-y-2.5 pt-2 border-t border-neutral-200/50 dark:border-neutral-800/50">
              <label className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">
                공유 링크 스위치
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleLink('github')}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    enabledLinks.github 
                      ? 'bg-neutral-900/5 dark:bg-white/5 border-neutral-900/20 dark:border-white/20 text-neutral-900 dark:text-white' 
                      : 'bg-transparent border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiGithubFill className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
                    GitHub
                  </span>
                  <div className={`w-2 h-2 rounded-full ${enabledLinks.github ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                </button>

                <button
                  onClick={() => toggleLink('youtube')}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    enabledLinks.youtube 
                      ? 'bg-neutral-900/5 dark:bg-white/5 border-neutral-900/20 dark:border-white/20 text-neutral-900 dark:text-white' 
                      : 'bg-transparent border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiYoutubeFill className="w-4 h-4 text-red-500" />
                    YouTube
                  </span>
                  <div className={`w-2 h-2 rounded-full ${enabledLinks.youtube ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                </button>

                <button
                  onClick={() => toggleLink('blog')}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    enabledLinks.blog 
                      ? 'bg-neutral-900/5 dark:bg-white/5 border-neutral-900/20 dark:border-white/20 text-neutral-900 dark:text-white' 
                      : 'bg-transparent border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiGlobalLine className="w-4 h-4 text-indigo-500" />
                    Tech Blog
                  </span>
                  <div className={`w-2 h-2 rounded-full ${enabledLinks.blog ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                </button>

                <button
                  onClick={() => toggleLink('instagram')}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    enabledLinks.instagram 
                      ? 'bg-neutral-900/5 dark:bg-white/5 border-neutral-900/20 dark:border-white/20 text-neutral-900 dark:text-white' 
                      : 'bg-transparent border-dashed border-neutral-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiInstagramLine className="w-4 h-4 text-pink-500" />
                    Instagram
                  </span>
                  <div className={`w-2 h-2 rounded-full ${enabledLinks.instagram ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 오른쪽: 모바일 기기 모양의 3D 목업 뷰 (7열) */}
        <div 
          className="lg:col-span-7 flex justify-center items-center py-6 order-1 lg:order-2 perspective-[1500px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 3D 틸트 컨테이너 */}
          <div
            ref={mockupRef}
            className="relative w-full max-w-[340px] aspect-[9/18] rounded-[48px] p-3.5 bg-neutral-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-[6px] border-neutral-800 flex flex-col items-center justify-between overflow-hidden transition-transform duration-200 select-none will-change-transform"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: rotate.x === 0 && rotate.y === 0 ? 'transform 0.5s ease-out' : 'none'
            }}
          >
            {/* 노치 및 스피커 (아이폰 스타일) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-900 rounded-b-2xl z-30 flex items-center justify-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <div className="w-12 h-1.5 rounded-full bg-neutral-800" />
            </div>

            {/* 디바이스 내부 스크린 */}
            <div className={`w-full h-full rounded-[38px] ${activeTheme.bg} p-6 pt-10 pb-6 flex flex-col items-center overflow-y-auto relative transition-all duration-700`}>
              
              {/* 은은한 백그라운드 오버레이 효과 */}
              <div className="absolute inset-0 bg-black/5 dark:bg-black/10 z-0 pointer-events-none" />

              {/* 프로필 이미지 (가상) */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-white dark:bg-neutral-800 shadow-md flex items-center justify-center p-0.5 mt-4 group">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 animate-spin blur-sm absolute inset-0 opacity-40" style={{ animationDuration: '4s' }} />
                <div className="w-full h-full rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden relative z-10 flex items-center justify-center font-bold text-lg text-neutral-600 dark:text-neutral-300">
                  {displayName ? displayName.charAt(0) : 'U'}
                </div>
              </div>

              {/* 유저 정보 카드 (현재 테마의 카드 스타일 적용) */}
              <div className={`w-full mt-5 p-4 rounded-2xl ${activeTheme.cardBg} text-center space-y-1.5 relative z-10 shadow-sm transition-all duration-500`}>
                <h3 className={`text-base font-extrabold tracking-tight ${activeTheme.text} transition-colors line-clamp-1`}>
                  {displayName || '이름 없음'}
                </h3>
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${activeTheme.badgeBg} ${activeTheme.badgeText} transition-all`}>
                  @{username || 'nickname'}
                </span>
                <p className={`text-xs font-medium leading-relaxed ${activeTheme.subText} transition-colors line-clamp-3`}>
                  {bio || '한 줄 소개가 비어 있습니다.'}
                </p>
              </div>

              {/* 링크 리스트 */}
              <div className="w-full flex-1 mt-6 space-y-3 relative z-10">
                {enabledLinks.github && (
                  <div className={`w-full h-12 px-4 rounded-xl ${activeTheme.linkBg} ${activeTheme.linkBorder} shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3 transition-all duration-300`}>
                    <RiGithubFill className={`w-5 h-5 shrink-0 text-neutral-800 dark:text-neutral-200`} />
                    <span className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}>GitHub 저장소</span>
                    <RiArrowRightLine className="w-3.5 h-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {enabledLinks.youtube && (
                  <div className={`w-full h-12 px-4 rounded-xl ${activeTheme.linkBg} ${activeTheme.linkBorder} shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3 transition-all duration-300`}>
                    <RiYoutubeFill className="w-5 h-5 shrink-0 text-red-500" />
                    <span className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}>YouTube 채널</span>
                    <RiArrowRightLine className="w-3.5 h-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {enabledLinks.blog && (
                  <div className={`w-full h-12 px-4 rounded-xl ${activeTheme.linkBg} ${activeTheme.linkBorder} shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3 transition-all duration-300`}>
                    <RiGlobalLine className="w-5 h-5 shrink-0 text-indigo-500" />
                    <span className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}>기술 블로그</span>
                    <RiArrowRightLine className="w-3.5 h-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {enabledLinks.instagram && (
                  <div className={`w-full h-12 px-4 rounded-xl ${activeTheme.linkBg} ${activeTheme.linkBorder} shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3 transition-all duration-300`}>
                    <RiInstagramLine className="w-5 h-5 shrink-0 text-pink-500" />
                    <span className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}>인스타그램</span>
                    <RiArrowRightLine className="w-3.5 h-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {!Object.values(enabledLinks).some(Boolean) && (
                  <div className="w-full h-32 rounded-2xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-xs text-white/50 font-medium">활성화된 링크가 없습니다.<br />왼쪽 패널에서 스위치를 켜보세요!</p>
                  </div>
                )}
              </div>

              {/* 하단 브랜드 로고 */}
              <div className="w-full text-center py-2 relative z-10">
                <span className="text-[10px] text-white/45 font-bold tracking-widest uppercase">MyLink .</span>
              </div>

            </div>

            {/* 홈 인디케이터 바 (아이폰 스타일) */}
            <div className="absolute bottom-1 w-28 h-1 bg-neutral-800 rounded-full z-30" />
          </div>
        </div>

      </section>

      {/* 3. 동작 원리 가이드 (How it Works) */}
      <section className="w-full max-w-6xl mt-32 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm">
            🚀 초간편 가이드
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            마이링크를 시작하는 3가지 과정
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
            가장 스마트하게 나만의 브랜드를 모으고 공유하는 방법, 지금 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          <div className="p-8 rounded-3xl bg-white/40 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col space-y-4 hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg flex items-center justify-center shadow-inner">
              01
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">구글 계정 1초 연동</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              복잡하고 귀찮은 정보 입력 없이, 구글 로그인 클릭 한 번으로 프로필 이미지와 계정이 마이링크에 바로 연동됩니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/40 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col space-y-4 hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-extrabold text-lg flex items-center justify-center shadow-inner">
              02
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">실시간 클릭 편집</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              별도의 설정 관리 창으로 갈 필요가 없습니다. 모바일 뷰 프로필에서 원하는 부분을 클릭하고 입력 후 Enter나 Blur만 하면 바로 자동 저장됩니다.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/40 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col space-y-4 hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-extrabold text-lg flex items-center justify-center shadow-inner">
              03
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">자동 파비콘 & 배포</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              원하는 링크의 URL만 입력하세요. 마이링크가 해당 서비스의 고해상도 파비콘 아이콘을 찾아 멋지게 배치해 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 핵심 강점 쇼케이스 (기존 피처 카드 고도화) */}
      <section id="features" className="w-full max-w-6xl mt-28 sm:mt-32 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm">
            ✨ 강력한 기능
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            마이링크만의 특별한 매력
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
          <FeatureCard 
            icon={<RiEdit2Line className="w-6 h-6 text-indigo-500" />}
            title="직관적인 인라인 편집"
            description="복잡한 설정 화면으로 이동할 필요 없이, 보여지는 그대로 클릭하여 바로 수정하세요. 실시간으로 완벽하게 반영됩니다."
            delay="delay-[100ms]"
          />
          <FeatureCard 
            icon={<RiMagicLine className="w-6 h-6 text-purple-500" />}
            title="자동 아이콘 추출"
            description="웹사이트 주소만 입력하세요. 구글 파비콘 API를 통하여 웹사이트의 고해상도 아이콘을 찾아 멋지게 자동 배치해 드립니다."
            delay="delay-[200ms]"
          />
          <FeatureCard 
            icon={<RiLinksLine className="w-6 h-6 text-pink-500" />}
            title="무제한 링크 공유"
            description="SNS, 블로그, 포트폴리오, 유튜브 채널 등 당신이 온라인상에 소유한 모든 발자취를 하나의 링크 안에 깔끔하게 모으세요."
            delay="delay-[300ms]"
          />
        </div>
      </section>

      {/* 5. 강력한 하단 CTA 배너 */}
      <section className="w-full max-w-5xl mt-28 sm:mt-32">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl">
          {/* 백그라운드 블러 장식 구체 */}
          <div className="absolute top-[-20%] left-[-10%] w-[250px] h-[250px] bg-white/20 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[300px] h-[300px] bg-indigo-400/30 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              지금 바로 당신만의 <br className="sm:hidden" /> 링크를 만들어보세요
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-medium max-w-lg leading-relaxed">
              더 이상 복잡한 웹사이트 빌더로 시간 낭비하지 마세요. 단 1분이면 전 세계에 하나뿐인 멋진 프로필 페이지가 탄생합니다.
            </p>
            <div className="pt-2 w-full sm:w-auto">
              <Button
                onClick={handleGetStarted}
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-white hover:bg-neutral-50 text-indigo-600 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] border-none"
              >
                <RiGoogleFill className="w-5 h-5 mr-2 text-indigo-600" />
                구글 계정으로 무료 시작하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 푸터 */}
      <footer className="w-full max-w-6xl mt-28 border-t border-neutral-200/50 dark:border-neutral-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-neutral-700 dark:text-neutral-300">MyLink</span>
          <span className="text-indigo-600 font-extrabold">.</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">이용약관</a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">개인정보처리방침</a>
        </div>
      </footer>
      
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <div className={`p-8 rounded-3xl bg-white/40 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(79,70,229,0.08)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 fill-mode-both ${delay}`}>
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-900/80 shadow-md border border-neutral-200/20 dark:border-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm font-medium">
        {description}
      </p>
    </div>
  );
}
