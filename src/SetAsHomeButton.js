import { useNavigate } from "react-router-dom"

export default function SetAsHomeButton (props) {
    
    const navigate = useNavigate()
    
    const handleButtonClick = (geonameID) => {
        navigate(`/city-search/${geonameID}`)
    }

    const geonameID = props.geonameID
    
    return (
        <button onClick={() => handleButtonClick(geonameID)}>
            Set As Home
        </button>
    )
}