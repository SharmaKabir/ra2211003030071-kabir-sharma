import React from 'react'

const DoctorCard = ({ doctor}) => {
    // if(!doctor || !doctor.name){
    //     console.log("error", doctor);
    //     return 
    //     <div className="doctor-card"> 
    //         Invalid doctor data
    //     </div>
    // }
    if (!doctor || !doctor.name) {
        console.error('Invalid', doctor);
        return <div className="doctor-card">Invalid doctor data</div>;
      }
  return (
    <div className="doctor-card" data-testid="doctor-card">
        <div className='doctor-image'>
            <img src={doctor.image}/>
        </div>
        <div className="doctor-details">
          <h2 data-testid="doctor-name">{doctor.name}</h2>
          <p data-testid="doctor-specialty">{doctor.specialities ? doctor.specialities.join(', ') : 'No specialties listed'}</p>
          <p data-testid="doctor-experience">{doctor.experience || 0} years of experience</p>
          <p data-testid="doctor-fee">Consultation Fee: {doctor.fees || 0}</p>
          <div className="doctor-consultation-type">
            {doctor.consultationType === 'video-consult' ? 'Video Consult' : 'In Clinic'}
          </div>
        </div>
    </div>
  )
}

export default DoctorCard