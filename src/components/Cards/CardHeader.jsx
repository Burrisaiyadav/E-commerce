import React from 'react'
import './CardHeader.css'

const CardHeader = ({ title, subtitle, showViewAll = true }) => {
  return (
    <div className="card-header">
      <div className="card-header-content">
        <h2 className="card-title">{title}</h2>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {showViewAll && (
        <button className="view-all-button">
          View All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default CardHeader

