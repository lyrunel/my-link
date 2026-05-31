import { ImageResponse } from "next/og"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { db } from "@/lib/firebase"

// 이미지 설정
export const alt = "MyLink Profile"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

// Node.js 런타임 사용
export const runtime = "nodejs"

// Node.js 호환성 높은 안전한 타임아웃 fetch 구현
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs = 6000
) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(id)
    return response
  } catch (error) {
    clearTimeout(id)
    throw error
  }
}

// 폰트 데이터 인메모리 캐싱 (매 요청마다 3MB 이상의 폰트를 다운받아 생기는 dev 서버 타임아웃 및 커넥션 끊김 원천 차단)
let cachedFontData: ArrayBuffer | null = null

async function getFontData(): Promise<ArrayBuffer | null> {
  if (cachedFontData && cachedFontData.byteLength > 0) {
    console.log("[OG Debug] Using cached Pretendard font data.")
    return cachedFontData
  }

  const fontUrl =
    "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf"
  const backupFontUrl =
    "https://fastly.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf"

  console.log("[OG Debug] Starting font download from primary CDN...")
  try {
    const res = await fetchWithTimeout(fontUrl, {}, 6000)
    if (!res.ok) throw new Error(`Primary CDN returned status ${res.status}`)
    const buffer = await res.arrayBuffer()
    if (buffer && buffer.byteLength > 0) {
      cachedFontData = buffer
      console.log(
        "[OG Debug] Font downloaded successfully from primary CDN. Size:",
        buffer.byteLength
      )
      return cachedFontData
    }
    throw new Error("Primary CDN returned empty buffer")
  } catch (err) {
    console.warn("[OG Debug] Primary CDN failed, trying backup CDN...", err)
    try {
      const res = await fetchWithTimeout(backupFontUrl, {}, 8000)
      if (!res.ok) throw new Error(`Backup CDN returned status ${res.status}`)
      const buffer = await res.arrayBuffer()
      if (buffer && buffer.byteLength > 0) {
        cachedFontData = buffer
        console.log(
          "[OG Debug] Font downloaded successfully from backup CDN. Size:",
          buffer.byteLength
        )
        return cachedFontData
      }
      throw new Error("Backup CDN returned empty buffer")
    } catch (backupErr) {
      console.error("[OG Debug] All font fetch attempts failed!", backupErr)
      return null // throw 하지 않고 null 반환
    }
  }
}

// Firestore에서 유저 데이터 가져오기
async function getProfileData(username: string) {
  console.log(`[OG Debug] Querying Firestore for username: "${username}"`)
  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      limit(1)
    )
    const snapshot = await getDocs(q)

    if (snapshot.empty) {
      console.log(
        `[OG Debug] Firestore returned empty result for username: "${username}"`
      )
      return null
    }

    const docSnapshot = snapshot.docs[0]
    const data = docSnapshot.data()
    console.log(`[OG Debug] Firestore returned profile for "${username}":`, {
      displayName: data.displayName,
      uid: docSnapshot.id,
    })

    return {
      uid: docSnapshot.id,
      displayName: (data.displayName as string) || "",
      username: (data.username as string) || "",
      bio: (data.bio as string) || "",
      photoURL: (data.photoURL as string | null | undefined) || null,
      theme: (data.theme as string | undefined) || "indigo",
    }
  } catch (error) {
    console.error(
      `[OG Debug] Firestore fetch failed for username "${username}":`,
      error
    )
    return null
  }
}

interface ImageParams {
  params: Promise<{ username: string }> | { username: string }
}

export default async function Image({ params }: ImageParams) {
  console.log("[OG Debug] --- New Dynamic OG Image Request Start ---")

  // Next.js 버전에 따라 params가 Promise일 수 있으므로 이를 안전하게 처리
  const resolvedParams = await params
  const username = resolvedParams.username
  console.log(`[OG Debug] Parameter resolved username: "${username}"`)

  // 1. 유저 정보 가져오기
  const profile = await getProfileData(username)

  // 2. 폰트 로드 진행
  const fontData = await getFontData()
  const isFontLoaded = fontData !== null && fontData.byteLength > 0

  // 사용자가 없거나 로드 실패 시 폴백 화면 렌더링
  if (!profile) {
    console.log(
      `[OG Debug] Profile for "${username}" is null. Rendering Fallback Page.`
    )

    const fallbackOptions: any = { ...size }
    if (isFontLoaded && fontData) {
      fallbackOptions.fonts = [
        {
          name: "Pretendard",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ]
    }

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          fontFamily: "Pretendard",
          color: "white",
          position: "relative",
        }}
      >
        {/* 폴백 배경 메쉬 */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-15%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(129, 140, 248, 0.25)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-15%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(219, 39, 119, 0.25)",
            filter: "blur(120px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: 900,
              color: "#0f172a",
              marginBottom: "24px",
              display: "flex",
            }}
          >
            MyLink<span style={{ color: "#4f46e5" }}>.</span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: 700, color: "#4b5563" }}>
            존재하지 않거나 삭제된 프로필 페이지입니다.
          </div>
        </div>
      </div>,
      fallbackOptions
    )
  }

  // 테마 분기
  const userTheme = profile.theme || "indigo"
  const isNeon = userTheme === "neon"

  // 테마별 메쉬 그라디언트 및 폰트 색상 정의 (실제 개인 페이지의 톤앤매너 완벽 반영)
  const themeStyles = isNeon
    ? {
        bg: "#090d16", // 네온 다크 배경
        glow1: "rgba(16, 185, 129, 0.15)", // emerald glow
        glow2: "rgba(24, 24, 27, 0.3)",
        glow3: "rgba(16, 185, 129, 0.1)",
        textColor: "#f8fafc",
        subTextColor: "#94a3b8",
        badgeBg: "rgba(16, 185, 129, 0.1)",
        badgeText: "#10b981",
        badgeBorder: "1px solid rgba(16, 185, 129, 0.3)",
        avatarBorder: "4px solid #10b981",
        domainColor: "#94a3b8",
      }
    : {
        bg: "#f8fafc", // 라이트 배경
        glow1:
          userTheme === "sunset"
            ? "rgba(245, 158, 11, 0.2)"
            : userTheme === "emerald"
              ? "rgba(52, 211, 153, 0.2)"
              : "rgba(129, 140, 248, 0.25)",
        glow2:
          userTheme === "sunset"
            ? "rgba(234, 88, 12, 0.2)"
            : userTheme === "emerald"
              ? "rgba(20, 184, 166, 0.2)"
              : "rgba(192, 132, 252, 0.25)",
        glow3:
          userTheme === "sunset"
            ? "rgba(225, 29, 72, 0.2)"
            : userTheme === "emerald"
              ? "rgba(8, 145, 178, 0.2)"
              : "rgba(103, 232, 249, 0.25)",
        textColor: "#0f172a", // slate-900
        subTextColor: "#475569", // slate-600
        badgeBg:
          userTheme === "sunset"
            ? "#ffedd5"
            : userTheme === "emerald"
              ? "#ccfbf1"
              : "#e0e7ff",
        badgeText:
          userTheme === "sunset"
            ? "#ea580c"
            : userTheme === "emerald"
              ? "#0d9488"
              : "#4f46e5",
        badgeBorder: `1px solid ${userTheme === "sunset" ? "#fed7aa" : userTheme === "emerald" ? "#99f6e4" : "#c7d2fe"}`,
        avatarBorder: "4px solid white",
        domainColor: "#64748b",
      }

  const initialChar = profile.displayName
    ? profile.displayName.charAt(0).toUpperCase()
    : "?"

  console.log(
    `[OG Debug] Generating dynamic ImageResponse for user: "${profile.username}"`
  )

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: themeStyles.bg,
        fontFamily: "Pretendard",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 네온 테마 전용 장식성 다크 아웃라인 */}
      {isNeon && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "12px solid rgba(16, 185, 129, 0.1)",
            pointerEvents: "none",
          }}
        />
      )}

      {/* 서비스 본체와 일치하는 파스텔 메쉬 광원 구체들 */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-15%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: themeStyles.glow1,
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "-15%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: themeStyles.glow2,
          filter: "blur(100px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "15%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: themeStyles.glow3,
          filter: "blur(120px)",
        }}
      />

      {/* 중앙 플로팅 프로필 레이아웃 (글래스 카드를 과감히 지우고 미니멀하고 시원하게 배치) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "900px",
        }}
      >
        {/* 프로필 이미지 (실제 서비스처럼 둥글고 그림자가 들어간 스타일로 확대 140px) */}
        <div
          style={{
            position: "relative",
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: isNeon ? "rgba(16, 185, 129, 0.1)" : "white",
            border: themeStyles.avatarBorder,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            marginBottom: "28px",
          }}
        >
          {profile.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoURL}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                fontSize: "56px",
                fontWeight: 950,
                color: isNeon ? "#10b981" : "#4f46e5",
              }}
            >
              {initialChar}
            </div>
          )}
        </div>

        {/* 유저DisplayName */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 900,
            color: themeStyles.textColor,
            letterSpacing: "-1.5px",
            marginBottom: "12px",
            textAlign: "center",
          }}
        >
          {profile.displayName}
        </div>

        {/* 유저 닉네임 뱃지 (@username) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 20px",
            borderRadius: "100px",
            background: themeStyles.badgeBg,
            color: themeStyles.badgeText,
            border: themeStyles.badgeBorder,
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          @{profile.username}
        </div>

        {/* 유저 Bio (소개글) */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: 500,
            color: themeStyles.subTextColor,
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: "700px",
            wordBreak: "break-all",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {profile.bio || "크리에이터 & 포트폴리오 스페이스 ✨"}
        </div>
      </div>

      {/* 최하단 주소 워터마크 ('만나보세요 :'를 완전히 덜어낸 닉네임 도메인) */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          fontSize: "18px",
          fontWeight: 800,
          color: themeStyles.domainColor,
          letterSpacing: "2px",
          display: "flex",
        }}
      >
        {`my-link-olive.vercel.app/${profile.username}`}
      </div>
    </div>,
    (() => {
      const responseOptions: any = { ...size }
      if (isFontLoaded && fontData) {
        responseOptions.fonts = [
          {
            name: "Pretendard",
            data: fontData,
            style: "normal",
            weight: 700,
          },
        ]
      }
      return responseOptions
    })()
  )
}
