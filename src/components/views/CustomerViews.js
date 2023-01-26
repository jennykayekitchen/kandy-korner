import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../Locations/LocationList"
import { CandyContainer } from "../Products/CandyContainer"




export const CustomerViews = () => {
	return (
	<Routes>
		<Route path="/" element={
			<>
				<h1>Kandy Korner</h1>                
				<Outlet />
			</>
		}>

			<Route path="locations" element={ <LocationList /> } />
            <Route path="findcandy" element={ <CandyContainer /> } />
			
		</Route>

	</Routes>
	)
}