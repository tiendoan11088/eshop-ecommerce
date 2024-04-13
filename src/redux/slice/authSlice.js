import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    unserID: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action)=> {
            const {email, userName, userID} = action.payload
            state.isLoggedIn = true
            // state.email = action.payload.email
            state.email = email
            state.userName = userName
            state.userID = userID
        },
        REMOVE_ACTIVE_USER(state, action){
            state.isLoggedIn = false
            state.email = null
            state.userName = null
            state.unserID = null
        }
    }
})

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectuserID = (state) => state.auth.userID

export default authSlice.reducer