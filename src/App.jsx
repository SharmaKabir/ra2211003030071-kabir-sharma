import { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Autocomplete from './components/Autocomplete'
import FilterPanel from './components/FilterPanel'
import DoctorList from './components/DoctorList'

import './App.css'

function App() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    consultation: '',
    specialties: [],
    sort: ''
  })

  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        if (!response.ok) throw new Error('error in fetch');
        const data = await response.json();
        console.log('API', data); 
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        console.error('error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, []);

  
  useEffect(() => {
    if (doctors.length === 0) return

    let result = [...doctors]

    
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    
    if (filters.consultation) {
      result = result.filter(doctor =>
        doctor.consultationType === filters.consultation
      )
    }

    
    if (filters.specialties.length > 0) {
      result = result.filter(doctor =>
        filters.specialties.some(specialty => 
          doctor.specialties.includes(specialty)
        )
      )
    }

    
    if (filters.sort === 'fees') {
      result.sort((a, b) => a.fees - b.fees)
    } else if (filters.sort === 'experience') {
      result.sort((a, b) => b.experience - a.experience)
    }

    setFilteredDoctors(result)
  }, [doctors, searchTerm, filters])

  return (
    <>
      <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Find Doctors</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Autocomplete doctors={doctors} setSearchTerm={setSearchTerm}/>
          )}
        </header>
        <main>
          <div className='content'>
            {!loading && !error && (
              <>
                <FilterPanel
                  doctors={doctors}
                  filters={filters}
                  setFilters={setFilters}
                />
                <DoctorList doctors={filteredDoctors}/>
              </>
            )}
          </div>
        </main>
      </div>
      </BrowserRouter>
    </>
  )
}

export default App