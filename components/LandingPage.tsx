"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
  RiContrastLine,
} from "@remixicon/react"

// 테마 프리셋 스타일 정의
type ThemeKey = "indigo" | "sunset" | "neon" | "emerald"

interface ThemePreset {
  bg: string
  cardBg: string
  text: string
  subText: string
  linkBg: string
  linkBorder: string
  linkText: string
  accent: string
  badgeBg: string
  badgeText: string
  name: string
}

const themes: Record<ThemeKey, ThemePreset> = {
  indigo: {
    bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    cardBg:
      "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10",
    text: "text-neutral-900 dark:text-white",
    subText: "text-neutral-500 dark:text-neutral-400",
    linkBg:
      "bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15",
    linkBorder: "border border-black/5 dark:border-white/5",
    linkText: "text-neutral-800 dark:text-neutral-200",
    accent: "text-indigo-600 dark:text-indigo-400",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/50",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    name: "인디고 브리즈 (기본)",
  },
  sunset: {
    bg: "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600",
    cardBg:
      "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/40 dark:border-white/10",
    text: "text-neutral-900 dark:text-white",
    subText: "text-neutral-500 dark:text-neutral-400",
    linkBg:
      "bg-orange-500/10 dark:bg-white/10 hover:bg-orange-500/20 dark:hover:bg-white/15",
    linkBorder: "border border-orange-500/20 dark:border-white/5",
    linkText: "text-orange-950 dark:text-orange-100",
    accent: "text-rose-600 dark:text-rose-400",
    badgeBg: "bg-orange-50 dark:bg-orange-950/50",
    badgeText: "text-orange-600 dark:text-orange-400",
    name: "선셋 글로우",
  },
  neon: {
    bg: "bg-gradient-to-br from-neutral-950 via-slate-900 to-zinc-950",
    cardBg: "bg-black/60 backdrop-blur-xl border border-emerald-500/30",
    text: "text-emerald-400",
    subText: "text-zinc-400",
    linkBg: "bg-emerald-500/10 hover:bg-emerald-500/25",
    linkBorder: "border border-emerald-500/40",
    linkText: "text-emerald-300",
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-950/40 border border-emerald-500/20",
    badgeText: "text-emerald-400",
    name: "네온 사이버펑크",
  },
  emerald: {
    bg: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
    cardBg:
      "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-white/40 dark:border-white/10",
    text: "text-neutral-900 dark:text-white",
    subText: "text-neutral-500 dark:text-neutral-400",
    linkBg:
      "bg-teal-500/10 dark:bg-white/10 hover:bg-teal-500/20 dark:hover:bg-white/15",
    linkBorder: "border border-teal-500/20 dark:border-white/5",
    linkText: "text-teal-950 dark:text-teal-100",
    accent: "text-teal-600 dark:text-teal-400",
    badgeBg: "bg-teal-50 dark:bg-teal-950/50",
    badgeText: "text-teal-600 dark:text-teal-400",
    name: "에메랄드 포레스트",
  },
}

// 직군별 템플릿 프리셋 정의
type PresetKey = "developer" | "creator" | "designer" | "business"

interface PresetData {
  username: string
  displayName: string
  bio: string
  theme: ThemeKey
  links: Record<string, boolean>
}

const presets: Record<PresetKey, PresetData> = {
  developer: {
    username: "dev_jeong",
    displayName: "정개발 (Full-Stack Developer)",
    bio: "💻 코드로 생각하고 자동화를 사랑하는 개발자입니다. 신기술 학습과 오픈소스 기여를 즐깁니다.",
    theme: "neon",
    links: { github: true, youtube: false, blog: true, instagram: false },
  },
  creator: {
    username: "travel_log",
    displayName: "크리에이터 지니",
    bio: "✈️ 세상을 누비는 여행 유튜버. 매주 목요일 오후 8시에 힐링 가득한 세계 여행 영상으로 만나요!",
    theme: "sunset",
    links: { github: false, youtube: true, blog: false, instagram: true },
  },
  designer: {
    username: "pixel_art",
    displayName: "소피아 (UI/UX Designer)",
    bio: "🎨 픽셀 단위의 완벽함을 넘어서, 사용자의 시선과 마음을 사로잡는 아름답고 유용한 경험을 디자인합니다.",
    theme: "emerald",
    links: { github: false, youtube: false, blog: true, instagram: true },
  },
  business: {
    username: "mylink_official",
    displayName: "마이링크 (MyLink)",
    bio: "✨ 복잡하고 흩어져 있는 SNS와 포트폴리오를 단 하나의 깔끔한 프로필 링크로 묶어 전달해 보세요!",
    theme: "indigo",
    links: { github: true, youtube: true, blog: true, instagram: true },
  },
}

export function LandingPage({
  loginWithGoogle,
}: {
  loginWithGoogle: () => void
}) {
  // 상태 관리
  const [username, setUsername] = useState("my-awesome-link")
  const [displayName, setDisplayName] = useState("홍길동 (Creator)")
  const [bio, setBio] = useState(
    "여기에 한 줄 소개를 적어보세요. 아래의 미니 플레이그라운드에서 실시간으로 수정할 수 있습니다!"
  )
  const [themePreset, setThemePreset] = useState<ThemeKey>("indigo")
  const [enabledLinks, setEnabledLinks] = useState<Record<string, boolean>>({
    github: true,
    youtube: true,
    blog: true,
    instagram: false,
  })
  const [activeTab, setActiveTab] = useState<PresetKey>("business")

  // 3D 틸트 관련 상태
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const mockupRef = useRef<HTMLDivElement>(null)

  // 직군별 프리셋 선택 핸들러
  const handlePresetSelect = (key: PresetKey) => {
    setActiveTab(key)
    const preset = presets[key]
    setUsername(preset.username)
    setDisplayName(preset.displayName)
    setBio(preset.bio)
    setThemePreset(preset.theme)
    setEnabledLinks(preset.links)
  }

  // 3D 틸트 호버 모션 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current) return
    const card = mockupRef.current
    const box = card.getBoundingClientRect()

    // 마우스가 카드 중앙에서 얼마나 멀어졌는지 계산 (-0.5 ~ 0.5)
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5

    // 회전각도 설정 (최대 12도 정도로 부드럽게)
    setRotate({
      x: -y * 12,
      y: x * 12,
    })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  // 링크 토글 함수
  const toggleLink = (key: string) => {
    setEnabledLinks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // 구글 연동 회원가입 시뮬레이션
  const handleGetStarted = () => {
    loginWithGoogle()
  }

  const activeTheme = themes[themePreset]

  return (
    <div className="z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-16 pb-24 sm:px-8">
      {/* 1. 히어로 섹션 (Hero Section) */}
      <section className="mt-12 flex w-full max-w-5xl animate-in flex-col items-center space-y-6 text-center duration-1000 ease-out fade-in slide-in-from-bottom-8 sm:mt-16 sm:space-y-8">
        {/* 화사한 태그 뱃지 */}
        <div className="inline-flex animate-pulse items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm sm:text-sm dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-400">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500" />✨ 무료로
          1초 만에 만드는 나만의 프로필 페이지
        </div>

        <h1 className="text-4xl leading-[1.15] font-extrabold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl dark:text-white">
          단 하나의 링크로 <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            당신을 다채롭게 표현하세요
          </span>
        </h1>

        <p className="max-w-3xl px-4 text-base leading-relaxed font-medium text-neutral-600 sm:text-lg lg:text-xl dark:text-neutral-400">
          복잡한 과정 없이 링크 몇 개만 추가하면 화려한 포트폴리오 프로필이
          완성됩니다. 보이는 그대로 클릭하여 편집하는{" "}
          <strong>인라인 세이브</strong>와 <strong>자동 파비콘 추출</strong>로
          개성 넘치는 나만의 페이지를 배포하세요.
        </p>

        {/* 즉석 닉네임 입력 폼 */}
        <div className="w-full max-w-md px-4 pt-2">
          <div className="flex items-center gap-1.5 rounded-2xl border border-neutral-200 bg-white/70 p-2 shadow-[0_10px_35px_-10px_rgba(79,70,229,0.15)] backdrop-blur-xl transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-[0_12px_40px_-10px_rgba(79,70,229,0.25)] dark:border-neutral-800 dark:bg-neutral-900/60 dark:focus-within:border-indigo-500/40 dark:focus-within:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.5)]">
            <span className="pl-3 text-sm font-semibold text-neutral-400 select-none dark:text-neutral-500">
              my-link-olive.vercel.app/
            </span>
            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, "")
                )
              }
              placeholder="your-name"
              className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none sm:text-base dark:text-white"
              maxLength={20}
            />
            <Button
              onClick={handleGetStarted}
              className="h-10 shrink-0 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.02] hover:bg-indigo-700 active:scale-[0.98] sm:h-12 sm:px-6"
            >
              시작하기
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-neutral-400 dark:text-neutral-500">
            지금 원하는 닉네임을 입력해 아래 목업의 변화를 실시간으로 확인해
            보세요!
          </p>
        </div>
      </section>

      {/* 2. 인터랙티브 플레이그라운드 & 3D 목업 */}
      <section className="mt-20 grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-12">
        {/* 왼쪽: 커스터마이징 컨트롤러 (5열) */}
        <div className="order-2 space-y-6 sm:space-y-8 lg:order-1 lg:col-span-5">
          <div className="space-y-6 rounded-3xl border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl sm:space-y-8 sm:p-8 dark:border-white/10 dark:bg-neutral-900/30">
            {/* 플레이그라운드 헤더 */}
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <RiPaletteLine className="h-3.5 w-3.5" />
                실시간 체험존
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                어떻게 보일까요?
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                아래 옵션을 수정하면 오른쪽의 디바이스 뷰가 마법처럼 실시간으로
                변경됩니다.
              </p>
            </div>

            {/* 직군 프리셋 탭 */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                추천 테마 프리셋
              </label>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {(Object.keys(presets) as PresetKey[]).map((key) => {
                  const isActive = activeTab === key
                  const label =
                    key === "developer"
                      ? "💻 개발자"
                      : key === "creator"
                        ? "🎥 크리에이터"
                        : key === "designer"
                          ? "🎨 디자이너"
                          : "✨ 기본 비즈니스"

                  return (
                    <button
                      key={key}
                      onClick={() => handlePresetSelect(key)}
                      className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all sm:text-sm ${
                        isActive
                          ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                          : "border-neutral-200 bg-white/60 text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-800/40 dark:text-neutral-400 dark:hover:bg-neutral-800/80"
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 인풋 폼 조작 */}
            <div className="space-y-4 border-t border-neutral-200/50 pt-2 dark:border-neutral-800/50">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                  프로필 이름
                </label>
                <div className="relative">
                  <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
                    <RiUser3Line className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-xl border border-neutral-200 bg-white/80 py-2.5 pr-4 pl-10 text-sm font-semibold text-neutral-900 transition-colors focus:border-indigo-500/50 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white"
                    placeholder="이름이나 닉네임을 적어보세요"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                  소개글
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="h-20 w-full resize-none rounded-xl border border-neutral-200 bg-white/80 px-4 py-2.5 text-sm leading-relaxed font-medium text-neutral-900 transition-colors focus:border-indigo-500/50 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white"
                  placeholder="짧고 강렬한 소개 멘트를 적어보세요"
                  maxLength={100}
                />
              </div>
            </div>

            {/* 테마 프리셋 토글 */}
            <div className="space-y-2 border-t border-neutral-200/50 pt-2 dark:border-neutral-800/50">
              <label className="block text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                배경 및 무드 테마
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(themes) as ThemeKey[]).map((tKey) => {
                  const activePreset = themes[tKey]
                  const isThemeActive = themePreset === tKey
                  return (
                    <button
                      key={tKey}
                      onClick={() => setThemePreset(tKey)}
                      className={`relative aspect-video overflow-hidden rounded-xl transition-all ${activePreset.bg} ${
                        isThemeActive
                          ? "scale-[1.03] shadow-lg ring-4 ring-indigo-500"
                          : "opacity-80 hover:scale-[1.02] hover:opacity-100"
                      }`}
                      title={activePreset.name}
                    >
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        {isThemeActive && (
                          <RiCheckLine className="h-5 w-5 text-white" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
              <div className="flex justify-between text-[11px] text-neutral-400 dark:text-neutral-500">
                <span>
                  현재 테마: <strong>{activeTheme.name}</strong>
                </span>
              </div>
            </div>

            {/* 링크 온/오프 토글 */}
            <div className="space-y-2.5 border-t border-neutral-200/50 pt-2 dark:border-neutral-800/50">
              <label className="block text-xs font-bold tracking-wider text-neutral-400 uppercase dark:text-neutral-500">
                공유 링크 스위치
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleLink("github")}
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs font-bold transition-all sm:text-sm ${
                    enabledLinks.github
                      ? "border-neutral-900/20 bg-neutral-900/5 text-neutral-900 dark:border-white/20 dark:bg-white/5 dark:text-white"
                      : "border-dashed border-neutral-200 bg-transparent text-neutral-400 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiGithubFill className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
                    GitHub
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${enabledLinks.github ? "animate-pulse bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  />
                </button>

                <button
                  onClick={() => toggleLink("youtube")}
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs font-bold transition-all sm:text-sm ${
                    enabledLinks.youtube
                      ? "border-neutral-900/20 bg-neutral-900/5 text-neutral-900 dark:border-white/20 dark:bg-white/5 dark:text-white"
                      : "border-dashed border-neutral-200 bg-transparent text-neutral-400 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiYoutubeFill className="h-4 w-4 text-red-500" />
                    YouTube
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${enabledLinks.youtube ? "animate-pulse bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  />
                </button>

                <button
                  onClick={() => toggleLink("blog")}
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs font-bold transition-all sm:text-sm ${
                    enabledLinks.blog
                      ? "border-neutral-900/20 bg-neutral-900/5 text-neutral-900 dark:border-white/20 dark:bg-white/5 dark:text-white"
                      : "border-dashed border-neutral-200 bg-transparent text-neutral-400 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiGlobalLine className="h-4 w-4 text-indigo-500" />
                    Tech Blog
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${enabledLinks.blog ? "animate-pulse bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  />
                </button>

                <button
                  onClick={() => toggleLink("instagram")}
                  className={`flex items-center justify-between rounded-xl border p-3 text-xs font-bold transition-all sm:text-sm ${
                    enabledLinks.instagram
                      ? "border-neutral-900/20 bg-neutral-900/5 text-neutral-900 dark:border-white/20 dark:bg-white/5 dark:text-white"
                      : "border-dashed border-neutral-200 bg-transparent text-neutral-400 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RiInstagramLine className="h-4 w-4 text-pink-500" />
                    Instagram
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${enabledLinks.instagram ? "animate-pulse bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 모바일 기기 모양의 3D 목업 뷰 (7열) */}
        <div
          className="order-1 flex items-center justify-center py-6 perspective-[1500px] lg:order-2 lg:col-span-7"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 3D 틸트 컨테이너 */}
          <div
            ref={mockupRef}
            className="relative flex aspect-[9/18] w-full max-w-[340px] flex-col items-center justify-between overflow-hidden rounded-[48px] border-[6px] border-neutral-800 bg-neutral-900 p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] transition-transform duration-200 will-change-transform select-none dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition:
                rotate.x === 0 && rotate.y === 0
                  ? "transform 0.5s ease-out"
                  : "none",
            }}
          >
            {/* 노치 및 스피커 (아이폰 스타일) */}
            <div className="absolute top-0 left-1/2 z-30 flex h-6 w-28 -translate-x-1/2 items-center justify-center gap-1 rounded-b-2xl bg-neutral-900">
              <div className="h-1.5 w-1.5 rounded-full bg-neutral-800" />
              <div className="h-1.5 w-12 rounded-full bg-neutral-800" />
            </div>

            {/* 디바이스 내부 스크린 */}
            <div
              className={`h-full w-full rounded-[38px] ${activeTheme.bg} relative flex flex-col items-center overflow-y-auto p-6 pt-10 pb-6 transition-all duration-700`}
            >
              {/* 은은한 백그라운드 오버레이 효과 */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-black/5 dark:bg-black/10" />

              {/* 프로필 이미지 (가상) */}
              <div className="group relative z-10 mt-4 flex h-20 w-20 items-center justify-center rounded-full bg-white p-0.5 shadow-md dark:bg-neutral-800">
                <div
                  className="absolute inset-0 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 opacity-40 blur-sm"
                  style={{ animationDuration: "4s" }}
                />
                <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-100 text-lg font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
                  {displayName ? displayName.charAt(0) : "U"}
                </div>
              </div>

              {/* 유저 정보 카드 (현재 테마의 카드 스타일 적용) */}
              <div
                className={`mt-5 w-full rounded-2xl p-4 ${activeTheme.cardBg} relative z-10 space-y-1.5 text-center shadow-sm transition-all duration-500`}
              >
                <h3
                  className={`text-base font-extrabold tracking-tight ${activeTheme.text} line-clamp-1 transition-colors`}
                >
                  {displayName || "이름 없음"}
                </h3>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${activeTheme.badgeBg} ${activeTheme.badgeText} transition-all`}
                >
                  @{username || "nickname"}
                </span>
                <p
                  className={`text-xs leading-relaxed font-medium ${activeTheme.subText} line-clamp-3 transition-colors`}
                >
                  {bio || "한 줄 소개가 비어 있습니다."}
                </p>
              </div>

              {/* 링크 리스트 */}
              <div className="relative z-10 mt-6 w-full flex-1 space-y-3">
                {enabledLinks.github && (
                  <div
                    className={`h-12 w-full rounded-xl px-4 ${activeTheme.linkBg} ${activeTheme.linkBorder} flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300`}
                  >
                    <RiGithubFill
                      className={`h-5 w-5 shrink-0 text-neutral-800 dark:text-neutral-200`}
                    />
                    <span
                      className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}
                    >
                      GitHub 저장소
                    </span>
                    <RiArrowRightLine className="h-3.5 w-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {enabledLinks.youtube && (
                  <div
                    className={`h-12 w-full rounded-xl px-4 ${activeTheme.linkBg} ${activeTheme.linkBorder} flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300`}
                  >
                    <RiYoutubeFill className="h-5 w-5 shrink-0 text-red-500" />
                    <span
                      className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}
                    >
                      YouTube 채널
                    </span>
                    <RiArrowRightLine className="h-3.5 w-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {enabledLinks.blog && (
                  <div
                    className={`h-12 w-full rounded-xl px-4 ${activeTheme.linkBg} ${activeTheme.linkBorder} flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300`}
                  >
                    <RiGlobalLine className="h-5 w-5 shrink-0 text-indigo-500" />
                    <span
                      className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}
                    >
                      기술 블로그
                    </span>
                    <RiArrowRightLine className="h-3.5 w-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {enabledLinks.instagram && (
                  <div
                    className={`h-12 w-full rounded-xl px-4 ${activeTheme.linkBg} ${activeTheme.linkBorder} flex items-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300`}
                  >
                    <RiInstagramLine className="h-5 w-5 shrink-0 text-pink-500" />
                    <span
                      className={`text-xs font-semibold ${activeTheme.linkText} flex-1 truncate`}
                    >
                      인스타그램
                    </span>
                    <RiArrowRightLine className="h-3.5 w-3.5 text-neutral-400 opacity-60" />
                  </div>
                )}

                {!Object.values(enabledLinks).some(Boolean) && (
                  <div className="flex h-32 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/20 p-4 text-center">
                    <p className="text-xs font-medium text-white/50">
                      활성화된 링크가 없습니다.
                      <br />
                      왼쪽 패널에서 스위치를 켜보세요!
                    </p>
                  </div>
                )}
              </div>

              {/* 하단 브랜드 로고 */}
              <div className="relative z-10 w-full py-2 text-center">
                <span className="text-[10px] font-bold tracking-widest text-white/45 uppercase">
                  MyLink .
                </span>
              </div>
            </div>

            {/* 홈 인디케이터 바 (아이폰 스타일) */}
            <div className="absolute bottom-1 z-30 h-1 w-28 rounded-full bg-neutral-800" />
          </div>
        </div>
      </section>

      {/* 3. 동작 원리 가이드 (How it Works) */}
      <section className="mt-32 w-full max-w-6xl space-y-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-400">
            🚀 초간편 가이드
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            마이링크를 시작하는 3가지 과정
          </h2>
          <p className="mx-auto max-w-xl text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
            가장 스마트하게 나만의 브랜드를 모으고 공유하는 방법, 지금
            확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3 lg:gap-8">
          <div className="flex flex-col space-y-4 rounded-3xl border border-white/60 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 dark:border-white/10 dark:bg-neutral-900/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-lg font-extrabold text-indigo-600 shadow-inner dark:bg-indigo-500/20 dark:text-indigo-400">
              01
            </div>
            <h3 className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-white">
              구글 계정 1초 연동
            </h3>
            <p className="text-sm leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
              복잡하고 귀찮은 정보 입력 없이, 구글 로그인 클릭 한 번으로 프로필
              이미지와 계정이 마이링크에 바로 연동됩니다.
            </p>
          </div>

          <div className="flex flex-col space-y-4 rounded-3xl border border-white/60 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 dark:border-white/10 dark:bg-neutral-900/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-lg font-extrabold text-purple-600 shadow-inner dark:bg-purple-500/20 dark:text-purple-400">
              02
            </div>
            <h3 className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-white">
              실시간 클릭 편집
            </h3>
            <p className="text-sm leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
              별도의 설정 관리 창으로 갈 필요가 없습니다. 모바일 뷰 프로필에서
              원하는 부분을 클릭하고 입력 후 Enter나 Blur만 하면 바로 자동
              저장됩니다.
            </p>
          </div>

          <div className="flex flex-col space-y-4 rounded-3xl border border-white/60 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 dark:border-white/10 dark:bg-neutral-900/30">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-lg font-extrabold text-pink-600 shadow-inner dark:bg-pink-500/20 dark:text-pink-400">
              03
            </div>
            <h3 className="text-lg font-bold text-neutral-900 sm:text-xl dark:text-white">
              자동 파비콘 & 배포
            </h3>
            <p className="text-sm leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
              원하는 링크의 URL만 입력하세요. 마이링크가 해당 서비스의 고해상도
              파비콘 아이콘을 찾아 멋지게 배치해 드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 핵심 강점 쇼케이스 (기존 피처 카드 고도화) */}
      <section
        id="features"
        className="mt-28 w-full max-w-6xl space-y-12 sm:mt-32"
      >
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm dark:border-indigo-900/50 dark:bg-indigo-950/60 dark:text-indigo-400">
            ✨ 강력한 기능
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            마이링크만의 특별한 매력
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-3 lg:gap-8">
          <FeatureCard
            icon={<RiEdit2Line className="h-6 w-6 text-indigo-500" />}
            title="직관적인 인라인 편집"
            description="복잡한 설정 화면으로 이동할 필요 없이, 보여지는 그대로 클릭하여 바로 수정하세요. 실시간으로 완벽하게 반영됩니다."
            delay="delay-[100ms]"
          />
          <FeatureCard
            icon={<RiMagicLine className="h-6 w-6 text-purple-500" />}
            title="자동 아이콘 추출"
            description="웹사이트 주소만 입력하세요. 구글 파비콘 API를 통하여 웹사이트의 고해상도 아이콘을 찾아 멋지게 자동 배치해 드립니다."
            delay="delay-[200ms]"
          />
          <FeatureCard
            icon={<RiLinksLine className="h-6 w-6 text-pink-500" />}
            title="무제한 링크 공유"
            description="SNS, 블로그, 포트폴리오, 유튜브 채널 등 당신이 온라인상에 소유한 모든 발자취를 하나의 링크 안에 깔끔하게 모으세요."
            delay="delay-[300ms]"
          />
        </div>
      </section>

      {/* 5. 강력한 하단 CTA 배너 */}
      <section className="mt-28 w-full max-w-5xl sm:mt-32">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-8 text-center text-white shadow-2xl sm:p-12 lg:p-16">
          {/* 백그라운드 블러 장식 구체 */}
          <div className="pointer-events-none absolute top-[-20%] left-[-10%] h-[250px] w-[250px] rounded-full bg-white/20 blur-[60px]" />
          <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-indigo-400/30 blur-[80px]" />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              지금 바로 당신만의 <br className="sm:hidden" /> 링크를
              만들어보세요
            </h2>
            <p className="max-w-lg text-sm leading-relaxed font-medium text-white/90 sm:text-base">
              더 이상 복잡한 웹사이트 빌더로 시간 낭비하지 마세요. 단 1분이면 전
              세계에 하나뿐인 멋진 프로필 페이지가 탄생합니다.
            </p>
            <div className="w-full pt-2 sm:w-auto">
              <Button
                onClick={handleGetStarted}
                className="h-14 w-full rounded-2xl border-none bg-white px-8 text-lg font-bold text-indigo-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-xl active:scale-[0.98] sm:w-auto"
              >
                <RiGoogleFill className="mr-2 h-5 w-5 text-indigo-600" />
                구글 계정으로 무료 시작하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 푸터 */}
      <footer className="mt-28 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-neutral-200/50 pt-8 text-xs font-medium text-neutral-500 sm:text-sm md:flex-row dark:border-neutral-800/50 dark:text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-neutral-700 dark:text-neutral-300">
            MyLink
          </span>
          <span className="font-extrabold text-indigo-600">.</span>
          <span>© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a
            href="#"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            이용약관
          </a>
          <a
            href="#"
            className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            개인정보처리방침
          </a>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: string
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <div
      className={`animate-in rounded-3xl border border-white/60 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl transition-all duration-300 fill-mode-both fade-in slide-in-from-bottom-8 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(79,70,229,0.08)] dark:border-white/10 dark:bg-neutral-900/30 ${delay}`}
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200/20 bg-white shadow-md dark:border-white/5 dark:bg-neutral-900/80">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed font-medium text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  )
}
