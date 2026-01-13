import { useState } from "react"

export default function FilterPanel() {
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("")
  const [postalCode, setPostalCode] = useState("")

  function apply() {
    const params = new URLSearchParams()
    if (city) params.append("city", city)
    if (category) params.append("category", category)
    if (postalCode) params.append("postal_code", postalCode)

    window.dispatchEvent(
      new CustomEvent("filters", { detail: params.toString() })
    )
  }

  return (
    <div
      style={{
        width: "260px",
        padding: "20px",
        background: "#ffffff1f",
        borderRight: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: "left" }}>
        <img src="/logo.png" alt="SafeVoice" style={{ width: "120px" }} />
      </div>

      <h3 style={{ marginTop: "10px" }}>Filters</h3>

      <input
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <input
        placeholder="Postal Code"
        value={postalCode}
        onChange={e => setPostalCode(e.target.value)}
      />

      <button onClick={apply}>Apply</button>
    </div>
  )
}
