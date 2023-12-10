import { createSlice } from '@reduxjs/toolkit';
import { getIsAdmin, getIsAuthentication } from '../../utils/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthentication: getIsAuthentication(),
        isAdmin: getIsAdmin()
    },
    reducers: {
        login: (state, action) => {
            state.isAuthentication = true
            state.isAdmin = action.payload
        },
        logout: (state) => {
            state.isAuthentication = false
            state.isAdmin = false
        },
    },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;