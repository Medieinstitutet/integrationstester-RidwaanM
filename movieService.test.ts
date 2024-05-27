import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getData } from './services/movieService';
import { IOmdbResponse } from './models/IOmdbResponse';
import { IMovie } from './models/Movie';

describe('movieService', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test('should fetch movie data successfully', async () => {
    const mockResponse: IOmdbResponse = {
      Search: [
        { Title: 'Movie 1', Year: '2021', imdbID: 'tt1234567', Type: 'movie', Poster: 'url1' },
        { Title: 'Movie 2', Year: '2022', imdbID: 'tt2345678', Type: 'movie', Poster: 'url2' },
      ],
      totalResults: '2',
      Response: 'True',
    };

    mock.onGet('http://omdbapi.com/?apikey=416ed51a&s=test').reply(200, mockResponse);

    const data = await getData('test');
    expect(data).toEqual(mockResponse.Search);
  });

  test('should handle errors and return an empty array', async () => {
    mock.onGet('http://omdbapi.com/?apikey=416ed51a&s=test').reply(500);

    const data = await getData('test');
    expect(data).toEqual([]);
  });
});
