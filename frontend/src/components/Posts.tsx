import { T_Image, T_Post } from '@/types';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import defaultImage from '../assets/images/sample-300.png';
import StarRating from './StarRating';

export const Posts = ({ posts }: { posts: T_Post<T_Image[]>[] }) => {
  return (
    <div className="h-full overflow-y-scroll">
      {posts.map(post => (
        <div
          key={post.uuid}
          className="flex flex-col border-b bg-zinc-50"
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
              src={image.original_url || defaultImage}
              className="aspect-square w-[full] object-cover"
              alt="image"
            />
          ))}
          <div className="min-h-[20px] p-4">
            <div className="flex justify-between">
              <div>
                <FaHeart
                  size={22}
                  className="text-zinc-300"
                />
                <span className="text-xs">100 likes</span>
              </div>
              <div className="text-sm">
                <StarRating rating={post.rating} />
                <span className="text-xs">{post.rating}</span>
              </div>
            </div>
            <p className="mt-4 text-xs">{post.location}</p>
            <p className="mt-4 text-xs">{post.price_and_quantity}</p>
            <p className="mt-4 text-xs text-zinc-500">{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
