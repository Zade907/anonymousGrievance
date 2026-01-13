import { useEffect, useState } from "react"
import GrievanceForm from "./GrievanceForm"

export default function GrievanceFeed() {
  const [data, setData] = useState([])

  function load(filters = "") {
    fetch("http://127.0.0.1:8000/api/grievances/?" + filters)
      .then(res => res.json())
      .then(setData)
  }

  useEffect(() => {
    load()

    window.addEventListener("filters", e => {
      load(e.detail)
    })
  }, [])

  return (
    <div
      style={{
        flex: 1,
        background: "#f4f4f41a",
        padding: "20px",
        overflowY: "auto"
      }}
    >
      

      <GrievanceForm onSubmit={() => load()} />

      <h2>LIVE GRIEVANCE FEED</h2>

      {data.map((g, i) => (
        <div
          key={i}
          style={{
            background: "#ffffff16",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h4 style={{ margin: 0 }}>Category: {g.category}</h4>

          <p>Description: {g.description}</p>

          {g.image_url && (
            <img
              src={g.image_url}
              style={{ maxWidth: "300px", borderRadius: "6px" }}
            />
          )}

          <div style={{ marginTop: "10px", fontSize: "14px", color: "#ffffff" }}>
            <strong>Location</strong>
            <div>Route: {g.location?.route}</div>
            <div>Neighbourhood: {g.location?.neighborhood}</div>
            <div>Sublocality: {g.location?.sublocality}</div>
            <div>Locality: {g.location?.locality}</div>
            <div>City: {g.location?.city}</div>
            <div>Postal Code: {g.location?.postal_code}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
