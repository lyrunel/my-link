# GEMINI.md - Project Context

## Project Overview
**My Link** is a repository containing a personal profile application. The primary project is located in the `my-profile` subdirectory.

### Main Technologies
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 4, PostCSS
- **Language:** TypeScript
- **Linting:** ESLint

## Project Structure
The repository is structured with the main application in a subdirectory:

- `/my-profile`: The core Next.js application.
  - `/app`: Contains the application routes, layouts, and global styles (Next.js App Router).
  - `/public`: Static assets (images, fonts, etc.).
  - `package.json`: Project dependencies and scripts.
  - `tsconfig.json`: TypeScript configuration.
  - `next.config.ts`: Next.js specific configuration.

## Building and Running
All commands should be executed within the `my-profile` directory.

### Development
```bash
cd my-profile
npm run dev
```
Starts the development server at `http://localhost:3000`.

### Build
```bash
cd my-profile
npm run build
```
Compiles the application for production.

### Production Start
```bash
cd my-profile
npm run start
```
Starts the production server (requires a prior build).

### Linting
```bash
cd my-profile
npm run lint
```
Runs ESLint to check for code quality issues.

## Development Conventions
- **Routing:** Uses Next.js App Router (files in `my-profile/app`).
- **Styling:** Uses Tailwind CSS 4 utility classes. Global styles are defined in `my-profile/app/globals.css`.
- **Fonts:** Utilizes `next/font` for Geist and Geist Mono fonts.
- **Type Safety:** TypeScript is used throughout the project. Use strict typing where possible.
- **Components:** Functional components with React 19 features.
