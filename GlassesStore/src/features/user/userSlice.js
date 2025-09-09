
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginOrRegister = createAsyncThunk(
  'user/loginOrRegister',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:4000/user/loginOrRegister', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'שגיאה בהתחברות / הרשמה');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAdmin: false,
    message: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.isAdmin = false;
      state.error = null;
      state.status = 'idle';
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOrRegister.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(loginOrRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.isAdmin = action.payload.user?.isAdmin || false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(loginOrRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
