import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  correo: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.id = action.payload.id;
      state.correo = action.payload.correo;
      state.token = action.payload.token;
    },
    logout(state, action) {
      state.id = null;
      state.correo = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;