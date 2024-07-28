import { SubmitHandler, useForm } from 'react-hook-form';
import { T_Post } from '../types';
import PostController from '../controllers/PostController';
import formData from '../utils/formData';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addPost } from '@/redux/features/post/postSlice';
import { debugLog } from '@/utils/debug';
import Input from './Elements/Input';
import { useEffect } from 'react';
import { Button } from './Elements/Button';
import { selectToken } from '@/redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export const PostCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T_Post>();

  const accessToken = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<T_Post> = async data => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    data = formData(data);
    const res = await PostController.createPost(data, accessToken);
    if (res.status === 'success') {
      debugLog('components/PostCreate.tsx', res.data);
      dispatch(addPost(res.data));
    }

    reset();
  };

  return (
    <section id="post-create">
      <form
        className="m-1 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* images */}
        <Input
          label="Select Images"
          type="file"
          placeholder="Select Images"
          note="Max 5 images allowed"
          multiple
          accept="image/png, image/jpeg"
          {...register('images', {
            required: {
              value: true,
              message: 'This field is required',
            },
          })}
          error={errors.images?.message}
        />
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
              value: 1,
              message: 'Rating must be between 1 and 5',
            },
            max: {
              value: 5,
              message: 'Rating must be between 1 and 5',
            },
          })}
          error={errors.rating?.message}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};
