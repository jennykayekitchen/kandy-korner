import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect (
        () => {
            fetch(`http://localhost:8088/customers?&_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    setCustomers(data)
                })
        },
        []
    )

    return (
        <>
        <h2>Current Customers</h2>
            {
                customers.map(
                    (customer) => {
                        return (<div className="customer" key={customer.id}>
                            <div className="customerName">Name: {customer?.user?.name}</div>
                            <div className="customerEmail">Email: {customer?.user?.email}</div>
                            <div className="customerEmail">Loyalty Number: {customer?.loyaltyNumber}</div>
                        </div>)
                    }
                )
            }
        </>
    )
}