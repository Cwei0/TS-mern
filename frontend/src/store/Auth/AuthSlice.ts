import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../Types/User";

interface authState {
    loading: boolean,
    user: User | null,
    error: Error[] | unknown,
    isLoggedin: boolean,
}

const initialState: authState = {
    loading: false,
    user: null,
    isLoggedin: false,
    error : []
}

export const loginUser = createAsyncThunk<>