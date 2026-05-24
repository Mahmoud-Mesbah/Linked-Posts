import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import {createComment, deleteComment, getPostComments,clearComments} from "../reduxToolkit/commentsSlice";

import { Trash2 } from "lucide-react";

export default function PostDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const comments = useSelector((state) => state.comments.comments);

  const posts = useSelector((state) => state.posts.posts);

  async function getSinglePost() {
    try {
      setLoading(true);
      const { data } = await api.get(`/posts/${id}`);
      console.log("POST RESPONSE:", data);
      const postData =data?.post ||data?.data?.post || data?.data || null;
      setPost(postData);
      setLoading(false);

    } catch (error) {
      console.log("POST ERROR:", error);
      setPost(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!id) return;

    getSinglePost();
    dispatch(getPostComments(id));

    return () => {
      dispatch(clearComments());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const updatedPost =
      posts.find(
        (p) => p._id === id
      );

    if (updatedPost) {
      setPost(updatedPost);
    }
  }, [posts, id]);

  if (loading) return <Loader />;

  if (!post) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Post not found
      </div>
    );
  }


  function handleAddComment(e) {
    e.preventDefault();

    if (!comment.trim()) return;

    dispatch(
      createComment({
        content: comment,
        post: id,
      })
    );

    setComment("");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <PostCard post={post} />

      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="text-2xl font-bold mb-6">
          Comments ({comments?.length || 0})
        </h2>

        <form
          onSubmit={handleAddComment}
          className="flex gap-3 mb-6"
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded-xl p-3 outline-none"
          />

          <button className="bg-blue-600 text-white px-5 rounded-xl"> Send</button>
        </form>


        <div className="space-y-4">

          {comments?.length === 0 ? (
            <p className="text-gray-500 text-center">
              No comments yet
            </p>
          ) : (
            comments?.map((comment) => (
              <div key={comment._id} className="border rounded-xl p-4" >

                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={comment?.commentCreator?.photo ||
                        "https://ui-avatars.com/api/?name=User"}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <div>
                      <h3 className="font-semibold">
                        {comment?.commentCreator?.name || "User"}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {comment?.content}
                      </p>
                    </div>

                  </div>

                  {comment?.commentCreator?._id === userData?._id && (
                    <button
                      onClick={() =>
                        dispatch(
                          deleteComment({
                            commentId: comment._id,
                            postId: id,
                          })
                        )
                      }
                      className="text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                </div>

              </div>

            ))
          )}

        </div>

      </div>

    </div>
  );
}