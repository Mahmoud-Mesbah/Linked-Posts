import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { createPost } from "../reduxToolkit/postsSlice";

export default function CreatePost() {
  const dispatch = useDispatch();

  const { createLoading } = useSelector((state) => state.posts);
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();

    if (!body.trim() && !image)
      return;

    const formData = new FormData();
    formData.append("body", body);
    if (image && !image.type.startsWith("image/")) {
      return;
    }

    if (image) {
      formData.append("image", image);
    }

    const result = await dispatch(createPost(formData));

    if (result.meta.requestStatus === "fulfilled") {
      setBody("");
      setImage(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-2xl shadow"
    >
      <textarea
        placeholder="What's on your mind?"
        className="w-full border rounded-xl p-4 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
        value={body}
        onChange={(e) =>
          setBody(e.target.value)
        }
      />

      <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mt-4">
        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
        />

        <button
          disabled={createLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70"
        >
          {createLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Post"
          )}
        </button>
      </div>
    </form>
  );
}