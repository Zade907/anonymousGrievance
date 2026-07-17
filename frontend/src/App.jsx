import { useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import FilterPanel from "./FilterPanel"
import GrievanceFeed from "./GrievanceFeed"
import "./App.css"

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function closeSidebar() {
    setSidebarOpen(false)
  }

  return (
    <div className="app-shell">

      {/* ── Top Navigation ──────────────────────────────────── */}
      <header className="top-nav">
        <div className="top-nav__inner">

          {/* Brand */}
          <div className="top-nav__brand">
            <span className="material-symbols-outlined top-nav__brand-icon">shield</span>
            Civic Shield
          </div>

          {/* Desktop nav links */}
          <nav className="top-nav__links">
            <a href="#" className="top-nav__link top-nav__link--active">Feed</a>
          </nav>

          {/* Actions */}


        </div>
      </header>

      {/* ── Mobile sidebar overlay ───────────────────────────── */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " sidebar-overlay--visible" : ""}`}
        onClick={closeSidebar}
      />

      {/* ── Content Area ────────────────────────────────────── */}
      <div className="content-area">

        {/* Sidebar / Filter Panel */}
        <aside className={`sidebar${sidebarOpen ? " sidebar--open" : ""}`}>
          <FilterPanel onClose={closeSidebar} />
        </aside>

        {/* Main */}
        <main className="main-content">
          <GrievanceFeed />
        </main>

      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">Civic Shield</div>
          <nav className="site-footer__links">
            <a href="#" className="site-footer__link">About Us</a>
            <a href="#" className="site-footer__link">Privacy Policy</a>
            <a href="#" className="site-footer__link">Impact Report</a>
            <a href="#" className="site-footer__link">Contact Admin</a>
          </nav>
          <div className="site-footer__copy">
            © 2026 Civic Shield. Secure, Anonymous, Impactful.
          </div>
        </div>
      </footer>

      <Analytics />
    </div>
  )
}
