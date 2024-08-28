import { createSlice } from "@reduxjs/toolkit";
import { createUser, getUsers, updateUser } from "../actions";
import { Status, Users } from "../../types";

interface UsersState {
    data: Users[];
    status: Status;
    error: string | null;
}

const initialState: UsersState = {
    data: [],
    status: Status.LOADING,
    error: null,
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = Status.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = Status.FAILED;
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(createUser.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = Status.SUCCEEDED;
                state.data.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = Status.FAILED;
                state.error = action.payload || 'Unknown error';
            })
            .addCase(updateUser.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = Status.SUCCEEDED;
                state.data = state.data.map(user =>
                    user.id === action.payload.id ? action.payload : user
                );
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = Status.FAILED;
                state.error = action.payload || 'Unknown error';
            });
    },
});

