import connectionDatabase from '@/lib/mongoose';
import Comment from "@/models/Comment";
import { NextResponse } from 'next/server';


// export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
//     try {
//         await connectionDatabase();

//         const { id } = await params;

//         const comment = await Comment.findById(id);

//         if (!comment) {
//             return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
//         }

//         return NextResponse.json(comment, { status: 200 });
//     } catch (err) {
//         console.log(err);
//         return NextResponse.json({ error: 'Error fetching comment' }, { status: 500 });
//     }
// }


export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "No comment ID provided" }, { status: 400 });
        }
        const { content } = await request.json();
        await connectionDatabase();
        const updatedComment = await Comment.findByIdAndUpdate(id, { content }, { new: true, runValidators: true });

        if (!updatedComment) {
            return NextResponse.json(
                { error: "Comment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Comment updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating comment:", error);
        return NextResponse.json({ error: "Failed to update comment" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectionDatabase();
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return NextResponse.json(
                { error: "Comment not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
    }
}