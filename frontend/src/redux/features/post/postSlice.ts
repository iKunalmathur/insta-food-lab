import { createSlice } from '@reduxjs/toolkit';
import { T_Post } from '@/types';

type T_InitialState = {
  posts: T_Post[];
  activePost: T_Post | null;
  loading: boolean;
  error: string | null;
};

const initialState: T_InitialState = {
  posts: [],
  activePost: null,
  loading: true,
  error: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: { payload: T_Post[] }) => {
      state.posts = action.payload;
    },
    setActivePost: (state, action) => {
      state.activePost = action.payload;
    },
    addPost: (state, action: { payload: T_Post }) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: { payload: { uuid: string } }) => {
      state.posts = state.posts.filter(post => post.uuid !== action.payload.uuid);
    },
    updatePost: (state, action: { payload: T_Post }) => {
      const index = state.posts.findIndex(post => post.uuid === action.payload.uuid);
      state.posts[index] = action.payload;
    },
  },
});

export const { setPosts, setActivePost, addPost, removePost,updatePost } =
  postSlice.actions;

export default postSlice.reducer;

// getters
export const getStorePosts = (state: { post: T_InitialState }) => state.post.posts;
export const getStoreActivePost = (state: { post: T_InitialState }) => state.post.activePost;
export const getStorePost = (state: { post: T_InitialState }, uuid: string) =>
  state.post.posts.find(post => post.uuid === uuid);
