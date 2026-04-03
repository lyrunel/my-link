# MyLink Project Guide

## 1. Project Overview
**MyLink** is a personalized multi-link profile platform that allows users to collect and share various social media, portfolio, and website links on a single page. Targeted at creators, developers, and small business owners, it features intuitive **Inline Editing** and **Real-time Preview** to make building a profile page easy for everyone.

### Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (Radix UI based)
- **Icons**: Remix Icon (@remixicon/react)
- **Formatting/Linting**: Prettier, ESLint

## 2. Core Features
- **Auth**: Email-based & Google Social Login (Profile image synced from Google).
- **Nickname-based URL**: Public profile via `mylink.com/[nickname]`.
- **Inline Profile Editing**: Click-to-edit nickname and Bio (Auto-Save).
- **Link Management**: 
  - Automatic icon extraction via **Google Favicon API**.
  - Inline editing for titles and URLs.
  - Drag-and-drop sorting for links.
- **Real-time Preview**: Instant mobile-view preview of changes in the admin dashboard.
- **Theme Support**: Light/Dark mode and basic style presets.

## 3. Key Commands
| Command | Description |
|---|---|
| `npm run dev` | Run dev server with Turbopack |
| `npm run build` | Generate production build |
| `npm run start` | Start production server |
| `npm run lint` | Static analysis with ESLint |
| `npm run format` | Code formatting with Prettier (`ts`, `tsx`) |
| `npm run typecheck` | Run TypeScript type check |

## 4. Development Conventions
- **UI Components**: Use `npx shadcn@latest add [component]` and leverage components in `components/ui`.
- **Inline Editing**: 
  - Text should instantly switch to Input on click.
  - Must auto-save on `Blur` or `Enter` key. Avoid unnecessary save buttons.
- **Auto Icons**: Use Google Favicon API: `https://s2.googleusercontent.com/s2/favicons?domain=[URL]`.
- **Code Style**: 
  - Prefer Tailwind CSS v4 features.
  - Logical component separation in `components/`.
  - Strict TypeScript usage for type safety.
- **Validation**: 
  - Run `npm run build` and `npm run typecheck` before finishing.
  - Commit messages in Korean, focusing on "why".
