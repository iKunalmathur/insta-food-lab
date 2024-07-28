import { AuthLayout } from '@/components/Layouts/AuthLayout';
import { Posts } from '@/components/Posts';
import PostController from '@/controllers/PostController';
import { useEffect } from 'react';
import {
  selectPostLoading,
  selectPosts,
  setLoading,
  setPosts,
} from '@/redux/features/post/postSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Loading } from '@/components/Loading';
import { selectToken } from '@/redux/features/auth/authSlice';
export const HomePage = () => {
  const posts = useAppSelector(selectPosts);
  const isPostsLoading = useAppSelector(selectPostLoading);
  const accessToken = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchPosts() {
      if (accessToken) {
        const res = await PostController.getPosts(accessToken);
        if (res.data?.length) {
          dispatch(setPosts(res.data));
          dispatch(setLoading(false));
        }
      }
    }

    fetchPosts();
  }, []);

  return <AuthLayout>{isPostsLoading ? <Loading /> : <Posts posts={posts} />}</AuthLayout>;
};
