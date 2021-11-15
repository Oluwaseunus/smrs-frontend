import axios from 'axios';
import { TMDBMediaType } from '../enums';

class MovieService {
  static imageBaseURL: string = '';
  static instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
  });

  static async getConfig() {
    const { data } = await this.instance.get<TMDBConfig>(
      `/configuration?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );

    this.imageBaseURL = data.images?.base_url || '';
  }

  static async getUserMovies() {
    const { data } = await this.instance.get<{ results: TMDBMovie[] }>(
      `/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
    );

    return data.results;
  }

  static async getMovie(id: string) {
    const { data } = await this.instance.get<TMDBMovie>(
      `/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    );

    return data;
  }

  static async searchMovie(query: string) {
    const { data } = await this.instance.get<TMDBMultiSearchResults>(
      `/search/multi?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}&language=en-US&page=1`
    );

    const filteredResults = data.results.filter(
      ({ media_type }) => media_type !== TMDBMediaType.PERSON
    );

    if (filteredResults.length) return filteredResults[0];
    throw new Error();
  }
}

export default MovieService;
