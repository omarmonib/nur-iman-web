# Nour Al-Iman — Web Application

A modern, Arabic-first web application built with Next.js (App Router) focused on Quran reading, Azkar (remembrances), and audio playback.

Key features

- Full Quran view with per-ayah text and a surah-level audio player (auto-advance, seek, time display).
- Local Azkar dataset with audio files stored under `public/audio/azkar/`.
- Surah list dialog for fast navigation between surahs.
- Responsive, fixed top navigation with a mobile sheet menu.
- Dark/light theme support via `next-themes`.

Tech stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Radix UI primitives for dialogs and sheets

Quick start

1. Install dependencies:

```bash
pnpm install
```

2. Run development server:

```bash
pnpm dev
```

Open http://localhost:3000

Useful scripts

- `pnpm dev` — start dev server
- `pnpm build` — build for production
- `pnpm start` — run built app
- `pnpm run lint` — run ESLint
- `pnpm exec tsc --noEmit` — run type check only

Project structure (high level)

- `app/` — Next.js App Router pages (e.g. `/quran`, `/azkar`, `/about`)
- `components/` — UI components: `quran`, `azkar`, `layout`, `ui` primitives
- `lib/` — API helpers (`quranApi.ts`)
- `data/` — local JSON data (e.g. `azkar.json`)
- `public/audio/azkar/` — audio assets used by Azkar

Developer notes

- `lib/quranApi.ts` implements a small `fetchWithRetry<T>` utility (exponential backoff) and typed response models (`SurahApi`, `AyahApi`).
- The dynamic route `app/quran/[surah]/page.tsx` safely resolves `params` (can be a Promise in some Next.js paths) and handles errors as `unknown`.
- The surah audio player (`components/quran/QuranSurah.tsx`) manages a single `HTMLAudioElement` with play/pause/seek, auto-advance, and `mm:ss` time formatting.

Accessibility & UX

- `Navbar` includes ARIA attributes and keyboard-focusable controls. Mobile sheet uses `SheetClose asChild` to ensure the sheet closes on navigation.
- Focus rings and visually-hidden labels are applied to interactive controls where appropriate.

Known issues & troubleshooting

- z-index/stacking context: Dialogs/sheets and some UI primitives use `z-50` and CSS transforms that create stacking contexts. If the Navbar appears behind overlays, adjust `z-index` values (or make Navbar slightly lower so overlays cover it when open).
- Next dev lock: If `pnpm dev` complains about `.next/dev/lock`, stop any other running `next dev` instance or remove the lock file and restart.

Contributing

- Create a feature branch, open a PR with a clear description and testing notes. Small, focused PRs are preferred.

Roadmap ideas

- Add end-to-end tests (Playwright) for audio playback and navigation flows.
- CI pipeline: lint + typecheck + build on PRs.

License

- Add an appropriate LICENSE file (e.g. MIT) if you plan to publish the project.

Need more?
If you'd like, I can:

- Add a concise English + Arabic README split, or
- Add `CONTRIBUTING.md` and PR/issue templates, or
- Commit these changes to a new Git branch and open a PR locally for review.

## License
This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
Copyright (c) 2026 Nour Al-Iman

