import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../reduxToolkit/userSlice";

export default function ChangePassword() {
  const dispatch = useDispatch();

  const { register, handleSubmit,} = useForm();

  function onSubmit(values) {
    dispatch(changePassword(values));
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-5">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <input
          type="password"
          placeholder="Current Password"
          className="w-full border p-3 rounded-xl"
          {...register("password")}
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-3 rounded-xl"
          {...register("newPassword")}
        />
        <button className="bg-blue-600 text-white px-4 py-3 rounded-xl w-full">
          Update Password
        </button>
      </form>
    </div>
  );
}