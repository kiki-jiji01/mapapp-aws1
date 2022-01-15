import { useEffect, useState , useContext} from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import { API } from "../api"
import { AuthContext } from "../contexts/AuthContext"

function CountryList() {
  const [countries, setCountries] = useState(null)
  const { user ,logout } = useContext(AuthContext)
  // const { user: { token } } = useContext(AuthContext)

  useEffect(() => {
    function fetchCountries() {
      axios.get(API.countries.list)
        .then(res => {
          console.log(res.data)
          setCountries(res.data)
        })
    }
    fetchCountries()
    return () => null
  }, [])

  return (
    <div>
        {!countries && "Loading..."}
        {countries && countries.map((country, i) => {
            return (
            <div key={i}>
              {user ? (
                <NavLink to={`/countries/${country.id}`}>
                    {country.country_name}: {country.content}
                </NavLink>
                ):(
                  <NavLink to={`/countries/login`}>
                  {country.country_name}: {country.content}
                 </NavLink>

                )}
                
    </div>
            )
        })}
       
    </div>
  );
}

export default CountryList