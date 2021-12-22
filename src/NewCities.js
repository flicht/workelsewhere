import axios from "axios"
import { useEffect, useState } from "react"

export default function NewCities(props) {


    const [newCities, setNewCities] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        axios.get(`https://api.teleport.org/api/urban_areas`)
        .then(res => {setNewCities(res.data); setIsLoaded(true)})
        .catch(err => console.log(err))
    }, [])


    return(
        <div >
            {
                isLoaded &&
                newCities._links['ua:item'].map(city => <h3>{city.name}</h3>)
            }
        </div>
    )
}