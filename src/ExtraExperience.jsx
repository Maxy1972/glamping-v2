import React, { useState } from 'react'

export default function ExtraExperience() {
  const [extras, setExtras] = useState([
    { id: 1, name: 'Mountain Scooter Rental', price: 150000, category: 'Equipment' },
    { id: 2, name: 'Guided Sunrise Trekking', price: 300000, category: 'Experience' },
    { id: 3, name: 'Traditional BBQ Dinner', price: 250000, category: 'Food & Beverage' },
  ])

  const [selectedExtra, setSelectedExtra] = useState(null)

  return (
    <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Extras & Experiences</h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Manage available guest activities, equipment rentals, and special services.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {extras.map((item) => (
          <div 
            key={item.id}
            onClick={() => setSelectedExtra(item)}
            style={{ 
              background: '#0f172a', 
              padding: '1rem', 
              borderRadius: '8px', 
              border: '1px solid #334155',
              cursor: 'pointer',
              transition: 'border-color 0.2s'
            }}
          >
            <span style={{ fontSize: '0.75rem', background: '#334155', padding: '2px 8px', borderRadius: '4px', color: '#38bdf8' }}>
              {item.category}
            </span>
            <h4 style={{ margin: '0.5rem 0', color: '#f8fafc' }}>{item.name}</h4>
            <p style={{ margin: 0, color: '#4ade80', fontWeight: '600' }}>IDR {item.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {selectedExtra && (
        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#0f172a', borderRadius: '6px', border: '1px solid #38bdf8' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>Selected Service: {selectedExtra.name}</h4>
          <p style={{ margin: 0, color: '#f8fafc' }}>Price: <strong>IDR {selectedExtra.price.toLocaleString()}</strong> ({selectedExtra.category})</p>
        </div>
      )}
    </div>
  )
}