import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComparedCityDetails from "./ComparedCityDetails";

const TELEPORT_BASE_URL = "https://api.teleport.org/api/urban_areas/slug:";

export default function CityDetails(props) {
  const [city, setCity] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${TELEPORT_BASE_URL}${params.slug}/?embed={ua:images,ua:scores,ua:details}`
      )
      .then((res) => {
        setCity(res.data);
        setIsLoaded(true);
      })

      .catch((err) => console.log(err));
  }, []);

  if (props.short) {
    return (
      <div>
        {isLoaded ? <ComparedCityDetails cityData={city} /> : <p>Loading...</p>}
      </div>
    );
  }

  return (
    <div style={{ width: "70%", margin: "auto", paddingBottom: "100px" }}>
      {isLoaded ? (
        <ComparedCityDetails cityData={city} compare={true} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
