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
    try{
        let response = (await axios.post(`${baseUrl}/api/customers`, customer));
        return {status: response.status, data: response.data};
    }catch(error){
        let response = error.response;
        return {status: response.status, data: response.data};
    }
});

export const updateCustomerServer = createAsyncThunk('customers/updateCustomerServer', async (customer, {getState}) => {
    try{
        let response = (await axios.put(`${baseUrl}/api/customers/${customer.id}`, customer));
        return {status: response.status, data: response.data};
    }catch(error){
        let response = error.response;
        return {status: response.status, data: response.data};
    }
});

function customerSaveReducer(state, action){

    if(action.payload.status === 201){
        state.status = 'created'; 
        customersAdapter.addOne(state, action.payload.data);
    }else if (action.payload.status === 200){
        state.status = 'saved'; 
        customersAdapter.upsertOne(state, action.payload.data);
    }else if (action.payload.status === 422){
        state.status = 'validation_failed';
        state.error = action.payload.data;
    }else{
        state.status = 'failed';
        state.error = action.payload.data;
    }
}

export const CustomersSlice = createSlice({
    name: 'customers',
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => {state.status = action.payload; state.error = null;}
    },
    extraReducers: {
       [fetchCustomers.pending]: (state, action) => {state.status = 'loading'},
       [fetchCustomers.fulfilled]: (state, action) => {state.status = 'loaded'; customersAdapter.setAll(state, action.payload);},
       [fetchCustomers.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteCustomerServer.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteCustomerServer.fulfilled]: (state, action) => {state.status = 'deleted'; customersAdapter.removeOne(state, action.payload);},
       [addCustomerServer.fulfilled]: customerSaveReducer,
       [updateCustomerServer.fulfilled]: customerSaveReducer,
    },
})

export default CustomersSlice.reducer

export const {
    selectAll: selectAllCustomers,
    selectById: selectCustomersById,
    selectIds: selectCustomersIds
} = customersAdapter.getSelectors(state => state.customers)
    
