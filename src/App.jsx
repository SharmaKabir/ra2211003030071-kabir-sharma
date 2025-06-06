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

    
    // if (filters.consultation) {
    //   result = result.filter(doctor =>
    //     doctor.consultationType === filters.consultation
    //   )
    // }
    if (filters.consultation) {
      result = result.filter(doctor => {
        if (filters.consultation === 'video-consult') {
          return doctor.video_consult === true;
        } else if (filters.consultation === 'in-clinic') {
          return doctor.in_clinic === true;
        }
        return true;
      });
    }

    
    if (filters.specialties.length > 0) {
      result = result.filter(doctor =>
        Array.isArray(doctor.specialities) &&
        doctor.specialities.some(specialty => 
         
          filters.specialties.includes(specialty.name)
        )
      )
    }

    
    // if (filters.sort === 'fees') {
    //   result.sort((a, b) => (a.fees ?? Infinity) - (b.fees ?? Infinity))
    // } else if (filters.sort === 'experience') {
    //   result.sort((a, b) => (b.experience ?? 0) - (a.experience ?? 0))
    // }
    if (filters.sort === 'fees') {
      result.sort((a, b) => {
        const feeA = typeof a.fees === 'string' ? parseInt(a.fees.replace(/[^\d]/g, '')) : a.fees ?? Infinity;
        const feeB = typeof b.fees === 'string' ? parseInt(b.fees.replace(/[^\d]/g, '')) : b.fees ?? Infinity;
        return feeA - feeB;
      });
    } else if (filters.sort === 'experience') {
      result.sort((a, b) => (b.experience ?? 0) - (a.experience ?? 0));
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