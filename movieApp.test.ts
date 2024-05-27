import { init, handleSubmit, createHtml, displayNoResult, movieSort } from './movieApp';
import { IMovie } from './models/Movie';
import * as movieService from './services/movieService';

jest.mock('./services/movieService');

describe('movieApp', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="searchForm">
        <input type="text" id="searchText" />
        <button type="submit">Search</button>
      </form>
      <div id="movie-container"></div>
    `;

    container = document.getElementById('movie-container') as HTMLDivElement;
  });

  test('should initialize form and handle submit event', () => {
    const form = document.getElementById('searchForm') as HTMLFormElement;
    const handleSubmitSpy = jest.spyOn(window, 'handleSubmit').mockImplementation(() => {});

    init();
    form.dispatchEvent(new Event('submit'));

    expect(handleSubmitSpy).toHaveBeenCalled();
  });

  test('should fetch and display movies on submit', async () => {
    const mockMovies: IMovie[] = [
      { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1' },
      { Title: 'Movie 2', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2' },
    ];

    (movieService.getData as jest.Mock).mockResolvedValue(mockMovies);

    const input = document.getElementById('searchText') as HTMLInputElement;
    input.value = 'test';
    await handleSubmit();

    expect(container.innerHTML).toContain('Movie 1');
    expect(container.innerHTML).toContain('Movie 2');
  });

  test('should display no results message if no movies found', async () => {
    (movieService.getData as jest.Mock).mockResolvedValue([]);

    const input = document.getElementById('searchText') as HTMLInputElement;
    input.value = 'test';
    await handleSubmit();

    expect(container.innerHTML).toContain('Inga sökresultat att visa');
  });

  test('should create HTML elements for movies', () => {
    const movies: IMovie[] = [
      { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1' },
      { Title: 'Movie 2', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2' },
    ];

    createHtml(movies, container);

    expect(container.innerHTML).toContain('Movie 1');
    expect(container.innerHTML).toContain('Movie 2');
  });

  test('should display no result message', () => {
    displayNoResult(container);

    expect(container.innerHTML).toContain('Inga sökresultat att visa');
  });

  test('should sort movies in descending order by default', () => {
    const movies: IMovie[] = [
      { Title: 'B Movie', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1' },
      { Title: 'A Movie', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2' },
    ];

    const sortedMovies = movieSort(movies);

    expect(sortedMovies[0].Title).toBe('A Movie');
    expect(sortedMovies[1].Title).toBe('B Movie');
  });

  test('should sort movies in ascending order', () => {
    const movies: IMovie[] = [
      { Title: 'B Movie', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1' },
      { Title: 'A Movie', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2' },
    ];

    const sortedMovies = movieSort(movies, false);

    expect(sortedMovies[0].Title).toBe('B Movie');
    expect(sortedMovies[1].Title).toBe('A Movie');
  });
});
