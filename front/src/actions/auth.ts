import {
  login as fetchLogin,
  changePassword as fetchChangePassword,
  logout as fetchLogout,
} from "@/api";
import { putFlash, FlashVariant } from "@/actions/flash";
import { pushLoading, popLoading } from "@/actions/loading";
import { resetState } from "@/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (username) => ({ type: LOGIN_SUCCESS, username });

export const LOGIN = "LOGIN";
export const login = (dispatch: Function, username: string, password: string) => ({
  type: LOGIN,
  fun: async () => {
    dispatch(pushLoading());
    const { error } = await fetchLogin(username, password);
    dispatch(popLoading(), false);
    if (error) {
      console.log("login error", error);
      dispatch(
        putFlash(FlashVariant.Danger, "Nie udało się zalogować z tymi danymi. Błąd: " + error)
      );
    } else {
      return dispatch(loginSuccess(username));
    }
  },
});

export const LOGOUT = "LOGOUT";
export const logout = (dispatch: Function) => ({
  type: LOGOUT,
  fun: async () => {
    dispatch(pushLoading());
    const { error } = await fetchLogout();
    dispatch(popLoading(), false);
    if (error) {
      console.log("logout error", error);
      dispatch(putFlash(FlashVariant.Danger, "Nie udało się wylogować."));
    } else {
      dispatch(resetState(), false);
      dispatch(putFlash(FlashVariant.Success, "Wylogowano."));
    }
  },
});

export const SHOW_PASSWORD_CHANGE = "SHOW_PASSWORD_CHANGE";
export const showPasswordChange = () => ({ type: SHOW_PASSWORD_CHANGE });

export const HIDE_PASSWORD_CHANGE = "HIDE_PASSWORD_CHANGE";
export const hidePasswordChange = () => ({ type: HIDE_PASSWORD_CHANGE });

export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const changePassword = (dispatch: Function, password: string) => ({
  type: CHANGE_PASSWORD,
  fun: async () => {
    dispatch(pushLoading());
    const { error } = await fetchChangePassword(password);
    if (error) {
      console.log("change password error", error);
      dispatch(popLoading(), false);
      dispatch(putFlash(FlashVariant.Danger, "Nie udało się zmienić hasła."));
    } else {
      dispatch(resetState(), false);
      dispatch(putFlash(FlashVariant.Success, "Hasło zmienione. Zaloguj się ponownie."));
    }
  },
});
