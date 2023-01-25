import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    const navigate = useNavigate()
    const [productTypes, setProductTypes] = useState ([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((data) => {
                setProductTypes(data)
            })
        },
        []
    )
    
    const [product, update] = useState({
        name: "",
        productTypeId: "",
        price: ""
    })

    
    const handleSubmitButtonClick = (event) => {
        event.preventDefault()
        
        const productToSendToAPI = {
            name: product.name,
            productTypeId: parseInt(product.productTypeId),
            price: parseFloat(product.price)
        }

    return fetch(`http://localhost:8088/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productToSendToAPI)
    })
        .then(response => response.json())
        .then(() => {
            navigate("/products")
        })   

    }

return (
    <form className="newProductForm">
        <h2 className="newProductForm__title">New Product</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Please enter product name."
                value={product.name}
                onChange={
                    (event) => {
                        const copy = {...product}
                        copy.name = event.target.value
                        update(copy)
                    }
                } />
            </div>
        </fieldset>
        <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product Type:
                    <select 
                        className="form-control"
                        value={product.productTypeId}
                        onChange={
                            (event) => {
                                const copy = {...product}
                                copy.productTypeId = event.target.value
                                update(copy)
                            }
                        } >
                            <option value="0">Select Option</option>
                            {productTypes.map(
                                (productType) => {
                                    return <option key={productType.id} value={productType.id}>{productType.productType}</option>
                                }
                            ) 
                            }
                            </select>
                    </label>
                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                <label htmlFor="productPrice">Product Price:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Please enter product price."
                value={product.price}
                onChange={
                    (event) => {
                        const copy = {...product}
                        copy.price = event.target.value
                        update(copy)
                    }
                } />
            </div>
        </fieldset>
        <button 
                onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Product
            </button>        
    </form>
)
}
