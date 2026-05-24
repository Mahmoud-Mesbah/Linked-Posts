import {House, User, Lock, Bookmark,Settings,LogOut,} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";


//! ================= SAFE PARSE =================
const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
};

export default function Sidebar() {
  const navigate = useNavigate();
  const user = safeParse(localStorage.getItem("user"));

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  }

  const links = [
    {
      id: 1,
      title: "Home",
      icon: <House size={20} />,
      path: "/",
    },
    {
      id: 2,
      title: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      id: 3,
      title: "Change Password",
      icon: <Lock size={20} />,
      path: "/change-password",
    },
    {
      id: 4,
      title: "Saved Posts",
      icon: <Bookmark size={20} />,
      path: "/saved-posts",
    },
    {
      id: 5,
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside className="hidden lg:block w-[280px] sticky top-24 h-fit">
      <div className="bg-white rounded-3xl shadow p-5">
        
      
        <div className="flex items-center gap-4 border-b pb-5">
          <img
            src={
              user?.photo ||
              `https://ui-avatars.com/api/?name=${user?.name || "User"}`
            }
            alt="user"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <h2 className="font-bold text-lg">
              {user?.name || "Guest"}
            </h2>

            <p className="text-sm text-gray-500">
              {user?.email.split('@', 2).join('@ ') || "No email"}
            </p>
          </div>
        </div>

      
        <div className="mt-6 flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>`flex items-center gap-3 p-4 rounded-2xl transition
                ${isActive? "bg-blue-600 text-white": "hover:bg-gray-100 text-gray-700"}`
              }
            >
              {link.icon}
              <span>{link.title}</span>
            </NavLink>
          ))}

        
          <button
            onClick={logout}
            className="flex items-center gap-3 p-4 rounded-2xl hover:bg-red-100 text-red-500 transition mt-3"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}