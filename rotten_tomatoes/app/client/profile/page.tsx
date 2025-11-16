/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/useAuthStore";
import useFavoritesStore from "@/lib/stores/favoritesStore";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { favorites, fetchFavorites, loading } = useFavoritesStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated()) {
      fetchFavorites();
    }
  }, [isAuthenticated, fetchFavorites]);

  if (!user) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 text-neutral-200">
        Loading profile...
      </div>
    );
  }

  const initial = user.name?.charAt(0)?.toUpperCase() || "U";

  function openEdit() {
    setEditName(name);
    setEditEmail(email);
    setEditOpen(true);
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    setName(editName);
    setEmail(editEmail);
    setEditOpen(false);
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="overflow-hidden  border border-neutral-800 bg-neutral-900/90 shadow-xl">
        <div className="h-40 w-full bg-[url('https://image.tmdb.org/t/p/original/hpXBJxLD2SEf8l2CspmSeiHrBKX.jpg')] bg-cover bg-center" />

        <div className="-mt-10 flex flex-col items-center px-6 pb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-neutral-900 bg-red-800 text-xl font-semibold text-white">
            {initial}
          </div>
          <div className="mt-3 text-center">
            <div className="text-base font-semibold text-white">
              {name}
            </div>
            <div className="text-xs text-neutral-400">{email}</div>
          </div>

          <button
            type="button"
            onClick={openEdit}
            className="mt-4 rounded-full bg-neutral-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-neutral-700"
          >
            Edit profile
          </button>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-neutral-300">
            <div className="text-center">
              <div className="text-sm font-semibold text-white">
                12
              </div>
              <div className="text-[11px] text-neutral-400">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-white">
                {favorites.length}
              </div>
              <div className="text-[11px] text-neutral-400">Favorite Lists</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-white">
                34
              </div>
              <div className="text-[11px] text-neutral-400">Movies Rated</div>
            </div>
          </div>
{/* 
          <div className="mt-6 w-full rounded-2xl border border-neutral-200 bg-neutral-950/70 p-5 text-sm text-neutral-300">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-100">
              About
            </div>
            
            
          </div> */}

          <div className="mt-8 w-full">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">
                My favorites
              </h2>
            </div>

            {loading ? (
              <div className="py-6 text-sm text-neutral-400">
                Loading favorites...
              </div>
            ) : favorites.length === 0 ? (
              <div className="py-6 text-sm text-neutral-500">
                You have not added any favorite movies yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 md:grid-cols-4">
                {favorites.map((fav) =>{
                  if (!fav.movie) return null;
                  return (
                  <div
                    key={fav._id}
                    className="overflow-hidden hover:border-red-200 rounded-2xl border border-neutral-800 bg-neutral-950"
                  >
                    <img
                      src={fav.movie.posterPath}
                      alt={fav.movie.title}
                      className="h-44 w-full object-cover aspect-2/3"
                    />
                    <div className="px-3 py-2">
                      <div className="line-clamp-1 text-xs font-semibold text-white">
                        {fav.movie.title}
                      </div>
                      <div className="mt-1 text-[10px] text-neutral-500">
                        Added on{" "}
                        {new Date(fav.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  
                )})}
              </div>
            )}
          </div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
            <div className="mb-4 text-sm font-semibold text-white">
              Edit profile
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-400">
                  Name
                </label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-400">
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-white outline-none focus:border-red-500"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
