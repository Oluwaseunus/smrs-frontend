import axios from 'axios';

export default class Base {
  protected static authInterceptor: number;

  protected static instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  static useAuthInterceptor() {
    this.authInterceptor = this.instance.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };

      return config;
    });
  }

  static removeAuthInterceptor() {
    this.instance.interceptors.request.eject(this.authInterceptor);
  }
}
