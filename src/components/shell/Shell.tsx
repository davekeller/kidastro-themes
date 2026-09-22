import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { ensureSkinState } from "../../lib/skin-state";
import { Rail } from "./Rail";

/**
 * The app frame for the new information architecture: a rail on the left, the
 * page on the right, the whole thing wearing the active skin × palette that
 * <body> carries. Pages inside decide their own container width — the Page
 * view of a skin wants the full column, the lists want a measure.
 */
export function Shell() {
  // Before first paint: if index.html restored a pair we no longer know, fix it.
  useLayoutEffect(() => {
    ensureSkinState();
  }, []);

  return (
    <div className="min-h-screen bg-bg font-sans text-fg">
      <Rail />
      <div className="lg:pl-60">
        <Outlet />
      </div>
    </div>
  );
}
