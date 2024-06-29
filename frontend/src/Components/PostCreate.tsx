import React from 'react';
import { AppLayout } from './Layouts/AppLayout';

export const PostCreate = () => {
  return (
    <AppLayout>
      <section id="post-create">
        <form className="space-y-4" encType="multipart/form-data">
          <div className="flex flex-col space-y-2">
            <label htmlFor="image">Images</label>
            <input className="border-2 bg-white p-2" type="file" name="images[]" multiple />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="price_and_quantity">Price and Quantity</label>
            <input type="text" name="price_and_quantity" id="price_and_quantity" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="location">Location</label>
            <input type="text" name="location" id="location" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="tags">Tags</label>
            <input type="text" name="tags" id="tags" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="rating">Rating</label>
            <input type="number" name="rating" id="rating" />
          </div>
          <div className="flex items-center gap-4">
            <input type="checkbox" name="is_comment_disabled" id="is_comment_disabled" />
            <label htmlFor="is_comment_disabled">Is Comment Disabled</label>
          </div>
        </form>
      </section>
    </AppLayout>
  );
};
