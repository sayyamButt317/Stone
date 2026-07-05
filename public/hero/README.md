# Hero assets

The homepage hero is a 7-scene cinematic scroll film. Each scene shows **one
real photo or video** — drop them here and the code does all the camera work
(push-in, pull-back, macro, depth-of-field, light sweeps, letterbox).

Until a file exists, that scene shows a labelled placeholder telling you what's
missing — nothing looks broken.

## Files to add (exact names)

| File | Scene | What to shoot / source |
|------|-------|------------------------|
| `01-intro.jpg` | Intro | A single stone or signature piece on black, lit from above |
| `02-hand.jpg` | The hand | A hand emerging from darkness, jewellery not yet fully visible |
| `03-bracelet.jpg` | The bracelet | Bracelet macro — highlights on metal, diamonds catching light |
| `04-hand2.jpg` | Second hand | A second hand from the side, wearing rings; necklace partly in frame |
| `05-necklace.jpg` | Necklace reveal | Sharp necklace, background falling out of focus |
| `06-macro.jpg` | Extreme close-up | A single diamond, reflections, very shallow depth of field |
| `07-set.jpg` | Full set | The full set — flat-lay or on model |

## Video instead of a still

For motion, add a `.mp4` with the **same base name** (e.g. `03-bracelet.mp4`).
If both exist, the video plays and the image is its poster. Use muted, ~4–8s
H.264 loops. The active scene autoplays; others pause.

## Specs for the luxury look

- **Resolution:** 2000px+ wide stills, or 1080×1920 (portrait) / 1920×1080 video
- **Lighting:** black or beige studio, shallow depth of field
- **Framing:** leave headroom — scenes scale/translate, so keep the subject off the exact edges

Change paths, copy, or the camera move per scene in
`components/Landing/heroConfig.ts`.
