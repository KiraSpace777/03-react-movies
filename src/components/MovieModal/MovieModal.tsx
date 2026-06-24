import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Movie } from "../../types/movie";
import css from "./MovieModal.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={
            movie.backdrop_path
              ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
              : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MovieModal;

// ===========================================
// Модальне вікно MovieModal
// ===========================================
// Під час натискання на зображення галереї повинно відкриватися модальне вікно, яке відображатиме додаткову інформацію про фільм у великому форматі. Створіть для цього компонент MovieModal. Він має використовуватись в компоненті App та отримувати два пропси:

// movie - посилання на об’єкт обраного фільму;
// onClose - функцію закриття модального вікна.
// Компонент MovieModal має створювати DOM-елемент наступної структури:

// -------------------------------------------
// <div className={css.backdrop} role="dialog" aria-modal="true">
//   <div className={css.modal}>
//     <button className={css.closeButton} aria-label="Close modal">
//       &times;
//     </button>
//     <img
//       src="https://image.tmdb.org/t/p/original/backdrop_path"
//       alt="movie_title"
//       className={css.image}
//     />
//     <div className={css.content}>
//       <h2>movie_title</h2>
//       <p>movie_overview</p>
//       <p>
//         <strong>Release Date:</strong> movie_release_date
//       </p>
//       <p>
//         <strong>Rating:</strong> movie_vote_average/10
//       </p>
//     </div>
//   </div>
// </div>
// -------------------------------------------
// Модальне вікно має створюватись через createPortal, щоб рендерити модалку поза межами основного дерева компонентів. Воно має закриватись при кліку на кнопку з хрестиком, натисканні на клавішу ESC та при кліку за межами модального вікна. За допомогою стилів забороніть скролінг тіла сторінки, поки модалка відкрита.

// Коли модалка закривається, потрібно обов'язково чистити все, що було змінено чи додано під час її відкриття. Це включає очищення стану обраного фільму, видалення слухачів подій для клавіші Escape та відновлення прокручування тіла сторінки.
