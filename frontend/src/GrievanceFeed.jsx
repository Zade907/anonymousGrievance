import { useEffect, useState } from "react"
import GrievanceForm from "./GrievanceForm"

function getCategoryBadgeClass(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("infra") || cat.includes("pothole") || cat.includes("road")) return "feed-card__badge--infrastructure"
  if (cat.includes("govern") || cat.includes("bribery") || cat.includes("corrupt")) return "feed-card__badge--governance"
  if (cat.includes("sanit") || cat.includes("garbage") || cat.includes("drain")) return "feed-card__badge--sanitation"
  if (cat.includes("secur") || cat.includes("light") || cat.includes("safety")) return "feed-card__badge--security"
  return "feed-card__badge--other"
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  try {
    const d = new Date(dateStr)
    const diff = Math.floor((Date.now() - d) / 60000)
    if (diff < 60) return `${diff || 1} min ago`
    if (diff < 1440) return `${Math.floor(diff / 60)} hr ago`
    
    // Explicitly format as DD/MM/YYYY
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}/${month}/${year}`
  } catch {
    return ""
  }
}

export default function GrievanceFeed() {
  const [data, setData] = useState([])

  function load(filters = "") {
    fetch("http://127.0.0.1:8000/api/grievances/?" + filters)
      .then(res => res.json())
      .then(setData)
      .catch(() => setData([]))
  }

  useEffect(() => {
    load()
    const handler = e => load(e.detail)
    window.addEventListener("filters", handler)
    return () => window.removeEventListener("filters", handler)
  }, [])

  return (
    <>
      {/* Report Form */}
      <GrievanceForm onSubmit={() => load()} />

      {/* Feed */}
      <section>
        <h3 className="feed-section__title">Live Grievance Feed</h3>

        <div className="feed-grid">
          {data.length === 0 ? (
            <div className="feed-empty">
              <span className="material-symbols-outlined" style={{ fontSize: 48, display: "block", marginBottom: 12, color: "var(--color-outline)" }}>inbox</span>
              No grievances found. Be the first to report an issue.
            </div>
          ) : (
            data.map((g, i) => (
              <div key={i} className="feed-card">
                <div className="feed-card__body">

                  {/* Header: badge + meta */}
                  <div className="feed-card__header">
                    <span className={`feed-card__badge ${getCategoryBadgeClass(g.category)}`}>
                      {g.category}
                    </span>
                    <span className="feed-card__meta">
                      {formatDate(g.created_at)}
                      {g.location?.city ? ` • ${g.location.city}` : ""}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="feed-card__description">{g.description}</p>

                  {/* Image */}
                  {g.image_url && (
                    <div className="feed-card__image-wrap">
                      <img
                        src={g.image_url}
                        alt="Grievance photo"
                        className="feed-card__image"
                      />
                    </div>
                  )}

                  {/* Location */}
                  {g.location && (
                    <div className="feed-card__location">
                      {g.location.route && (
                        <span className="feed-card__location-item">
                          <span className="material-symbols-outlined">route</span>
                          {g.location.route}
                        </span>
                      )}
                      {g.location.neighborhood && (
                        <span className="feed-card__location-item">
                          <span className="material-symbols-outlined">location_city</span>
                          {g.location.neighborhood}
                        </span>
                      )}
                      {g.location.sublocality && !g.location.neighborhood && (
                        <span className="feed-card__location-item">
                          <span className="material-symbols-outlined">location_city</span>
                          {g.location.sublocality}
                        </span>
                      )}
                      {g.location.city && (
                        <span className="feed-card__location-item">
                          <span className="material-symbols-outlined">apartment</span>
                          {g.location.city}
                        </span>
                      )}
                      {g.location.postal_code && (
                        <span className="feed-card__location-item">
                          <span className="material-symbols-outlined">pin_drop</span>
                          {g.location.postal_code}
                        </span>
                      )}
                    </div>
                  )}

                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  )
}
