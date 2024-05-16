import AdminMessages from '@/app/components/Adminmessage/Adminmesg';
import { createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

interface AuthState {
  isAuthenticated: boolean;
  users:any[]
  token: string;
}


const initialState: AuthState = {
  isAuthenticated: false,

  users : [],
  token: ""

};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("payload",action.payload)
      
      state.isAuthenticated = true;
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
    },
    adminmessage:(state,{type,payload})=>{
      state.users = payload
    },
  },
});

export const { login, logout, updateProfile,adminmessage } = authSlice.actions;


export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export default authSlice.reducer;