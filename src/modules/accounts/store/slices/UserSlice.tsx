import { createSlice } from '@reduxjs/toolkit';
import { UserDetails } from '../../utlis/constents';

interface UserState {
    user: UserDetails | null;
}

const initialState: UserState = {
    user: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { setUser } = userSlice.actions;
export default userSlice;