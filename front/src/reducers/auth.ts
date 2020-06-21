import { Action, State } from "@/utils/relax";
import { LOGIN_SUCCESS, SHOW_PASSWORD_CHANGE, HIDE_PASSWORD_CHANGE } from "@/actions/auth";

const initialState = {
  username: null,
  showPasswordChange: false,
};

export const auth = (state: State = initialState, action: Action = {}): State => {
  switch (action.type) {
    case SHOW_PASSWORD_CHANGE: {
      return {
        ...state,
        showPasswordChange: true,
      };
    }
    case HIDE_PASSWORD_CHANGE: {
      return {
        ...state,
        showPasswordChange: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        username: action.username,
      };
    }
    default: {
      return state;
    }
  }
};
