/**
 * Re-mounted by Next on every navigation, so each page fades up on arrival.
 * A CSS animation rather than a JS one: the first page paints with it,
 * without waiting for hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
