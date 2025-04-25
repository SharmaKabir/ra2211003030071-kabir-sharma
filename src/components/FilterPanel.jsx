
  
  
//   const allSpecialties = [...new Set(
//     doctors.flatMap(doctor => doctor.specialties)
//   )].sort()
  
//   useEffect(() => {
//     const consultation = searchParams.get('consultation') || ''
//     const sort = searchParams.get('sort') || ''
//     const specialties = searchParams.getAll('specialty') || []
    
//     setFilters({
//       consultation,
//       sort,
//       specialties
//     })
//   }, [searchParams, setFilters])

//   const handleConsultationChange = (type) => {
//     const newFilters = { ...filters, consultation: type }
//     setFilters(newFilters)
    
//     const newParams = new URLSearchParams(searchParams.toString())
//     if (type) {
//       newParams.set('consultation', type)
//     } else {
//       newParams.delete('consultation')
//     }
//     setSearchParams(newParams)
//   }

//   const handleSpecialtyChange = (specialty, isChecked) => {
//     let newSpecialties
    
//     if (isChecked) {
//       newSpecialties = [...filters.specialties, specialty]
//     } else {
//       newSpecialties = filters.specialties.filter(s => s !== specialty)
//     }
    
//     const newFilters = { ...filters, specialties: newSpecialties }
//     setFilters(newFilters)
    
//     const newParams = new URLSearchParams(searchParams.toString())
//     newParams.delete('specialty')
//     newSpecialties.forEach(s => newParams.append('specialty', s))
//     setSearchParams(newParams)
//   }

//   const handleSortChange = (sortOption) => {
//     const newFilters = { ...filters, sort: sortOption }
//     setFilters(newFilters)
    
//     const newParams = new URLSearchParams(searchParams.toString())
//     if (sortOption) {
//       newParams.set('sort', sortOption)
//     } else {
//       newParams.delete('sort')
//     }
//     setSearchParams(newParams)
//   }


    

import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function FilterPanel({ doctors, filters, setFilters }) {
    const SPECIALTIES = [
        "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT",
        "Diabetologist", "Cardiologist", "Physiotherapist", "Endocrinologist", "Orthopaedic",
        "Ophthalmologist", "Gastroenterologist", "Pulmonologist", "Psychiatrist", "Urologist",
        "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist", "Neurologist",
        "Oncologist", "Ayurveda", "Homeopath"
      ];
  const [searchParams, setSearchParams] = useSearchParams()

  const allSpecialties = [...new Set(
    doctors.flatMap(doctor => Array.isArray(doctor.specialties) ? doctor.specialties : [])
  )].sort()

  useEffect(() => {
    const consultation = searchParams.get('consultation') || ''
    const sort = searchParams.get('sort') || ''
    const specialties = searchParams.getAll('specialty') || []

    setFilters({
      consultation,
      sort,
      specialties
    })
  }, [searchParams, setFilters])

  const handleConsultationChange = (type) => {
    const newFilters = { ...filters, consultation: type }
    setFilters(newFilters)

    const newParams = new URLSearchParams(searchParams.toString())
    if (type) {
      newParams.set('consultation', type)
    } else {
      newParams.delete('consultation')
    }
    setSearchParams(newParams)
  }

  const handleSpecialtyChange = (specialty, isChecked) => {
    let newSpecialties

    if (isChecked) {
      newSpecialties = [...filters.specialties, specialty]
    } else {
      newSpecialties = filters.specialties.filter(s => s !== specialty)
    }

    const newFilters = { ...filters, specialties: newSpecialties }
    setFilters(newFilters)

    const newParams = new URLSearchParams(searchParams.toString())
    newParams.delete('specialty')
    newSpecialties.forEach(s => newParams.append('specialty', s))
    setSearchParams(newParams)
  }

  const handleSortChange = (sortOption) => {
    const newFilters = { ...filters, sort: sortOption }
    setFilters(newFilters)

    const newParams = new URLSearchParams(searchParams.toString())
    if (sortOption) {
      newParams.set('sort', sortOption)
    } else {
      newParams.delete('sort')
    }
    setSearchParams(newParams)
  }

  return (
    <div className="filter-panel">
      <div className="filter-section">
        <h3 data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              data-testid="filter-video-consult"
              checked={filters.consultation === 'video-consult'}
              onChange={() => handleConsultationChange('video-consult')}
            />
            Video Consult
          </label>
          <label>
            <input
              type="radio"
              data-testid="filter-in-clinic"
              checked={filters.consultation === 'in-clinic'}
              onChange={() => handleConsultationChange('in-clinic')}
            />
            In Clinic
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-speciality">Speciality</h3>
        <div className="filter-options">
          {allSpecialties.map((specialty, index) => {
            const testId = `filter-specialty-${specialty.replace(/\//g, '-').replace(/\s+/g, '-')}`
            return (
              <label key={`specialty-${index}-${specialty}`}>
                <input
                  type="checkbox"
                  data-testid={testId}
                  checked={filters.specialties.includes(specialty)}
                  onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                />
                {specialty}
              </label>
            )
          })}
        </div>
      </div>

      <div className="filter-section">
        <h3 data-testid="filter-header-sort">Sort By</h3>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              data-testid="sort-fees"
              checked={filters.sort === 'fees'}
              onChange={() => handleSortChange('fees')}
            />
            Fees: Low to High
          </label>
          <label>
            <input
              type="radio"
              data-testid="sort-experience"
              checked={filters.sort === 'experience'}
              onChange={() => handleSortChange('experience')}
            />
            Experience: High to Low
          </label>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel