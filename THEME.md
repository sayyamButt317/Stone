# Theme Reference

Design tokens for the **Stone** app. Colors are defined in **OKLCH** and Tailwind v4
CSS-based config lives in [`app/globals.css`](app/globals.css); fonts are wired up in
[`app/layout.tsx`](app/layout.tsx).

This is the shadcn/ui **neutral** base palette — a grayscale system (chroma `0` on
almost every token) with light and dark variants. The only chromatic tokens are
`destructive` (red) and the dark-mode `sidebar-primary` (indigo).

---

## Fonts

| Role     | Family      | CSS variable        | Tailwind utility | Source            |
| -------- | ----------- | ------------------- | ---------------- | ----------------- |
| Sans / body / headings | **Geist**      | `--font-geist-sans` | `font-sans`, `font-heading` | `next/font/google` |
| Mono     | **Geist Mono** | `--font-geist-mono` | `font-mono`      | `next/font/google` |

- `<html>` applies `font-sans` globally (`app/globals.css` base layer).
- `--font-heading` is mapped to the same sans family (no separate display font).

> ⚠️ **Note:** the `@theme` block maps `--font-sans: var(--font-sans)` (self-referential),
> while `layout.tsx` actually defines `--font-geist-sans`. If `font-sans` ever renders as
> the browser default, change line 10 of `globals.css` to `--font-sans: var(--font-geist-sans);`.

---

## Core colors

Primary / secondary and their foregrounds (hex values are approximate sRGB equivalents of the OKLCH source):

| Token                  | Light (OKLCH)        | Light ≈ hex | Dark (OKLCH)         | Dark ≈ hex |
| ---------------------- | -------------------- | ----------- | -------------------- | ---------- |
| `--primary`            | `oklch(0.205 0 0)`   | `#343434`   | `oklch(0.922 0 0)`   | `#e5e5e5`  |
| `--primary-foreground` | `oklch(0.985 0 0)`   | `#fafafa`   | `oklch(0.205 0 0)`   | `#343434`  |
| `--secondary`          | `oklch(0.97 0 0)`    | `#f5f5f5`   | `oklch(0.269 0 0)`   | `#434343`  |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `#343434`   | `oklch(0.985 0 0)`   | `#fafafa`  |

## Surface & text

| Token                 | Light (OKLCH)      | Dark (OKLCH)        |
| --------------------- | ------------------ | ------------------- |
| `--background`        | `oklch(1 0 0)`     | `oklch(0.145 0 0)`  |
| `--foreground`        | `oklch(0.145 0 0)` | `oklch(0.985 0 0)`  |
| `--card`              | `oklch(1 0 0)`     | `oklch(0.205 0 0)`  |
| `--card-foreground`   | `oklch(0.145 0 0)` | `oklch(0.985 0 0)`  |
| `--popover`           | `oklch(1 0 0)`     | `oklch(0.205 0 0)`  |
| `--popover-foreground`| `oklch(0.145 0 0)` | `oklch(0.985 0 0)`  |
| `--muted`             | `oklch(0.97 0 0)`  | `oklch(0.269 0 0)`  |
| `--muted-foreground`  | `oklch(0.556 0 0)` | `oklch(0.708 0 0)`  |
| `--accent`            | `oklch(0.97 0 0)`  | `oklch(0.269 0 0)`  |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)`  |

## Borders, inputs, rings

| Token       | Light (OKLCH)       | Dark (OKLCH)          |
| ----------- | ------------------- | --------------------- |
| `--border`  | `oklch(0.922 0 0)`  | `oklch(1 0 0 / 10%)`  |
| `--input`   | `oklch(0.922 0 0)`  | `oklch(1 0 0 / 15%)`  |
| `--ring`    | `oklch(0.708 0 0)`  | `oklch(0.556 0 0)`    |

## Status

| Token           | Light (OKLCH)               | Light ≈ hex | Dark (OKLCH)                | Dark ≈ hex |
| --------------- | --------------------------- | ----------- | --------------------------- | ---------- |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `#dc2626`   | `oklch(0.704 0.191 22.216)` | `#ef4444`  |

## Charts (grayscale ramp)

| Token       | Light & Dark (OKLCH) |
| ----------- | -------------------- |
| `--chart-1` | `oklch(0.87 0 0)`    |
| `--chart-2` | `oklch(0.556 0 0)`   |
| `--chart-3` | `oklch(0.439 0 0)`   |
| `--chart-4` | `oklch(0.371 0 0)`   |
| `--chart-5` | `oklch(0.269 0 0)`   |

## Sidebar

| Token                          | Light (OKLCH)       | Dark (OKLCH)                |
| ------------------------------ | ------------------- | --------------------------- |
| `--sidebar`                    | `oklch(0.985 0 0)`  | `oklch(0.205 0 0)`          |
| `--sidebar-foreground`         | `oklch(0.145 0 0)`  | `oklch(0.985 0 0)`          |
| `--sidebar-primary`            | `oklch(0.205 0 0)`  | `oklch(0.488 0.243 264.376)` (indigo) |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)`  | `oklch(0.985 0 0)`          |
| `--sidebar-accent`             | `oklch(0.97 0 0)`   | `oklch(0.269 0 0)`          |
| `--sidebar-accent-foreground`  | `oklch(0.205 0 0)`  | `oklch(0.985 0 0)`          |
| `--sidebar-border`             | `oklch(0.922 0 0)`  | `oklch(1 0 0 / 10%)`        |
| `--sidebar-ring`               | `oklch(0.708 0 0)`  | `oklch(0.556 0 0)`          |

---

## Radius

Base `--radius: 0.625rem` (10px). Scale derived in the `@theme` block:

| Utility        | Formula              | Value    |
| -------------- | -------------------- | -------- |
| `rounded-sm`   | `radius * 0.6`       | 0.375rem |
| `rounded-md`   | `radius * 0.8`       | 0.5rem   |
| `rounded-lg`   | `radius`             | 0.625rem |
| `rounded-xl`   | `radius * 1.4`       | 0.875rem |
| `rounded-2xl`  | `radius * 1.8`       | 1.125rem |
| `rounded-3xl`  | `radius * 2.2`       | 1.375rem |
| `rounded-4xl`  | `radius * 2.6`       | 1.625rem |

---

## Usage

Reference tokens via Tailwind utilities, e.g. `bg-primary text-primary-foreground`,
`bg-secondary`, `border-border`, `text-muted-foreground`, `font-sans`, `font-mono`.
Dark mode is class-based (`.dark` on an ancestor), managed by `next-themes`.

_Hex values are approximate conversions of the OKLCH source and are provided for
quick reference only; the OKLCH values in `globals.css` are canonical._
