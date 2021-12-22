import { useState } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CityDetails from "./CityDetails";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import { useNavigate } from "react-router-dom";
import BrowseTopCities from "./BrowseTopCities";
import TopCities from "./TopCities";
import CityFinder from "./CityFinder";

function App() {
  const [homeCity, setHomeCity] = useState(null);


  return (
    <Router>
      <div className="App">
        <h1>
          <Link to="/">Work Elsewhere</Link>
        </h1>
        <p>Search for a city</p>
        <SearchForm />
        <p>
          Or <BrowseTopCities />
        </p>
        <hr />
        <Routes>
          <Route
            path="/search/:queryText"
            element={<SearchResults setHomeCity={setHomeCity} />}
          />
          <Route path="/city/:geonameID" element={<CityDetails />} />
          <Route path="/city-search/:geonameID" element={<CityFinder homeCity={homeCity} />} />
          <Route path="/top-cities" element={<TopCities />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
