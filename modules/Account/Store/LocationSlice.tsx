import {createSlice} from '@reduxjs/toolkit';


interface ProductList {
    locations:any[]
}
const initialState:ProductList ={
    locations:[]
}
const locationsSlice = createSlice({
    name: 'location',
    initialState,
    reducers:{
        setAddLocation: (state, action) => {
            state.locations.push(action.payload)
        },
    }
});

export const { setAddLocation } = locationsSlice.actions;
export default locationsSlice;