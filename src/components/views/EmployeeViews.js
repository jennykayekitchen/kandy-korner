import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { ProductForm } from "../Products/ProductForm"
import { ProductList } from "../Products/ProductList"


export const EmployeeViews = () => {
	return (
	<Routes>
		<Route path="/" element={
			<>
				<h1>Kandy Korner</h1>

				<Outlet />
			</>
		}>

			<Route path="locations" element={ <LocationList /> } />
			<Route path="products" element={ <ProductList /> } />
            <Route path="products/addnewproduct" element={ <ProductForm /> } />
			
		</Route>

	</Routes>
	)
}