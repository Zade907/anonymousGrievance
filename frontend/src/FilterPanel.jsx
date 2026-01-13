export default function FilterPanel() {
    return (
        <div style={{width: "250px", borderRight: "1px solid #ccc", padding: "20px"}}>
            <h3>Filters</h3>
            <input type="text" placeholder="Category..." style={{width: "100%", marginBottom: "10px"}} />
            <input type="text" placeholder="City..." style={{width: "100%", marginBottom: "10px"}} />   
            <input type="text" placeholder="Postal Code..." style={{width: "100%", marginBottom: "10px"}} />

            <button style={{width: "100%"}}>Apply Filters</button>
        </div>
    )
}