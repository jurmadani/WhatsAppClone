import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { toastNotificationSlice } from "./toastNotificationSlice";


export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        toastNotification: toastNotificationSlice.reducer
    }
})