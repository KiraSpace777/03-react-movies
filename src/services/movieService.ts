import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<MoviesData> => {
  const response = await axios.get<MoviesData>(`${API_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  });

  return response.data;
};

// ===============================================
// Функцію fetchMovies для виконання HTTP-запитів винесіть в окремий файл src/services/movieService.ts.
// Типізуйте її параметри, результат, який вона повертає, та відповідь від Axios.
