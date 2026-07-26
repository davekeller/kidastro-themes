import { Button } from "../primitives";

export function Header() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary" />
          <span className="text-lg font-semibold tracking-tight">Northwind</span>
        </div>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          <a href="#" className="transition-colors hover:text-fg">Product</a>
          <a href="#" className="transition-colors hover:text-fg">Features</a>
          <a href="#" className="transition-colors hover:text-fg">Pricing</a>
          <a href="#" className="transition-colors hover:text-fg">Docs</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
        </div>
      </div>
    </header>
  );
}
