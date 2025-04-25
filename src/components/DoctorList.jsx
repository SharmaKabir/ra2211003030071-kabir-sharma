import DoctorCard from './DoctorCard'

function DoctorList({ doctors }) {
  return (
    <div className="doctor-list">
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      )}
    </div>
  )
}

export default DoctorList