import { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CityDetails from './CityDetails';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function App() {

  const [homeCity, setHomeCity] = useState(null);


  return (
    <div className="App">
      <Router>
        <h1>
          <Link to="/">
          Work Elsewhere
          </Link> 
          </h1>
        <p>Search for a city</p>
        {/* <Link to='/'>Home </Link>
        <Link to='/search'> Search</Link> */}
      <SearchForm />
      <hr />      
      <Routes>
          <Route path="/search/:queryText" element={<SearchResults setHomeCity={setHomeCity} />} />
          <Route path="/city/:geonameID" element={<CityDetails />} />
        </Routes>
      
      </Router>


    </div>
  );
}

export default App;
