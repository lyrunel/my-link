import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "통계 대시보드",
  description: "마이링크의 전체 클릭 분석 및 상세 트래픽 분석을 제공하는 대시보드입니다.",
  // 통계 대시보드는 비공개적인 개인 분석 화면이므로 검색 엔진 인덱싱을 차단하여 프라이버시를 지킵니다.
  robots: {
    index: false,
    follow: false,
  },
}

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
