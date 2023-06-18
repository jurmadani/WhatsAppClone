import { createSlice } from '@reduxjs/toolkit'
import { initialStateUserSlice } from '../types/redux/sliceTypes';

const initialState: initialStateUserSlice = {
    //it's null normally but we've set it to my user info for test
    user: null
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserGlobalState: (state, action) => {
            state.user = action.payload
            console.log("Redux User Global State Updated")
        },
        updateUserGlobalStateImageURL: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    imageURL: action.payload.imageURL
                }
            }
            console.log("Redux User Global State Updated");
        },
        updateUserGlobalStateFullName: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    fullName: action.payload.fullName
                }
            }
            console.log("Redux User Global State Updated");
        },
        updateUserGlobalStateInfo: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    info: action.payload.info
                }
            }
            console.log("Redux User Global State Updated");
        },
        updateUserGlobalStateContactsArray: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    contacts: action.payload.contacts
                }
            }
            console.log("Redux User Global State Updated");
        },
        updateUserGlobalStateChatRoomsArray: (state, action) => {
            if (state.user) {
                state.user = {
                    ...state.user,
                    chatRooms: action.payload.chatRoomObject
                }
            }
            console.log("Redux User Global State Updated");
        },
    }
})