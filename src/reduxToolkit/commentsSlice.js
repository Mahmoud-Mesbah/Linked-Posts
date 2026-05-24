import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

//! ================= GET COMMENTS =================
export const getPostComments =
  createAsyncThunk("comments/getPostComments",
    async (postId, thunkAPI) => {
      try {
        const { data } =
          await api.get(`/posts/${postId}/comments`);

        return (
          data?.comments || data?.data?.comments ||[]
        );

      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message );
      }
    }
  );

//! ================= CREATE COMMENT =================
export const createComment = createAsyncThunk("comments/createComment",
    async (values,thunkAPI) => {
      try {
        const { data } =
          await api.post(
            `/posts/${values.post}/comments`,
            {
              content:
                values.content,
            }
          );

        toast.success( "Comment Added" );

        return { comment: data?.comment || data?.data?.comment,postId: values.post,};

      } catch (error) {
        toast.error(error.response?.data ?.message);
        return thunkAPI.rejectWithValue( error.response?.data?.message );
      }
    }
  );

//! ================= DELETE COMMENT =================
export const deleteComment = createAsyncThunk( "comments/deleteComment",
  async ({ commentId, postId }, thunkAPI) => {
    try {
      await api.delete(
        `/posts/${postId}/comments/${commentId}`
      );

      toast.success("Comment Deleted");

      return commentId;
    } catch (error) {
      console.log(error.response?.data);
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const commentsSlice =
  createSlice({
    name: "comments",

    initialState,

    reducers: {
      clearComments: (state) => {
        state.comments = [];
      },

    },

    extraReducers: (builder) => {

      builder
        .addCase(getPostComments.pending, (state) => {
          state.loading = true;
        }
        )

        .addCase(
          getPostComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload;
          }
        )

        .addCase(getPostComments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
        )


        .addCase(createComment.fulfilled, (state, action) => {
          if (action.payload?.comment) {
            state.comments.unshift(action.payload.comment);
          }


          const postsState = window.__store?.getState?.()?.posts;

          if (postsState) {
            const post = postsState.posts.find(
              (p) => p._id === action.payload.postId
            );

            if (post) {
              post.commentsCount = (post.commentsCount || 0) + 1;
            }
          }
        })


        .addCase(deleteComment.fulfilled, (state, action) => {
          state.comments = state.comments.filter(
            (c) => c._id !== action.payload
          );
        })
    },
  });

export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;