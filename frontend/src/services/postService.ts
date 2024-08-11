/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
import { T_PostCreate } from '@/types';
import api from '@/utils/api';

class PostService {
  async fetchFeed() {
    try {
      const response = await api.get('/feed');
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  }

  async fetchPosts() {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  }

  async createPost(data: T_PostCreate) {
    try {
      const response = await api.post('/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  }

  async updatePost(postId: string, data: T_PostCreate) {
    try {
      const response = await api.post(`/posts/${postId}/update?_method=patch`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  }

  async deletePost(postId: string) {
    try {
      const response = await api.delete(`/posts/${postId}`);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  }

  async likePost(postId: string) {
    try {
      const response = await api.post(`/likes/${postId}/save`, {
        model: 'App\\Models\\Post',
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
}

export default new PostService();
