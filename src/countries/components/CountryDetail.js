import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { API } from "../api"

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
    }, [])

    return (
        <div>
            
            {!country && "Loading..."}
            {country && (
                <div>
                    {country.country_name}
                </div>
            )}
           
        </div>
    )
}

export default CountryDetail