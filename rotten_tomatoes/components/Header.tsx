"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, User, UserPlus } from "lucide-react";
import { logoutUser } from "@/lib/authApi";
import { useAuthStore } from "@/lib/useAuthStore";

export default function Header() {
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); 
  const router = useRouter();

  const { user, logout } = useAuthStore();

  async function handleLogout() {
    await logoutUser();
    logout(); 
    setMenuOpen(false); 
    router.push("/auth/login");
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/movies?query=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
            F
          </span>
          <span className="hidden text-sm font-semibold text-neutral-100 sm:inline">
            Fammers
          </span>
        </Link>

        <form
          onSubmit={onSubmit}
          className="ml-auto flex w-full max-w-xl items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2"
        >
          <Search className="h-4 w-4 text-neutral-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search movies, people..."
            className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 outline-none"
          />
          <button
            type="submit"
            className="hidden rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500 sm:inline"
          >
            Search
          </button>
        </form>

        {user ? (
          <div className="relative flex items-center gap-3">
            <div className="hidden text-sm text-gray-300 sm:block">
              Welcome,{" "}
              <span className="text-red-600 font-semibold">{user.name}</span>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700"
            >
              <User className="h-4 w-4 text-neutral-100" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 w-40 rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg">
                <Link
                  href="/client/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-800"
                >
                  Profile
                </Link>
                {
                  user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="block px-3 py-2 text-sm text-neutral-100 hover:bg-neutral-800"
                    >
                      Admin Dashboard
                    </Link>
                  )
                }
                <button
                  onClick={handleLogout}
                  className="block w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-neutral-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/register"
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-neutral-800 px-3 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-700"
          >
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Sign up</span>
          </Link>
        )}
      </div>
    </header>
  );
}
