import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/redux/features/counter/counterSlice';
import postReducer from '@/redux/features/post/postSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    post: postReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
