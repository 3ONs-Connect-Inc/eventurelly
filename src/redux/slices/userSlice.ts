import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';


interface UserState {  
  activeUser: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  activeUser: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
      state.isLoggedIn = true;
    },
    removeActiveUser: (state) => {
      state.activeUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setActiveUser, removeActiveUser } = userSlice.actions;
export default userSlice.reducer;
