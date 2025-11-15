// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">F</span>
            <span className="text-sm font-semibold text-neutral-100">Famers</span>
          </div>

          <nav className="flex gap-4 text-sm text-neutral-300">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/" className="hover:text-white">Movies</Link>
            {/* <Link href="/login" className="hover:text-white">Sign in</Link>
            <Link href="/register" className="hover:text-white">Sign up</Link> */}
          </nav>
        </div>

        <div className="mt-6 text-xs text-neutral-400">
          By Famers ❤️
        </div>

        <div className="mt-2 text-xs text-neutral-500">
          © {new Date().getFullYear()} Famers. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
