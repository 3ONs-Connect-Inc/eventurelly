import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingData {
  eventNamePrefix: string;
  userId?: string;
  eventId?: string;
  createdBy?: string,
  slug?: string;
  eventName: string;
  eventDate: string | null;
  optionalServices: { [serviceName: string]: boolean };
  eventDescription: string;
  eventFormat: string;
  location: string;
  duration: string;
  teamSize: string;
  eventCategory?: string,
  searchKeywords?: string[],
  expectedOutcome?: string,
  servicesIncluded: string[];
  servicesNotIncluded: string[];
}

interface EventBookingState {
  bookings: BookingData[];
}

const initialState: EventBookingState = {
  bookings: [],
};

const eventBookingSlice = createSlice({
  name: 'eventBooking',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingData>) => {
      state.bookings.push(action.payload);
    },
  },   
});

export const { addBooking } = eventBookingSlice.actions;
export default eventBookingSlice.reducer;
