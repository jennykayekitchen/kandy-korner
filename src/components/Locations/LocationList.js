import { useEffect, useState } from "react"
//import { useNavigate } from "react-router-dom"

  // Define a new state variable
  // Fetch the locations
  // Set the locations
  // Select element
  // Map the locations to get info
  // Option values for the select element

export const LocationList = () => {
    const [locations, setLocations] = useState([])

    //const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((data) => {
                setLocations(data)
            })
        },
        []
    )

    return <>
    {
        <div className="locations" >
            <h2>Locations</h2>
            {
            locations.map(
                (location) => {
                    return (<div className="location" key={location.id}>
                        {location.address} / {location.sqrfootage} sqr. feet
                    </div>)
                }
            )
            }
        </div>
    }
    </>
}