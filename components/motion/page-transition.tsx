import { ViewTransition } from "react";

/**
 * Page content slides with the navigation's direction: forward into a
 * project, back to the list. Untyped navigations (plain links, browser
 * back) do not slide, and the shared project image/title still morph.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
