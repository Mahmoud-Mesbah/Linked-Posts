import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../reduxToolkit/postsSlice";
import commentsReducer from "../reduxToolkit/commentsSlice";
import authReducer from "../reduxToolkit/authSlice";
import userReducer from "../reduxToolkit/userSlice";


export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer,
    user: userReducer,
    

  },


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});