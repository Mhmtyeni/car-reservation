import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReservationDataByDate = createAsyncThunk(
  "reservation/fetchReservationDataByDate",
  async ({
    startDate,
    endDate,
    startLocationId,
    CarTypeId,
    page = 0,
    size = 10,
  }) => {
    const response = await fetch(
      `/api/Cars/get-all-available-cars?LocationId=${startLocationId}&CarTypeId=${CarTypeId}&StartDateTime=${startDate}&EndDateTime=${endDate}&Page=${page}&Size=${size}&IsActive=true&IsDeleted=false`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    data: null,
    filteredData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFilteredData(state, action) {
      state.filteredData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservationDataByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReservationDataByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload.cars;
      })
      .addCase(fetchReservationDataByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilteredData } = reservationSlice.actions;

export default reservationSlice.reducer;
