import { ImageResponse } from "next/og";

// 이미지 설정
export const alt = "MyLink - 단 하나의 링크로 당신을 다채롭게 표현하세요";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Node.js 런타임 사용
export const runtime = "nodejs";

// Node.js 호환성 높은 안전한 타임아웃 fetch 구현
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// 폰트 데이터 인메모리 캐싱 (매 요청마다 3MB의 폰트를 받아 생기는 타임아웃 및 커넥션 끊김 원천 차단)
let cachedFontData: ArrayBuffer | null = null;

async function getFontData(): Promise<ArrayBuffer | null> {
  if (cachedFontData && cachedFontData.byteLength > 0) {
    console.log("[OG Debug Static] Using cached Pretendard font data.");
    return cachedFontData;
  }

  const fontUrl = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf";
  const backupFontUrl = "https://fastly.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/static/Pretendard-Bold.otf";

  console.log("[OG Debug Static] Starting font download from primary CDN...");
  try {
    const res = await fetchWithTimeout(fontUrl, {}, 6000);
    if (!res.ok) throw new Error(`Primary CDN returned status ${res.status}`);
    const buffer = await res.arrayBuffer();
    if (buffer && buffer.byteLength > 0) {
      cachedFontData = buffer;
      console.log("[OG Debug Static] Font downloaded successfully from primary CDN. Size:", buffer.byteLength);
      return cachedFontData;
    }
    throw new Error("Primary CDN returned empty buffer");
  } catch (err) {
    console.warn("[OG Debug Static] Primary CDN failed, trying backup CDN...", err);
    try {
      const res = await fetchWithTimeout(backupFontUrl, {}, 8000);
      if (!res.ok) throw new Error(`Backup CDN returned status ${res.status}`);
      const buffer = await res.arrayBuffer();
      if (buffer && buffer.byteLength > 0) {
        cachedFontData = buffer;
        console.log("[OG Debug Static] Font downloaded successfully from backup CDN. Size:", buffer.byteLength);
        return cachedFontData;
      }
      throw new Error("Backup CDN returned empty buffer");
    } catch (backupErr) {
      console.error("[OG Debug Static] All font fetch attempts failed!", backupErr);
      return null; // throw 하지 않고 null 반환
    }
  }
}

export default async function Image() {
  console.log("[OG Debug Static] --- New Static OG Image Request Start ---");

  // 폰트 로드 진행
  const fontData = await getFontData();
  const isFontLoaded = fontData !== null && fontData.byteLength > 0;

  console.log("[OG Debug Static] Generating static ImageResponse...");

  return new ImageResponse(
    (
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 서비스 본체와 완전히 일치하는 3색 파스텔 빛무리 메쉬 배경 */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-15%",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(129, 140, 248, 0.25)", // indigo-400
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
            background: "rgba(192, 132, 252, 0.25)", // purple-400
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
            background: "rgba(103, 232, 249, 0.25)", // cyan-300
            filter: "blur(120px)",
          }}
        />

        {/* 중앙 정렬 컨텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            width: "1000px",
          }}
        >
          {/* MyLink. 메인 타이포 로고 */}
          <div
            style={{
              fontSize: "110px",
              fontWeight: 900,
              color: "#0f172a", // slate-900
              letterSpacing: "-4px",
              marginBottom: "36px",
              display: "flex",
            }}
          >
            MyLink
            <span style={{ color: "#4f46e5" }}>.</span>
          </div>

          {/* 메인 타이틀 카피 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "44px",
              fontWeight: 800,
              color: "#334155", // slate-700
              lineHeight: 1.45,
              letterSpacing: "-1.5px",
            }}
          >
            <span>단 하나의 링크로</span>
            <span
              style={{
                backgroundImage: "linear-gradient(to right, #4f46e5, #7c3aed, #db2777)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: 900,
                marginTop: "6px",
              }}
            >
              당신을 다채롭게 표현하세요
            </span>
          </div>
        </div>

        {/* 최하단 깔끔한 도메인 워터마크 */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            fontWeight: 800,
            color: "#64748b", // slate-500
            letterSpacing: "2px",
            display: "flex",
          }}
        >
          my-link-olive.vercel.app
        </div>
      </div>
    ),
    (() => {
      const responseOptions: any = { ...size };
      if (isFontLoaded && fontData) {
        responseOptions.fonts = [
          {
            name: "Pretendard",
            data: fontData,
            style: "normal",
            weight: 700,
          },
        ];
      }
      return responseOptions;
    })()
  );
}
