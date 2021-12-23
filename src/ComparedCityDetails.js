import { condenseUrbanArea, deconstructScores } from "./helperFunctions";
import { CircularProgressbar } from "react-circular-progressbar";
import ProgressBar from "@ramonak/react-progress-bar";

import "react-circular-progressbar/dist/styles.css";
import SetAsHomeButton from "./SetAsHomeButton";

export default function ComparedCityDetails(props) {
  const city = condenseUrbanArea(props.cityData);

  console.log(city.weather);

  return (
    <div marginRight>
      <h1>{city.name}</h1>
      {props.compare && <p>
          <SetAsHomeButton />
          </p>}
      <img
        style={{ width: "100%", borderRadius: "5px" }}
        src={city.image.web}
      />

      {city.mayor && <p>Mayor: {city.mayor}</p>}
      <p>Work Elsewhere Score</p>
      <div style={{ width: 100, height: 100, margin: "auto" }}>
        <CircularProgressbar
          value={city.workelsewhereScore}
          text={`${city.workelsewhereScore.toFixed(0)}`}
        />
      </div>
      <div>
        {city.scores.map((item) => (
          <p key={item.name}>
            {item.name}
            <ProgressBar
              bgColor="#5092d3"
              completed={item.score}
              maxCompleted={10}
            />
          </p>
        ))}
      </div>
      <div>
        <h3>Weather</h3>
        <p>Average High: {city.weather["WEATHER-AVERAGE-HIGH"]}°C</p>
        <p>Average Low: {city.weather["WEATHER-AVERAGE-LOW"]}°C</p>
      </div>
      <div>
          <h3>
              Cost of Coffee: 
              ${city.consumerPrices["COST-CAPPUCCINO"]}
              </h3>
      </div>
    </div>
  );
}
