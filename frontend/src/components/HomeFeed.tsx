import { T_Post } from '@/types';
import { FaHeart, FaUserCircle } from 'react-icons/fa';
import StarRating from './StarRating';
import sampleImage from '@/assets/images/sample-300.png';
import postService from '@/services/postService';
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import {getStorePosts, updatePost} from "@/redux/features/post/postSlice.ts";

const HomeFeed = () => {
    const posts = useAppSelector(getStorePosts);
    const dispatch = useAppDispatch();
  async function handleLike(post: T_Post) {
      const res = await postService.likePost(post.uuid);
      dispatch(updatePost(res.data));
  }

  return (
    <div className="h-full overflow-y-scroll">
      {posts.map(post => (
        <div
          key={post.uuid}
          className="flex flex-col border-b bg-zinc-50"
        >
          <div className="min-h-[20px] p-2">
            <div className="flex items-center gap-2">
              <FaUserCircle />
              <p className="text-sm">{post.user?.name}</p>
            </div>
            <p className="mt-2 text-xs">{post.title}</p>
          </div>
          <img
            src={post.images.length ? post.images[0].original_url : sampleImage}
            className="aspect-square w-[full] object-cover"
            alt="image"
          />
          <div className="min-h-[20px] p-2">
            <div className="flex justify-between">
              <div>
                {post.is_already_liked ? (
                  <FaHeart
                    className="cursor-pointer text-red-500"
                    onClick={() => handleLike(post)}
                  />
                ) : (
                  <FaHeart
                    className="cursor-pointer"
                    onClick={() => handleLike(post)}
                  />
                )}
                <span className="text-xs">{post.likes} likes</span>
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

export default HomeFeed;
