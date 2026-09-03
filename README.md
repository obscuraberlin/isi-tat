# ISI TAT BUSINESS CLUB — Landingpage

High-Ticket Sales Landingpage. Netflix-Immersion × Apple-Klarheit,
bewusst im Wechsel aus hellen (~60 %) und dunklen (~40 %) Flächen.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling | CSS Modules + zentrale Design Tokens (`src/app/globals.css`) |
| Fonts | Inter / Inter Tight via `next/font` (self-hosted, kein externer Request) |
| Animation | Nativ — IntersectionObserver + CSS. Keine Animationsbibliothek. |

```bash
npm run dev     # Entwicklung
npm run build   # Produktions-Build
npm start       # Produktions-Server
```

## Inhalte pflegen

Alle Texte, Zahlen, Medien, Karten und CTA-Ziele liegen in **einer** Datei:

```
src/data/landingPage.ts
```

Konventionen:

- `TODO_CONTENT` — Inhalt noch nicht bestätigt. Nichts erfinden.
- `"[XX]+"` — Zahl bleibt Platzhalter, bis sie bestätigt ist.
- `src: null` — Asset fehlt; es wird ein gestalteter Platzhalter mit
  korrektem Seitenverhältnis, Gradient und Radius gerendert.

## Assets austauschen

Datei nach `public/media/` legen und in `landingPage.ts` nur `src` setzen:

```ts
video: media("[ISI_HERO_VIDEO]", "video", "…", "4 / 5", {
  src: "/media/isi-hero.mp4",
  srcMobile: "/media/isi-hero-mobile.mp4",  // kleinere Quelle für Mobile
  poster: "/media/isi-hero.jpg",
}),
```

Layout, Crop und Radius bleiben unverändert — es ändert sich nur die Quelle.
Bilder bevorzugt als AVIF/WebP, Videos H.264/MP4 komprimiert mit Poster.

## Struktur

```
src/
  app/
    globals.css              Design Tokens, Reset, Utilities
    layout.tsx               Fonts, Metadata, TrailerProvider
    page.tsx                 Section-Komposition
  data/landingPage.ts        Zentrale Content-Datei
  lib/hooks.ts               Scroll, InView, Scroll-Lock, Media Queries
  components/
    Header/                  Transparent → Glas ab 80px · Fullscreen-Menü mobil
    Hero/                    Gestaffelter Load, Visual-Scale 1.03 → 1.00
    TrailerModal/            Fullscreen-Overlay + Context (jedes Video)
    TrustSection/            „Sein Ruf ist sein Kapital" + Metriken
    ContentCarousel/         Netflix-Row, Scroll-Snap, Hover-Preview-fähig
    StickyMobileCTA/         Erscheint ab ~40 % Scrolltiefe
    Footer/
    Media/                   Asset oder gestalteter Platzhalter
    Reveal/                  Scroll-Reveal (fade | mask)
    ui/                      Button, Eyebrow, PlayButton
```

## Barrierefreiheit & Performance

- Semantisches HTML, sichtbare Focus-States, Skip-Link, Touch-Targets ≥ 44px
- `prefers-reduced-motion` wird respektiert
- Reveal-Observer trennt sich nach dem ersten Treffer
- Bilder unterhalb des Folds `loading="lazy"`, Hero `priority`
- Kein Scroll-Hijacking

## Rechtliches

- Keine Erfolgs-, Einkommens- oder Zusammenarbeits-Garantien
- Keine erfundenen Zahlen, Testimonials, Partner- oder Unternehmenslogos
- Keine Fake-Countdowns, Streichpreise oder Verknappung
- Die Seite behauptet **keine** rechtliche Einordnung (kein „FernUSG-konform")
