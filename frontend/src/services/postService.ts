/* eslint-disable no-useless-catch */
import { T_PostCreate } from '@/types';
import api from '@/utils/api';

class PostService {
  async fetchFeed() {
    try {
      const response = await api.get('/feed');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchPosts() {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: string) {
    try {
      const response = await api.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new PostService();
