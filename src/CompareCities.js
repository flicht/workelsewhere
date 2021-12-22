import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComparedCityDetails from "./ComparedCityDetails";

const TELEPORT_BASE_URL = "https://api.teleport.org/api/urban_areas/slug:";

export default function CompareCities(props) {
  const [city1, setCity1] = useState(null);
  const [city2, setCity2] = useState(null);

  const [isCity1Loaded, setIsCity1Loaded] = useState(false);
  const [isCity2Loaded, setIsCity2Loaded] = useState(false);

  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${TELEPORT_BASE_URL}${params.city1}/?embed={ua:images,ua:scores,ua:details}`
      )
      .then((res) => {
        setCity1(res.data);
        setIsCity1Loaded(true);
      })

      .catch((err) => console.log(err));
    axios
      .get(
        `${TELEPORT_BASE_URL}${params.city2}/?embed={ua:images,ua:scores,ua:details}`
      )
      .then((res) => {
        setCity2(res.data);
        setIsCity2Loaded(true);
      })
      .catch((err) => console.log(err));
  }, [params.city1, params.city2]);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {isCity1Loaded && isCity2Loaded ? (
        <>
        <div style={{width:"50%", padding:"20px"}}>
          <ComparedCityDetails cityData={city1} />
        </div>
        <div style={{width:"50%", padding:"20px"}}>
          <ComparedCityDetails cityData={city2} />
        </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
