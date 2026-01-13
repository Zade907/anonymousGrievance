import { useEffect, useState } from "react"

export default function GrievanceForm({ onSubmit }) {
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState(null)
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [locationError, setLocationError] = useState(false)

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

  async function submit() {
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

  try {
    const res = await fetch("http://127.0.0.1:8000/api/grievances/", {
      method: "POST",
      body: form
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
  }
}

  return (
    <div
      style={{
        background: "#ffffff1b",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h3>REPORT AN ISSUE</h3>

      <input
        placeholder="Category (e.g. Pothole, Bribery, Garbage)"
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ width: "100%", marginBottom: "10px",height: "30px" }}
      />

      <textarea
        placeholder="Describe the issue..."
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
      />

      <input
        type="file"
        onChange={e => setImage(e.target.files[0])}
        style={{ marginBottom: "10px" }}
      />

      {locationError && (
        <p style={{ color: "red" }}>
          Location permission required to submit a grievance.
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <button
    onClick={submit}
    style={{
      padding: "8px 16px",
      background: "#0a0909",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Submit
  </button>
</div>

    </div>
  )
}
