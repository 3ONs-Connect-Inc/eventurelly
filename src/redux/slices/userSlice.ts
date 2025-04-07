import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';


interface UserState {  
  activeUser: User | null;
  isLoggedIn: boolean;
}
 

const storedUser = localStorage.getItem('user');
const initialState: UserState = storedUser
  ? { activeUser: JSON.parse(storedUser), isLoggedIn: true }
  : { activeUser: null, isLoggedIn: false };

const userSlice = createSlice({  
  name: 'user',  
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user
    },
    removeActiveUser: (state) => {
      state.activeUser = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user'); // Clear storage
    },
  },
});

export const { setActiveUser, removeActiveUser } = userSlice.actions;
export default userSlice.reducer;
