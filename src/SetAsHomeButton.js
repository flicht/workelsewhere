import { useNavigate, useParams } from "react-router-dom"

export default function SetAsHomeButton (props) {
    
    const navigate = useNavigate()

    const params = useParams()
    
    // const handleButtonClick = (geonameID) => {
    //     navigate(`/city-search/${geonameID}`)
    // }
    const handleButtonClick = (slug) => {
        navigate(`/city-search/${slug}`)
    }

    const geonameID = props.geonameID
    const slug = params.slug
    
    return (
        <button className="button-4" onClick={() => handleButtonClick(slug)}>
            Compare With Other Cities
        </button>
    )
}