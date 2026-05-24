import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reduxToolkit/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const {register, handleSubmit,formState: { errors },} = useForm();

  async function onSubmit(values) {
    const result = await dispatch(loginUser(values));
  
    if (
      loginUser.fulfilled.match(result)
    ) {
      navigate("/", { replace: true,});
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", {replace: true, });    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">
          Login
        </h2>

        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="mx-auto animate-spin" /> ) : ( "Login" )}
        </button>

        <p className="text-center">
          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}