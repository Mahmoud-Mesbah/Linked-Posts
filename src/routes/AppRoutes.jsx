import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import PostDetails from "../pages/PostDetails";
import ChangePassword from "../pages/ChangePassword";
import EditPost from "../pages/EditPost";
import NotFound from "../pages/NotFound";
import SavedPosts from "../pages/SavedPosts";
import Settings from "../pages/Settings";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />

        <Route path="profile" element={<Profile />} />

        <Route path="post/:id" element={<PostDetails />} />

        <Route
          path="change-password"
          element={<ChangePassword />}
        />

        <Route
          path="edit-post/:id"
          element={<EditPost />}
        />
        <Route path="settings" element={<Settings />} />
     
        <Route
          path="saved-posts"
          element={<SavedPosts />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}