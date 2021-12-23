import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCityData } from "./hooks";
import ComparedCityDetails from "./ComparedCityDetails";

const TELEPORT_BASE_URL = "https://api.teleport.org/api/urban_areas/slug:";

export default function CompareCities(props) {
  const params = useParams();

  const [city1, city1IsLoaded, err1] = useCityData(params.city1);
  const [city2, city2IsLoaded, err2] = useCityData(params.city2);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {city1IsLoaded && city2IsLoaded ? (
        <>
          <div style={{ width: "50%", padding: "20px" }}>
            <ComparedCityDetails cityData={city1} />
          </div>
          <div style={{ width: "50%", padding: "20px" }}>
            <ComparedCityDetails cityData={city2} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
