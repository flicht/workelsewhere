import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchForm (props) {

    const [inputText, setInputText] = useState(null)
    const navigate = useNavigate()

    const handleInputChange = (ev) => {
        setInputText(ev.target.value)
    }

    const handleFormSubmit = (ev) => {
        ev.preventDefault()
        navigate(`/search/${inputText}`)
        setInputText('')
    }




    return (
        <form onSubmit={ handleFormSubmit }>
            <input onChange={ handleInputChange } type='text' placeholder='Find a city' value={inputText}/>
            <button>Search</button>
        </form>
    )
}