import connectionDatabase from "@/lib/mongoose";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";


export async function POST(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    await connectionDatabase();

    const { movieId } = await params;
    const { content, author, parentComment } = await request.json();


    if (!content || !author) {
      return NextResponse.json({ error: "Content and author are required" }, { status: 400 });
    }

    const newComment = new Comment({
      content,
      author,
      movie: movieId,
      parentComment: parentComment || null,
    });

    console.log(newComment)

    const savedComment = await newComment.save();

    console.log("resultat",savedComment)
    return NextResponse.json(savedComment, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Error while adding comment" }, { status: 500 });
  }
}



export async function GET(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    await connectionDatabase();

    const { movieId } = await params;

    const comments = await Comment.find({ movie: movieId })
      .populate("author", "name email")
      .sort({ createdAt: 1 });
    console.log(comments)
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return NextResponse.json(
      { error: "Error fetching comments" },
      { status: 500 }
    );
  }
}