
import {House,User,Lock,LogOut,Bookmark,Settings,} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Linked Posts
        </NavLink>

    
        <div className="hidden md:flex gap-6 items-center">

          <NavLink to="/" className="hover:text-blue-600">
            Home
          </NavLink>

          <NavLink to="/profile" className="hover:text-blue-600">
            Profile
          </NavLink>

          <NavLink to="/saved-posts" className="hover:text-blue-600">
            Saved Posts
          </NavLink>

          <NavLink to="/change-password" className="hover:text-blue-600">
            Password
          </NavLink>

          <NavLink to="/settings" className="hover:text-blue-600">
            Settings
          </NavLink>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"> Logout</button>

        </div>
      </div>

  
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-4 z-50">

        <NavLink to="/">
          <House />
        </NavLink>

        <NavLink to="/profile">
          <User />
        </NavLink>

        <NavLink to="/saved-posts">
          <Bookmark />
        </NavLink>

        <NavLink to="/change-password">
          <Lock />
        </NavLink>

        <NavLink to="/settings">
          <Settings />
        </NavLink>

        <button onClick={logout}>
          <LogOut />
        </button>

      </div>
    </nav>
  );
}