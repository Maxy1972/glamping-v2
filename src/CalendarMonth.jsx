import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function CalendarMonth() {
  const [reservations, setReservations] = useState([])
  const [units, setUnits] = useState([
    { id: 1, name: 'Dome 01 Ocean View', type: 'TRANSPARENT DOME' },
    { id: 2, name: 'Dome 02 Ocean View', type: 'TRANSPARENT DOME' },
    { id: 3, name: '01 Luxury Tent ocean view', type: 'SAFARI TENT' },
    { id: 4, name: 'Luxury Safari Tent 02', type: 'SAFARI TENT' },
    { id: 5, name: 'Tent Sky Star 2x2 mt', type: 'SAFARI TENT' },
    { id: 6, name: 'luxuri gazebo', type: 'TRANSPARENT DOME' }
  ])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const { data: resData, error: resError } = await supabase.from('reservation').select('*')
      if (resError) throw resError
      setReservations(resData || [])

      const { data: unitData, error: unitError } = await supabase.from('units').select('*')
      if (!unitError && unitData && unitData.length > 0) {
        setUnits(unitData)
      }
    } catch (err) {
      console.error('Error fetching data:', err.message)
    }
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1)

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="card">
      
      {/* INTESTAZIONE MESE E SCORRIMENTO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold', color: '#1e293b' }}>Monthly Schedule</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '0.2rem', border: '1px solid #cbd5e1' }}>
          <button 
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            style={{ background: 'transparent', border: 'none', padding: '0.3rem 0.6rem', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}
          >
            &lt;
          </button>
          <span style={{ padding: '0 0.75rem', fontWeight: '600', fontSize: '0.9rem', color: '#1e293b' }}>{monthNames[month]} {year}</span>
          <button 
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            style={{ background: 'transparent', border: 'none', padding: '0.3rem 0.6rem', cursor: 'pointer', fontWeight: 'bold', color: '#334155' }}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* GRIGLIA TIMELINE */}
      <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `220px repeat(${totalDays}, minmax(32px, 1fr))`, minWidth: `${220 + (totalDays * 32)}px` }}>
          
          <div style={{ background: '#f8fafc', padding: '10px 12px', fontWeight: 'bold', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#475569' }}>
            Units ({units.length})
          </div>

          {daysArray.map(day => (
            <div key={day} style={{ background: '#f8fafc', padding: '10px 2px', textAlign: 'center', fontWeight: '600', fontSize: '0.75rem', borderBottom: '2px solid #e2e8f0', borderRight: '1px solid #f1f5f9', color: '#64748b' }}>
              {day}
            </div>
          ))}

          {units.map((unit) => (
            <React.Fragment key={unit.id}>
              <div style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{unit.type}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{unit.name}</span>
              </div>

              {daysArray.map(day => (
                <div 
                  key={day} 
                  style={{ 
                    borderBottom: '1px solid #e2e8f0', 
                    borderRight: '1px solid #f1f5f9', 
                    minHeight: '85px', 
                    background: '#fff',
                    position: 'relative'
                  }}
                >
                </div>
              ))}
            </React.Fragment>
          ))}

        </div>
      </div>

    </div>
  )
}