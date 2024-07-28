import { configureStore } from '@reduxjs/toolkit';
import postReducer from '@/redux/features/post/postSlice';
import authReducer from '@/redux/features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
