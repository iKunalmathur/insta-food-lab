import { FaHeart, FaUserCircle } from 'react-icons/fa';
import sample300Img from '../assets/images/sample-300.png';
import { AppLayout } from './Layouts/AppLayout';
import { useEffect, useState } from 'react';
import PostController from '../controllers/PostController';
import { T_Post, T_Image } from '../types';

const Home = () => {
  const [posts, setPosts] = useState<T_Post<T_Image[]>[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const Post = new PostController();
      const res = await Post.getPosts();
      console.log(res);

      setPosts(res.data);
    }

    fetchPosts();
  }, []);

  return (
    <AppLayout>
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
    </AppLayout>
  );
};

export default Home;
