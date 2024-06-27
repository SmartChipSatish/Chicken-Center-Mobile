import {createSlice} from '@reduxjs/toolkit';
import { resetAll } from '../../../../store/slices/ResetSlice';


interface ProductList {
    locations:any[],
    latitudes:"",
    longitudes:"",
    displayAddressesall:any[],
    itemId: {
        _id: string,
        city: string,
        houseNo: string,
        landmark: string,
        location: {
          _id: string,
          coordinates: number[],
        },
        name: string,
        pincode: string,
        state: string,
        status: boolean,
      },
    
}
const initialState:ProductList ={
    locations:[],
    latitudes:"",
    longitudes:"",
    displayAddressesall:[],
    itemId: {
    _id: "",
    city: "",
    houseNo: "",
    landmark: "",
    location: {
      _id: "",
      coordinates: [],
    },
    name: "",
    pincode: "",
    state: "",
    status: true,
  },
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
        },
        setItemid: (state, action) => {
            state.itemId=action.payload
        }
    },extraReducers: (builder) => {
        builder.addCase(resetAll, () => initialState);
      }
});

export const { setAddLocation,setLatitudes,setLongitudes,setDisplayAddressAll,setItemid } = locationsSlice.actions;
export default locationsSlice;