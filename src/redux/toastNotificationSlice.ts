import { createSlice } from "@reduxjs/toolkit";
import { initialStateToastNotificationSlice } from "../types/redux/sliceTypes";

const initialState: initialStateToastNotificationSlice = {
    message: "",
    contactFirstName: "",
    contactLastName: "",
    contactImageURL: "",
    type: "",
    placement: "top",
    duration: 1,
    displayNotification: true,
    contactUniqueId: "",
    chatRoomId: "",
}

export const toastNotificationSlice = createSlice({
    name: "toastNotification",
    initialState,
    reducers: {
        showToast: (state, action) => {
            const { message, type, placement, duration, contactFirstName, contactLastName, contactImageURL, contactUniqueId, chatRoomId } = action.payload;
            state.message = message;
            state.type = type;
            state.placement = placement;
            state.duration = duration;
            state.contactFirstName = contactFirstName;
            state.contactLastName = contactLastName;
            state.contactImageURL = contactImageURL;
            state.displayNotification = true;
            state.contactUniqueId = contactUniqueId;
            state.chatRoomId = chatRoomId
        },
        hideToast: (state) => {
            state.displayNotification = false;
            state.message = '';
            state.type = '';
            state.placement = 'top';
            state.duration = 1;
            state.contactFirstName = '';
            state.contactLastName = '';
            state.contactImageURL = '';
            state.contactUniqueId = "";
            state.chatRoomId = "";
        },
    }
})