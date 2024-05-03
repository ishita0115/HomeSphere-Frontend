import { createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

interface AuthState {
  isAuthenticated: boolean;
  users:any[]
  token: string;
  
  // first_name: string | null;
  // email: string | null; // Add email field to store
}
// const storedResponse = localStorage.getItem('response');
// const isAuthenticated = !!storedResponse; // Check if there's any data in local storage

const initialState: AuthState = {
  isAuthenticated: false,
  // first_name: null,
  // email: null,
  users : [],
  token: ""
  // user:{
  //   first_name:null,
  //   email:null
  // } 
};
// if (storedResponse) {
//     const parsedResponse = JSON.parse(storedResponse);
//     initialState.first_name = parsedResponse.first_name;
//     // You can set email here if it's available in the stored response
//   }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("payload",action.payload)
      
      state.isAuthenticated = true;
      console.log("action f name : ", action.payload);
      console.log(action.payload)
      state.users = action.payload[0]
      state.token = action.payload[1]
      
      // console.log('action kya aa ',action);
      // state.token = action.payload; // Update email in the store
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.users=[]
      state.token=""
      localStorage.removeItem('profilePicture');
      // state.first_name = null;
      // state.email = null; // Clear email on logout
    },
    updateProfile:(state,{type,payload})=>{
      state.users = payload
    }
  },
});

export const { login, logout, updateProfile } = authSlice.actions;


export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
// export const selectfirst_name = (state: { auth: AuthState }) => state.auth.first_name;
// export const selectEmail = (state: { auth: AuthState }) => state.auth.email; // Selector for email

export default authSlice.reducer;