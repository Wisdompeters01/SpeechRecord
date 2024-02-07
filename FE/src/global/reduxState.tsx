import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "" || null,
  email: "" || null,
  password: "" || null,
  transcript: "" || null,
};

const reduxState = createSlice({
  name: "second",
  initialState,
  reducers: {
    register: (state, { payload }) => {
      state.email = payload?.email;
      state.password = payload?.password;
    },
    login: (state, { payload }) => {
      state.user = payload;
    },
    addVoice: (state, { payload }) => {
      state.transcript = payload;
    },
  },
});

export const { register, addVoice } = reduxState.actions;

export default reduxState.reducer;
