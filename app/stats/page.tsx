"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProfileLinks } from "@/hooks/useProfileLinks";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { RiLoader4Line, RiArrowLeftLine, RiEyeLine } from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export default function StatsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const { links, isLoading: linksLoading } = useProfileLinks(user?.uid || "");

  const chartData = useMemo(() => {
    return links.map((link) => ({
      title: link.title || "제목 없음",
      clicks: link.clickCount || 0,
    })).reverse(); // 최신순 정렬을 역순(등록순)으로 변경하여 차트 상에서 자연스럽게 보이게 함
  }, [links]);

  const totalClicks = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.clicks, 0);
  }, [chartData]);

  if (authLoading || (!user && !authLoading)) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center font-sans">
        <RiLoader4Line className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center selection:bg-primary/30 overflow-hidden font-sans">
      <div className="fixed inset-0 -z-10 w-full h-full bg-slate-50 dark:bg-neutral-950/80 transition-colors duration-500">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="w-full max-w-3xl flex flex-col z-10 py-12 px-6 sm:px-12">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full bg-white/50 dark:bg-black/30 hover:bg-white/80 dark:hover:bg-black/50 backdrop-blur-md transition-colors">
              <RiArrowLeftLine className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">통계 요약</h1>
        </div>

        {linksLoading ? (
          <div className="flex justify-center items-center py-20">
            <RiLoader4Line className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <Card className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg rounded-3xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">총 클릭수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                    <RiEyeLine className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    {totalClicks.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg rounded-3xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-neutral-800 dark:text-neutral-200">링크별 클릭수</CardTitle>
                <CardDescription className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  각 링크에 발생한 클릭수를 비교합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] pt-4">
                {chartData.length > 0 ? (
                  <ChartContainer
                    config={{
                      clicks: {
                        label: "클릭수",
                        color: "#4f46e5", // indigo-600
                      },
                    }}
                    className="h-full w-full min-h-[300px]"
                  >
                    <BarChart data={chartData} margin={{ top: 20, left: -20, right: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
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
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 dark:text-neutral-400 gap-2">
                    <RiEyeLine className="w-8 h-8 opacity-50" />
                    <span className="text-sm font-medium">아직 등록된 링크가 없습니다.</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
