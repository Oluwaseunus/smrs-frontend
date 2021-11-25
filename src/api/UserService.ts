import Base from './base';

interface LoginBody {
  email: string;
  password: string;
}
interface SignUpBody extends LoginBody {
  lastName: string;
  firstName: string;
}

interface AuthResponse extends User {
  token: string;
}

class UserService extends Base {
  static async login(body: LoginBody) {
    try {
      const response = await this.instance.post<APIResponse<AuthResponse>>(
        '/auth',
        body
      );

      if (response.data.data) {
        const { token, ...user } = response.data.data;
        localStorage.setItem('token', token);
        this.useAuthInterceptor();
        return user;
      }

      throw new Error('Could not sign you in, please try again.');
    } catch (err) {
      this.removeAuthInterceptor();
      throw err;
    }
  }

  static async signup(body: SignUpBody) {
    try {
      const response = await this.instance.post<APIResponse<AuthResponse>>(
        '/user',
        body
      );

      if (response.data.data) {
        const { token, ...user } = response.data.data;
        localStorage.setItem('token', token);
        this.useAuthInterceptor();
        return user;
      }

      throw new Error('Could not create your account, please try again.');
    } catch (err) {
      this.removeAuthInterceptor();
      throw err;
    }
  }

  static async verify(token: string) {
    try {
      const response = await this.instance.get<APIResponse<User>>('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.data) {
        this.useAuthInterceptor();
        return response.data.data;
      }

      throw new Error('User could not be verified, please try again.');
    } catch (err) {
      localStorage.removeItem('token');
      this.removeAuthInterceptor();
      throw err;
    }
  }
}

export default UserService;
