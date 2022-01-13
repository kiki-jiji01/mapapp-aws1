import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { API } from "../api"
import {useHistory, NavLink} from 'react-router-dom';


export function CountryDetail() {
    const [country, setCountry] = useState(null)
    const { id } = useParams()

    useEffect(() => {
      function  fetchCountry() {
        axios.get(API.countries.retrieve(id))
          .then(res => {
            console.log(res.data)
            setCountry(res.data)
          })
      }
      fetchCountry()
    }, [id])

    return (
        <div>
            
            {!country && "Loading..."}
            {country && (
                <div>
                    {country.country_name}
                    <NavLink to={`/countries/${country.id}/update`}>
                   Update
                    </NavLink>
                    <NavLink to={`/countries/${country.id}/delete`}>
                   Delete
                    </NavLink>
                </div>
                
            )}
           
        </div>
    )
}

export default CountryDetail