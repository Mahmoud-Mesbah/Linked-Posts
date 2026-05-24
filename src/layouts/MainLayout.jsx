import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 flex gap-6">
        <Sidebar />

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}