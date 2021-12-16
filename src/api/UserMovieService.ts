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
    const response = await this.instance.post('/user/movie', { title });
    return response.data;
  }

  async fetchWatchlist() {
    const response = await this.instance.get<APIResponse<{ title: string }[]>>(
      '/user/movie'
    );
    return response.data.data?.map((item) => item.title) || [];
  }

  async removeMovieFromWatchedList(title: string) {
    const response = await this.instance.delete(`/user/movie?title=${title}`);
    return response.data;
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
}

export default new UserMovieService();
