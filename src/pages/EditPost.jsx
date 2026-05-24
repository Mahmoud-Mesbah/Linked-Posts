import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import {useNavigate,useParams,} from "react-router-dom"
import api from "../api/axiosInstance";
import Loader from "../components/Loader";
import {updatePost,} from "../reduxToolkit/postsSlice";
import toast from "react-hot-toast";
export default function EditPost() {

  const { id } =useParams();
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] =useState(true);
  const [body, setBody] = useState("");

  const [image, setImage] =useState(null);
  const userData = JSON.parse( localStorage.getItem("user") ||"{}");

  async function getPost() {

    try {
setLoading(true);
      const { data } =await api.get(`/posts/${id}`);

      console.log("EDIT POST RESPONSE:",data );

      const post =data?.post ||data?.data?.post ||data?.data;

      if (!post) {
        toast.error("Post Not Found");
        navigate("/");

        return;
      }

   
      const ownerId =post?.user?._id ||post?.user?.id;

      if ( ownerId !==userData?._id ) {
        toast.error("Unauthorized");
        navigate("/");
        return;
      }
      setBody(post.body || "");

    } catch (error) {
      console.log(error);
      toast.error("Failed To Load Post");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim() &&!image) {
      return;
    }

    const formData =new FormData();

    formData.append("body",body);

    if (image) {
      formData.append("image",image);
    }

    const result =
      await dispatch(
        updatePost({
          id,
          formData,
        })
      );

    if (result.meta.requestStatus ==="fulfilled") {
      navigate("/");
    }
  }

  if (loading)
    return <Loader />;
  return (
    <div className="max-w-2xl mx-auto">

      <form
        onSubmit={ handleSubmit}
        className="bg-white p-6 rounded-3xl shadow"
      >
        <h2 className="text-3xl font-bold mb-6">
          Edit Post
        </h2>
        <textarea
          className="w-full border rounded-2xl p-4 min-h-[180px] outline-none focus:ring-2 focus:ring-blue-500"
          value={body}
          onChange={(e) =>setBody(e.target.value)}
        />
        <input
          type="file"
          className="mt-4"
          accept="image/*"
          onChange={(e) =>setImage(e.target.files[0])}
        />
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
          Save Changes
        </button>
      </form>

    </div>
  );
}