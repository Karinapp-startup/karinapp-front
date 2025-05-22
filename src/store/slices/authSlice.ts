"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    user: {
        email: string | null;
        sub: string | null;
        // otros atributos del usuario de Cognito
    } | null;
    tokens: {
        accessToken: string | null;
        idToken: string | null;
        refreshToken: string | null;
        expiration: number | null;
    };
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    tokens: {
        accessToken: null,
        idToken: null,
        refreshToken: null,
        expiration: null,
    },
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState['tokens']>) => {
            state.tokens = action.payload;
            state.isAuthenticated = true;
        },
        setUser: (state, action: PayloadAction<AuthState['user']>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            return initialState;
        }
    }
});

export const {
    setCredentials,
    setUser,
    setError,
    clearError,
    logout
} = authSlice.actions;

export default authSlice.reducer; 