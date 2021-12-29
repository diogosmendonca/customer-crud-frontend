import { configureStore } from '@reduxjs/toolkit'


import CustomersSlice from './features/customer/CustomersSlice'

export const store = configureStore({
    reducer: {
      customers: CustomersSlice
    }
})
