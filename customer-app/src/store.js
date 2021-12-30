import { configureStore } from '@reduxjs/toolkit'


import CustomersSlice from './features/customer/CustomersSlice'
import LocationsSlice from './features/location/LocationsSlice'

export const store = configureStore({
    reducer: {
      customers: CustomersSlice,
      locations: LocationsSlice
    }
})
