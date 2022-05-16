import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: () => {},
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
