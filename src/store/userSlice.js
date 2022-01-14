import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ fullname, email, password, password_confirmation }, thunkAPI) => {
    try {
      const response = await fetch(
        'https://accounts.tujjudemo.com/api/user',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname,
            email,
            password,
            password_confirmation,
          }),
        }
      );
      let data = await response.json();
      console.log('data', data.status);
      console.log('json', response);

      if (response.status == 201) {
        console.log('success')
        localStorage.setItem('token', response.statusText);
        return { ...data, username: fullname, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    try {
      var formdata = new FormData();
          formdata.append("grant_type", "password");
          formdata.append("client_id", "");
          formdata.append("client_secret", "");
          formdata.append("username", username);
          formdata.append("password", password);
          formdata.append("scope", "*");
      const response = await fetch(
        "https://accounts.tujjudemo.com/api/oauth/token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: formdata,
          redirect: 'follow'
        }
      );
      let data = await response.json();
      console.log("data-login", data);
      console.log("json-login", response);
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserBytoken = createAsyncThunk(
  "users/fetchUserByToken",
  async ({ token }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://mock-user-auth-server.herokuapp.com/api/v1/users",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      console.log("data", data, response.status);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.user.email;
      state.email = payload.user.email;
      state.username = payload.user.fullname;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.username = payload.username;
    },
    [fetchUserBytoken.rejected]: (state) => {
      console.log("fetchUserBytoken");
      state.isFetching = false;
      state.isError = true;
    },
  },
});
export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
