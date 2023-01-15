import "./App.css";
import { Routes, Route } from "react-router-dom";

import ErrorPage from "./error-page";
import Main from "./pages/Main";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FriendsSuggestions from "./pages/FriendsSuggestions";
import MovieDetails from "./components/movieDetails";
import MoviesList from "./components/MoviesList/MoviesList";
import WatchList from "./pages/WatchList";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/friend-suggestion" element={<FriendsSuggestions />} />
        <Route
          path="/movie-details"
          element={
            <MovieDetails
              movie={{
                adult: false,
                backdrop_path: "/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg",
                belongs_to_collection: {},
                budget: 150000000,
                genres: ["urMom", "horror", "pleb"],
                homepage: "https://www.warnerbros.com/movies/mad-max-fury-road",
                id: 76341,
                imdb_id: "tt1392190",
                original_language: "en",
                original_title: "Mad Max: Fury Road",
                overview:
                  "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
                popularity: 73.907,
                poster_path: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
                production_companies: [
                  {
                    id: 79,
                    logo_path: "/tpFpsqbleCzEE2p5EgvUq6ozfCA.png",
                    name: "Village Roadshow Pictures",
                    origin_country: "US",
                  },
                  {
                    id: 174,
                    logo_path: "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
                    name: "Warner Bros. Pictures",
                    origin_country: "US",
                  },
                  {
                    id: 2537,
                    logo_path: null,
                    name: "Kennedy Miller Productions",
                    origin_country: "AU",
                  },
                  {
                    id: 41624,
                    logo_path: "/wzKxIeQKlMP0y5CaAw25MD6EQmf.png",
                    name: "RatPac Entertainment",
                    origin_country: "US",
                  },
                ],
                production_countries: [
                  {
                    iso_3166_1: "AU",
                    name: "Australia",
                  },
                  {
                    iso_3166_1: "US",
                    name: "United States of America",
                  },
                  {
                    iso_3166_1: "ZA",
                    name: "South Africa",
                  },
                ],
                release_date: "2015-05-13",
                revenue: 378858340,
                runtime: 121,
                spoken_languages: [
                  {
                    english_name: "English",
                    iso_639_1: "en",
                    name: "English",
                  },
                ],
                status: "Released",
                tagline: "What a Lovely Day.",
                title: "Mad Max: Fury Road",
                video: false,
                vote_average: 7.569,
                vote_count: 20142,
              }}
            />
          }
        />
        <Route path="/movies-list" element={<MoviesList />} />
        <Route path="/watch-list" element={<WatchList />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
