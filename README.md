================== МОДУЛЬ 3: ФОРМИ ТА ЕФЕКТИ ============

====================== Домашнє завдання №3 ==============

1. Створено репозиторій 03-react-movies
2. При здачі роботи надаються два посилання: на вихідні файли (репозиторій) та на робочу сторінку завдання, розгорнуту на Vercel.
3. Проєкт створено за допомогою Vite.
4. Під час запуску коду в консолі не повинно бути помилок або попереджень.
5. Для кожного компонента у папці src/components має бути окрема папка, яка містить файл самого React компонента та файл його стилів. Назва папки, файлу компонента (з розширенням .tsx) та файлу стилів (перед .module.css) однакова і відповідає назвам, вказаним у завданнях (якщо вони були).

6. У кожній папці компонента мають бути:

6.1. файл компонента з розширенням .tsx (наприклад, App.tsx);
6.2. файл стилів, назва якого закінчується на .module.css, з такою самою назвою (наприклад, App.module.css).

7. Для експорту компонентів використовується експорт за замовчуванням (export default).
8. Загальні типи, які використовуються в кількох компонентах, винесені в окремий файл (src/types/movie.ts). Типи та 9. інтерфейси, які стосуються лише одного компонента, оголошені безпосередньо у файлі цього компонента.
9. Для типізації пропсів компонентів використовується interface.
10. Інтерфейс для пропсів компонента називається за схемою: Ім’яКомпонентаProps (наприклад, UserCardProps).
11. Усі події компонентів типізовані.
12. Для виконання HTTP-запитів використовується бібліотека axios.
13. TypeScript-код має бути чистим, зрозумілим і відформатованим за допомогою Prettier.
14. Стилізація виконується за допомогою CSS-модулів.
15. Використовується modern-normalize для уніфікації стилів у різних браузерах.

Після змін, які вносите у своєму репозиторії, почекайте, будь ласка, 5 хвилин перед відправкою роботи на перевірку. Адже гіт хабу необхідний час, щоб оновити версію

====================== Пошук фільмів ========

Напиши застосунок пошуку фільмів за ключовим словом. Подивіться демо-відео роботи застосунку.
Сервіс пошуку фільмів TMDB (https://developer.themoviedb.org/docs/getting-started)
У цьому завданні, за допомогою HTTP-запитів, ви будете отримувати інформацію про фільми з сервісу TMDB.
Не зберігайте токен доступу в коді, використовуй для цього змінну оточення VITE_TMDB_TOKEN.

Щоб додати токен авторизації до Axios-запиту, потрібно вказати його у заголовках (headers) під час виклику методів axios. Твій config object для аксіоса буде виглядати наступним чином:

<!-- {
  params: {
    // твої параметри
  },
  headers: {
    Authorization: `Bearer твійТокен`,
  }
} -->

Відповідь від бекенда приходить об'єктом із всією необхідною інформацією, в тому числі масивом фільмів. Кожен фільм в масиві представлений об'єктом із великою кількістю інформації.

Ось як буде виглядати інтерфейс для типізації одного фільму. Винесіть його у файл src/types/movie.ts і використовуйте у компонентах.

<!-- export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
} -->

Функцію fetchMovies для виконання HTTP-запитів винесіть в окремий файл src/services/movieService.ts. Типізуйте її параметри, результат, який вона повертає, та відповідь від Axios.

====================== Компоненти ========

У цьому завданні вам потрібно самостійно створити та реалізувати логіку наступних компонентів.
Стилі для всіх компонентів вже створені. Скопіюй їх із цього репозиторію: https://github.com/goitacademy/react-movies-styles. Після створення своїх компонентів скопіюй відповідні .module.css файли у відповідні папки в src/components.

====================== Хедер з формою пошуку SearchBar ========

Компонент SearchBar приймає один пропс onSubmit – функцію для передачі значення інпуту під час сабміту форми.
Компонент SearchBar має створювати DOM-елемент наступної структури:

<!-- <header className={styles.header}>
  <div className={styles.container}>
    <a
      className={styles.link}
      href="https://www.themoviedb.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by TMDB
    </a>
    <form className={styles.form}>
      <input
        className={styles.input}
        type="text"
        name="query"
        autoComplete="off"
        placeholder="Search movies..."
        autoFocus
      />
      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  </div>
</header> -->

Обробка форми має бути реалізована через Form Actions.
Якщо під час натискання кнопки відправки форми текстове поле порожнє, покажіть користувачеві сповіщення про те, що необхідно ввести текст для пошуку зображень.

<!-- Please enter your search query. -->

Ця перевірка виконується в SearchBar в момент відправки форми. Для сповіщень використовуйте бібліотеку React Hot Toast.
Якщо в результаті запиту масив фільмів порожній, виводьте повідомлення:

<!-- No movies found for your request. -->

Ця перевірка виконується в App при обробці HTTP-запиту. Для сповіщень використовуйте бібліотеку React Hot Toast.
При кожному новому пошуку колекція фільмів з попереднього пошуку повинна очищатись.

====================== Галерея фільмів MovieGrid ========

Компонент MovieGrid – це список карток фільмів. Він приймає два пропси:

<!-- onSelect – функцію для обробки кліку на картку фільму; -->
<!-- movies – масив фільмів. -->

Компонент MovieGrid має створювати DOM-елемент наступної структури:

<!--
<ul className={css.grid}>
  {/* Набір елементів списку з фільмами */}
  <li>
    <div className={css.card}>
      <img
		    className={css.image}
		    src="https://image.tmdb.org/t/p/w500/poster-path"
		    alt="movie title"
		    loading="lazy"
		  />
	    <h2 className={css.title}>Movie title</h2>
    </div>
  </li>
</ul> -->

Галерея повинна рендеритися лише тоді, коли є які-небудь завантажені фільми.

====================== Індикатор завантаження Loader ========

Компонент Loader має відображатись замість галереї поки відбувається запит за фільмами та створювати DOM-елемент наступної структури:

<!-- <p className={css.text}>Loading movies, please wait...</p> -->

====================== Повідомлення про помилку ErrorMessage ========

Компонент ErrorMessage має рендеритися замість галереї фільмів у випадку помилки HTTP-запиту та створювати DOM-елемент наступної структури:

<!-- <p className={css.text}>There was an error, please try again...</p> -->

====================== Модальне вікно MovieModal ========

Під час натискання на зображення галереї повинно відкриватися модальне вікно, яке відображатиме додаткову інформацію про фільм у великому форматі. Створіть для цього компонент MovieModal. Він має використовуватись в компоненті App та отримувати два пропси:

<!-- movie - посилання на об’єкт обраного фільму; -->
<!-- onClose - функцію закриття модального вікна. -->

Компонент MovieModal має створювати DOM-елемент наступної структури:

<!--

<div className={css.backdrop} role="dialog" aria-modal="true">
  <div className={css.modal}>
    <button className={css.closeButton} aria-label="Close modal">
      &times;
    </button>
    <img
      src="https://image.tmdb.org/t/p/original/backdrop_path"
      alt="movie_title"
      className={css.image}
    />
    <div className={css.content}>
      <h2>movie_title</h2>
      <p>movie_overview</p>
      <p>
        <strong>Release Date:</strong> movie_release_date
      </p>
      <p>
        <strong>Rating:</strong> movie_vote_average/10
      </p>
    </div>
  </div>
</div> -->

Модальне вікно має створюватись через createPortal, щоб рендерити модалку поза межами основного дерева компонентів. Воно має закриватись при кліку на кнопку з хрестиком, натисканні на клавішу ESC та при кліку за межами модального вікна. За допомогою стилів забороніть скролінг тіла сторінки, поки модалка відкрита.

Коли модалка закривається, потрібно обов'язково чистити все, що було змінено чи додано під час її відкриття. Це включає очищення стану обраного фільму, видалення слухачів подій для клавіші Escape та відновлення прокручування тіла сторінки.

======== Увага!========
При здачі ДЗ в LMS додавайте production URL застосунку.
На скріні зеленим виділено правильне посилання для здачі.
Перед здачею обовʼязково перевірте на живій сторінці роботу всього функціоналу.

<!-- ====================================================== -->

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
