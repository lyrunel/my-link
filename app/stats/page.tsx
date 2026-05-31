"use client"

import { useAuth } from "@/hooks/useAuth"
import { useProfileLinks } from "@/hooks/useProfileLinks"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import {
  RiLoader4Line,
  RiArrowLeftLine,
  RiEyeLine,
  RiFireLine,
  RiLinkM,
  RiExternalLinkLine,
} from "@remixicon/react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function StatsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/")
    }
  }, [user, authLoading, router])

  const { links, isLoading: linksLoading } = useProfileLinks(user?.uid || "")

  // 차트 렌더링을 위한 데이터 (최신순을 뒤집어 등록순/자연스러운 순서로 표시)
  const chartData = useMemo(() => {
    return links
      .map((link) => ({
        title: link.title || "제목 없음",
        clicks: link.clickCount || 0,
      }))
      .reverse()
  }, [links])

  // 상단 요약 데이터 계산
  const totalClicks = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.clicks, 0)
  }, [chartData])

  const mostPopularLink = useMemo(() => {
    if (links.length === 0) return null
    return [...links].sort(
      (a, b) => (b.clickCount || 0) - (a.clickCount || 0)
    )[0]
  }, [links])

  const activeLinksCount = useMemo(() => {
    return links.filter((l) => l.is_active !== false).length
  }, [links])

  // 상세 리스트 렌더링을 위한 데이터 (클릭수 기준 내림차순 정렬 및 점유율 계산)
  const detailedLinks = useMemo(() => {
    return [...links]
      .sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0))
      .map((link) => {
        const count = link.clickCount || 0
        const percentage = totalClicks > 0 ? (count / totalClicks) * 100 : 0
        return { ...link, clickCount: count, percentage }
      })
  }, [links, totalClicks])

  if (authLoading || (!user && !authLoading)) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center font-sans">
        <RiLoader4Line className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden font-sans selection:bg-primary/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 transition-colors duration-500 dark:bg-neutral-950/80">
        <div
          className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-indigo-400/30 mix-blend-multiply blur-[120px] dark:bg-indigo-600/20 dark:mix-blend-lighten"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] animate-pulse rounded-full bg-purple-400/30 mix-blend-multiply blur-[100px] dark:bg-purple-600/20 dark:mix-blend-lighten"
          style={{ animationDuration: "10s" }}
        />
      </div>

      <div className="z-10 flex w-full max-w-4xl flex-col px-6 pt-24 pb-16 sm:px-12">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/50 backdrop-blur-md transition-colors hover:bg-white/80 dark:bg-black/30 dark:hover:bg-black/50"
            >
              <RiArrowLeftLine className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            통계 대시보드
          </h1>
        </div>

        {linksLoading ? (
          <div className="flex items-center justify-center py-20">
            <RiLoader4Line className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Card className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    총 클릭수
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                      <RiEyeLine className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-3xl font-extrabold text-neutral-900 lg:text-4xl dark:text-white">
                      {totalClicks.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    최고 인기 링크
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/50">
                      <RiFireLine className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex w-full flex-col overflow-hidden">
                      <span className="truncate text-lg font-extrabold text-neutral-900 dark:text-white">
                        {mostPopularLink ? mostPopularLink.title : "-"}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        {mostPopularLink
                          ? `${(mostPopularLink.clickCount || 0).toLocaleString()} 클릭`
                          : "데이터 없음"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                    게시 중인 링크
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                      <RiLinkM className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-3xl font-extrabold text-neutral-900 lg:text-4xl dark:text-white">
                      {activeLinksCount.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Middle Chart */}
            <Card className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                  전체 클릭 분석
                </CardTitle>
                <CardDescription className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  최근 등록된 링크순으로 클릭수를 비교합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] pt-4">
                {chartData.length > 0 ? (
                  <ChartContainer
                    config={{
                      clicks: {
                        label: "클릭수",
                        color: "#4f46e5", // indigo-600
                      },
                    }}
                    className="h-full min-h-[300px] w-full"
                  >
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, left: -20, right: 0, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(156, 163, 175, 0.2)"
                      />
                      <XAxis
                        dataKey="title"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={12}
                        className="text-xs font-semibold"
                        tick={{ fill: "currentColor", opacity: 0.7 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        tickFormatter={(value) => `${value}`}
                        className="text-xs font-semibold"
                        tick={{ fill: "currentColor", opacity: 0.7 }}
                      />
                      <ChartTooltip
                        cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
                        content={<ChartTooltipContent />}
                      />
                      <Bar
                        dataKey="clicks"
                        fill="var(--color-clicks)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={60}
                      />
                    </BarChart>
                  </ChartContainer>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-500 dark:text-neutral-400">
                    <RiEyeLine className="h-8 w-8 opacity-50" />
                    <span className="text-sm font-medium">
                      아직 등록된 링크가 없습니다.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bottom Detailed List */}
            <Card className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                  상세 분석 현황
                </CardTitle>
                <CardDescription className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  개별 링크의 클릭 점유율과 트래픽 성과를 확인합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                <div className="flex flex-col">
                  {detailedLinks.length > 0 ? (
                    detailedLinks.map((link, index) => (
                      <div
                        key={link.id}
                        className="group flex items-center justify-between gap-4 border-b border-neutral-200/50 p-4 transition-colors last:border-0 hover:bg-white/50 sm:p-5 dark:border-neutral-800/50 dark:hover:bg-neutral-800/30"
                      >
                        {/* 랭킹 / 아이콘 / 제목 */}
                        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                          <span className="w-4 shrink-0 text-center text-sm font-bold text-neutral-400">
                            {index + 1}
                          </span>
                          {link.icon ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={link.icon}
                              alt=""
                              className="h-10 w-10 shrink-0 rounded-md border border-neutral-200/50 bg-white object-contain dark:border-neutral-700/50"
                            />
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800">
                              <RiLinkM className="h-5 w-5 text-neutral-400" />
                            </div>
                          )}
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {link.title}
                            </span>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 flex w-fit items-center gap-1 truncate text-xs text-neutral-500 hover:text-indigo-600 hover:underline dark:text-neutral-400 dark:hover:text-indigo-400"
                            >
                              {link.url}
                              <RiExternalLinkLine className="h-3 w-3 shrink-0" />
                            </a>
                          </div>
                        </div>

                        {/* 클릭 수 (크게 강조) */}
                        <div className="flex shrink-0 items-center">
                          <div className="flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1.5 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                            <RiEyeLine className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-base font-bold tracking-tight">
                              {link.clickCount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-sm font-medium text-neutral-500">
                      표시할 상세 내역이 없습니다.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
