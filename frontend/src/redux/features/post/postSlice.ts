import { createSlice } from '@reduxjs/toolkit';
import { T_PostDB } from '@/types';

type T_InitialState = {
  posts: T_PostDB[];
  activePost: T_PostDB | null;
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
    setPosts: (state, action: { payload: T_PostDB[] }) => {
      state.posts = action.payload;
    },
    setActivePost: (state, action) => {
      state.activePost = action.payload;
    },
    addPost: (state, action: { payload: T_PostDB }) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state, action: { payload: { uuid: string } }) => {
      state.posts = state.posts.filter(post => post.uuid !== action.payload.uuid);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, setActivePost, addPost, removePost, setLoading, setError } =
  postSlice.actions;

export default postSlice.reducer;

// getters
export const selectPosts = (state: { post: T_InitialState }) => state.post.posts;
export const selectActivePost = (state: { post: T_InitialState }) => state.post.activePost;
export const selectPost = (state: { post: T_InitialState }, uuid: string) =>
  state.post.posts.find(post => post.uuid === uuid);
export const selectPostLoading = (state: { post: T_InitialState }) => state.post.loading;
export const selectPostError = (state: { post: T_InitialState }) => state.post.error;
