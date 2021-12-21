import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProgressBar from "@ramonak/react-progress-bar";



export default function CityDetails(props) {


    const [homeCity, setHomeCity] = useState(null)
    const [urbanArea, setUrbanArea] = useState('')
    const [isHomeCityLoaded, setIsHomeCityLoaded] = useState(null)
    const [isScoresLoaded, setIsScoresLoaded] = useState(null)
    const [scores, setScores] = useState(null)
    const [scoresCat, setScoresCat] = useState(null)

    const params = useParams()

    useEffect( () => {
        axios.get(`https://api.teleport.org/api/cities/geonameid:${params.geonameID}`)
        .then(res => {
            setHomeCity(res.data);
            setIsHomeCityLoaded(true);
            setUrbanArea(res.data._links["city:urban_area"].name)
        })
        .catch(err => {console.log(err);});
        
    }, [params.geonameID] )
    
    useEffect( () => {
        if (urbanArea) {
            console.log(urbanArea);
            axios.get(`${homeCity._links["city:urban_area"].href}scores`)
            .then(res => {
                setScores(res.data);
                setIsScoresLoaded(true);
                setScoresCat(deconstructScores(res.data.categories))
            })
            .catch(err => {console.log(err);});
    }        
    }, [urbanArea] )

    const selectedCategories = [
        "Safety",
        "Cost of Living",
        "Internet Access",
        "Leisure & Culture",
        "Toleranace",
        "Outdoors",
        "Environmental Quality",
        "Business Freedom"
    ]

    const deconstructScores = (categories) => {
        let output = [];
        categories.map( (s) => {
            if (selectedCategories.includes(s.name)){

                output.push(
                    {
                        name: s.name, 
                        score: String(s.score_out_of_10.toFixed(1))
                    })
                }
                } )
        console.log("output", output);
        return output
    }

    

    return(
        // style={{width:"30%"}}
        <div className="homecity-sidebar" style={{width:"50%", margin:"auto"}}> 
        {
            isHomeCityLoaded
            ?
            <>
            <div>
                    {/* <p>&#x2302;  */}
                        <h2>{`${homeCity.full_name}`}</h2>
                    <p>Population: {homeCity.population}</p>
                    <p>Timezones: {homeCity._links["city:timezone"].name}</p>   
                    <p>Urban Area: {urbanArea}</p>
                </div>
            </>
            :
            <p>Loading...</p>
        }
        {
            isScoresLoaded
            &&
            <>
            <div>
                {scores.summary.replace(/<\/?[^>]+(>|$)/g, "")}
            </div>
          <div > 
            {scoresCat 
                &&
                <>
                { scoresCat.map(( item ) => 
                <p key={item.name}>
                        { item.name }: <ProgressBar bgColor="#5092d3" completed={item.score} maxCompleted={10} />
                    </p>
                ) }

                Work Elsewhere Score:
                <span style={{color: "red"}}>
                 <ProgressBar bgColor="#e1a861" completed={ scores.teleport_city_score.toFixed(0) } maxCompleted={100} />
                </span>
                </>
            }
            </div>
            </>

        }
        </div>
    )
}
