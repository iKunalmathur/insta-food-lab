import { useAppSelector } from '@/redux/hooks';
import { selectAuthUser, getStoreToken } from '@/redux/features/auth/authSlice';
import { AuthLayout } from '@/components/Layouts/AuthLayout';
import { ButtonLink } from '@/components/Elements/ButtonLink';
import BottomDrawer from '@/components/BottomDrawer';
import { useEffect, useState } from 'react';
import postService from '@/services/postService';
import { T_Post } from '@/types';
import { PostUpdate } from '@/components/PostUpdate';
import sampleImage from '@/assets/images/sample-300.png';

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<T_Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<T_Post>();

  const authUser = useAppSelector(selectAuthUser);
  const accessToken = useAppSelector(getStoreToken);

  async function handlePost(post: T_Post) {
    setSelectedPost(post);
    setIsOpen(true);
  }

  useEffect(() => {
    async function fetchPosts() {
      if (accessToken) {
        const res = await postService.fetchPosts();
        if (res.data?.length) {
          setPosts(res.data);
          setIsLoading(false);
        }
      }
    }

    fetchPosts();
  }, []);

  return (
    <AuthLayout>
      <div className="mt-8 p-2">
        <div className="flex items-center justify-between">
          <img
            src={authUser?.avatar}
            alt="profile"
            className="h-20 w-20 rounded-full"
          />
          <div className="text-center text-sm">
            <p>10</p>
            <p>Posts</p>
          </div>
          <div className="text-center text-sm">
            <p>10</p>
            <p>Followers</p>
          </div>
          <div className="text-center text-sm">
            <p>10</p>
            <p>Following</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-rose-600">{authUser?.name}</p>
          <p className="text-xs text-zinc-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum atque autem eius quas
            ratione. Blanditiis?
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <ButtonLink
            to="/"
            className="flex-1"
          >
            Share profile
          </ButtonLink>
          <ButtonLink
            to="/settings"
            className="flex-1"
          >
            Settings
          </ButtonLink>
        </div>
        <hr className="my-4" />
        <div>
          <div className="grid grid-cols-3 gap-2">
            {isLoading ? (
              <div>loading...</div>
            ) : (
              posts.map(post => (
                <div
                  key={post.uuid}
                  className="relative aspect-square w-full overflow-hidden bg-gray-100"
                >
                  <img
                    src={post.images.length ? post.images[0].original_url : sampleImage}
                    alt={post.title}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                    onClick={() => handlePost(post)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {selectedPost && <PostUpdate post={selectedPost} />}
      </BottomDrawer>
    </AuthLayout>
  );
};

export default ProfilePage;
