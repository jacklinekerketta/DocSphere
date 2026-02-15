import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { api } from "../services/api";

const DoctorDetail = () => {
  const { id } = useParams();

  const [doctor, setDoctor] =
    useState(null);
  const [topTen, setTopTen] =
    useState([]);
  const navigate = useNavigate();

  // Always fetch doctor (increments search count)
  useEffect(() => {
    api
      .get(`/doctors/${id}`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch(console.error);
  }, [id]);

  // Fetch top 10 list
  useEffect(() => {
    api
      .get("/doctors/top-ten")
      .then((res) => {
        setTopTen(res.data);
      });
  }, []);

  if (!doctor) return <p>Loading...</p>;

  const isTopTen = topTen.some(
    (d) => d.id === doctor.id
  );

  return (
    <div>
      <Navbar />
      <button
  className="backBtn"
  onClick={() => navigate(-1)}
>
  ← Back
</button>


      <div className="detail">
        <img
          src={
            doctor.profile_picture
              ? `http://localhost:5000/uploads/${doctor.profile_picture}`
              : "/doctor.jpg"
          }
          alt=""
        />

        <h2>{doctor.name}</h2>
        <p>{doctor.speciality}</p>
        <p>{doctor.city}</p>

        <h3>Professional Info</h3>

        <p>
          Experience: {doctor.yoe} yrs
        </p>
        <p>
          Fee: ₹{" "}
          {doctor.consultation_fee}
        </p>

        {isTopTen && (
          <span className="badge">
            Most Searched
          </span>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;
