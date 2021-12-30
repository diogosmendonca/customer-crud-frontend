import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import {baseUrl} from '../../baseUrl'
import axios from 'axios';

const locationsAdapter = createEntityAdapter();

const initialState = locationsAdapter.getInitialState({
    status: 'not_loaded',
    error: null
});

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (_, {getState}) => {
    return (await axios.get(`${baseUrl}/api/locations`)).data;
});

export const deleteLocationServer = createAsyncThunk('locations/deleteLocationServer', async (idLocation, {getState}) => {
    await axios.delete(`${baseUrl}/api/locations/${idLocation}`);
    return idLocation;
});

export const addLocationServer = createAsyncThunk('locations/addLocationServer', async (location, {getState}) => {
    try{
        let response = (await axios.post(`${baseUrl}/api/locations`, location));
        return {status: response.status, data: response.data};
    }catch(error){
        let response = error.response;
        return {status: response.status, data: response.data};
    }
});

export const updateLocationServer = createAsyncThunk('locations/updateLocationServer', async (location, {getState}) => {
    try{
        let response = (await axios.put(`${baseUrl}/api/locations/${location.id}`, location));
        return {status: response.status, data: response.data};
    }catch(error){
        let response = error.response;
        return {status: response.status, data: response.data};
    }
});

function locationSaveReducer(state, action){

    if(action.payload.status === 201){
        state.status = 'created'; 
        locationsAdapter.addOne(state, action.payload.data);
    }else if (action.payload.status === 200){
        state.status = 'saved'; 
        locationsAdapter.upsertOne(state, action.payload.data);
    }else if (action.payload.status === 422){
        state.status = 'validation_failed';
        state.error = action.payload.data;
    }else{
        state.status = 'failed';
        state.error = action.payload.data;
    }
}

export const LocationsSlice = createSlice({
    name: 'locations',
    initialState: initialState,
    reducers: {
        setLocations: (state, action) => {state.status = 'loaded'; locationsAdapter.setAll(state, action.payload)}
    },
    extraReducers: {
       [fetchLocations.pending]: (state, action) => {state.status = 'loading'},
       [fetchLocations.fulfilled]: (state, action) => {state.status = 'loaded'; locationsAdapter.setAll(state, action.payload);},
       [fetchLocations.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteLocationServer.rejected]: (state, action) => {state.status = 'failed'; state.error = action.error.message},
       [deleteLocationServer.fulfilled]: (state, action) => {state.status = 'deleted'; locationsAdapter.removeOne(state, action.payload);},
       [addLocationServer.fulfilled]: locationSaveReducer,
       [updateLocationServer.fulfilled]: locationSaveReducer,
    },
})

export default LocationsSlice.reducer

export const { setLocations } = LocationsSlice.actions

export const {
    selectAll: selectAllLocations,
    selectById: selectLocationsById,
    selectIds: selectLocationsIds
} = locationsAdapter.getSelectors(state => state.locations)
    
