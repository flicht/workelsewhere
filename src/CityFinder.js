import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CityDetails from "./CityDetails";
import NewCities from "./NewCities";

export default function CityFinder(props) {
  const [homeCity, setHomeCity] = useState(null);
  const [isHomeCityLoaded, setIsHomeCityLoaded] = useState(null);
  const [urbanArea, setUrbanArea] = useState(null);

  const params = useParams();


  return (
    <>
      <div style={{ width: "30%", marginLeft: "30px"}}>
        <CityDetails short={true} />
      </div>
      <div style={{width:"70%", float:"right"}}>
        <NewCities />
      </div>
    </>
  );
}
