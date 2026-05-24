import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const syncSavedToLocalStorage = (saved) => {
  localStorage.setItem("savedPosts", JSON.stringify(saved));
};

const initialState = {
  posts: [],
  savedPosts: JSON.parse(localStorage.getItem("savedPosts") || "[]"),
  loading: false,
  createLoading: false,
  deleteLoading: false,
  error: null,
};

//! ================= GET POSTS =================
export const getAllPosts = createAsyncThunk("posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/posts?limit=50");
      return data?.posts || data?.data?.posts || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

//! ================= CREATE POST =================
export const createPost = createAsyncThunk("posts/createPost",
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post("/posts", formData);
      toast.success("Post Created");
      return data?.post || data?.data?.post;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

//! ================= DELETE POST =================
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, thunkAPI) => {
    try {
      await api.delete(`/posts/${postId}`);
      toast.success("Post Deleted");
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

//! ================= LIKE POST =================
export const likePost = createAsyncThunk("posts/likePost",
  async (postId, thunkAPI) => {
    try {
      const { data } = await api.put(`/posts/${postId}/like`);
      return {
        postId,
        likes: data?.post?.likes || data?.data?.post?.likes || [],
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

//! ================= UPDATE POST =================
export const updatePost = createAsyncThunk("posts/updatePost",
  async ({ id, formData }, thunkAPI) => {
    try {
      const { data } = await api.put(`/posts/${id}`, formData);
      toast.success("Post Updated");
      return data?.post || data?.data?.post;
    } catch (error) {
      toast.error(error.response?.data?.message);
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

//* ================= BOOKMARK =================
export const bookmarkPost = createAsyncThunk("posts/bookmarkPost",
  async (post, thunkAPI) => post
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift({
          ...action.payload,
          commentsCount: 0,
        });
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (p) => p._id !== action.payload
        );
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find(
          (p) => p._id === action.payload.postId
        );

        if (post) {
          post.likes = action.payload.likes;
        }
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })

      .addCase(bookmarkPost.fulfilled, (state, action) => {
        const post = action.payload;

        const exists = state.savedPosts.find(
          (p) => p._id === post._id
        );

        if (exists) {
          state.savedPosts = state.savedPosts.filter(
            (p) => p._id !== post._id
          );
          toast.success("Removed From Saved");
        } else {
          state.savedPosts.push(post);
          toast.success("Saved Successfully");
        }

        syncSavedToLocalStorage(state.savedPosts);
      });
  },
});

export default postsSlice.reducer;