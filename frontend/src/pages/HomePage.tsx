import { AuthLayout } from '@/components/Layouts/AuthLayout';
import HomeFeed from '@/components/HomeFeed';
import postService from '@/services/postService';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Loading } from '@/components/Loading';
import { selectToken } from '@/redux/features/auth/authSlice';
import { T_Post } from '@/types';
export const HomePage = () => {
  const [posts, setPosts] = useState<T_Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAppSelector(selectToken);

  useEffect(() => {
    async function fetchPosts() {
      if (accessToken) {
        const res = await postService.fetchFeed();
        if (res.data?.length) {
          setPosts(res.data);
          setIsLoading(false);
        }
      }
    }

    fetchPosts();
  }, []);

  return <AuthLayout>{isLoading ? <Loading /> : <HomeFeed posts={posts} />}</AuthLayout>;
};
