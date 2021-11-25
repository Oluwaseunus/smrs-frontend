import axios, { Axios } from 'axios';

class UserMovieService {
  instance: Axios;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
    });

    this.instance.interceptors.request.use((config) => {
      config.headers = this.getHeaders();
      return config;
    });
  }

  async addMovieToWatchedList(title: string) {
    const response = await this.instance.post('/api/user/movie', { title });
    console.log({ response });
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
}

export default new UserMovieService();
