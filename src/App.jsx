import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { getApiConfiguration } from "./feature/home/homeSlice";
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

  useEffect(() => {
    fetchApiConfig();
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
