import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorListing from "./pages/DoctorListing";
import DoctorDetail from "./pages/DoctorDetail";
import RegisterDoctor from "./pages/RegisterDoctor";
import "./index.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/listing"
          element={<DoctorListing />}
        />
        <Route
          path="/doctor/:id"
          element={<DoctorDetail />}
        />
        <Route
          path="/register"
          element={<RegisterDoctor />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

