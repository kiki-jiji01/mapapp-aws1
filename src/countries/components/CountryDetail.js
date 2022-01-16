import axios from "axios"
import { useEffect, useState ,useContext} from "react"
import { useParams } from "react-router"
import { API } from "../api"
import {useHistory, NavLink} from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"

export function CountryDetail() {
    const [country, setCountry] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)

    useEffect(() => {
      function  fetchCountry() {
        axios.get(API.countries.retrieve(id),{
          headers: {
            "Authorization": `Token ${token}`
        }
        })
          .then(res => {
            console.log(res.data)
            setCountry(res.data)
          })
      }
      fetchCountry()
      // return () => null
    }, [id, token])

    return (
        <div>
            
            {!country && "Loading..."}
            {country && (
                <div>
                    {country.country_name}
                    {country.is_owner && (
                    <div>
                    <NavLink to={`/countries/${country.id}/update`}>
                   Update
                    </NavLink>
                    <NavLink to={`/countries/${country.id}/delete`}>
                   Delete
                    </NavLink>
                    </div>
                    )}
                </div>
                
            )}
           
        </div>
    )
}

export default CountryDetail