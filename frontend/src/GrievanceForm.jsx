import { useEffect, useRef, useState } from "react"

export default function GrievanceForm({ onSubmit }) {
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [locationError, setLocationError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError(true)
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
      },
      () => setLocationError(true)
    )
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!category || !description) {
      alert("Please fill category and description")
      return
    }
    if (!lat || !lng) {
      alert("Location permission is required")
      return
    }

    const form = new FormData()
    form.append("category", category)
    form.append("description", description)
    form.append("latitude", lat)
    form.append("longitude", lng)
    if (image) form.append("image", image)

    setSubmitting(true)
    try {
      const res = await fetch("http://127.0.0.1:8000/api/grievances/", {
        method: "POST",
        body: form,
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || "Submission rejected")
        return
      }
      alert("Grievance submitted successfully")
      setDescription("")
      setCategory("")
      setImage(null)
      onSubmit()
    } catch {
      alert("Server unreachable")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="report-section">
      <div className="report-card">
        <h2 className="report-card__title">Report an Issue</h2>

        <form className="report-form" onSubmit={submit}>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="grievance-category">Category</label>
            <select
              id="grievance-category"
              className="form-control"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="" disabled>Select Category (e.g. Pothole, Bribery, Garbage)</option>
              <option value="Infrastructure">Infrastructure (Potholes, Roads)</option>
              <option value="Governance">Governance (Bribery, Corruption)</option>
              <option value="Sanitation">Sanitation (Garbage, Drainage)</option>
              <option value="Security">Security (Lighting, Safety)</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="grievance-description">Description</label>
            <textarea
              id="grievance-description"
              className="form-control"
              placeholder="Describe the issue securely and anonymously..."
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Upload zone */}
          <div
            className="upload-zone"
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={e => e.key === "Enter" && fileInputRef.current?.click()}
          >
            <span className="material-symbols-outlined upload-zone__icon">cloud_upload</span>
            <p className="upload-zone__text">Drag &amp; drop or click to upload photos</p>
            <p className="upload-zone__hint">PNG, JPG, up to 10MB. Metadata is stripped for anonymity.</p>
            {image && (
              <p className="upload-zone__filename">
                <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle" }}>attach_file</span>
                {" "}{image.name}
              </p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={e => setImage(e.target.files[0] || null)}
            />
          </div>

          {/* Location error */}
          {locationError && (
            <div className="location-error">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>location_off</span>
              Location permission is required to submit a grievance.
            </div>
          )}

          {/* Submit */}
          <div className="report-form__submit-row">
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit Secure Report"}
            </button>
          </div>

        </form>
      </div>
    </section>
  )
}
