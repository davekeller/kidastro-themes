import type { ReactNode } from "react";
import type { ThemeMeta } from "../themes/types";
import { cn } from "../lib/cn";
import { Avatar, Button, Progress } from "../components/primitives";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight, Check, X } from "../components/icons";

/**
 * Custom showcase for the `y2k` theme (ref: Poolsuite FM on Mobbin).
 * Layout signature: a center-stacked "desktop" of OS-window panels — each
 * section is framed with a title bar and close button — pixel mono for meta
 * text, starburst badges, and a ticker. Bevels come from the theme's
 * elevation tokens (inset light/dark edges), so `elev-1` reads as chrome.
 */

function Window({
  title,
  children,
  className,
  wide,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <section
      className={cn(
        "border border-border bg-surface elev-2",
        wide ? "w-full" : "w-full max-w-2xl",
        className
      )}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-2 px-2 py-1">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 border border-border bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg">
            {title}
          </span>
        </span>
        <span className="flex gap-1">
          <span className="grid h-3.5 w-3.5 place-items-center border border-border bg-surface text-fg">
            <span className="block h-px w-1.5 bg-fg" />
          </span>
          <span className="grid h-3.5 w-3.5 place-items-center border border-border bg-surface text-fg">
            <X size={8} />
          </span>
        </span>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

const TICKER = "★ NOW PLAYING: SUMMER MIX VOL.7 ★ 128 KBPS ★ DIAL-UP FRIENDLY ★ ";

export function Y2KShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      {/* Ticker */}
      <div className="overflow-hidden border-b border-border bg-primary py-1">
        <div className="marquee-track whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-primary-fg">
          <span>{TICKER.repeat(4)}</span>
          <span aria-hidden>{TICKER.repeat(4)}</span>
        </div>
      </div>

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-10">
        {/* Hero window */}
        <Window title="northwind.exe" wide>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
              est. 1998 · v2.0
            </p>
            <h1 className="mt-3 font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              super-summer
              <br />
              music player
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted">
              All killer, no filler. Streaming sunshine since the dial-up era —
              now with a working volume knob.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button className="border border-border font-bold uppercase">
                Press play <ArrowRight size={14} />
              </Button>
              <Button
                variant="secondary"
                className="border border-border font-bold uppercase"
              >
                Read the zine
              </Button>
            </div>
            {/* Starburst badge */}
            <div className="mt-6 flex justify-center">
              <span
                className="grid h-20 w-20 place-items-center border border-border bg-accent text-center font-mono text-[9px] uppercase leading-tight text-accent-fg"
                style={{ transform: "rotate(-8deg)", borderRadius: "50%" }}
              >
                free
                <br />
                forever
              </span>
            </div>
          </div>
        </Window>

        {/* Player window */}
        <Window title="player.app" wide>
          <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
            {/* Album art */}
            <div className="mx-auto grid h-32 w-32 place-items-center border border-border bg-surface-2 elev-1">
              <span className="font-mono text-[10px] uppercase text-muted">
                cover.bmp
              </span>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                track 04 of 12
              </p>
              <h2 className="mt-1 font-display text-2xl font-black uppercase tracking-tight">
                Poolside Static
              </h2>
              <p className="text-sm text-muted">Cassette Club — Summer Mix Vol. 7</p>
              <div className="mt-4">
                <Progress value={42} />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
                  <span>01:48</span>
                  <span>04:12</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {["◀◀", "▶", "▶▶", "■"].map((s) => (
                  <button
                    key={s}
                    className="border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-fg elev-1 transition-transform active:translate-y-px"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Window>

        {/* Two smaller windows side by side */}
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <Window title="tracklist.txt" wide>
            <ol className="space-y-1.5 font-mono text-xs">
              {[
                ["01", "Chlorine Dreams", true],
                ["02", "Boardwalk FM", true],
                ["03", "Neon Tanline", true],
                ["04", "Poolside Static", false],
                ["05", "Motel Sunrise", false],
              ].map(([n, title, played]) => (
                <li key={n as string} className="flex items-center gap-2">
                  <span className="text-muted">{n}</span>
                  <span className={cn("flex-1", played && "text-muted line-through")}>
                    {title}
                  </span>
                  {played ? <Check size={11} className="text-success" /> : null}
                </li>
              ))}
            </ol>
          </Window>

          <Window title="guestbook.htm" wide>
            <div className="space-y-3">
              {[
                ["surfrider99", "this is THE summer soundtrack!!!"],
                ["kid_astro", "left it on all afternoon. no notes."],
              ].map(([who, msg]) => (
                <div key={who} className="border-b border-border pb-2 last:border-0">
                  <div className="flex items-center gap-2">
                    <Avatar name={who} size={22} className="border border-border" />
                    <span className="font-mono text-[10px] uppercase text-muted">
                      {who}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{msg}</p>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                className="w-full border border-border font-mono text-[10px] uppercase"
              >
                Sign guestbook
              </Button>
            </div>
          </Window>
        </div>

        {/* Stats window */}
        <Window title="stats.dat" wide>
          <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
            {[
              ["1.2M", "listeners"],
              ["12", "mixtapes"],
              ["98%", "vibes"],
              ["24/7", "uptime"],
            ].map(([val, label]) => (
              <div key={label} className="border border-border bg-surface-2 p-3 elev-1">
                <p className="font-display text-xl font-black tracking-tight">{val}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Window>

        {/* CTA window */}
        <Window title="join.exe" wide className="text-center">
          <h2 className="font-display text-3xl font-black uppercase tracking-tight">
            Get on the list
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-muted">
            One mixtape a month, straight to your inbox. Unsubscribe any time.
          </p>
          <Button className="mt-5 border border-border font-bold uppercase">
            Subscribe now
          </Button>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-widest text-muted">
            best viewed at 1024 × 768
          </p>
        </Window>
      </main>

      <TokenPanel themeName={theme.name} />

      <footer className="border-t border-border bg-surface-2">
        <p className="mx-auto max-w-3xl px-6 py-6 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
          © 2026 northwind — {theme.name}, tokens only
        </p>
      </footer>
    </>
  );
}
