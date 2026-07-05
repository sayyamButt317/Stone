/**
 * HERO ASSET MANIFEST
 * -------------------
 * The hero is a scroll film built from real editorial photos in
 * `public/assest/`. Each scene shows one image; the code frames it, pushes,
 * pulls and lights it as you scroll. Swap paths / copy / camera moves here.
 *
 * Add a `video` (same treatment) to any scene for motion; it plays while the
 * scene is on screen and the image is its poster.
 */

export type CameraPreset =
  | "reveal" // settle in from a soft zoom
  | "push" // push closer
  | "enterRight" // subject drifts in from the side
  | "zoomBlur" // zoom in
  | "macro" // extreme close-up, slow rotate
  | "pullback" // pull back to reveal everything
  | "descend" // camera drifts down onto the subject

export type HeroScene = {
  id: string
  image?: string
  video?: string
  eyebrow?: string
  title: string
  /** optional trailing word rendered in italic gold */
  accent?: string
  sub?: string
  camera: CameraPreset
  /** CSS object-position for the sharp layer, e.g. "center", "center top" */
  focus?: string
  align?: "center" | "bottom"
  sweep?: boolean
  cta?: boolean
  note: string
}

export const HERO_SCENES: HeroScene[] = [
  {
    id: "hands",
    image: "/assest/hand.jpeg",
    title: "Worn by light.",
    sub: "L'Atelier — bespoke fine jewellery",
    camera: "reveal",
    focus: "center",
    align: "bottom",
    sweep: true,
    note: "Opening shot — both hands, the signature image.",
  },
  {
    id: "right",
    image: "/assest/Right_hand.jpeg",
    eyebrow: "The wearer",
    title: "Made for a single hand.",
    camera: "push",
    focus: "center",
    align: "bottom",
    sweep: true,
    note: "Right hand, pearl ring and bracelet.",
  },
  {
    id: "left",
    image: "/assest/Left_hand.jpeg",
    eyebrow: "The detail",
    title: "Every finger, considered.",
    camera: "enterRight",
    focus: "center",
    align: "bottom",
    note: "Left hand, pearl row ring.",
  },
  {
    id: "set",
    image: "/assest/jew2.jpg",
    eyebrow: "The set",
    title: "The house,",
    accent: "complete.",
    camera: "pullback",
    focus: "center",
    align: "bottom",
    cta: true,
    note: "The full set — rings, bangles, the collection together.",
  },
]
