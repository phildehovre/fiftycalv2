import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Nav from './components/Nav'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import CreateTemplatePage from './pages/CreateTemplatePage'
import CreateEventPage from './pages/CreateEventPage'

export const supabase = createClient(import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_URL, import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY)
function App() {


  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route element={<Homepage />} path='/' />
          <Route element={<CreateTemplatePage />} path='/template' />
          <Route element={<CreateEventPage />} path='/event' />
        </Routes>
      </Router>
    </div>
  )
}

export default App
