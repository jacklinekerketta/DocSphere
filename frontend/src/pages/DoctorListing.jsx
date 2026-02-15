import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import SearchFilter from "../components/SearchFilter";
import { useSearchParams } from "react-router-dom";

import {
  useEffect,
  useState,
  useRef,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  setDoctors,
  appendDoctors,
  clearDoctors,
} from "../features/doctors/doctorSlice";

import { api } from "../services/api";

const DoctorListing = () => {
  const dispatch = useDispatch();
  const { doctorList } = useSelector(
    (state) => state.doctors
  );

  // ==============================
  // STATES
  // ==============================
  const [page, setPage] =
    useState(1);
  const [total, setTotal] =
    useState(0);
  const [loading, setLoading] =
    useState(false);

  const limit = 12;

  // Scroll container ref
  const gridRef = useRef(null);

  // ==============================
  // QUERY PARAMS
  // ==============================
  const [searchParams] =
    useSearchParams();

  const search =
    searchParams.get("search") || "";
  const city =
    searchParams.get("city") || "";
  const speciality =
    searchParams.get(
      "speciality"
    ) || "";

  // ==============================
  // FETCH DOCTORS
  // ==============================
  const fetchDoctors = async (
    pageNo
  ) => {
    if (loading) return;

    setLoading(true);

    const res = await api.get(
      "/doctors",
      {
        params: {
          page: pageNo,
          limit,
          search,
          city,
          speciality,
        },
      }
    );

    if (pageNo === 1) {
      dispatch(
        setDoctors(
          res.data.doctors
        )
      );
    } else {
      dispatch(
        appendDoctors(
          res.data.doctors
        )
      );
    }

    setTotal(res.data.total);
    setLoading(false);
  };

  // ==============================
  // RESET ON FILTER CHANGE
  // ==============================
  useEffect(() => {
    dispatch(clearDoctors());
    setPage(1);
  }, [search, city, speciality]);

  // ==============================
  // FETCH ON PAGE CHANGE
  // ==============================
  useEffect(() => {
    fetchDoctors(page);
  }, [
    page,
    search,
    city,
    speciality,
  ]);

  // ==============================
  // INFINITE SCROLL (CONTAINER)
  // ==============================
  useEffect(() => {
    const container =
      gridRef.current;

    if (!container) return;

    const handleScroll = () => {
      const scrollTop =
        container.scrollTop;
      const scrollHeight =
        container.scrollHeight;
      const clientHeight =
        container.clientHeight;

      if (
        scrollTop +
          clientHeight >=
          scrollHeight - 50 &&
        doctorList.length <
          total &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      container.removeEventListener(
        "scroll",
        handleScroll
      );
  }, [
    doctorList.length,
    total,
    loading,
  ]);

  // ==============================
  // UI
  // ==============================
  return (
    <div>
      <Navbar />

      <h2>Find Doctors</h2>

      <SearchFilter />

      {/* Scroll Container */}
      <div
        className="grid"
        ref={gridRef}
        style={{
          height: "70vh",
          overflowY: "auto",
        }}
      >
        {doctorList.length > 0 ? (
          doctorList.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
            />
          ))
        ) : (
          <div className="emptyState">
            <h3>
              No doctors found 😔
            </h3>
            <p>
              Try changing filters
              or search.
            </p>
          </div>
        )}

        {loading && (
          <p
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            Loading more doctors...
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;
