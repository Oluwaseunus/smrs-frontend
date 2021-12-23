import axios, { Axios } from 'axios';

class UserMovieService {
  instance: Axios;

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/user`,
    });

    this.instance.interceptors.request.use((config) => {
      config.headers = this.getHeaders();
      return config;
    });
  }

  async fetchRecommendations() {
    const response = await this.instance.get<APIResponse<string[]>>(
      '/recommendations'
    );

    return response.data.data;
  }

  async addMovieToWatchedList(title: string) {
    const response = await this.instance.post('/movie', { title });
    return response.data;
  }

  async fetchWatchlist() {
    const response = await this.instance.get<APIResponse<{ title: string }[]>>(
      '/movie'
    );
    return response.data.data?.map((item) => item.title) || [];
  }

  async removeMovieFromWatchedList(title: string) {
    const response = await this.instance.delete(`/movie?title=${title}`);
    return response.data;
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
}

export default new UserMovieService();
