import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./App.css";

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
        <form onSubmit={ handleFormSubmit } >
            <input onChange={ handleInputChange } type='text' placeholder='Enter a city' value={inputText}/>
            {" "}

            <button className="button-4">Search</button>
        </form>
    )
}