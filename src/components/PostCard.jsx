import {
  Heart,
  MessageCircle,
  Trash2,
  Pencil,
  Bookmark,
  Share2,
} from "lucide-react";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost, bookmarkPost } from "../reduxToolkit/postsSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user") || "{}");

  const savedPosts = useSelector((state) => state.posts.savedPosts);

  const isLiked = post.likes?.some( (like) =>
   like === userData?._id || like?._id === userData?._id);

  const isSaved = savedPosts.some((p) => p._id === post._id);

  async function handleShare() {
    const postLink = `${window.location.origin}/post/${post._id}`;
    await navigator.clipboard.writeText(postLink);
    toast.success("Link Copied");
  }

  if (!post?._id || !post?.user) return null;

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={
              post.user.photo ||
              `https://ui-avatars.com/api/?name=${post.user.name}`
            }
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h3 className="font-bold">{post.user.name}</h3>
            <p className="text-sm text-gray-500">
              {post.createdAt
                ? format(new Date(post.createdAt), "PPP")
                : ""}
            </p>
          </div>
        </div>

        {post.user._id === userData?._id && (
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(`/edit-post/${post._id}`)}>
              <Pencil size={18} />
            </button>

            <button
              onClick={() => dispatch(deletePost(post._id))}
              className="text-red-500"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="px-4 pb-4">
        <p className="mb-4 whitespace-pre-line">{post.body}</p>

        {post.image && (
          <img
            src={post.image}
            className="w-full rounded-2xl max-h-[500px] object-cover"
          />
        )}
      </div>

      {/* ACTIONS */}
      <div className="border-t p-4 flex justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => dispatch(likePost(post._id))}
            className="flex items-center gap-2"
          >
            <Heart
              className={isLiked ? "fill-red-500 text-red-500" : ""}
            />
            <span>{post.likes?.length || 0}</span>
          </button>

          <button
            onClick={() => navigate(`/post/${post._id}`)}
            className="flex items-center gap-2"
          >
            <MessageCircle />
            <span>{post.commentsCount ?? 0}</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(bookmarkPost(post))}
          >
            <Bookmark
              className={
                isSaved ? "fill-yellow-400 text-yellow-500" : ""
              }
            />
          </button>

          <button onClick={handleShare}>
            <Share2 />
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostCard);