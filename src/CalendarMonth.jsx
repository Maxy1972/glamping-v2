import React, { useState, useEffect } from 'react'
import { supabase } from './supabase'

export default function CalendarMonth() {
  const [reservations, setReservations] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    fetchReservations()
  }, [])

  async function fetchReservations() {
    try {
      const { data, error } = await supabase.from('reservation').select('*')
      if (error) throw error
      setReservations(data || [])
    } catch (err) {
      console.error('Error fetching reservations:', err.message)
    }
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayIndex = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="card" style={{ marginTop: '2rem', textAlign: 'left' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#38bdf8', margin: 0 }}>
          {monthNames[month]} {year}
        </h2>
        <div>
          <button 
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', marginRight: '0.5rem' }}
          >
            Prev
          </button>
          <button 
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            style={{ background: '#334155', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}
          >
            Next
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: 'bold', color: '#94a3b8', marginBottom: '0.5rem' }}>
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} style={{ minHeight: '80px', background: '#0f172a', opacity: 0.3, borderRadius: '6px' }}></div>
        ))}

        {Array.from({ length: totalDays }).map((_, index) => {
          const dayNum = index + 1
          return (
            <div 
              key={dayNum} 
              style={{ 
                minHeight: '80px', 
                background: '#0f172a', 
                padding: '8px', 
                borderRadius: '6px',
                border: '1px solid #334155',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#f8fafc' }}>{dayNum}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}