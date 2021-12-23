import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import SetAsHomeButton from "./SetAsHomeButton";


export default function CityDetailsNA(props) {
  const [homeCity, setHomeCity] = useState(null);
  const [urbanArea, setUrbanArea] = useState("");
  const [isHomeCityLoaded, setIsHomeCityLoaded] = useState(null);
  const [isScoresLoaded, setIsScoresLoaded] = useState(null);
  const [data, setData] = useState(null);
  const [scoresCat, setScoresCat] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [citySlug, setCitySlug] = useState(null);

  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://api.teleport.org/api/cities/geonameid:${params.geonameID}`)
      .then((res) => {
        setHomeCity(res.data);
        setIsHomeCityLoaded(true);
        setUrbanArea(res.data._links["city:urban_area"].name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.geonameID]);

  useEffect(() => {
    if (urbanArea) {
      axios
        .get(
          `${homeCity._links["city:urban_area"].href}?embed={ua:images,ua:scores}`
        )
        .then((res) => {
          setData(res.data);
          setIsScoresLoaded(true);
          setScoresCat(
            deconstructScores(res.data._embedded["ua:scores"].categories)
          );
          setImageLink(res.data._embedded["ua:images"].photos[0].image.web);
          setCitySlug(res.data.slug);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [urbanArea]);

  const selectedCategories = [
    "Safety",
    "Cost of Living",
    "Internet Access",
    "Leisure & Culture",
    "Toleranace",
    "Outdoors",
    "Environmental Quality",
    "Business Freedom",
  ];

  const deconstructScores = (categories) => {
    let output = [];
    categories.map((s) => {
      if (selectedCategories.includes(s.name)) {
        output.push({
          name: s.name,
          score: String(s.score_out_of_10.toFixed(1)),
        });
      }
    });

    return output;
  };

  if (props.short) {
    if (props.setSlug) {
      props.setSlug(citySlug);
    }
    return isHomeCityLoaded && isScoresLoaded ? (
      <>
        <div>
          <h2>{`${homeCity.full_name}`}</h2>
          <img style={{ width: "30vw", paddingTop: "20px" }} src={imageLink} />
          {scoresCat &&
            scoresCat.map((item) => (
              <p key={item.name}>
                {item.name}:{" "}
                <ProgressBar
                  bgColor="#5092d3"
                  completed={item.score}
                  maxCompleted={10}
                />
              </p>
            ))}
          Work Elsewhere Score:
          <ProgressBar
            bgColor="#e1a861"
            completed={data._embedded["ua:scores"].teleport_city_score.toFixed(
              0
            )}
            maxCompleted={100}
          />
        </div>
        <div></div>
      </>
    ) : (
      <p>Loading ...</p>
    );
  }

  return (
    // style={{width:"30%"}}
    <div className="city-detail" style={{ width: "50%", margin: "auto" }}>
      {isHomeCityLoaded ? (
        <>
          <div>
            {/* <p>&#x2302;  */}
            <h2>{`${homeCity.full_name}`}</h2>{" "}
            {/* <SetAsHomeButton geonameID={params.geonameID} /> */}
            <p>Population: {homeCity.population}</p>
            <p>Timezones: {homeCity._links["city:timezone"].name}</p>
            <h3>We don't have too much information on this place. Try searching somewhere larger</h3>
          </div>
          <img style={{ width: "50vw" }} src={imageLink} />
        </>
      ) : (
        <p>Loading...</p>
      )}
      {isScoresLoaded && (
        <>
          <div>
            {data._embedded["ua:scores"].summary.replace(/<\/?[^>]+(>|$)/g, "")}
          </div>
          <div>
            {scoresCat && (
              <>
                {scoresCat.map((item) => (
                  <p key={item.name}>
                    {item.name}:{" "}
                    <ProgressBar
                      bgColor="#5092d3"
                      completed={item.score}
                      maxCompleted={10}
                    />
                  </p>
                ))}
                Work Elsewhere Score:
                <ProgressBar
                  bgColor="#e1a861"
                  completed={data._embedded[
                    "ua:scores"
                  ].teleport_city_score.toFixed(0)}
                  maxCompleted={100}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}