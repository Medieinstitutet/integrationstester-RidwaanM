
import { movieSort } from "./src/ts/functions";
import { IMovie } from "./src/ts/models/Movie";

describe("movieSort", () => {
  const unsortedMovies: IMovie[] = [
    {
      Title: "B Movie", Poster: "url1", Year: "2020",
      imdbID: "",
      Type: ""
    },
    {
      Title: "A Movie", Poster: "url2", Year: "2021",
      imdbID: "",
      Type: ""
    },
    {
      Title: "C Movie", Poster: "url3", Year: "2019",
      imdbID: "",
      Type: ""
    },
  ];

  test("should sort movies in descending order by default", () => {
    const sortedMovies = movieSort(unsortedMovies);
    expect(sortedMovies[0].Title).toBe("A Movie");
    expect(sortedMovies[1].Title).toBe("B Movie");
    expect(sortedMovies[2].Title).toBe("C Movie");
  });

  test("should sort movies in ascending order when desc is false", () => {
    const sortedMovies = movieSort(unsortedMovies, false);
    expect(sortedMovies[0].Title).toBe("C Movie");
    expect(sortedMovies[1].Title).toBe("B Movie");
    expect(sortedMovies[2].Title).toBe("A Movie");
  });

  test("should return the same array if the array is empty", () => {
    const emptyMovies: IMovie[] = [];
    const sortedMovies = movieSort(emptyMovies);
    expect(sortedMovies).toEqual([]);
  });
});
