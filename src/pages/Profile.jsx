import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileData, updateProfilePhoto } from "../reduxToolkit/userSlice";
import { getAllPosts } from "../reduxToolkit/postsSlice";
import Loader from "../components/Loader";
import PostCard from "../components/PostCard";
import { updateProfileName } from "../reduxToolkit/userSlice";

import { Calendar, Camera, Mail, User, } from "lucide-react";

export default function Profile() {

  const [name, setName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { user, loading } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getProfileData());
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user]);

  if (loading || !user) return <Loader />;

  const myPosts = posts.filter(
    (post) => post.user?._id === user._id
  );

  async function handleUpdateName() {
    if (!name.trim()) return;
  
    const result = await dispatch(updateProfileName(name));
  
    if (result?.payload) {
      setEditMode(false);
    }
  }

  function handleUploadPhoto(e) {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    dispatch(updateProfilePhoto(selectedFile));
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">


      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <div className="h-52 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="px-6 pb-8 relative">


          <div className="relative w-fit -mt-20 group">

            <img
              src={user.photo}
              className="w-40 h-40 rounded-full border-4 border-white object-cover"
              alt="profile"
            />


            <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full">
              <Camera />

              <input
                type="file"
                className="hidden"
                onChange={handleUploadPhoto}
              />
            </label>

          </div>


          <div className="mt-6 space-y-4">

            <div className="flex items-center gap-3">
              <User size={20} />

              {editMode ? (
                <div className="flex items-center gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-3 py-1 rounded"
                  />

                  <button
                    onClick={handleUpdateName}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="text-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">
                    {user.name}
                  </h2>

                  <button
                    onClick={() => setEditMode(true)}
                    className="text-blue-600 text-sm"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={18} />
              <p>{user.email}</p>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <Calendar size={18} />
              <p>
                {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "No date"}
              </p>
            </div>

          </div>

        </div>
      </div>


      <div className="space-y-4">

        <h2 className="text-2xl font-bold">
          My Posts
        </h2>

        {myPosts.length > 0 ? (
          myPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <div className="bg-white p-6 rounded-2xl text-center text-gray-500">
            You haven't posted anything yet
          </div>
        )}

      </div>

    </div>
  );
}