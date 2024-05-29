import {createSlice} from '@reduxjs/toolkit';


interface ProductList {
    locations:any[],
    latitudes:{},
    longitudes:{},
    displayAddressesall:any[]
}
const initialState:ProductList ={
    locations:[],
    latitudes:{},
    longitudes:{},
    displayAddressesall:[]
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
        setDisplayAddressAll:(state,action)=>{
            state.displayAddressesall.push(action.payload)
        }
    }
});

export const { setAddLocation,setLatitudes,setLongitudes,setDisplayAddressAll } = locationsSlice.actions;
export default locationsSlice;