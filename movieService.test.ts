
import { getData } from "./src/ts/services/movieService";
import axios from "axios";
import { IMovie } from "./src/ts/models/Movie";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getData", () => {
  it("should return a list of movies when the API call is successful", async () => {
    const movies: IMovie[] = [{
      Title: "Movie 1", Poster: "url", Year: "2022",
      imdbID: "",
      Type: ""
    }];
    mockedAxios.get.mockResolvedValue({ data: { Search: movies } });
    
    const result = await getData("movie");
    expect(result).toEqual(movies);
  });

  it("should return an empty array when the API call fails", async () => {
    mockedAxios.get.mockRejectedValue({});
    
    const result = await getData("movie");
    expect(result).toEqual([]);
  });

  it("should return an empty array when no movies are found", async () => {
    mockedAxios.get.mockResolvedValue({ data: { Search: [] } });
    
    const result = await getData("movie");
    expect(result).toEqual([]);
  });
});
