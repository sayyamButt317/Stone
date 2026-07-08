# Reel videos

The "The films" slider below the hero plays these. Drop MP4s here and set each
reel's `src` in `components/Landing/VideoSlider.tsx`.

| File | Reel `src` to set |
|------|-------------------|
| `loop.mp4` | `src: "/videos/loop.mp4"` |
| `baguette.mp4` | `src: "/videos/baguette.mp4"` |
| `atelier.mp4` | `src: "/videos/atelier.mp4"` |
| `water.mp4` | `src: "/videos/water.mp4"` |
| `setting.mp4` | `src: "/videos/setting.mp4"` |

Specs: muted, ~4–10s H.264 MP4, portrait (1080×1920) reads best in the card.
The active card autoplays and loops; the rest pause. Until `src` is set, the
card shows the file it's waiting for.
