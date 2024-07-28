import { FaHeart, FaUserCircle } from 'react-icons/fa';
import sample300Img from '../assets/images/sample-300.png';
import { AppLayout } from './Layouts/AppLayout';
import { useEffect } from 'react';
import PostController from '../controllers/PostController';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectPostLoading,
  selectPosts,
  setLoading,
  setPosts,
} from '@/redux/features/post/postSlice';
import { debugLog } from '@/utils/debug';

const Home = () => {
  const posts = useAppSelector(selectPosts);
  const isPostsLoading = useAppSelector(selectPostLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchPosts() {
      const res = await PostController.getPosts();
      debugLog('components/Home.tsx', res);
      if (res.data?.length) {
        dispatch(setPosts(res.data));
        dispatch(setLoading(false));
      }
    }

    fetchPosts();
  }, []);

  return (
    <AppLayout>
      {isPostsLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="h-full space-y-2 overflow-y-scroll">
          {posts.map(post => (
            <div
              key={post.uuid}
              className="flex flex-col bg-zinc-950"
            >
              <div className="min-h-[20px] p-4">
                <div className="flex items-center gap-2">
                  <FaUserCircle />
                  <p className="text-sm">{post.user?.name}</p>
                </div>
              </div>
              {post.images.map(image => (
                <img
                  key={image.uuid}
                  src={image.original_url || sample300Img}
                  className="aspect-square w-[full] object-cover"
                  alt="image"
                />
              ))}
              <div className="min-h-[20px] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{post.title}</p>
                  <FaHeart size={22} />
                </div>
                <p className="mt-4 text-xs">{post.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </AppLayout>
  );
};

export default Home;
