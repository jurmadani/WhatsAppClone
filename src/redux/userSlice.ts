import { createSlice } from '@reduxjs/toolkit'
import { initialStateUserSlice } from '../types/redux/sliceTypes';

const initialState: initialStateUserSlice = {
    user: null,
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserGlobalState: (state, action) => {
            state.user = action.payload
            console.log("Redux User Global State Updated")
        },
    }
})