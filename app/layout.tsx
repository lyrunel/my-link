import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import { Header } from "@/components/Header"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "MyLink - 나만의 멀티링크 프로필",
    template: "%s | MyLink",
  },
  description: "소셜 미디어, 포트폴리오, 블로그 링크를 하나의 프로필 페이지에 담아 세상과 공유하세요. 직관적인 인라인 편집과 실시간 모바일 미리보기를 지원합니다.",
  keywords: ["멀티링크", "포트폴리오", "크리에이터", "링크트리", "소셜링크", "프로필", "MyLink", "마이링크"],
  authors: [{ name: "MyLink Team" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://mylink.com",
    title: "MyLink - 나만의 멀티링크 프로필",
    description: "소셜 미디어, 포트폴리오, 블로그 링크를 하나의 프로필 페이지에 담아 세상과 공유하세요.",
    siteName: "MyLink",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink - 나만의 멀티링크 프로필",
    description: "소셜 미디어, 포트폴리오, 블로그 링크를 하나의 프로필 페이지에 담아 세상과 공유하세요.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <QueryProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
