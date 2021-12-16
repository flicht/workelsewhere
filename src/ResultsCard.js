import { Link, useNavigate } from "react-router-dom";

export default function ResultsCard(props) {

    const { city } = props 
    const geoname_id = city._embedded['city:item'].geoname_id
    const navigate = useNavigate()

    const handleButtonClick = (city) => {
        props.setHomeCity(city);
        navigate(`/city/${city._embedded['city:item'].geoname_id}`);
    }

    return(
        <div>
            <h2><Link to={`/city/${geoname_id}`}>
                {city.matching_full_name}
            </Link>
            </h2>
            <button onClick={ () => handleButtonClick(city) }>Pick as home</button>
            <p>
               Population: {city._embedded['city:item'].population}
            </p>
        </div>
    )
}