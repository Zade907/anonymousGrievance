import FilterPanel from "./FilterPanel"
import GrievanceFeed from "./GrievanceFeed"

export default function App() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", height: "100vh", fontFamily: "sans-serif" }}>
      <FilterPanel />
      <GrievanceFeed />
    </div>
  )
}

