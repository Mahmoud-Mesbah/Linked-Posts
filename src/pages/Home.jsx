import { useEffect } from "react";
import {useDispatch,useSelector,} from "react-redux";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../reduxToolkit/postsSlice";
import PostSkeleton from "../components/Skeletons/PostSkeleton";
export default function Home() {

  const dispatch = useDispatch();

  const postsState = useSelector((state) => state.posts);
  const posts = postsState?.posts || [];
  const loading = postsState?.loading;
  const error = postsState?.error;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="pb-24">

      <div className="max-w-2xl mx-auto space-y-6">

        <CreatePost />

        {posts.length > 0 ? (

          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))

        ) : (

          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
            No Posts Yet
          </div>

        )}

      </div>

    </div>
  );
}