import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import SpecialityTags from "../components/SpecialityTags";
import SearchFilter from "../components/SearchFilter";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctors } from "../features/doctors/doctorSlice";
import { api } from "../services/api";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctorList } = useSelector(
    (state) => state.doctors
  );


  useEffect(() => {
    api.get("/doctors/most-searched")
      .then((res) => {
        dispatch(setDoctors(res.data));
      })
      .catch(console.error);
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <h2>Search Doctors</h2>
      <SearchFilter />

      <h2>Most Searched Doctors</h2>

      <div className="grid">
        {doctorList.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>

      <h2>Specialities</h2>
      <SpecialityTags />

      <div className="ctaBox">
      <h2>Are you a Doctor?</h2>

     <button onClick={() => navigate("/register")}> Register Now </button>
    </div>

    </div>
  );
};

export default Home;
