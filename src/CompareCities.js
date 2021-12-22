import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ComparedCityDetails from "./ComparedCityDetails"

const TELEPORT_BASE_URL = "https://api.teleport.org/api/urban_areas/slug:"

export default function CompareCities(props) {

    const [city1, setCity1 ]= useState(null)
    const [ city2, setCity2] = useState(null)




    const params = useParams()


    useEffect(
        () => {
            axios.get(`${TELEPORT_BASE_URL}${params.city1}/?embed={ua:images,ua:scores,ua:details}`)
            .then(res =>
                {setCity1(res.data)}
                )

            .catch(err => console.log(err))
            axios.get(`${TELEPORT_BASE_URL}${params.city2}/?embed={ua:images,ua:scores,ua:details}`)
            .then(res =>
                {setCity2(res.data)}
                )
            .catch(err => console.log(err))
        }
    ) 



    return (
        <div>
            <ComparedCityDetails cityData={city1} />
            <ComparedCityDetails cityData={city2} />
        </div>
    )
}