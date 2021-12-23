import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ComparedCityDetails from "./ComparedCityDetails";
import { useCityData } from "./hooks";

const TELEPORT_BASE_URL = "https://api.teleport.org/api/urban_areas/slug:";

export default function CityDetails(props) {
  const params = useParams();

  const [city, isLoaded, err1] = useCityData(params.slug);

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
