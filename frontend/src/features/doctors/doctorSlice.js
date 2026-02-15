import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorList: [],
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,

  reducers: {
    setDoctors: (state, action) => {
      state.doctorList = action.payload;
    },

    appendDoctors: (state, action) => {
      state.doctorList = [
        ...state.doctorList,
        ...action.payload,
      ];
      

    },

    clearDoctors: (state) => {
      state.doctorList = [];
    },
  },
});

export const {
  setDoctors,
  appendDoctors,
  clearDoctors,
} = doctorSlice.actions;

export default doctorSlice.reducer;
