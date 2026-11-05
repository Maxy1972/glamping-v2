import React, { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './supabase'
import CalendarMonth from './CalendarMonth'
import InteractiveMap from './InteractiveMap'

function App() {
  const [status, setStatus] = useState('Checking connection...')

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('reservation').select('*').limit(1)
        if (error) throw error
        setStatus('Connection successful! Tables loaded correctly.')
      } catch (err) {
        setStatus('Connection error: ' + err.message)
      }
    }
    testConnection()
  }, [])

  return (
    <div>
      <div className="card">
        <h1>Sky Stars Glamping V2</h1>
        <p className={status.includes('successful') ? 'success' : ''}>{status}</p>
      </div>

      <CalendarMonth />
      <InteractiveMap />
    </div>
  )
}

export default App