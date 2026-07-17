import { useState } from "react"

export default function FilterPanel({ onClose }) {
  const [city, setCity] = useState("")
  const [category, setCategory] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [date, setDate] = useState("")
  const [sort, setSort] = useState("latest")

  function apply() {
    const params = new URLSearchParams()
    if (city) params.append("city", city)
    if (category) params.append("category", category)
    if (postalCode) params.append("postal_code", postalCode)
    if (date) params.append("date", date)
    if (sort) params.append("sort", sort)

    window.dispatchEvent(
      new CustomEvent("filters", { detail: params.toString() })
    )

    if (onClose) onClose()
  }

  function reset() {
    setCity("")
    setCategory("")
    setPostalCode("")
    setDate("")
    setSort("latest")
    window.dispatchEvent(new CustomEvent("filters", { detail: "sort=latest" }))
    if (onClose) onClose()
  }

  return (
    <div className="sidebar__inner">

      {/* Header */}
      <div className="sidebar__header">
        <div className="sidebar__title-row">
          <span className="material-symbols-outlined sidebar__title-icon">filter_list</span>
          <h2 className="sidebar__title">Filters</h2>
        </div>
        <p className="sidebar__subtitle">Refine your view</p>
      </div>

      {/* Filter fields */}
      <div className="sidebar__filters">

        <div className="form-group">
          <label className="form-label" htmlFor="filter-city">City</label>
          <input
            id="filter-city"
            className="form-control"
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            className="form-control"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Issues</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Governance">Governance</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Security">Security</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="filter-postal">Postal Code</label>
          <input
            id="filter-postal"
            className="form-control"
            type="text"
            placeholder="e.g. 411016"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="filter-date">Date</label>
          <input
            id="filter-date"
            className="form-control"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginTop: "8px", borderTop: "1px solid var(--color-outline-variant)", paddingTop: "12px" }}>
          <div className="sidebar__title-row" style={{ marginBottom: "8px" }}>
            <span className="material-symbols-outlined sidebar__title-icon" style={{ fontSize: "18px" }}>sort</span>
            <label className="form-label" htmlFor="filter-sort" style={{ margin: 0 }}>Sort By</label>
          </div>
          <select
            id="filter-sort"
            className="form-control"
            value={sort}
            onChange={e => {
              setSort(e.target.value)
              // Dynamically apply sorting change on change
              const params = new URLSearchParams()
              if (city) params.append("city", city)
              if (category) params.append("category", category)
              if (postalCode) params.append("postal_code", postalCode)
              if (date) params.append("date", date)
              params.append("sort", e.target.value)
              window.dispatchEvent(
                new CustomEvent("filters", { detail: params.toString() })
              )
            }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <button
          className="btn-primary btn-primary--full"
          onClick={apply}
          style={{ marginTop: "8px" }}
        >
          Apply Filters
        </button>

        <button
          className="btn-primary btn-primary--full"
          onClick={reset}
          style={{
            background: "transparent",
            color: "var(--color-primary)",
            border: "1px solid var(--color-outline-variant)",
            boxShadow: "none"
          }}
        >
          Reset
        </button>

      </div>

      {/* Footer links */}
      <div className="sidebar__footer">
        <a href="#" className="sidebar__footer-link">
          <span className="material-symbols-outlined">gavel</span>
          Privacy Policy
        </a>
        <a href="#" className="sidebar__footer-link">
          <span className="material-symbols-outlined">description</span>
          Terms of Service
        </a>
      </div>

    </div>
  )
}
