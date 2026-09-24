import Link from "next/link";

export default function NotFound() {
  return (
    <section className="frame flex min-h-[100svh] flex-col justify-center pb-16 pt-[var(--header-h)]">
      <p className="t-mono text-accent">404</p>
      <h1 className="t-h1 mt-5">
        <span className="line-mask">
          <span>This page doesn’t exist.</span>
        </span>
        <span className="line-mask text-muted">
          <span style={{ "--i": 1 } as React.CSSProperties}>The work is still here, though.</span>
        </span>
      </h1>
      <Link href="/" className="btn btn-outline mt-10 self-start">
        <span aria-hidden>←</span> Back to the homepage
      </Link>
    </section>
  );
}
