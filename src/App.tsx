import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Nav from './components/Nav'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient("https://jczttxmgknqmhdwgpmvl.supabase.co", import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY)
function App() {


  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('dummy')
        .insert([
          { some_column: 'someValue', other_column: 'otherValue' },
        ])
    })()

  }, [])



  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route element={<Homepage />} path='/' />
        </Routes>
      </Router>
    </div>
  )
}

export default App
