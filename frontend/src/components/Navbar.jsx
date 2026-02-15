import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
  <h2>DocSphere</h2>
</Link>


      <div>
        <Link to="/">Home</Link>
        <Link to="/listing">Doctors</Link>
        <Link to="/register">Register Doctor</Link>
      </div>
    </div>
  );
};

export default Navbar;
