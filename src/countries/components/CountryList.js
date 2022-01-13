import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import { API } from "../api"


function CountryList() {
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    function fetchCountries() {
      axios.get(API.countries.list)
        .then(res => {
          console.log(res.data)
          setCountries(res.data)
        })
    }
    fetchCountries()
  }, [])

  return (
    <div>
        {!countries && "Loading..."}
        {countries && countries.map((country, i) => {
            return (
            <div key={i}>
                <NavLink to={`/countries/${country.id}`}>
                    {country.country_name}: {country.content}
                </NavLink>
            </div>
            )
        })}
       
    </div>
  );
}

export default CountryList