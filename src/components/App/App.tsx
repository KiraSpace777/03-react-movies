import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import css from "./App.module.css";

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setMovies([]);
    setSelectedMovie(null);

    try {
      const data = await fetchMovies(query);

      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        setMovies([]);
      } else {
        setMovies(data.results);
      }
    } catch {
      setError("Failed to fetch movies");
      toast.error("Failed to fetch movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const matchSelectedMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const matchCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 12,
        }}
      />
      <SearchBar onSubmit={handleSearch} />
      <main className={css.main}>
        {isLoading && <Loader />}
        {error && !isLoading && <ErrorMessage />}
        {!isLoading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={matchSelectedMovie} />
        )}
        {!isLoading && !error && movies.length === 0 && (
          <h5>Enter your query in the search field to get started</h5>
        )}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={matchCloseModal} />
        )}
      </main>
    </div>
  );
};

export default App;

// ===========================================
// Сервіс пошуку фільмів TMDB
// ===========================================
// У цьому завданні, за допомогою HTTP-запитів, ви будете отримувати інформацію про фільми з сервісу TMDB.

// ===========================================
// Хедер з формою пошуку SearchBar
// ===========================================
//
// Компонент SearchBar приймає один пропс onSubmit – функцію для передачі значення інпуту під час сабміту форми.
// Компонент SearchBar має створювати DOM-елемент наступної структури:
// --------------------------------------------
// <header className={styles.header}>
//   <div className={styles.container}>
//     <a
//       className={styles.link}
//       href="https://www.themoviedb.org/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Powered by TMDB
//     </a>
//     <form className={styles.form}>
//       <input
//         className={styles.input}
//         type="text"
//         name="query"
//         autoComplete="off"
//         placeholder="Search movies..."
//         autoFocus
//       />
//       <button className={styles.button} type="submit">
//         Search
//       </button>
//     </form>
//   </div>
// </header>
// --------------------------------------------
// Обробка форми має бути реалізована через Form Actions.

// Якщо під час натискання кнопки відправки форми текстове поле порожнє, покажіть користувачеві сповіщення про те, що необхідно ввести текст для пошуку зображень.
// --------- Please enter your search query.---------

// Ця перевірка виконується в SearchBar в момент відправки форми. Для сповіщень використовуйте бібліотеку React Hot Toast.

// Якщо в результаті запиту масив фільмів порожній, виводьте повідомлення:
// ---------No movies found for your request.---------

// Ця перевірка виконується в App при обробці HTTP-запиту. Для сповіщень використовуйте бібліотеку React Hot Toast.
// При кожному новому пошуку колекція фільмів з попереднього пошуку повинна очищатись.

// ===========================================
// Не зберігайте токен доступу в коді, використовуй для цього змінну оточення VITE_TMDB_TOKEN.
// ---------------------------------------
// Корисні для вас розділи документації:
// ---------------------------------------
// Як створити повний шлях до зображення
// Як додати токен доступу до запитів
// Пошук фільмів за ключовим словом

// Щоб додати токен авторизації до Axios-запиту, потрібно вказати його у заголовках (headers) під час виклику методів axios. Твій config object для аксіоса буде виглядати наступним чином:
// ---------------------------------------
// {
//   params: {
//     // твої параметри
//   },
//   headers: {
//     Authorization: `Bearer твійТокен`,
//   }
// }
// ---------------------------------------
