import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settings/SettingsSlices";
import authReducer from "./slices/auth/AuthSlices";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
  },
});

export default store;