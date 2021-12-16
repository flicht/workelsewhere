import { useState } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CityDetails from './CityDetails';
import HomeCity from './HomeCity';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function App() {

  const [homeCity, setHomeCity] = useState(null);


  return (
    <div className="App">
      <Router>
        <h1> Work Elsewhere</h1>
        <p>Pick your home city</p>
        {/* <Link to='/'>Home </Link>
        <Link to='/search'> Search</Link> */}
      <SearchForm />
      <hr />      
      <Routes>
          <Route path="/search/:queryText" element={<SearchResults setHomeCity={setHomeCity} />} />
          { homeCity && <Route path="/city/:geonameID" element={<HomeCity city={homeCity} />} /> }
        </Routes>
      
      </Router>


    </div>
  );
}

export default App;
