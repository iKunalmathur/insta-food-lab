import { SubmitHandler, useForm } from 'react-hook-form';
import { T_Post } from '../types';
import PostController from '../controllers/PostController';
import formData from '../utils/formData';

export const PostCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T_Post>();

  const onSubmit: SubmitHandler<T_Post> = async data => {
    const Post = new PostController();
    data = formData(data);
    const res = await Post.createPost(data);
    console.log({ res });
  };

  return (
    <section id="post-create">
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="image">Select Images</label>
          <input
            className="border-2 bg-white p-2"
            type="file"
            accept="image/png, image/jpeg"
            multiple
            {...register('images', { required: true })}
          />
          {errors.images && <span className="text-sm text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: true })}
          />
          {errors.title && <span className="text-sm text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            {...register('description', { required: true })}
          />
          {errors.description && <span className="text-sm text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="price_and_quantity">Price and Quantity</label>
          <input
            type="text"
            id="price_and_quantity"
            {...register('price_and_quantity', { required: true })}
          />
          {errors.price_and_quantity && <span className="text-sm text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            {...register('location', { required: true })}
          />
          {errors.location && <span className="text-sm text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            {...register('tags', { required: true })}
          />
          {errors.tags && <span className="text-sm text-red-500">This field is required</span>}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            onWheel={(e: React.WheelEvent<HTMLInputElement>) => e.currentTarget.blur()}
            {...register('rating', {
              required: 'This field is required',
              min: {
                value: 1,
                message: 'Rating must be between 1 and 5',
              },
              max: {
                value: 5,
                message: 'Rating must be between 1 and 5',
              },
            })}
          />
          {errors.rating && <span className="text-sm text-red-500">{errors.rating.message}</span>}
        </div>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="is_comment_disabled"
            {...register('is_comment_disabled')}
          />
          <label htmlFor="is_comment_disabled">Is Comment Disabled</label>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className={`bg-blue-500 px-4 py-2 text-white disabled:bg-slate-400`}
          >
            Create
          </button>
        </div>
      </form>
    </section>
  );
};
