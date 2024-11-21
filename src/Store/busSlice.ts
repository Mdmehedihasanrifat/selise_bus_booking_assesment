import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeatDetails {
  name: string;
  destination: string;
  time: string;
}

interface BusState {
  buses: {
    [busNo: string]: {
      [seatNo: string]: SeatDetails | null;
    };
  };
}

const initialState: BusState = {
  buses: {
    S098: {},
    S099: {},
    S100: {},
  },
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    bookSeat: (
      state,
      action: PayloadAction<{
        busNo: string;
        seatNo: string;
        booking: SeatDetails;
      }>
    ) => {
      const { busNo, seatNo, booking } = action.payload;

      // Load existing data for the bus from localStorage
      const savedData = JSON.parse(localStorage.getItem(busNo) || "{}");

      // Update seat data
      savedData[seatNo] = booking;

      // Save updated data back to localStorage
      localStorage.setItem(busNo, JSON.stringify(savedData));

      // Update the Redux state
      state.buses[busNo] = { ...state.buses[busNo], [seatNo]: booking };
    },
    loadBusData: (state, action: PayloadAction<string>) => {
      const busNo = action.payload;

      // Load existing data from localStorage
      const savedData = JSON.parse(localStorage.getItem(busNo) || "{}");

      // Update Redux state
      state.buses[busNo] = savedData;
    },
    deleteBusData: (state, action: PayloadAction<string>) => {
      const busNo = action.payload;

      // Remove bus data from localStorage
      localStorage.removeItem(busNo);

      // Clear Redux state for the bus
      state.buses[busNo] = {};
    },
  },
});

export const { bookSeat, loadBusData, deleteBusData } = busSlice.actions;
export default busSlice.reducer;
