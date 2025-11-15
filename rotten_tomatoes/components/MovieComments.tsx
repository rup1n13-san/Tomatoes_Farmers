/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { FaReply, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaSave, FaTimes } from "react-icons/fa";
import useCommentStore from "@/lib/stores/commentStore";
import { useAuthStore } from "@/lib/useAuthStore";


interface Props {
  movieId: string;
}

export default function MovieComments({ movieId }: Props) {
  const { dataComment, isLoading, error, fetchComment, addComment, editComment, deleteComment } = useCommentStore();
  const { user } = useAuthStore();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchComment(movieId);
  }, [movieId]);

  const handleUpdate = async (id: string) => {
    if (!editText.trim()) return;
    editComment(id, editText);
    setEditingCommentId(null);
    setEditText("");
    fetchComment(movieId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditText("");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    deleteComment(id);
    fetchComment(movieId);
  };

  const handleOpenReplyModal = (id: string) => {
    setReplyToId(id);
    setReplyText("");
    setReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    if (!replyText.trim() || !replyToId) return;
    addComment(movieId, replyText, user?.id, replyToId);
    setReplyModalOpen(false);
    fetchComment(movieId);
  };

  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleString();

  const renderReplies = (parentId: string) => {
    return dataComment
      .filter(c => String(c.parentComment) === String(parentId))
      .map(reply => {
        const parentComment = dataComment.find(c => String(c._id) === String(reply.parentComment));
        return (
          <div key={reply._id} className="flex mt-3 ml-6">
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold shadow-sm">
                {reply.author?.name?.[0]}
              </div>
            </div>

            <div className="flex-1 ml-3">
              <div className="bg-gray-800 dark:bg-gray-900 p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm text-gray-200">{reply.author?.name}</span>
                  <span className="text-xs text-gray-400">{formatDate(reply.createdAt)}</span>
                </div>

                {editingCommentId === reply._id ? (
                  <div className="flex flex-col space-y-2">
                    <textarea
                      className="w-full p-2 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <button
                        className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
                        onClick={() => handleUpdate(reply._id)}
                      >
                        <FaSave /> Save
                      </button>
                      <button
                        className="flex items-center gap-1 px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                        onClick={handleCancelEdit}
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-100 text-sm">
                    {parentComment ? <span className="font-bold text-gray-300">@{parentComment.author.name}: </span> : ""}
                    {reply.content}
                  </p>
                )}
              </div>

              <div className="flex space-x-3 text-sm mt-2 ml-1 text-gray-400">
                <button onClick={() => handleOpenReplyModal(reply._id)} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                  <FaReply /> Reply
                </button>
                {editingCommentId !== reply._id && (
                  <button
                    onClick={() => { setEditingCommentId(reply._id); setEditText(reply.content); }}
                    className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                  >
                    <FaEdit /> Edit
                  </button>
                )}
                <button onClick={() => handleDelete(reply._id)} className="flex items-center gap-1 hover:text-red-600 transition-colors">
                  <FaTrash /> Delete
                </button>
              </div>

              {renderReplies(reply._id)}
            </div>
          </div>
        );
      });
  };

  return (
    <div className="container mx-auto px-6 md:px-10 mt-10 text-gray-100 mb-30">
      <h3 className="text-2xl font-bold mb-6">Comments ({dataComment?.length || 0})</h3>


      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!replyText.trim()) return;
          addComment(movieId, replyText, user?.id, replyToId);
          setReplyText("");
          setReplyToId(null);
          fetchComment(movieId);
        }}
        className="pb-10"
      >
        <textarea
          className="w-full p-4 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-200 mb-3"
          rows={5}
          placeholder="Write a comment..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          required
        />
        <div className="flex items-center space-x-3">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors"
          >
            Post Comment
          </button>
        </div>
      </form>

      {isLoading && <p className="text-gray-400">Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-5">
        {dataComment.filter(c => !c.parentComment).map(comment => (
          <div key={comment._id} className="flex flex-col space-y-2">
            <div className="flex">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold shadow">
                  {comment.author?.name?.[0]}
                </div>
              </div>
              <div className="flex-1 ml-3">
                <div className="bg-gray-800 dark:bg-gray-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-200">{comment.author?.name}</span>
                    <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                  </div>

                  {editingCommentId === comment._id ? (
                    <div className="flex flex-col space-y-2">
                      <textarea
                        className="w-full p-2 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <button
                          className="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-green-700 text-white rounded-md"
                          onClick={() => handleUpdate(comment._id)}
                        >
                          <FaSave /> Save
                        </button>
                        <button
                          className="flex items-center gap-1 px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                          onClick={handleCancelEdit}
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-100">{comment.content}</p>
                  )}
                </div>

                <div className="flex space-x-3 text-sm mt-2 ml-1 text-gray-400">
                  <button onClick={() => handleOpenReplyModal(comment._id)} className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <FaReply /> Reply
                  </button>
                  {editingCommentId !== comment._id && (
                    <button
                      onClick={() => { setEditingCommentId(comment._id); setEditText(comment.content); }}
                      className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                    >
                      <FaEdit /> Edit
                    </button>
                  )}
                  <button onClick={() => handleDelete(comment._id)} className="flex items-center gap-1 hover:text-red-600 transition-colors">
                    <FaTrash /> Delete
                  </button>
                  {dataComment.some(c => String(c.parentComment) === String(comment._id)) && (
                    <button
                      className="flex items-center gap-1 hover:text-gray-200 transition-colors"
                      onClick={() => setShowReplies(prev => ({ ...prev, [comment._id]: !prev[comment._id] }))}
                    >
                      {showReplies[comment._id] ? <FaChevronUp /> : <FaChevronDown />}
                      {showReplies[comment._id] ? "Hide Replies" : "Show Replies"}
                    </button>
                  )}
                </div>

                {showReplies[comment._id] && renderReplies(comment._id)}
              </div>
            </div>
          </div>
        ))}
      </div>


      {replyModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-full mx-[5%] lg:mx-[25%] shadow-lg">
            <h3 className="text-lg font-bold text-gray-100 mb-3">Reply</h3>
            <textarea
              className="w-full p-3 rounded-md bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600 mb-3"
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-700"
                onClick={() => setReplyModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700"
                onClick={handleSendReply}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
