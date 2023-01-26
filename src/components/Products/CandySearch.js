export const CandySearch = ({ setterFunction }) => {
    return (
        <div> What candy are you looking for?
            <div>
                <input
                    onChange={
                        (changeEvent) => {
                            setterFunction(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Enter search terms." />
            </div>
        </div>
    )
}