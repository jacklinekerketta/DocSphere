import { cities, specialities } from "../data/masterData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] =
    useState("");

  const handleSearch = () => {
    const params = new URLSearchParams({
      search: name,
      city,
      speciality,
    });

    navigate(`/listing?${params.toString()}`);
  };

  return (
    <div className="filterBox">
     
      <input
        placeholder="Search doctor"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

     
      <select
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
      >
        <option value="">City</option>
        {cities.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      
      <select
        value={speciality}
        onChange={(e) =>
          setSpeciality(e.target.value)
        }
      >
        <option value="">
          Speciality
        </option>
        {specialities.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
