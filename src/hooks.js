import axios from "axios";
import { useEffect, useState } from "react";

const TELEPORT_BASE_URL = "https://api.teleport.org/api/urban_areas/slug:";


function useCityData(slug) {

    const [ city, setCity] = useState(null)
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ err, setErr ] = useState(null)

    useEffect( () => {
        axios
        .get(
        `${TELEPORT_BASE_URL}${slug}/?embed={ua:images,ua:scores,ua:details}`
      )
      .then((res) => {
        setCity(res.data);
        setIsLoaded(true);
      })

      .catch((err) => console.log(err))}, [slug]
    )

    return [ city, isLoaded, err ]

}

export { useCityData }