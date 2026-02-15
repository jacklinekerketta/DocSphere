import { useState } from "react";
import { api } from "../services/api";
import {
  cities,
  specialities,
} from "../data/masterData";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();


  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      gender: "",
      age: "",
      phone: "",
      city: "",
      institute_name: "",
      degree_name: "",
      speciality: "",
      yoe: "",
      consultation_fee: "",
    });

  const [file, setFile] =
    useState(null);

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {
  try {
    const data = new FormData();

    Object.keys(formData).forEach(
      (key) =>
        data.append(key, formData[key])
    );

    if (file) {
      data.append(
        "profile_picture",
        file
      );
    }

    const res = await api.post(
      "/doctors",
      data
    );

    // Success message
    alert(
      "Doctor registered successfully!"
    );

    // Redirect to home
    navigate("/");

  } catch (error) {
    console.error(error);

    alert(
      "Registration failed. Please try again with valid details."
    );
  }
};


  return (
    
    <div className="formBox">
      <button
  className="backBtn"
  onClick={() => navigate(-1)}
>
  ← Back
</button>

      {step === 1 ? (
        <div>
          <h2>Step 1: Personal Info</h2>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInput}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
          />

          {/* Gender Dropdown */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInput}
          >
            <option value="">
              Select Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInput}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInput}
          />

          {/* City Dropdown */}
          <select
            name="city"
            value={formData.city}
            onChange={handleInput}
          >
            <option value="">
              Select City
            </option>
            {cities.map((c) => (
              <option key={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={() =>
              setStep(2)
            }
          >
            Next
          </button>
        </div>
      ) : (
        <div>
          <h2>
            Step 2: Professional Info
          </h2>

          <input
            name="institute_name"
            placeholder="Institute"
            value={
              formData.institute_name
            }
            onChange={handleInput}
          />

          <input
            name="degree_name"
            placeholder="Degree"
            value={
              formData.degree_name
            }
            onChange={handleInput}
          />

          {/* Speciality Dropdown */}
          <select
            name="speciality"
            value={
              formData.speciality
            }
            onChange={handleInput}
          >
            <option value="">
              Select Speciality
            </option>
            {specialities.map((s) => (
              <option key={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            name="yoe"
            placeholder="Years of Experience"
            value={formData.yoe}
            onChange={handleInput}
          />

          <input
            name="consultation_fee"
            placeholder="Consultation Fee"
            value={
              formData.consultation_fee
            }
            onChange={handleInput}
          />

          <button
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterDoctor;
