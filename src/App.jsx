import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { getApiConfiguration, getGenres } from "./feature/home/homeSlice";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import SearchResult from "./pages/searchResult/SearchResult";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/:mediaType/:id" element={<Details />} /> */}
        <Route path="/search/:query" element={<SearchResult />} />
        {/* <Route path="/explore/:mediaType" element={<Explore />} /> */}
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
