import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, } from "../reduxToolkit/commentsSlice";
import { Send, Trash2, } from "lucide-react";

export default function CommentSection({ postId }) {

  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comments);

  const [content, setContent] = useState("");


  const userData = useSelector((state) => state.auth.user);
  function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) return;

    dispatch(createComment({ content, post: postId, }));

    setContent("");
  }


  return (
    <div className="bg-white rounded-3xl shadow p-5">

      <h2 className="text-2xl font-bold mb-6">
        Comments
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 mb-8"
      >
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 border border-gray-200 rounded-2xl p-4 outline-none focus:border-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl transition"
        >
          <Send size={20} />

        </button>

      </form>



      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (

            <div
              key={comment._id}
              className="border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
            >

              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">

                  <img
                    src={
                      comment.commentCreator.photo ||
                      `https://ui-avatars.com/api/?name=${comment.commentCreator.name}`
                    }
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>

                    <h3 className="font-bold">
                      {comment.commentCreator.name}
                    </h3>

                    <p className="text-gray-600 mt-1 break-words">
                      {comment.content}
                    </p>

                  </div>

                </div>
                {comment?.commentCreator?._id === userData?._id && (
                  <button
                    onClick={() =>
                      dispatch(deleteComment(comment?._id))
                    }
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

              </div>

            </div>

          ))
        ) : (
          <div className="text-center py-10 text-gray-500"> No comments yet</div>)}

      </div>
    </div>
  );
}