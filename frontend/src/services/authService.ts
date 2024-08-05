import { T_LoginUser, T_RegUser } from '@/types';
import api from '@/utils/api';

class authService {
  // login
  async login(data: T_LoginUser) {
    try {
      const response = await api.post('/auth/login', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // register
  async register(data: T_RegUser) {
    try {
      const response = await api.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  // me
  async me() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  //TODO: profileUpdate, logout
}

export default new authService();