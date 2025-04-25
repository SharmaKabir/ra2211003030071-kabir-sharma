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
      const specialtyNames = Array.isArray(doctor.specialities) 
      ? doctor.specialities.map(s => s.name).join(', ')
      : 'No specialties listed';
      let consultationType;
      if (doctor.video_consult && doctor.in_clinic) {
          consultationType = 'Video Consult & In Clinic';
      } else if (doctor.video_consult) {
          consultationType = 'Video Consult';
      } else if (doctor.in_clinic) {
          consultationType = 'In Clinic';
      } else {
          consultationType = 'Not available';
      }
      const city = doctor.clinic && doctor.clinic.address && doctor.clinic.address.city 
        ? doctor.clinic.address.city 
        : 'Location not available';
  return (
    <div className="doctor-card" data-testid="doctor-card">
        <div className='doctor-image'>
            <img src={doctor.image}/>
        </div>
        <div className="doctor-details">
          <h2 data-testid="doctor-name">{doctor.name}</h2>
          <p data-testid="doctor-specialty">{specialtyNames}</p>
          <p data-testid="doctor-experience">{doctor.experience || 0}</p>
          <p> {city}</p>
          <p data-testid="doctor-fee">Consultation Fee: {doctor.fees || 0}</p>
          <div className="doctor-consultation-type">
            {consultationType}
          </div>
        </div>
    </div>
  )
}

export default DoctorCard