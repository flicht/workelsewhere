import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { urlToSlug } from "./helperFunctions";
import SetAsHomeButton from "./SetAsHomeButton";

export default function ResultsCard(props) {

    const { city } = props 
    const geoname_id = city._embedded['city:item'].geoname_id
    const slug = urlToSlug(city._embedded['city:item']._links['city:urban_area']?.href)
    const navigate = useNavigate()

    const handleButtonClick = (city) => {
        props.setHomeCity(city);
        navigate(`/city/${city._embedded['city:item'].geoname_id}`);
    }

    console.log('city', city);

    let url
    if (slug) {
        url = `/city/${slug}`
    }
    else {
        url = `/city/na/${geoname_id}`
    }

    return(
        <Link to={url}>
        <div className="resultsCard">
            <h2>
                {city.matching_full_name} {" "} <FontAwesomeIcon icon={faArrowRight} />
            </h2>
            <p>
               Population: {city._embedded['city:item'].population}
            </p>
        </div>
        </Link>
    )
}