import { useState } from "react"
import { CandySearch } from "./CandySearch"
import { CustomerProductList } from "./CustomerProductList"


export const CandyContainer = () => {
    const [ searchTerms, setSearchTerms] = useState("")

    return <>
        <CandySearch setterFunction={setSearchTerms} />
        <CustomerProductList searchTermsState={searchTerms}/>
    </>
}