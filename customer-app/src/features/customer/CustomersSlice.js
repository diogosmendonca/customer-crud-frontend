import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {baseUrl} from '../../baseUrl'
import axios from 'axios';

const customersAdapter = createEntityAdapter();

const initialState = customersAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async (_, {getState}) => {
    return (await axios.get(`${baseUrl}/api/customers`)).data;
});

export const deleteCustomerServer = createAsyncThunk('customers/deleteCustomerServer', async (idCustomer, {getState}) => {
    await axios.delete(`${baseUrl}/api/customers/${idCustomer}`);
    return idCustomer;
});

export const addCustomerServer = createAsyncThunk('customers/addCustomerServer', async (customer, {getState}) => {
    return (await axios.post(`${baseUrl}/api/customers`, customer)).data;
});

export const updateCustomerServer = createAsyncThunk('customers/updateCustomerServer', async (customer, {getState}) => {
    return (await axios.put(`${baseUrl}/api/customers/${customer.id}`, customer)).data;
});

export const CustomersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    extraReducers: {
       [fetchCustomers.pending]: (state, action) => {state.status = 'loading'},
       [fetchCustomers.fulfilled]: (state, action) => {state.status = 'loaded'; customersAdapter.setAll(state, action.payload);},
       [fetchCustomers.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteCustomerServer.pending]: (state, action) => {state.status = 'loading'},
       [deleteCustomerServer.fulfilled]: (state, action) => {state.status = 'deleted'; customersAdapter.removeOne(state, action.payload);},
       [addCustomerServer.pending]: (state, action) => {state.status = 'loading'},
       [addCustomerServer.fulfilled]: (state, action) => {state.status = 'saved'; customersAdapter.addOne(state, action.payload);},
       [updateCustomerServer.pending]: (state, action) => {state.status = 'loading'},
       [updateCustomerServer.fulfilled]: (state, action) => {state.status = 'saved'; customersAdapter.upsertOne(state, action.payload);},
    },
})

export default CustomersSlice.reducer

export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomersById,
    selectIds: selectCustomersIds
} = customersAdapter.getSelectors(state => state.customers)
    
