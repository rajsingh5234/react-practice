import { configureStore } from '@reduxjs/toolkit'
import otpReducer from './slices/otpSlice'

export const store = configureStore({
    reducer: {
        otpReducer,
    },
})