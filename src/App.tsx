import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../src/pages/Homepage'
import Nav from './components/Nav'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import CreateTemplatePage from './pages/CreateTemplatePage'
import CreateEventPage from './pages/CreateEventPage'
import EditSelectedTemplatePage from './pages/EditSelectedTemplatePage'
import SelectedTemplateContextProvider from './contexts/SelectedTemplateContext'

export const supabase = createClient(import.meta.env.VITE_REACT_APP_SUPABASE_PROJECT_URL, import.meta.env.VITE_REACT_APP_SUPABASE_API_KEY)
function App() {


  return (
    <div className="App">
      <Router>
        <Nav />
        <SelectedTemplateContextProvider >
          <Routes>
            <Route element={<Homepage />} path='/' />
            <Route element={<CreateTemplatePage />} path='/template' />
            <Route element={<EditSelectedTemplatePage />} path='/template/:id' />
            <Route element={<CreateEventPage />} path='/event' />
          </Routes>
        </SelectedTemplateContextProvider>
      </Router>
    </div>
  )
}

export default App
