import { T_LoginUser } from '@/types';
import apiRequest from '@/utils/apiRequest';

class AuthController {
  async login(data: T_LoginUser) {
    return await apiRequest('/api/auth/login', 'POST', data);
  }

  async register(data: T_LoginUser) {
    return await apiRequest('/api/auth/register', 'POST', data);
  }

  async me(accessToken: string) {
    return await apiRequest('/api/auth/me', 'GET', null, accessToken);
  }

  async logout(accessToken: string) {
    return await apiRequest('/api/auth/logout', 'POST', null, accessToken);
  }
}

export default new AuthController();
