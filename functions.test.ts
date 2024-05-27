import { filterMoviesByRating } from './functions';
import { IMovie } from './models/Movie';

describe('functions', () => {
  test('should filter movies by minimum rating', () => {
    const movies: IMovie[] = [
      { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1', imdbRating: '7.5' },
      { Title: 'Movie 2', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2', imdbRating: '6.0' },
      { Title: 'Movie 3', Year: '2020', imdbID: 'tt3456789', Type: 'movie', Poster: 'url3', imdbRating: '8.0' },
    ];

    const filteredMovies = filterMoviesByRating(movies, 7.0);

    expect(filteredMovies.length).toBe(2);
    expect(filteredMovies).toEqual([
      { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1', imdbRating: '7.5' },
      { Title: 'Movie 3', Year: '2020', imdbID: 'tt3456789', Type: 'movie', Poster: 'url3', imdbRating: '8.0' },
    ]);
  });

  test('should return empty array if no movies meet the minimum rating', () => {
    const movies: IMovie[] = [
      { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1', imdbRating: '5.5' },
      { Title: 'Movie 2', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2', imdbRating: '6.0' },
    ];

    const filteredMovies = filterMoviesByRating(movies, 7.0);

    expect(filteredMovies.length).toBe(0);
    expect(filteredMovies).toEqual([]);
  });
});
