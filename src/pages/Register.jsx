import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../reduxToolkit/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  async function onSubmit(values) {
    const result = await dispatch(
      registerUser(values)
    );

    if (
      registerUser.fulfilled.match(result)
    ) {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center">
          Register
        </h2>

        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            {...register("name", {
              required: "Name is required",
            })}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

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
            {...register("password", { required: "Password is required", minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            {...register("rePassword", {required: "Confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
          />

          {errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rePassword.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="date"
            className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            {...register("dateOfBirth", { required: "Date of birth required", })}
          />
        </div>

        <select
          className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          {...register("gender")}
        >
          <option value="male">Male</option>

          <option value="female">Female</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center">
          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}