/// <reference path="enums.ts" />

interface User {
  _id: string;
  username: string;
}

interface Movie {
  title: string;
  show_id: string;
}

interface TMDBConfig {
  images?: {
    base_url: string;
    logo_sizes?: string[];
    still_sizes?: string[];
    string_base_url: string;
    poster_sizes?: string[];
    profile_sizes?: string[];
    backdrop_sizes?: string[];
  };
  change_keys: string[];
}

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TMDBSpokenLanguage {
  iso_639_1: string;
  name: string;
}

interface TMDBMovie {
  id: number;
  video: false;
  title: string;
  adult: boolean;
  budget: number;
  imdb_id: string;
  revenue: number;
  runtime: number;
  tagline: string;
  homepage: string;
  overview: string;
  popularity: number;
  vote_count: number;
  genres: TMDBGenre[];
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_title: string;
  status: TMDBStatus;
  original_language: string;
  poster_path: string | null;
  belongs_to_collection: null;
  spoken_languages: TMDBSpokenLanguage[];
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
}

interface TMDBCreatedBy {
  id: number;
  name: string;
  gender: number;
  credit_id: string;
  profile_path: string;
}

interface TMDBEpisode {
  id: number;
  name: string;
  air_date: string;
  overview: string;
  still_path: string;
  vote_count: number;
  vote_average: number;
  season_number: number;
  episode_number: number;
  production_code: string;
}

interface TMDBNetwork {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

interface TMDBSeason {
  id: number;
  name: string;
  air_date: string;
  overview: string;
  poster_path: string;
  episode_count: number;
  season_number: number;
}

interface TMDBSeries {
  id: number;
  name: string;
  tagline: string;
  homepage: string;
  overview: string;
  type: 'Scripted';
  popularity: string;
  status: TMDBStatus;
  vote_count: number;
  genres: TMDBGenre[];
  languages: string[];
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  last_air_date: string;
  original_name: string;
  seasons: TMDBSeason[];
  first_air_date: string;
  in_production: boolean;
  networks: TMDBNetwork[];
  origin_country: string[];
  number_of_seasons: number;
  original_language: string;
  episode_run_time: number[];
  number_of_episodes: number;
  created_by: TMDBCreatedBy[];
  last_episode_to_air: TMDBEpisode;
  spoken_languages: TMDBSpokenLanguage[];
  next_episode_to_air: TMDBEpisode | null;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
}

interface TMDBPerson {
  id: number;
  name: string;
  gender: number;
  adult: boolean;
  imdb_id: string;
  biography: string;
  popularity: number;
  birthday: string | null;
  deathday: string | null;
  also_known_as: string[];
  homepage: string | null;
  profile_path: string | null;
  known_for_department: string;
  place_of_birth: string | null;
}

interface TMDBMultiSearchResults {
  page: number;
  total_pages: number;
  total_results: number;
  results: {
    id: number;
    media_type: TMDBMediaType;
  }[];
}
