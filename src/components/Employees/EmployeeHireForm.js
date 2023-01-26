import { useState, useEffect } from "react";
import { navigate, useNavigate } from "react-router-dom";

export const EmployeeHireForm = () => {
    const navigate = useNavigate()
    
    const [locations, setLocations] = useState ([])
    
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

    const [employee, updateEmployee] = useState({
        
        locationId: 0,
        startDate: "",
        payRate: 0
    })

    const [user, updateUser] = useState({
        name: "",
        email: "",
        isStaff: true
    })

    const handleSubmitButtonClick = (event) => {
        event.preventDefault()

        const infoToSendToUserAPI = {
            name: user.name,
            email: user.email,
            isStaff: true 
        }

        const infoToSendToEmployeeAPI = {
            //userId: user.id,
            locationId: employee.locationId,
            startDate: employee.startDate,
            payRate: parseFloat(employee.payRate)
        }
        
        fetch (`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoToSendToUserAPI)
        })
            .then(response => response.json())
            .then ((data) => {
                infoToSendToEmployeeAPI.userId = data.id
        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(infoToSendToEmployeeAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/employees")
            })
        })


    }

    return (
        <form className="employeeHireForm">
            <h2 className="employeeHireForm__title">Add New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Employee Name:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter employee name."
                        value={user.name}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.name = event.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter email address."
                        value={user.email}
                        onChange={
                            (event) => {
                                const copy = {...user}
                                copy.email = event.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location:
                        <select
                            className="form-control"
                            value={employee.locationId}
                            onChange={
                                (event) => {
                                    const copy = { ...employee}
                                    copy.locationId = event.target.value
                                    updateEmployee(copy)
                                }
                            } >
                            <option value="0">Select Location</option>
                            {locations.map(
                                (location) => {
                                    return <option key={location.id} value={location.id}>{location.address}</option>
                                }
                            )
                            }
                        </select>
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date:
                        <input
                            className="form-control"
                            type="date"
                            value={employee.startDate}
                            onChange={
                                (event) => {
                                    const copy = { ...employee }
                                    copy.startDate = event.target.value
                                    updateEmployee(copy)
                                }
                            } >                            
                        </input>
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Hourly Pay Rate:</label>
                    <input 
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter hourly pay rate."
                        value={employee.payRate}
                        onChange={
                            (event) => {
                                const copy = {...employee}
                                copy.payRate = event.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Employee
            </button>
        </form>
    )

}