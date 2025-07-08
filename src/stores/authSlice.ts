import { createSlice } from "@reduxjs/toolkit";
import { JwtHeader, JwtPayload, jwtDecode } from "jwt-decode";
import TokenService, { TokenObject } from "../services";

interface AuthState {
  user: JwtHeader | JwtPayload | null | undefined;
  token: { accessToken: string } | null | TokenObject;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: TokenService.getUser(),
  token: TokenService.getToken(),
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { response } = action.payload;

      //decode and store current user
      const decodedUser = jwtDecode(response?.data?.token);
      //store user in state
      state.user = decodedUser;
      state.token = response.data.token as TokenObject;

      console.log(typeof state.token);
      if (state.user === decodedUser) {
        state.isLoggedIn = true;
      }

      TokenService.updateLocalAccessToken(state.token);
    },
    logOut: (state) => {
      TokenService.removeUser();
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
