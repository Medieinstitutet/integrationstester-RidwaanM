
import { handleSubmit, createHtml, displayNoResult } from "./src/ts/movieApp"; 
import { getData } from "./src/ts/services/movieService"; 
import { IMovie } from "./src/ts/models/Movie";

jest.mock("./src/ts/services/movieService"); 

describe("handleSubmit", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="searchForm">
        <input id="searchText" value="movie">
      </form>
      <div id="movie-container"></div>
    `;
  });

  it("should create HTML when movies are found", async () => {
    const movies: IMovie[] = [{
      Title: "Movie 1",
      Poster: "url",
      Year: "2022",
      imdbID: "",
      Type: ""
    }];
    (getData as jest.Mock).mockResolvedValue(movies);

    await handleSubmit();

    const container = document.getElementById("movie-container");
    expect(container?.innerHTML).toContain("Movie 1");
  });

  it("should display no result message when no movies are found", async () => {
    (getData as jest.Mock).mockResolvedValue([]);

    await handleSubmit();

    const container = document.getElementById("movie-container");
    expect(container?.innerHTML).toContain("Inga sökresultat att visa");
  });

  it("should display no result message when the API call fails", async () => {
    (getData as jest.Mock).mockRejectedValue({});

    await handleSubmit();

    const container = document.getElementById("movie-container");
    expect(container?.innerHTML).toContain("Inga sökresultat att visa");
  });
});

describe("createHtml", () => {
  it("should create correct HTML structure for movie list", () => {
    document.body.innerHTML = `<div id="movie-container"></div>`;
    const movies: IMovie[] = [
      { Title: "Movie 1", Poster: "url1", Year: "2022", imdbID: "", Type: "" },
      { Title: "Movie 2", Poster: "url2", Year: "2021", imdbID: "", Type: "" },
    ];

    const container = document.getElementById("movie-container") as HTMLDivElement;
    createHtml(movies, container);

    const movieDivs = container.getElementsByClassName("movie");
    expect(movieDivs.length).toBe(2);
    expect(movieDivs[0].innerHTML).toContain("Movie 1");
    expect(movieDivs[1].innerHTML).toContain("Movie 2");
  });
});

describe("displayNoResult", () => {
  it("should display no result message", () => {
    document.body.innerHTML = `<div id="movie-container"></div>`;
    const container = document.getElementById("movie-container") as HTMLDivElement;

    displayNoResult(container);

    expect(container.innerHTML).toContain("Inga sökresultat att visa");
  });
});
