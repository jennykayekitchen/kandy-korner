import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect (
        () => {
            fetch(`http://localhost:8088/employees?&_expand=user&_expand=location`)
                .then(response => response.json())
                .then((data) => {
                    setEmployees(data)
                })
        },
        []
    )

    return (
        <>
        <h2>Current Employees</h2>
            {
                employees.map(
                    (employee) => {
                        return (<div className="employee" key={employee.id}>
                            <div className="employeeName">Name: {employee?.user?.name}</div>
                            <div className="employeeLocation">Location: {employee?.location?.address}</div>
                        </div>)
                    }
                )
            }
        </>
    )
}