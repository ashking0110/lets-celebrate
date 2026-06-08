import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: number | null;
  role: 'Customer' | 'Vendor' | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; userId: number; role?: 'Customer' | 'Vendor' }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      if (action.payload.role) {
         state.role = action.payload.role;
      }
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
