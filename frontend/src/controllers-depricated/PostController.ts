import { T_Post } from '../types';
import apiRequest from '../utils/apiRequest';

class PostController {
  async getFeed(accessToken: string) {
    return await apiRequest('/api/feed', 'GET', null, accessToken);
  }

  async createPost(data: T_Post, accessToken: string) {
    return await apiRequest('/api/posts', 'POST', data, accessToken);
  }

  async updatePost(id: string, data: T_Post, accessToken: string) {
    return await apiRequest(`/api/posts/${id}/update?_method=patch`, 'POST', data, accessToken);
  }

  async getPosts(accessToken: string) {
    return await apiRequest('/api/posts', 'GET', null, accessToken);
  }

  async getPost(post_id: string, accessToken: string) {
    return await apiRequest(`/api/posts/${post_id}`, 'GET', null, accessToken);
  }
}

export default new PostController();
