import { useState } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CityDetails from "./CityDetails";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import BrowseTopCities from "./BrowseTopCities";
import TopCities from "./TopCities";
import CityFinder from "./CityFinder";
import CompareCities from "./CompareCities";
import CityDetailsNA from "./CityDetailsNA";
import Home from "./Home";

function App() {
  const [homeCity, setHomeCity] = useState(null);

  return (
    <div className="App">
      <Router>
        <h1 className="title">
          <Link to="/">Work Elsewhere</Link>
        </h1>
        <SearchForm />
        <hr />
        <Routes>
          <Route eaxct path="/" element={<Home />} />
          <Route
            path="/search/:queryText"
            element={<SearchResults setHomeCity={setHomeCity} />}
          />
          <Route path="/city/:slug" element={<CityDetails />} />
          <Route path="/city/na/:geonameID" element={<CityDetailsNA />} />
          <Route
            path="/city-search/:slug"
            element={<CityFinder homeCity={homeCity} />}
          />
          <Route path="/top-cities" element={<TopCities />} />
          <Route path="/compare/:city1/:city2" element={<CompareCities />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
