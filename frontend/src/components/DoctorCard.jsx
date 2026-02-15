import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  return (
    <Link to={`/doctor/${doctor.id}`}>
      <div className="card">
        <img
  src={
    doctor.profile_picture
      ? `http://localhost:5000/uploads/${doctor.profile_picture}`
      : "/doctor.jpg"
  }
  alt="doc"
/>


      

<h3>{doctor.name}</h3>

<span className="speciality">
  {doctor.speciality}
</span>

<p className="city">
  {doctor.city}
</p>

<div className="infoRow">
  <span className="experience">
    {doctor.yoe} yrs exp
  </span>

  <span className="fee">
    ₹ {doctor.consultation_fee}
  </span>
</div>

      </div>
    </Link>
  );
};

export default DoctorCard;
