import React, { useState } from 'react'

export default function InteractiveMap() {
  const [selectedPlot, setSelectedPlot] = useState(null)

  const plots = [
    { id: 1, name: 'Plot Alpha (Tent Zone)', status: 'Available', top: '20%', left: '30%' },
    { id: 2, name: 'Plot Beta (Tent Zone)', status: 'Occupied', top: '50%', left: '60%' },
    { id: 3, name: 'Plot Gamma (Scenic View)', status: 'Available', top: '70%', left: '25%' },
  ]

  return (
    <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Resort Interactive Map</h2>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Click on a plot to check details and status.</p>

      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '400px', 
        background: '#0f172a', 
        borderRadius: '8px', 
        border: '1px solid #334155',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        {plots.map((plot) => (
          <button
            key={plot.id}
            onClick={() => setSelectedPlot(plot)}
            style={{
              position: 'absolute',
              top: plot.top,
              left: plot.left,
              background: plot.status === 'Available' ? '#10b981' : '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.85rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
              transform: 'translate(-50%, -50%)'
            }}
          >
            {plot.name.split(' ')[0]} ({plot.status})
          </button>
        ))}
      </div>

      {selectedPlot && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#0f172a', borderRadius: '6px', border: '1px solid #38bdf8' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>{selectedPlot.name}</h4>
          <p style={{ margin: 0, color: '#f8fafc' }}>Status: <strong>{selectedPlot.status}</strong></p>
        </div>
      )}
    </div>
  )
}