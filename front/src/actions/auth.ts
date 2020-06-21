import { login as fetchLogin } from "@/api";
import { putFlash, FlashVariant } from "@/actions/flash";
import { pushLoading, popLoading } from "@/actions/loading";

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
      dispatch(putFlash(FlashVariant.Danger, "Nie udało się zalogować z tymi danymi."));
    } else {
      return dispatch(loginSuccess(username));
    }
  },
});
