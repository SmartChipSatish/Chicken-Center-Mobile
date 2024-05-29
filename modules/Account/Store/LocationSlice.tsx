import {createSlice} from '@reduxjs/toolkit';


interface ProductList {
    locations:any[],
    latitudes:{},
    longitudes:{},
}
const initialState:ProductList ={
    locations:[],
    latitudes:{},
    longitudes:{}
}
const locationsSlice = createSlice({
    name: 'location',
    initialState,
    reducers:{
        setAddLocation: (state, action) => {
            state.locations.push(action.payload)
        },
        setLatitudes: (state, action) => {
            state.latitudes=action.payload
        },
        setLongitudes: (state, action) => {
            state.longitudes=action.payload
        },
    }
});

export const { setAddLocation,setLatitudes,setLongitudes } = locationsSlice.actions;
export default locationsSlice;