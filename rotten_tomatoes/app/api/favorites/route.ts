/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectionDatabase from "../../../lib/mongoose";
import Favorite from "@/models/Favorite";

function getUserIdFromRequest() {
  return null;
}

export async function POST(req: Request) {
  await connectionDatabase();
  const body = await req.json();
  const movieId = body?.movieId as string;
  const userId = getUserIdFromRequest() || body?.userId;

  if (!userId || !movieId) {
    return NextResponse.json(
      { error: "userId and movieId required" },
      { status: 400 }
    );
  }

  try {
    const fav = await Favorite.create({ user: userId, movie: movieId });
    return NextResponse.json(fav, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ ok: true, already: true });
    }
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await connectionDatabase();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId"); 

  if (!userId) {
    return NextResponse.json(
      { error: "userId param required" },
      { status: 400 }
    );
  }

  const favorites = await Favorite.find({ user: userId })
    .populate("movie")
    .sort({ createdAt: -1 });

  return NextResponse.json(favorites);
}

// Toggle (ajoute si pas, supprime si déjà présent)
export async function PATCH(req: Request) {
  await connectionDatabase();
  const body = await req.json();
  const movieId = body?.movieId as string;
  const userId = getUserIdFromRequest() || body?.userId;

  if (!userId || !movieId) {
    return NextResponse.json(
      { error: "userId and movieId required" },
      { status: 400 }
    );
  }

  const existing = await Favorite.findOne({ user: userId, movie: movieId });

  if (existing) {
    await Favorite.deleteOne({ _id: existing._id });
    return NextResponse.json({ toggled: "removed" });
  } else {
    const fav = await Favorite.create({ user: userId, movie: movieId });
    return NextResponse.json({ toggled: "added", favorite: fav });
  }
}
