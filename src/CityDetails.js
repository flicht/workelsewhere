import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SEARCH_BASE_URL = "https://api.teleport.org/api/cities/geonameid:";

export default function CityDetails(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${SEARCH_BASE_URL}${params.geonameID}`
      )
      .then((res) => {
        setResults(res.data);
        setIsLoaded(true);
      })
      .catch((err) => setError(err));
  }, [params.queryText]);

  return (
    <div>
        {
            isLoaded
            ?
            <>
            <div>{results.full_name}</div>
            <div>{results.population}</div>
            </>
            :
            <p>Loading...</p>
        }
    </div>
  );
}
