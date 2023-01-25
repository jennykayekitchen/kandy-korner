import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
  
// import { useEffect, useState } from "react"
// Define a new state variable
// Fetch the products
// Set the products
// Select element(??)
// Map the products to get info
// Option values for the select element
// Set up link on nav bar
// Do route shit in application views

export const ProductList = () => {
    const [products, setProducts] = useState([])
    const [expensiveProducts, setExpensiveProducts] = useState(false)
    const [filteredProducts, setFilteredlProducts] = useState([])

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
            .then(response => response.json())
            .then((data) => {
                setProducts(data)
            })
        },
        []
    )


    //watches for when state changes to true, then sets the product to be only the ones that cost more than $2
    useEffect(
        () => {
            if(expensiveProducts) {
                const topProducts = products.filter(product => product.price > 2.00)
                setFilteredlProducts(topProducts)
            }
            else {
                setFilteredlProducts(products)
            }
        },
        [expensiveProducts, products]
    )


    return <>
    {
        <div className="products">
            <h2>Products</h2>
                <div className="topPricedButton">
                    < button onClick={() => {setExpensiveProducts(true)}}>Top Priced</button>
                </div>
                <div className="allProductsButton">
                    < button onClick={() => {setExpensiveProducts(false)}}>All Products</button>
                </div>
                <div className="addProduct">
                    <button onClick={() => navigate("/products/addnewproduct")}>Add New Product</button>
                </div>
            {
                filteredProducts.map(
                    (product) => {
                        return (
                            <div key={product.id} className="product">
                            <div className="productName">Product: {product.name}</div>
                            <div className="productPrice">Price: ${product.price}</div>
                            <div className="productType">Candy Type: {product.productType.productType}</div>

                        </div>
                        )
                    }
                )
            }
        </div>

    }
    </>
}