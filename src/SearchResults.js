import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResultsCard from "./ResultsCard";

const SEARCH_BASE_URL = "https://api.teleport.org/api/cities/?search=";

export default function SearchResults(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  



  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${SEARCH_BASE_URL}${params.queryText}&embed=city%3Asearch-results%2Fcity%3Aitem%2Fcity%3Aurbanarea%2Fua%3Ascores`
      )
      .then((res) => {
        setResults(res.data._embedded["city:search-results"]);
        setIsLoaded(true);
      })
      .catch((err) => setError(err));
  }, [params.queryText]);

  return (
    <div>
      {isLoaded ? (
        results.map((city) => (
          <ResultsCard
            key={city._embedded["city:item"].geoname_id}
            city={city}
            setHomeCity={props.setHomeCity}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
