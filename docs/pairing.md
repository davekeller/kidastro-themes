# Pairing themes with motion styles

Any theme composes with any motion style — that's the point of keeping them on
separate attributes, and all 15 motion tokens resolve against all 27 themes with
nothing missing. But **135 pairs are not 135 equally good ideas.** Notes from
spot-checking the matrix.

## The registry's own suggestions

Each motion style carries a `pairsWith` list in `src/motion/index.ts`. Those are
the themes it was tuned against, and they're surfaced as clickable chips on
`/motion/:slug` so you can jump straight to a known-good pair:

| Motion | Tuned against |
|---|---|
| `precise` | linear, minimal, console, docs |
| `springy` | clay, candy, neubrutalist, native |
| `floaty` | glass, liquid, aurora, kidastro |
| `mechanical` | specsheet, terminal, brutalist, swiss |
| `cinematic` | kinetic, broadsheet, luxe, deco |

## Pairs that fight

**`mechanical` + anything that leans on elevation.** This style sets
`--lift: 0px` and `--press: 1` deliberately, so `hover-lift` and `press-scale`
produce no movement at all. Affordance falls entirely to color change, which is
fine on `specsheet` or `terminal` where flatness is the aesthetic — and thin on
`clay` or `liquid`, whose whole identity is depth. If you want mechanical timing
*with* elevation feedback, override `--lift` rather than reaching for a different
style.

**`mechanical` + `--dur-1: 0ms`.** Micro-interactions don't animate; they change.
That's the design statement, not a bug, but it means focus rings and hover colors
snap. On a dense data theme that reads as responsive. On a soft, friendly theme it
reads as broken.

**`cinematic` + app shells.** 400ms on a control and 950ms on an overlay is
gorgeous on `kinetic` or `broadsheet`, where the page is the experience. In
`console` or `docs` — surfaces you're *working* in — the same timing feels like
lag. Slow motion is a luxury of pages you look at rather than operate.

**`floaty` vs `cinematic`** is the closest pair in the set. Both slow, both soft.
`floaty` is long travel with gentle eases and no drama; `cinematic` is heavy
ease-in-out that accelerates hard through the middle. The race track's compare
mode is the fastest way to feel the difference, and if any two styles want
retuning it's these.

## Safe defaults

`precise` with anything. It's the default for a reason — short, neutral, and it
gets out of the way, so it never fights a theme's character. Start there and only
move if the theme is asking for something.
