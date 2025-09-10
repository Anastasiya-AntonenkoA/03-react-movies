import type { AxiosResponse } from "axios";
import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

// Тип відповіді від TMDB
interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Параметри пошуку
interface FetchMoviesParams {
  query: string;
  page?: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<Movie[]> {
  try {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    const config = {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response: AxiosResponse<MovieResponse> = await axios.get(
      `${BASE_URL}/search/movie`,
      config
    );

    return response.data.results;
  } catch (error) {
    console.error("Помилка при отриманні фільмів:", error);
    throw error;
  }
}