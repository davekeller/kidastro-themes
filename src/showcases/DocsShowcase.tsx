import type { ThemeMeta } from "../themes/types";
import {
  Badge,
  Breadcrumb,
  Button,
  Callout,
  CodeBlock,
  Pagination,
} from "../components/primitives";
import { DocsNav } from "../components/sections/DocsNav";
import { TOC } from "../components/sections/TOC";
import { TokenPanel } from "../components/sections/TokenPanel";
import { ArrowRight } from "../components/icons";

/**
 * Custom showcase for the `docs` theme.
 * Layout signature: three columns — nav tree, prose column with anchored
 * headings, and an on-this-page rail. Code blocks and callouts carry as much
 * weight as the prose, which is what separates a docs site from a blog.
 */

const navSections = [
  {
    label: "Getting started",
    pages: [
      { label: "Introduction" },
      { label: "Installation", active: true },
      { label: "Quick start" },
    ],
  },
  {
    label: "Core concepts",
    pages: [
      { label: "Tokens" },
      { label: "Themes" },
      { label: "Components" },
      { label: "Composition" },
    ],
  },
  {
    label: "Reference",
    pages: [{ label: "CLI" }, { label: "Config" }, { label: "API" }],
  },
];

const toc = [
  { label: "Requirements", level: 2 as const, active: true },
  { label: "Install the package", level: 2 as const },
  { label: "npm", level: 3 as const },
  { label: "pnpm", level: 3 as const },
  { label: "Add the token layer", level: 2 as const },
  { label: "Verify", level: 2 as const },
];

const installSnippet = `npm install @northwind/ui
npx northwind init`;

const pnpmSnippet = `pnpm add @northwind/ui
pnpm dlx northwind init`;

const configSnippet = `import { defineConfig } from "@northwind/ui";

export default defineConfig({
  theme: "docs",
  tokens: "./src/tokens.css",
});`;

export function DocsShowcase({ theme }: { theme: ThemeMeta }) {
  return (
    <>
      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-10">
        <DocsNav sections={navSections} version="v2.4" className="hidden lg:block" />

        {/* Prose column */}
        <main className="min-w-0 flex-1">
          <Breadcrumb
            items={[
              { label: "Docs", href: "#" },
              { label: "Getting started", href: "#" },
              { label: "Installation" },
            ]}
          />

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg">
            Installation
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Get the component library and the token layer into an existing app in
            about two minutes.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge variant="primary">Stable</Badge>
            <Badge variant="outline">Updated 2 days ago</Badge>
          </div>

          <h2 className="mt-10 border-b border-border pb-2 font-display text-xl font-semibold text-fg">
            Requirements
          </h2>
          <ul className="mt-3 space-y-1.5 text-muted">
            <li>Node 20.9 or newer</li>
            <li>React 19 and a bundler that understands CSS imports</li>
            <li>Tailwind CSS v4</li>
          </ul>

          <Callout tone="note" className="mt-5">
            Tailwind v3 is not supported. The token layer relies on{" "}
            <code className="font-mono text-xs">@theme inline</code>, which is v4 only.
          </Callout>

          <h2 className="mt-10 border-b border-border pb-2 font-display text-xl font-semibold text-fg">
            Install the package
          </h2>
          <p className="mt-3 text-muted">
            Pick your package manager. The <code className="font-mono text-xs">init</code>{" "}
            step writes a token file and registers the theme attribute.
          </p>
          <div className="mt-4">
            <CodeBlock
              tabs={[
                { label: "npm", code: installSnippet },
                { label: "pnpm", code: pnpmSnippet },
              ]}
            />
          </div>

          <h2 className="mt-10 border-b border-border pb-2 font-display text-xl font-semibold text-fg">
            Add the token layer
          </h2>
          <p className="mt-3 text-muted">
            Point the config at your token file. Every component reads tokens only,
            so this one file controls the whole surface.
          </p>
          <div className="mt-4">
            <CodeBlock tabs={[{ label: "northwind.config.ts", code: configSnippet }]} />
          </div>

          <Callout tone="warning" className="mt-5">
            Don&rsquo;t hardcode colors in your own components either. The moment one
            does, switching themes stops being reliable.
          </Callout>

          <h2 className="mt-10 border-b border-border pb-2 font-display text-xl font-semibold text-fg">
            Verify
          </h2>
          <p className="mt-3 text-muted">
            Run the dev server and toggle the theme attribute. If a component keeps
            its old color, it&rsquo;s reaching past the tokens.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Button>
              Next: Quick start
              <ArrowRight size={15} />
            </Button>
            <Button variant="ghost">Edit this page</Button>
          </div>

          <div className="mt-10 border-t border-border pt-5">
            <Pagination pageCount={9} defaultPage={2} />
          </div>
        </main>

        <TOC entries={toc} className="hidden xl:block" />
      </div>

      <TokenPanel themeName={theme.name} />
    </>
  );
}
