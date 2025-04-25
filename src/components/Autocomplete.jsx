import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

function Autocomplete({ doctors, setSearchTerm }) {
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const suggestionRef = useRef(null)
  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''
    if (searchQuery) {
      setInputValue(searchQuery)
      setSearchTerm(searchQuery)
    }
  }, [searchParams, setSearchTerm])
  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    if (value.trim() === '') {
      setSuggestions([])
      setShowSuggestions(false)
      updateSearchParams('')
      setSearchTerm('')
      return
    }
    const matchingDoctors = doctors
      .filter(doctor => 
        doctor.name.toLowerCase().includes(value.toLowerCase())
      )
      .map(doctor => doctor.name)
      .slice(0, 3) 

    setSuggestions(matchingDoctors)
    setShowSuggestions(true)
  }

 
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    updateSearchParams(suggestion)
    setSearchTerm(suggestion)
  }

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false)
      updateSearchParams(inputValue)
      setSearchTerm(inputValue)
    }
  }

  
  const updateSearchParams = (value) => {
    const newParams = new URLSearchParams(searchParams.toString())
    if (value) {
      newParams.set('search', value)
    } else {
      newParams.delete('search')
    }
    setSearchParams(newParams)
  }

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [suggestionRef])

  return (
    <div className="autocomplete-container">
      <input
        data-testid="autocomplete-input"
        type="text"
        placeholder="Search for doctors"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="suggestions" ref={suggestionRef}>
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              data-testid="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Autocomplete