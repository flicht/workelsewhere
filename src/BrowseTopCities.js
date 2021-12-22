import { useNavigate } from "react-router-dom";

export default function BrowseTopCities(props) {
    const navigate = useNavigate();

    const handleBrowseTopCities = () => {
        navigate('top-cities/')
    }

    return(
        <div>
            <p>
            <button onClick={ handleBrowseTopCities }>
                Browse Top Cities
            </button>
            </p>
        </div>
    )
}
