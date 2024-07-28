import { T_Post } from '../types';
import apiRequest from '../utils/apiRequest';

class PostController {
  async createPost(data: T_Post, accessToken: string) {
    return await apiRequest('/api/posts', 'POST', data, accessToken);
  }

  async getPosts(accessToken: string) {
    return await apiRequest('/api/posts', 'GET', null, accessToken);
  }
}

export default new PostController();
