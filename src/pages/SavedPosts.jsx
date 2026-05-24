import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";

export default function SavedPosts() {
  const savedPosts = useSelector(
    (state) => state.posts.savedPosts
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">
        Saved Posts
      </h1>

      {savedPosts?.length === 0 ? (
        <p className="text-gray-500 text-center">
          No saved posts yet
        </p>
      ) : (
        savedPosts.map((post , i) => (
          <PostCard key={post._id } post={post} />
        ))
      )}

    </div>
  );
}