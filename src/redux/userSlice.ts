import { createSlice } from '@reduxjs/toolkit'
import { initialStateUserSlice } from '../types/redux/sliceTypes';

const initialState: initialStateUserSlice = {
    //it's null normally but we've set it to my user info for test
    user: {
        uniqueId: "d94dc2e0-ee87-59c1-833b-4b49c0fe10e4",
        phoneNumber: "787589667",
        countryCode: "+40",
        country: "Romania",
        status: '',
        imageURL: "https://firebasestorage.googleapis.com/v0/b/rn-whatsapp-clone-8c38a.appspot.com/o/DefaultAvatar.png?alt=media&token=562af373-777d-4a90-8a92-bfc16eeb9209&_gl=1*zp3rnd*_ga*Mjg3OTM0MDA0LjE2NzY0NTA5ODg.*_ga_CW55HF8NVT*MTY4NTY0NDU3OS40OS4xLjE2ODU2NDk0MTYuMC4wLjA.",
        contacts: [],
        chatRooms: [],
        fullName: 'Full Name',
        info: 'Available'
    },
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
    }
})