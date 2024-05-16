import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { PiTrainRegionalBold } from "react-icons/pi";
import { IoEarth } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { useRef, useState } from "react";
import { FaTemperatureFull } from "react-icons/fa6";
const Weather = () => {
  const [location, setLocation] = useState([]);
  const [weather, setWeather] = useState([]);
  const cityElement = useRef();
  const handleSearch = (event) => {
    event.preventDefault();
    const city = cityElement.current.value;
    cityElement.current.value = "";
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=255c5ac6e70a480eba884432241901&q=${city}&aqi=no`,
      { signal }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setLocation(data.location);
        setWeather(data.current);
      });
    return () => {
      controller.abort();
    };
  };
  return (
    <center className="box">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className=" search">
            <input
              type="text"
              className="form-control mb-2"
              id="exampleFormControlInput1"
              placeholder="Enter City"
              ref={cityElement}
            />
            <button className="btn btn-primary click" onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          {location.length === 0 ? (
            <h3>Search city</h3>
          ) : (
            <div className="text-left red">
              <h5 className="card-title mb-1 al">
                <IoLocationOutline />
                {location.name},{location.region},{location.country}
              </h5>
              <p className="card-text mb-1">
                <FaTemperatureFull /> {weather.temp_c} Deg.
              </p>
              <p className="card-text mb-1">
                <FaTemperatureFull /> {weather.temp_f} Feh.
              </p>

              <p className="card-text mb-1"></p>
              <p className="card-text mb-1"></p>
              <p className="card-text mb-1">
                <IoMdTime /> {location.localtime}
              </p>
            </div>
          )}
        </div>
      </div>
    </center>
  );
};
export default Weather;
