import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="text-gray-500 mt-3">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        Back Home
      </Link>
    </div>
  );
}