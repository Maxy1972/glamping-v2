import React, { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabase'
import CalendarMonth from './CalendarMonth'
import InteractiveMap from './InteractiveMap'

function App() {
  const [status, setStatus] = useState('Real-time service scheduling and unit status manager')
  const [activeTab, setActiveTab] = useState('calendar')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('reservation').select('*').limit(1)
        if (error) throw error
        setStatus('Real-time service scheduling and unit status manager')
      } catch (err) {
        setStatus('Connection error: ' + err.message)
      }
    }
    testConnection()
  }, [])

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', color: '#4ade80', marginBottom: '0.2rem', fontWeight: '700' }}>✨ Sky Stars Eco Glamping</h2>
            <span style={{ fontSize: '0.75rem', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Vista Manager</span>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <button 
              onClick={() => setActiveTab('calendar')}
              style={{ 
                background: activeTab === 'calendar' ? '#134e38' : 'transparent', 
                color: '#fff', border: 'none', padding: '0.7rem 1rem', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'calendar' ? '600' : '400', fontSize: '0.9rem' 
              }}
            >
              📅 Calendar (Month)
            </button>
            
            <button 
              onClick={() => setActiveTab('map')}
              style={{ 
                background: activeTab === 'map' ? '#134e38' : 'transparent', 
                color: '#fff', border: 'none', padding: '0.7rem 1rem', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontWeight: activeTab === 'map' ? '600' : '400', fontSize: '0.9rem' 
              }}
            >
              🗺️ Interactive Map
            </button>
          </nav>
        </div>

        <div>
          <button 
            onClick={() => setActiveTab('calendar')}
            style={{ width: '100%', background: '#b91c1c', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            ← Esci (Torna Lobby)
          </button>
        </div>
      </aside>

      {/* CONTENUTO PRINCIPALE */}
      <main className="main-content">
        {/* TOP BAR CON TITOLO E PULSANTI PRINCIPALI */}
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '0.25rem' }}>Glamping Management Dashboard</h1>
            <p className="success" style={{ margin: 0 }}>{status}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{ background: '#ffffff', color: '#334155', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ⚙️ Manage Units
            </button>
            <button style={{ background: '#059669', color: '#ffffff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
              + New Reservation
            </button>
          </div>
        </div>

        {/* VISTA ATTIVA */}
        <div>
          {activeTab === 'calendar' && <CalendarMonth />}
          {activeTab === 'map' && <InteractiveMap />}
        </div>
      </main>
    </div>
  )
}

export default App