import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkApi) => {
  try {
    const response = await authService.register(userData);
    toast.success("Registration successful");
    return response;
  } catch (error) {
    toast.error("Registration failed");
    return thunkApi.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (userData, thunkApi) => {
  try {
    const response = await authService.login(userData);
    toast.success("Login successful");
    return response;
  } catch (error) {
    toast.error("Login failed");
    return thunkApi.rejectWithValue(error.message || 'An error occurred during login');
  }
});

export const updateProfile = createAsyncThunk("user/profile/update", async (data, thunkApi) => {
  try {
    return await authService.updateUser(data);
  } catch (error) {
    return thunkApi.rejectWithValue({ error });
  }
});

export const forgotPasswordToken = createAsyncThunk("user/password/token", async (data, thunkApi) => {
  try {
    return await authService.forgotPassToken(data);
  } catch (error) {
    return thunkApi.rejectWithValue({ error });
  }
});

export const resetPassword = createAsyncThunk("user/password/reset", async (data, thunkApi) => {
  try {
    return await authService.resetPass(data);
  } catch (error) {
    return thunkApi.rejectWithValue({ error });
  }
});

export const getUsers = createAsyncThunk("user/get-users", async (thunkApi) => {
  try {
    return await authService.getUsers();
  } catch (error) {
    return thunkApi.rejectWithValue({ error });
  }
});

export const deleteUser = createAsyncThunk("user/delete", async (userId, thunkApi) => {
  try {
    const response = await authService.deleteUser(userId);
    toast.success("User deleted successfully");
    return response;
  } catch (error) {
    toast.error("Failed to delete user");
    return thunkApi.rejectWithValue(error);
  }
});

const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  createdUser: null,
  updatedUser: null,
  token: null,
  pass: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        if (state.isSuccess) {
          toast.success("Updated profile successfully");
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(forgotPasswordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess) {
          toast.success("Email sent successfully");
        }
      })
      .addCase(forgotPasswordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong! Please try again shortly.");
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pass = action.payload;
        if (state.isSuccess) {
          toast.success("Password reset successful");
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong! Please try again shortly.");
        }
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess) {
          toast.success("Details fetched successfully");
        }
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong! Please try again shortly.");
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("User deleted successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Failed to delete user");
      })

  },
});

export default authSlice.reducer;
