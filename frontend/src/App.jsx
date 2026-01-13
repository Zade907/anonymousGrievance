import GrievanceForm from "./GrievanceForm"
import GrievanceFeed from "./GrievanceFeed"
import FilterPanel from "./FilterPanel.jsx"

export default function App() {
  return (
    <div style={{display: "flex", height : "100vh"}}>
      <FilterPanel />
      <div style={{flex: 1, display: "flex", padding: "20px"}}>
        <GrievanceForm />
        <GrievanceFeed />
      </div>
    </div>
  )
}
