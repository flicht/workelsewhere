import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CityDetails from "./CityDetails";

export default function NewCities(props) {
  const [newCities, setNewCities] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedValue, setSelectedValue] = useState(false);


  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`https://api.teleport.org/api/urban_areas`)
      .then((res) => {
        setNewCities(res.data);
        setIsLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelectChange = (ev) => {
    setSelectedValue(ev.target.value);
  };

  const handleSubmit = (ev) => {
    const parts = selectedValue.split("/")
    const el = parts[parts.length -2]
    const result = el.replace("slug:", "")


    navigate(`/compare/${props.homeSlug}/${result}`)
    ev.preventDefault();
  };

  return (
    <div className="select">
      {isLoaded && (
        <form onSubmit={handleSubmit}>
          <label>
            <select  value={selectedValue} onChange={handleSelectChange}>
              {newCities._links["ua:item"].map((city) => (
                <option value={`${city.href}`}>{city.name}</option>
              ))}
            </select>
          </label>
          <input className="button-4" type="submit" value="Compare" />
        </form>
      )}
    </div>
  );
}
