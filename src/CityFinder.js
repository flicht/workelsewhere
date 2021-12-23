import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CityDetails from "./CityDetails";
import NewCities from "./NewCities";

export default function CityFinder(props) {
  const [homeCity, setHomeCity] = useState(null);
  const [isHomeCityLoaded, setIsHomeCityLoaded] = useState(null);
  const [urbanArea, setUrbanArea] = useState(null);
  const [homeSlug, setHomeSlug] = useState(null)

  const params = useParams();



  return (
    <>
      <div style={{ display: "flex", marginLeft: "30px", width:"70%"}}>
        <div style={{flexGrow:1}}>
      <FontAwesomeIcon icon={faHome} size="2x"/>
        <CityDetails short={true}/>
        </div>
      <div style={{flexGrow:4, marginLeft:"300px"}}>
        Pick a city to compare to: 
        <NewCities homeSlug={params.slug}/>
      </div>
      </div>
    </>
  );
}
