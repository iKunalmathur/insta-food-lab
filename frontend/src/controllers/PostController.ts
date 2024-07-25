import { T_Post } from '../types';
import apiRequest from '../utils/apiRequest';

class PostController {
  async createPost(data: T_Post) {
    return await apiRequest('/api/posts', 'POST', data);
  }

  async getPosts() {
    return await apiRequest('/api/posts', 'GET');
  }
}

export default new PostController();
