import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
  
// import { useEffect, useState } from "react"
// Define a new state variable
// Fetch the products
// Set the products
// Select element(??)
// Map the products to get info
// Option values for the select element
// Set up link on nav bar
// Do route shit in application views

export const CustomerProductList = ({ searchTermsState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name`)
            .then(response => response.json())
            .then((data) => {
                setProducts(data)
            })
        },
        []
    )

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFilteredProducts(searchedProducts)
        },
        [ searchTermsState ]
    )

    return (
        <>        
        {
                filteredProducts.map(
                    (filteredProduct) => {
                        return (
                            <div key={filteredProduct.id} className="product">
                            <div className="productName">Product: {filteredProduct.name}</div>
                            <div className="productPrice">Price: ${filteredProduct.price}</div>

                        </div>
                        )
                    }
                )
            }
        </>
    )
    }