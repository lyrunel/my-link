# 🔗 MyLink (마이링크)
> 크리에이터, 개발자, 1인 기업가를 위한 나만의 멀티 링크 프로필 플랫폼

MyLink는 다양한 소셜 미디어, 포트폴리오, 개인 웹사이트 링크를 단 하나의 미니멀한 페이지에 모아 효율적으로 공유할 수 있는 **개인화된 멀티 링크 프로필 서비스**입니다. 복잡한 설정 없이 직관적인 **인라인 편집(Inline Editing)**과 **실시간 모바일 프리뷰**를 제공하여 누구나 쉽고 빠르게 자신만의 멋진 랜딩 페이지를 완성할 수 있습니다.

---

## ✨ 주요 기능 (Key Features)

- 🔒 **간편한 인증 및 프로필 동기화**
  - 이메일 기반 로그인 및 Google 소셜 로그인 지원.
  - Google 계정 연동 시 프로필 이미지 자동 동기화.
- 🎨 **실시간 프리뷰 및 스타일 테마**
  - 관리자 대시보드에서 수정 사항을 실시간으로 확인하는 모바일 뷰어 제공.
  - 라이트(Light) 및 다크(Dark) 모드 완벽 지원 및 트렌디한 스타일 프리셋 제공.
- ✏️ **직관적인 인라인 프로필 편집**
  - 닉네임, 소개글(Bio)을 클릭하여 화면에서 바로 수정하고 자동 저장(Auto-Save on Blur/Enter).
- 🔗 **지능적인 링크 관리**
  - **Favicon 자동 추출**: 입력한 URL의 도메인을 인식하여 Google Favicon API를 통해 아이콘을 자동으로 생성.
  - **인라인 편집**: 링크의 제목과 URL을 쉽고 빠르게 수정.
  - **드래그 앤 드롭 정렬**: 마우스 드래그를 통해 링크들의 순서를 직관적으로 조정.
- 🌐 **닉네임 기반의 고유 공유 URL**
  - `mylink.com/[nickname]` 형태의 깔끔하고 직관적인 고유 주소 제공.

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (최신 기능 및 모던 디자인 시스템 활용)
- **UI Components**: Shadcn UI (Radix UI 기반의 컴포넌트) & `@base-ui/react`
- **State Management**: React Query (`@tanstack/react-query`)
- **Forms**: React Hook Form & Zod (유효성 검사)
- **Icons**: Remix Icon (`@remixicon/react`)

### Backend & Database
- **Platform**: Firebase (Authentication, Firestore Database, Storage 등)

---

## 🚀 시작하기 (Getting Started)

### 사전 준비 사항
프로젝트를 실행하려면 [Node.js](https://nodejs.org/)가 설치되어 있어야 합니다.

### 설치 방법
```bash
# 저장소 복제
git clone https://github.com/your-username/my-link.git
cd my-link

# 의존성 패키지 설치
npm install
```

### 환경 변수 설정
프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 Firebase 관련 환경 변수를 다음과 같이 설정합니다:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하실 수 있습니다.

---

## 📂 프로젝트 구조 (Directory Structure)

```text
my-link/
├── app/                  # Next.js App Router (페이지 및 레이아웃)
│   ├── [username]/       # 사용자별 공개 멀티 링크 프로필 페이지
│   ├── stats/            # 방문자 및 클릭 통계 분석 페이지
│   ├── globals.css       # Tailwind v4 글로벌 스타일
│   └── page.tsx          # 관리자 대시보드 및 랜딩 페이지
├── components/           # 재사용 가능한 UI 및 도메인 컴포넌트
│   ├── ui/               # Shadcn UI 기본 컴포넌트
│   ├── Header.tsx        # 네비게이션 헤더 컴포넌트
│   ├── LandingPage.tsx   # 서비스 메인 랜딩 페이지 및 대시보드 컴포넌트
│   └── ProfileLinks.tsx  # 링크 목록 조회, 추가 및 편집 컴포넌트
├── hooks/                # 커스텀 React Hooks
├── lib/                  # 유틸리티 함수, 공통 설정 파일들
├── public/               # 이미지, 파비콘 등 정적 에셋
└── data/                 # 정적 데이터 파일들
```

---

## 📜 실행 명령 (Commands)

| 명령어 | 설명 |
|---|---|
| `npm run dev` | Turbopack을 사용해 로컬 개발 서버 실행 |
| `npm run build` | 프로덕션용 최적화 빌드 생성 |
| `npm run start` | 빌드된 프로덕션 서버 실행 |
| `npm run lint` | ESLint를 통한 정적 분석 및 잠재적 오류 검사 |
| `npm run format` | Prettier를 이용해 코드 스타일 자동 정리 (`ts`, `tsx`) |
| `npm run typecheck` | TypeScript 타입 체크 실행 |

---

## 📄 라이선스 (License)

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고해 주세요.
