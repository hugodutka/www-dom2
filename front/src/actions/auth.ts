import { login as fetchLogin } from "@/api";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  username,
});

export const LOGIN = "LOGIN";
export const login = (dispatch: Function, username: string, password: string) => ({
  type: LOGIN,
  fun: async () => {
    const { error } = await fetchLogin(username, password);
    if (error) {
      console.log("login error", error);
    } else {
      return dispatch(loginSuccess(username));
    }
  },
});
