import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, senOtp, forgotPassword} from "../../api/AuthAPI";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: false,
    sendOtpStatus: 'idle',
    verifyOtpForForgotPasswordStatus: 'idle',
    resetPasswordStatus: 'idle',
    resetPasswordOtpDialogVisible: false,
};

export const loginAsync = createAsyncThunk(
    "auth/loginAsync",
    async (loginRequestDTO, {rejectWithValue}) => {
        try {
            const response = await loginUser(loginRequestDTO);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutAsync = createAsyncThunk(
    "auth/logoutAsync",
    async (_, {rejectWithValue}) => {
        try {
            const response = await logoutUser();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const sendOtpAsync = createAsyncThunk(
    'auth/sendOtpAsync',
    async (sendMailRequest, {rejectWithValue}) => {
        try {
            const response = await senOtp(sendMailRequest);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const resetPasswordAsync = createAsyncThunk(
    'auth/forgotPasswordAsync',
    async (verifyOtpRequest, {rejectWithValue}) => {
        try {
            const response = await forgotPassword(verifyOtpRequest);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
        openResetPasswordOtpDialog: (state) => {
            state.resetPasswordOtpDialogVisible = true;
        },
        closeResetPasswordOtpDialog: (state) => {
            state.resetPasswordOtpDialogVisible = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                if (action.payload) {
                    if (action.payload.status === 403) {
                        state.error = "Account locked!";
                    } else if (action.payload.status === 502) {
                        state.error = "Account does not exist!";
                    } else if (action.payload.status === 400) {
                        state.error = "Check your username and password again!";
                    } else {
                        state.error = "An unexpected error occurred.";
                    }
                } else {
                    state.error = "An unexpected error occurred.";
                }

            })
            .addCase(logoutAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendOtpAsync.pending, (state) => {
                state.sendOtpStatus = 'loading';
            })
            .addCase(sendOtpAsync.fulfilled, (state) => {
                state.sendOtpStatus = 'succeeded';
            })
            .addCase(sendOtpAsync.rejected, (state, action) => {
                state.sendOtpStatus = 'failed';
                state.error = action.error.message;
            })

            .addCase(resetPasswordAsync.pending, (state) => {
                state.verifyOtpForForgotPasswordStatus = 'loading';
            })
            .addCase(resetPasswordAsync.fulfilled, (state) => {
                state.verifyOtpForForgotPasswordStatus = 'succeeded';
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.verifyOtpForForgotPasswordStatus = 'failed';
                state.error = action.error.message;
            });
    },

});
export const {openResetPasswordOtpDialog, closeResetPasswordOtpDialog} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;


export default authSlice.reducer;
