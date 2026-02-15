import { specialities } from "../data/masterData";
import { useNavigate } from "react-router-dom";

const SpecialityTags = () => {
  const navigate = useNavigate();

  const handleClick = (speciality) => {
    navigate(
      `/listing?speciality=${speciality}`
    );
  };

  return (
    <div className="tags">
      {specialities.map((s) => (
        <span
          key={s}
          onClick={() =>
            handleClick(s)
          }
        >
          {s}
        </span>
      ))}
    </div>
  );
};

export default SpecialityTags;
