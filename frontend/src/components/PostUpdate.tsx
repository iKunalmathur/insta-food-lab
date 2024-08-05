import { SubmitHandler, useForm } from 'react-hook-form';
import { T_PostCreate, T_Post } from '@/types';
import postService from '@/services/postService';
import formData from '@/utils/formData';
import { useAppSelector } from '@/redux/hooks';
import Input from '@/components/Elements/Input';
import Button from '@/components/Elements/Button';
import { selectToken } from '@/redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import sampleImage from '@/assets/images/sample-300.png';
import { useEffect, useMemo, useState } from 'react';

export const PostUpdate = ({ post }: { post: T_Post }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T_PostCreate>({
    defaultValues: useMemo(() => {
      return {
        title: post.title,
      };
    }, [post]),
  });

  const accessToken = useAppSelector(selectToken);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<T_PostCreate> = async data => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    data = formData(data);

    const res = await postService.updatePost(post.uuid, data);
    if (res.status === 'success') {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      title: post.title,
      description: post.description,
      price_and_quantity: post.price_and_quantity,
      location: post.location,
      tags: post.tags,
      rating: post.rating,
    });
  }, [post, reset]);

  return (
    <section id="post-create">
      <form
        className="m-1 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* images */}
        <div className="rounded-md border-2 border-dashed border-zinc-300 p-1">
          <img
            src={post.images.length ? post.images[0].original_url : sampleImage}
            alt={post.title}
            className="h-[300px] w-full rounded-md object-cover"
          />
        </div>
        {/* title */}
        <Input
          label="Title"
          type="text"
          {...register('title', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          error={errors.title?.message}
        />
        {/* description */}
        <Input
          label="Description"
          type="text"
          {...register('description', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          error={errors.description?.message}
        />
        {/* price and quantity */}
        <Input
          label="Price & Quantity"
          type="text"
          {...register('price_and_quantity', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          error={errors.price_and_quantity?.message}
        />
        {/* location */}
        <Input
          label="Location"
          type="text"
          {...register('location', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          error={errors.location?.message}
        />
        {/* tags */}
        <Input
          label="Tags"
          type="text"
          placeholder="tag1, tag2, tag3"
          note='Separate tags with ","'
          {...register('tags', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          error={errors.tags?.message}
        />
        {/* rating */}
        <Input
          label="Rating"
          type="number"
          note="Rating must be between 1 and 5"
          {...register('rating', {
            required: {
              value: true,
              message: 'This field is required',
            },
            min: {
              value: 1.0,
              message: 'Rating must be between 1 and 5',
            },
            max: {
              value: 5.0,
              message: 'Rating must be between 1 and 5',
            },
          })}
          error={errors.rating?.message}
        />
        <Button
          type="submit"
          className="w-full"
        >
          {isLoading ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </section>
  );
};
