import { AuthLayout } from '@/components/Layouts/AuthLayout';
import HomeFeed from '@/components/HomeFeed';
import postService from '@/services/postService';
import { useEffect, useState } from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import { Loading } from '@/components/Loading';
import { getStoreToken } from '@/redux/features/auth/authSlice';
import {setPosts} from "@/redux/features/post/postSlice.ts";
export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAppSelector(getStoreToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchPosts() {
      if (accessToken) {
        const res = await postService.fetchFeed();
        if (res.data?.length) {
          dispatch(setPosts(res.data));
          setIsLoading(false);
        }
      }
    }

    fetchPosts();
  }, []);

  return <AuthLayout>{isLoading ? <Loading /> : <HomeFeed />}</AuthLayout>;
};
